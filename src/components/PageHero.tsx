import { useEffect, useRef, useState } from 'react';

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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let time = 0;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        w = canvas.width = rect.width;
        h = canvas.height = rect.height;
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = (e.clientX - rect.left) / rect.width;
      mouseRef.current.y = (e.clientY - rect.top) / rect.height;
    };
    canvas.parentElement?.addEventListener('mousemove', handleMouse);

    const step = () => {
      if (!reduced) time += 0.003;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      const blobs = [
        { x: 0.2 + Math.sin(time * 0.7) * 0.15 + (mx - 0.5) * 0.1, y: 0.3 + Math.cos(time * 0.5) * 0.1 + (my - 0.5) * 0.1, r: 0.4, color: gradientAccent },
        { x: 0.7 + Math.cos(time * 0.6) * 0.15 - (mx - 0.5) * 0.08, y: 0.6 + Math.sin(time * 0.8) * 0.12 - (my - 0.5) * 0.08, r: 0.35, color: '#B088D8' },
        { x: 0.5 + Math.sin(time * 0.4) * 0.2, y: 0.5 + Math.cos(time * 0.3) * 0.15, r: 0.5, color: '#E05555' },
      ];

      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;

      for (let py = 0; py < h; py += 2) {
        for (let px = 0; px < w; px += 2) {
          const nx = px / w;
          const ny = py / h;
          let intensity = 0;

          for (const blob of blobs) {
            const dx = nx - blob.x;
            const dy = ny - blob.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            intensity += Math.exp(-dist * dist / (blob.r * blob.r * 2));
          }

          intensity = Math.min(intensity, 1);
          const alpha = Math.floor(intensity * 25);

          for (let dy = 0; dy < 2 && py + dy < h; dy++) {
            for (let dx = 0; dx < 2 && px + dx < w; dx++) {
              const i = ((py + dy) * w + (px + dx)) * 4;
              data[i] = 0;
              data[i + 1] = Math.floor(alpha * 0.6);
              data[i + 2] = Math.floor(alpha * 0.6);
              data[i + 3] = alpha;
            }
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);
      animRef.current = requestAnimationFrame(step);
    };

    animRef.current = requestAnimationFrame(step);

    const onReady = () => setReady(true);

    if (document.readyState === 'complete') onReady();
    else window.addEventListener('load', onReady);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      canvas.parentElement?.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('load', onReady);
    };
  }, [gradientAccent, reduced]);

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

      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          mixBlendMode: 'screen',
        }}
      />

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
    </section>
  );
}
