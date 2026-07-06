import { useEffect, useState } from 'react';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  children?: React.ReactNode;
  minHeight?: string;
  overlayOpacity?: number;
  gradientAccent?: string;
}

const CSS_BLOB_DURATION_PRIMARY = 12;
const CSS_BLOB_DURATION_SECONDARY = 16;
const CSS_BLOB_DURATION_TERTIARY = 20;

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  backgroundImage,
  children,
  minHeight = '60vh',
  overlayOpacity = 0.67,
  gradientAccent = '#008C8C',
}: PageHeroProps) {
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);

    const t = setTimeout(() => setReady(true), 50);
    return () => {
      mq.removeEventListener('change', handler);
      clearTimeout(t);
    };
  }, []);

  const blobStyle = (i: number): React.CSSProperties => {
    const positions: Record<number, { top: string; left: string }> = {
      0: { top: '25%', left: '20%' },
      1: { top: '60%', left: '70%' },
      2: { top: '45%', left: '45%' },
    };
    const colors = [gradientAccent, '#B088D8', '#E05555'];
    const durations = [CSS_BLOB_DURATION_PRIMARY, CSS_BLOB_DURATION_SECONDARY, CSS_BLOB_DURATION_TERTIARY];
    const { top, left } = positions[i] ?? { top: '50%', left: '50%' };
    return {
      position: 'absolute',
      top,
      left,
      width: 'clamp(280px, 45vw, 600px)',
      height: 'clamp(280px, 45vw, 600px)',
      borderRadius: '50%',
      background: `radial-gradient(circle, ${colors[i]} 0%, transparent 70%)`,
      opacity: 0.22,
      filter: 'blur(60px)',
      transform: 'translate(-50%, -50%) scale(1)',
      animation: reduced ? 'none' : `blobFloat${i} ${durations[i]}s ease-in-out infinite`,
      pointerEvents: 'none',
    };
  };

  const baseSection: React.CSSProperties = {
    position: 'relative',
    padding: '180px 0 100px',
    minHeight,
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    background: '#0A1118',
  };

  const backdrop: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.25,
    filter: 'grayscale(60%) contrast(1.2)',
  };

  const overlay: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    background: `linear-gradient(180deg, rgba(5,10,15,${overlayOpacity}) 0%, rgba(5,10,15,${overlayOpacity * 0.8}) 50%, rgba(5,10,15,${overlayOpacity + 0.15}) 100%)`,
  };

  const reveal = {
    opacity: ready ? 1 : 0,
    transform: ready ? 'translateY(0)' : 'translateY(16px)',
    transition: reduced ? 'opacity 0.2s ease' : 'opacity 0.9s ease, transform 0.9s ease',
  };

  return (
    <section style={baseSection}>
      {backgroundImage && <div style={backdrop} />}
      <div style={overlay} />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          mixBlendMode: 'screen',
          overflow: 'hidden',
        }}
      >
        {[0, 1, 2].map((i) => (
          <div key={i} style={blobStyle(i)} />
        ))}
      </div>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          pointerEvents: 'none',
        }}
      />

      <div className="content-container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <span
            style={{
              display: 'inline-block',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: gradientAccent,
              flexShrink: 0,
              boxShadow: `0 0 14px ${gradientAccent}`,
            }}
            aria-hidden="true"
          />
          <p
            className="eyebrow-label"
            style={{
              color: 'rgba(255,255,255,0.9)',
              ...reveal,
              transitionDelay: reduced ? '0s' : '0.05s',
            }}
          >
            {eyebrow}
          </p>
        </div>
        <h1
          className="font-serif-display"
          style={{
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: 300,
            color: '#ffffff',
            lineHeight: 1.15,
            maxWidth: '900px',
            marginBottom: subtitle ? '24px' : '0',
            textShadow: '0 2px 24px rgba(0,0,0,0.45)',
            ...reveal,
            transitionDelay: reduced ? '0s' : '0.15s',
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="font-sans-body"
            style={{
              fontSize: '16px',
              lineHeight: 1.8,
              color: 'rgba(255,255,255,0.7)',
              maxWidth: '640px',
              textShadow: '0 2px 24px rgba(0,0,0,0.45)',
              ...reveal,
              transitionDelay: reduced ? '0s' : '0.25s',
            }}
          >
            {subtitle}
          </p>
        )}
        <div style={{ ...reveal, transitionDelay: reduced ? '0s' : '0.35s' }}>{children}</div>
      </div>

      <style>{`
        @keyframes blobFloat0 {
          0%, 100% { transform: translate(-50%, -50%) translate(0, 0) scale(1); }
          33% { transform: translate(-50%, -50%) translate(40px, -30px) scale(1.1); }
          66% { transform: translate(-50%, -50%) translate(-20px, 30px) scale(0.95); }
        }
        @keyframes blobFloat1 {
          0%, 100% { transform: translate(-50%, -50%) translate(0, 0) scale(1); }
          33% { transform: translate(-50%, -50%) translate(-30px, 40px) scale(0.95); }
          66% { transform: translate(-50%, -50%) translate(25px, -35px) scale(1.08); }
        }
        @keyframes blobFloat2 {
          0%, 100% { transform: translate(-50%, -50%) translate(0, 0) scale(1); }
          50% { transform: translate(-50%, -50%) translate(35px, 20px) scale(1.12); }
        }
      `}</style>
    </section>
  );
}
