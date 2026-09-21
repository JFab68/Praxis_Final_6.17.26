import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

interface NavItem {
  label: string;
  path: string;
  children?: { label: string; path: string; description?: string }[];
}

const PROGRAM_SUBPAGES = [
  { label: 'All Programs', path: '/programs', description: 'Overview of Praxis strategic initiatives' },
  { label: 'Independent Oversight', path: '/oversight', description: 'Monitoring conditions & accountability inside ADCRR' },
  { label: 'Policy & Advocacy', path: '/policy', description: 'Statutory reform, 8 Ps framework & sentencing' },
  { label: 'Neurodivergence', path: '/neurodivergence', description: 'I/DD & neurodiversity in the criminal legal system' },
  { label: 'Civic Training', path: '/training', description: 'Civic advocacy & digital literacy for returning citizens' },
  { label: 'Arts in Prison', path: '/arts', description: 'Music theory, kinetic movement & fine arts rehabilitation' },
];

const NAV_LINKS: NavItem[] = [
  { label: 'About', path: '/about' },
  {
    label: 'Programs',
    path: '/programs',
    children: PROGRAM_SUBPAGES,
  },
  { label: 'Action', path: '/action' },
  { label: 'Partners', path: '/partners' },
  { label: 'Resources', path: '/resources' },
  { label: 'News', path: '/news' },
  { label: 'Events', path: '/events' },
  { label: 'Contact', path: '/contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const [mobileProgramsOpen, setMobileProgramsOpen] = useState(true);
  const navRef = useRef<HTMLElement>(null);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();

  // Close menus whenever the route changes
  useLayoutEffect(() => {
    const t = setTimeout(() => {
      setMobileOpen(false);
      setProgramsOpen(false);
    }, 0);
    return () => clearTimeout(t);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const isNav = navRef.current?.contains(target);
      const overlay = document.querySelector('[data-mobile-overlay]');
      const isOutsideOverlay = !overlay?.contains(target);
      if (!isNav && isOutsideOverlay) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    return () => window.removeEventListener('pointerdown', onPointerDown);
  }, [mobileOpen]);

  const isProgramActive = [
    '/programs',
    '/oversight',
    '/policy',
    '/neurodivergence',
    '/training',
    '/arts',
  ].includes(location.pathname);

  const isActive = (path: string) => {
    if (path === '/programs') return isProgramActive;
    return location.pathname === path;
  };

  const handleMouseEnterDropdown = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setProgramsOpen(true);
  };

  const handleMouseLeaveDropdown = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setProgramsOpen(false);
    }, 150);
  };

  const linkStyle = (path: string): React.CSSProperties => {
    const active = isActive(path);
    return {
      background: 'none',
      border: 'none',
      color: active ? '#FFFFFF' : 'rgba(255,255,255,0.65)',
      opacity: active ? 1 : 0.85,
      fontSize: '12px',
      letterSpacing: '0.08em',
      cursor: 'pointer',
      transition: 'opacity 0.3s ease, color 0.3s ease',
      padding: 0,
      textDecoration: 'none',
      textTransform: 'uppercase',
      fontWeight: active ? 500 : 400,
      borderBottom: active ? '1px solid #008C8C' : '1px solid transparent',
      paddingBottom: '2px',
      whiteSpace: 'nowrap',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
    };
  };

  return (
    <>
      <a
        href="#main-content"
        style={{
          position: 'absolute',
          top: '-100%',
          left: '16px',
          background: '#008C8C',
          color: '#FFFFFF',
          padding: '12px 20px',
          borderRadius: '6px',
          fontSize: '14px',
          fontWeight: 500,
          textDecoration: 'none',
          zIndex: 200,
          transition: 'top 0.2s ease',
        }}
        onFocus={(e) => { e.currentTarget.style.top = '16px'; }}
        onBlur={(e) => { e.currentTarget.style.top = '-100%'; }}
      >
        Skip to Content
      </a>
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
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
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
          <img
            src="/images/praxis-logo-round.webp"
            alt="Praxis Initiative Logo"
            style={{ width: '28px', height: '28px', objectFit: 'contain' }}
          />
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
          {NAV_LINKS.map((item) => {
            if (item.children) {
              return (
                <div
                  key={item.label}
                  style={{ position: 'relative' }}
                  onMouseEnter={handleMouseEnterDropdown}
                  onMouseLeave={handleMouseLeaveDropdown}
                >
                  <Link
                    to={item.path}
                    style={linkStyle(item.path)}
                    aria-haspopup="true"
                    aria-expanded={programsOpen}
                  >
                    {item.label}
                    <ChevronDown
                      size={13}
                      style={{
                        transform: programsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.25s ease',
                        opacity: 0.8,
                      }}
                    />
                  </Link>

                  {/* Dropdown Menu */}
                  {programsOpen && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        paddingTop: '14px',
                        zIndex: 250,
                      }}
                    >
                      <div
                        style={{
                          width: '280px',
                          background: 'rgba(8, 14, 22, 0.96)',
                          backdropFilter: 'blur(20px)',
                          WebkitBackdropFilter: 'blur(20px)',
                          border: '1px solid rgba(0, 204, 204, 0.25)',
                          borderRadius: '8px',
                          boxShadow: '0 16px 40px rgba(0,0,0,0.6), 0 0 20px rgba(0,140,140,0.12)',
                          padding: '8px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '2px',
                        }}
                      >
                        {item.children.map((sub) => {
                          const isSubActive = location.pathname === sub.path;
                          return (
                            <Link
                              key={sub.path}
                              to={sub.path}
                              style={{
                                display: 'block',
                                padding: '10px 14px',
                                textDecoration: 'none',
                                borderRadius: '5px',
                                background: isSubActive ? 'rgba(0,140,140,0.18)' : 'transparent',
                                borderLeft: isSubActive ? '3px solid #00CCCC' : '3px solid transparent',
                                transition: 'background 0.2s ease, border-left-color 0.2s ease',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(0,140,140,0.14)';
                                e.currentTarget.style.borderLeftColor = '#008C8C';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = isSubActive ? 'rgba(0,140,140,0.18)' : 'transparent';
                                e.currentTarget.style.borderLeftColor = isSubActive ? '#00CCCC' : 'transparent';
                              }}
                            >
                              <div
                                style={{
                                  fontSize: '13px',
                                  fontWeight: isSubActive ? 600 : 400,
                                  color: isSubActive ? '#00CCCC' : '#FFFFFF',
                                  letterSpacing: '0.04em',
                                  marginBottom: sub.description ? '2px' : 0,
                                }}
                              >
                                {sub.label}
                              </div>
                              {sub.description && (
                                <div
                                  style={{
                                    fontSize: '11px',
                                    color: 'rgba(255,255,255,0.5)',
                                    lineHeight: 1.35,
                                  }}
                                >
                                  {sub.description}
                                </div>
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.path}
                to={item.path}
                style={linkStyle(item.path)}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = '#FFFFFF';
                  (e.target as HTMLElement).style.opacity = '1';
                }}
                onMouseLeave={(e) => {
                  if (!isActive(item.path)) {
                    (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.65)';
                    (e.target as HTMLElement).style.opacity = '0.85';
                  }
                }}
              >
                {item.label}
              </Link>
            );
          })}
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
          aria-expanded={mobileOpen}
        >
          <div style={{ width: '20px', height: '2px', background: '#FFFFFF', transition: 'opacity 0.3s ease, transform 0.3s ease', transform: mobileOpen ? 'rotate(45deg) translateY(5px)' : 'none' }} />
          <div style={{ width: '20px', height: '2px', background: '#FFFFFF', margin: '5px 0', transition: 'opacity 0.3s ease, transform 0.3s ease', opacity: mobileOpen ? 0 : 1 }} />
          <div style={{ width: '20px', height: '2px', background: '#FFFFFF', transition: 'opacity 0.3s ease, transform 0.3s ease', transform: mobileOpen ? 'rotate(-45deg) translateY(-5px)' : 'none' }} />
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
          {NAV_LINKS.map((item) => {
            if (item.children) {
              return (
                <div key={item.label} style={{ width: '100%', maxWidth: '320px', textAlign: 'center' }}>
                  <button
                    onClick={() => setMobileProgramsOpen((open) => !open)}
                    className="font-sans-body"
                    style={{
                      background: 'none',
                      border: 'none',
                      color: isActive(item.path) ? '#008C8C' : '#FFFFFF',
                      fontSize: '16px',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      fontWeight: isActive(item.path) ? 600 : 400,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      margin: '0 auto',
                    }}
                  >
                    {item.label}
                    <ChevronDown
                      size={16}
                      style={{
                        transform: mobileProgramsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.25s ease',
                      }}
                    />
                  </button>

                  {mobileProgramsOpen && (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                        marginTop: '12px',
                        padding: '12px 16px',
                        background: 'rgba(255,255,255,0.04)',
                        borderRadius: '8px',
                        border: '1px solid rgba(0,204,204,0.15)',
                      }}
                    >
                      {item.children.map((sub) => {
                        const isSubActive = location.pathname === sub.path;
                        return (
                          <Link
                            key={sub.path}
                            to={sub.path}
                            className="font-sans-body"
                            style={{
                              color: isSubActive ? '#00CCCC' : 'rgba(255,255,255,0.75)',
                              fontSize: '13px',
                              letterSpacing: '0.08em',
                              textDecoration: 'none',
                              fontWeight: isSubActive ? 600 : 400,
                            }}
                          >
                            {sub.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            return (
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
            );
          })}
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
