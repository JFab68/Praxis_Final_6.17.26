#!/usr/bin/env bash
# Optimize Praxis image assets: resize to real display needs, export WebP.
# Usage: bash scripts/optimize-images.sh
set -euo pipefail
cd "$(dirname "$0")/.."
IMG=public/images

# name|max_width|quality
MAP="
team-jessica.png|900|84
team-alex.png|820|84
team-sherri.png|820|84
praxis-logo-round.png|512|90
arts-band-rehearsing.png|1920|78
arts-studio-overview.png|1920|78
arts-painting-instructor.png|1920|78
music-cognitive-diagram.png|1600|80
minds-justice-and-the-law.png|1024|80
oversight-office-diagram.png|1600|80
capitol-night.jpg|1920|78
john-fabricius.jpg|876|82
az-capitol.jpg|1344|80
arizona-landscape.jpg|1344|78
coalition-meeting.jpg|1344|78
policy-documents.jpg|1344|78
oversight-spotlight.jpg|1344|78
civic-training.jpg|1344|78
family-impact.jpg|1344|78
home-confinement.jpg|1344|78
training-digital.jpg|1344|78
training-senior.jpg|1344|78
training-ai.jpg|1344|78
advocacy-speaking.jpg|1344|78
arts-music.jpg|1344|78
arts-movement.jpg|1344|78
think-motion.jpg|1344|78
storytelling.jpg|1344|78
music-theory.jpg|1344|78
overdose-prevention.jpg|1344|78
team-ja.jpg|864|82
hero-capitol.jpg|678|80
"

echo "$MAP" | while IFS='|' read -r name width quality; do
  [ -z "${name:-}" ] && continue
  src="$IMG/$name"
  [ -f "$src" ] || { echo "SKIP (missing): $name"; continue; }
  out="$IMG/${name%.*}.webp"
  magick "$src" -resize "${width}x>" -strip -quality "$quality" -define webp:method=6 "$out"
  before=$(stat -c%s "$src")
  after=$(stat -c%s "$out")
  printf '%-42s %8s -> %8s bytes\n' "$name" "$before" "$after"
done

# Dedicated 1200x630 social card for the Nov 9 summit (OG/Twitter format)
magick "$IMG/minds-justice-and-the-law.png" -resize 1200x -gravity center -crop 1200x630+0+0 +repage -strip -quality 82 "$IMG/minds-justice-and-the-law-og.jpg"
echo "wrote minds-justice-and-the-law-og.jpg"
