import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'About', path: '/about' },
  { label: 'Programs', path: '/programs' },
  { label: 'Action', path: '/action' },
  { label: 'Partners', path: '/partners' },
  { label: 'Oversight', path: '/oversight' },
  { label: 'Policy', path: '/policy' },
  { label: 'Training', path: '/training' },
  { label: 'Arts', path: '/arts' },
  { label: 'Resources', path: '/resources' },
  { label: 'News', path: '/news' },
  { label: 'Contact', path: '/contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const location = useLocation();

  const closeMobile = () => setMobileOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  });

  useEffect(() => {
    closeMobile();
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileOpen) return
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null
      if (!target) return
      const isNav = navRef.current?.contains(target)
      const overlay = document.querySelector('[data-mobile-overlay]')
      const isOutsideOverlay = !overlay?.contains(target)
      if (!isNav && isOutsideOverlay) {
        setMobileOpen(false);
      }
    }
    window.addEventListener('pointerdown', onPointerDown, { passive: true })
    return () => window.removeEventListener('pointerdown', onPointerDown)
  }, [mobileOpen]);

  const isActive = (path: string) => location.pathname === path;

  const linkStyle = (path: string): React.CSSProperties => {
    const active = isActive(path);
    return {
      background: 'none',
      border: 'none',
      color: active ? '#FFFFFF' : 'rgba(255,255,255,0.6)',
      opacity: active ? 1 : 0.8,
      fontSize: '12px',
      letterSpacing: '0.08em',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      padding: 0,
      textDecoration: 'none',
      textTransform: 'uppercase',
      fontWeight: active ? 500 : 400,
      borderBottom: active ? '1px solid #008C8C' : '1px solid transparent',
      paddingBottom: '2px',
      whiteSpace: 'nowrap',
    };
  };

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 100,
          padding: scrolled ? '14px 3vw' : '22px 3vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition:
            'padding 0.5s ease, background-color 0.5s ease, border-bottom 0.5s ease, box-shadow 0.5s ease',
          backgroundColor: scrolled ? 'rgba(5, 10, 15, 0.92)' : 'rgba(5, 10, 15, 0)',
          backdropFilter: scrolled ? 'blur(18px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(18px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.12)' : '1px solid transparent',
          boxShadow: scrolled ? '0 0 40px rgba(0,0,0,0.35)' : 'none',
        }}
      >
        <Link
          to="/"
          className="font-serif-display"
          style={{
            fontSize: '16px',
            fontWeight: 400,
            letterSpacing: '0.15em',
            color: '#FFFFFF',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            textShadow: scrolled ? '0 0 18px rgba(255,255,255,0.08)' : 'none',
            transition: 'text-shadow 0.5s ease',
          }}
        >
          PRAXIS INITIATIVE
        </Link>

        <div
          className="font-sans-body desktop-nav"
          style={{
            display: 'flex',
            gap: '24px',
            alignItems: 'center',
          }}
        >
          {NAV_LINKS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                ...linkStyle(item.path),
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = '#FFFFFF';
                (e.target as HTMLElement).style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                if (!isActive(item.path)) {
                  (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.6)';
                  (e.target as HTMLElement).style.opacity = '0.8';
                }
              }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/donate"
            className="btn-praxis-solid"
            style={{
              padding: '9px 20px',
              fontSize: '11px',
              boxShadow: scrolled ? '0 0 24px rgba(0,0,0,0.25)' : 'none',
              transition: 'box-shadow 0.5s ease',
            }}
          >
            Donate
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen((open) => !open)}
          style={{
            display: 'none',
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.25)',
            borderRadius: '6px',
            cursor: 'pointer',
            padding: '10px',
            zIndex: 101,
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
          }}
          className="mobile-hamburger"
          aria-label="Toggle menu"
        >
          <div style={{ width: '20px', height: '2px', background: '#FFFFFF', transition: 'all 0.3s ease', transform: mobileOpen ? 'rotate(45deg) translateY(5px)' : 'none' }} />
          <div style={{ width: '20px', height: '2px', background: '#FFFFFF', margin: '5px 0', transition: 'all 0.3s ease', opacity: mobileOpen ? 0 : 1 }} />
          <div style={{ width: '20px', height: '2px', background: '#FFFFFF', transition: 'all 0.3s ease', transform: mobileOpen ? 'rotate(-45deg) translateY(-5px)' : 'none' }} />
        </button>
      </nav>

      {mobileOpen && (
        <div
          data-mobile-overlay
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            backgroundColor: 'rgba(5, 10, 15, 0.97)',
            backdropFilter: 'blur(20px)',
            zIndex: 99,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
            overflowY: 'auto',
            padding: '80px 0 40px',
          }}
        >
          {NAV_LINKS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="font-sans-body"
              style={{
                color: isActive(item.path) ? '#008C8C' : '#FFFFFF',
                fontSize: '16px',
                letterSpacing: '0.15em',
                textDecoration: 'none',
                textTransform: 'uppercase',
                fontWeight: isActive(item.path) ? 600 : 400,
              }}
            >
              {item.label}
            </Link>
          ))}
          <Link to="/donate" className="btn-praxis-solid" style={{ marginTop: '16px' }}>
            Donate
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 1100px) {
          .desktop-nav { display: none !important; }
          .mobile-hamburger { display: block !important; }
        }
      `}</style>
    </>
  );
}
