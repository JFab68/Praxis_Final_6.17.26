import { Writable } from 'node:stream';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import type { HelmetServerState } from 'react-helmet-async';
import App from './App';
import articles from './data/articles';

export interface PrerenderResult {
  html: string;
  head: {
    title: string;
    meta: string;
    link: string;
    script: string;
    noscript: string;
  };
  errors: string[];
}

/** Every public URL that gets its own complete HTML file at build time. */
export const PRERENDER_ROUTES: string[] = [
  '/',
  '/about',
  '/programs',
  '/oversight',
  '/policy',
  '/training',
  '/arts',
  '/resources',
  '/news',
  '/events',
  '/contact',
  '/donate',
  '/action',
  '/partners',
  '/neurodivergence',
  '/privacy-policy',
  '/terms-of-use',
  '/accessibility',
  ...articles.map((article) => `/news/${article.slug}`),
];

/**
 * Renders one route to static HTML.
 *
 * renderToPipeableStream + onAllReady is used rather than renderToString because
 * the pages are React.lazy() boundaries: the synchronous renderer would emit the
 * Suspense fallback (a spinner) instead of the page.
 */
export async function render(url: string): Promise<PrerenderResult> {
  const helmetContext: { helmet?: HelmetServerState } = {};
  const errors: string[] = [];
  const chunks: string[] = [];

  const writable = new Writable({
    write(chunk, _encoding, callback) {
      chunks.push(String(chunk));
      callback();
    },
  });

  const { pipe, abort } = renderToPipeableStream(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HelmetProvider>,
    {
      onAllReady() {
        pipe(writable);
      },
      onError(error) {
        errors.push(error instanceof Error ? error.message : String(error));
      },
    }
  );

  const timeout = setTimeout(() => abort(), 30_000);

  await new Promise<void>((resolve, reject) => {
    writable.on('finish', resolve);
    writable.on('error', reject);
  });
  clearTimeout(timeout);

  const helmet = helmetContext.helmet;
  return {
    html: chunks.join(''),
    head: {
      title: helmet?.title.toString() ?? '',
      meta: helmet?.meta.toString() ?? '',
      link: helmet?.link.toString() ?? '',
      script: helmet?.script.toString() ?? '',
      noscript: helmet?.noscript.toString() ?? '',
    },
    errors,
  };
}
