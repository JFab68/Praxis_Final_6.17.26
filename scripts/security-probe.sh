#!/usr/bin/env bash
# Security probe for a deployed Praxis Initiative site.
# Usage: bash scripts/security-probe.sh <domain>
# Example: bash scripts/security-probe.sh praxisinitiative.org

set -euo pipefail

DOMAIN="${1:-}"
if [ -z "$DOMAIN" ]; then
  echo "Usage: $0 <domain>"
  echo "Example: $0 praxisinitiative.org"
  exit 1
fi

URL="https://$DOMAIN"
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

pass()  { echo -e "${GREEN}PASS${NC} $1"; }
warn()  { echo -e "${YELLOW}WARN${NC} $1"; }
fail()  { echo -e "${RED}FAIL${NC} $1"; }
info()  { echo -e "      $1"; }

echo "=== Security Probe: $DOMAIN ==="
echo ""

# ─── Response Headers ───
echo "--- Response Headers ---"
HEADERS=$(curl -sIL --max-time 15 -o /dev/null -D - "$URL" 2>/dev/null || echo "")

check_header() {
  local name="$1" expected="$2"
  local val
  val=$(echo "$HEADERS" | grep -i "^$name:" | head -1 | sed "s/^$name: //i" | tr -d '\r')
  if echo "$val" | grep -qi "$expected"; then
    pass "$name: $val"
  elif [ -z "$val" ]; then
    fail "$name: MISSING"
  else
    warn "$name: got '$val', expected substring '$expected'"
  fi
}

check_header "strict-transport-security" "max-age"
check_header "x-content-type-options" "nosniff"
check_header "x-frame-options" "SAMEORIGIN"
check_header "referrer-policy" "strict-origin"
check_header "permissions-policy" "camera"
check_header "cross-origin-opener-policy" "same-origin"
check_header "content-security-policy" "default-src"

# ─── 404 Status ───
echo ""
echo "--- 404 Check ---"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "$URL/this-page-does-not-exist-xyz" 2>/dev/null || echo "000")
if [ "$STATUS" = "404" ]; then
  pass "Fake page returns HTTP $STATUS"
else
  fail "Fake page returns HTTP $STATUS (should be 404)"
fi

# ─── Path Traversal ───
echo ""
echo "--- Path Traversal ---"
TRAVERSAL=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "$URL/..%2F..%2F..%2Fetc%2Fpasswd" 2>/dev/null || echo "000")
if [ "$TRAVERSAL" = "404" ] || [ "$TRAVERSAL" = "400" ]; then
  pass "Path traversal attempt returned $TRAVERSAL"
else
  warn "Path traversal attempt returned $TRAVERSAL"
fi

# ─── Open Redirect ───
echo ""
echo "--- Open Redirect ---"
REDIRECT=$(curl -s -o /dev/null -w "%{http_code} %{redirect_url}" --max-time 10 "$URL/?redirect=https://evil.com" 2>/dev/null || echo "000")
if echo "$REDIRECT" | grep -q "evil.com"; then
  fail "Open redirect detected: $REDIRECT"
else
  pass "No open redirect on query param"
fi

# ─── Vercel Alias Noindex ───
echo ""
echo "--- Vercel .vercel.app Noindex ---"
VERCEL_URL=$(echo "$DOMAIN" | sed 's/^www\.//')
VERCEL_HEADERS=$(curl -sIL --max-time 15 -o /dev/null -D - "https://${VERCEL_URL}.vercel.app" 2>/dev/null || echo "")
if echo "$VERCEL_HEADERS" | grep -qi "X-Robots-Tag.*noindex"; then
  pass ".vercel.app alias is noindexed"
elif [ -z "$VERCEL_HEADERS" ]; then
  info "Could not probe .vercel.app alias (may not exist)"
else
  warn ".vercel.app alias may be missing X-Robots-Tag: noindex"
fi

# ─── TLS Versions ───
echo ""
echo "--- TLS Check ---"
TLS=$(curl -s -o /dev/null -w "TLSv%{ssl_version}" --max-time 10 "$URL" 2>/dev/null || echo "FAILED")
echo "      $TLS"

# ─── Bundle Check: Web3Forms Key ───
echo ""
echo "--- Web3Forms Key in Bundle ---"
INDEX_JS=$(curl -s --max-time 10 "$URL/" 2>/dev/null | grep -oP '/assets/index-[A-Za-z0-9]+\.js' | head -1)
if [ -n "$INDEX_JS" ]; then
  WEB3_COUNT=$(curl -s --max-time 10 "$URL$INDEX_JS" 2>/dev/null | grep -c "api.web3forms.com/submit" || echo "0")
  if [ "$WEB3_COUNT" -gt 0 ]; then
    pass "Web3Forms key present in bundle ($WEB3_COUNT references)"
  else
    fail "Web3Forms key MISSING from bundle — forms may not deliver"
  fi
else
  info "Could not locate index JS bundle"
fi

echo ""
echo "=== Probe Complete ==="