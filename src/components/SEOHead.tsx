import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  schema?: object;
}

export default function SEOHead({ title, description, path, ogImage, schema }: SEOHeadProps) {
  const fullTitle = `${title} | Praxis Initiative`;
  const url = path ? `https://praxisinitiative.org${path}` : 'https://praxisinitiative.org';
  const image = ogImage || 'https://praxisinitiative.org/images/og-image.jpg';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
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
