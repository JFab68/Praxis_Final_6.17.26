import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  schema?: object;
  /** og:type — 'website' (default) or 'article' for news posts. */
  ogType?: 'website' | 'article';
  /** Ask search engines not to index this page (used by the 404 view). */
  noindex?: boolean;
}

export default function SEOHead({
  title,
  description,
  path,
  ogImage,
  schema,
  ogType = 'website',
  noindex = false,
}: SEOHeadProps) {
  // Article SEO titles already carry the "| Praxis Initiative" suffix - don't add it twice.
  const fullTitle = title.includes('| Praxis Initiative') ? title : `${title} | Praxis Initiative`;
  const url = path ? `https://praxisinitiative.org${path}` : 'https://praxisinitiative.org';
  const image = ogImage
    ? ogImage.startsWith('http')
      ? ogImage
      : `https://praxisinitiative.org${ogImage}`
    : 'https://praxisinitiative.org/images/og-image.jpg';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta name="robots" content={noindex ? 'noindex, follow' : 'index, follow'} />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
