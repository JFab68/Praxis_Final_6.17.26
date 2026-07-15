interface PageQuoteProps {
  quote: string;
  attribution: string;
  accentColor?: string;
}

export default function PageQuote({
  quote,
  attribution,
  accentColor = '#008C8C',
}: PageQuoteProps) {
  return (
    <section
      style={{
        position: 'relative',
        zIndex: 2,
        background: '#0D1B2A',
        borderTop: '1px solid rgba(255,255,255,0.15)',
        borderBottom: '1px solid rgba(255,255,255,0.15)',
        padding: '56px 0 100px',
      }}
    >
      <div className="content-container-narrow">
        <div
          style={{
            borderLeft: '4px solid ' + accentColor,
            paddingLeft: '32px',
          }}
        >
          <p
            className="font-serif-display"
            style={{
              fontSize: 'clamp(18px, 2.2vw, 24px)',
              fontWeight: 300,
              fontStyle: 'italic',
              lineHeight: 1.7,
              color: 'rgba(255,255,255,0.9)',
              marginBottom: '16px',
              maxWidth: '760px',
            }}
          >
            "{quote}"
          </p>
          <p
            className="font-mono-data"
            style={{
              fontSize: '11px',
              letterSpacing: '0.2em',
              color: accentColor,
              textTransform: 'uppercase',
            }}
          >
            — {attribution}
          </p>
        </div>
      </div>
    </section>
  );
}
