/**
 * Single loader for the Givebutter Widgets library.
 *
 * The library used to be loaded twice: once globally from index.html and again
 * by the donate page. It is now loaded once, on demand, by the only page that
 * renders Givebutter elements.
 */
const GIVEBUTTER_ACCOUNT = 'VAFHlg7pVLZ4fmxv';
const SCRIPT_ID = 'givebutter-widget-script';
const SCRIPT_SRC = `https://widgets.givebutter.com/latest.umd.cjs?acct=${GIVEBUTTER_ACCOUNT}`;

let pending: Promise<void> | null = null;

export function ensureGivebutterLoaded(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if (pending) return pending;

  pending = new Promise<void>((resolve, reject) => {
    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (existing) {
      if (existing.dataset.loaded === 'true') resolve();
      else {
        existing.addEventListener('load', () => resolve(), { once: true });
        existing.addEventListener('error', () => reject(new Error('Givebutter library failed to load')), { once: true });
      }
      return;
    }

    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = SCRIPT_SRC;
    script.async = true;
    script.addEventListener('load', () => {
      script.dataset.loaded = 'true';
      resolve();
    }, { once: true });
    script.addEventListener('error', () => reject(new Error('Givebutter library failed to load')), { once: true });
    document.head.appendChild(script);
  });

  return pending;
}

export const GIVEBUTTER_CAMPAIGN = 'A3SS1L';
export const GIVEBUTTER_PUBLIC_URL = 'https://givebutter.com/a3sS1L';

/** Public campaign URL pre-filled with the donor's chosen amount. */
export function givebutterUrl(amount?: string, frequency?: 'monthly' | 'one-time'): string {
  const params = new URLSearchParams();
  const numeric = amount?.replace(/[^0-9.]/g, '');
  if (numeric) params.set('amount', numeric);
  if (frequency === 'monthly') params.set('frequency', 'monthly');
  const query = params.toString();
  return query ? `${GIVEBUTTER_PUBLIC_URL}?${query}` : GIVEBUTTER_PUBLIC_URL;
}
