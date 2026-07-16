import { Link } from 'react-router-dom';
import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { submitForm } from '../lib/api';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [newsletterError, setNewsletterError] = useState('');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterError('');
    setSubmitting(true);

    const result = await submitForm({
      form: 'newsletter',
      email,
    });

    setSubmitting(false);

    if (result.success) {
      setSubscribed(true);
      setEmail('');
    } else {
      setNewsletterError(result.message);
    }
  };

  return (
    <footer
      id="footer"
      style={{
        position: 'relative',
        width: '100%',
        background: '#050A0F',
        zIndex: 4,
        overflow: 'hidden',
        borderTop: '1px solid rgba(255,255,255,0.15)',
      }}
    >
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '10vh 8vw 6vh',
        }}
      >
        {/* Vision Statement - Centered */}
        <div style={{ maxWidth: '720px', margin: '0 auto 80px', textAlign: 'center' }}>
          <p
            className="font-serif-display"
            style={{
              fontSize: '16px',
              fontWeight: 300,
              lineHeight: 2.2,
              color: 'rgba(237,232,228,0.75)',
              letterSpacing: '0.02em',
              marginBottom: '24px',
            }}
          >
            Praxis Initiative is a 100% system-impacted nonprofit transforming Arizona's
            criminal legal system through independent prison oversight, criminal legal system reform,
            civic advocacy and digital literacy training for returning citizens, and arts in prison programming.
          </p>
          <p
            className="font-serif-display"
            style={{
              fontSize: '16px',
              fontWeight: 300,
              lineHeight: 2.2,
              color: 'rgba(237,232,228,0.75)',
              letterSpacing: '0.02em',
              marginBottom: '16px',
            }}
          >
            We believe those closest to the problem are closest to the solution, but furthest from power and resources. That is where Praxis exists: to ensure directly impacted people are centered in reform efforts.
          </p>
          <p
            className="font-serif-display"
            style={{
              fontSize: '18px',
              fontWeight: 400,
              lineHeight: 1.8,
              color: '#008C8C',
              letterSpacing: '0.05em',
              fontStyle: 'italic',
            }}
          >
            You can't have justice without us.
          </p>
        </div>

        {/* Footer Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '48px',
            paddingBottom: '60px',
            borderBottom: '1px solid rgba(255,255,255,0.15)',
          }}
        >
          {/* Navigation Column */}
          <div>
            <p
              className="font-sans-body"
              style={{
                fontSize: '11px',
                letterSpacing: '0.25em',
                color: 'rgba(237,232,228,0.3)',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}
            >
              Navigate
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { label: 'Home', path: '/' },
                { label: 'About', path: '/about' },
                { label: 'Programs', path: '/programs' },
                { label: 'Action Center', path: '/action' },
                { label: 'Partners', path: '/partners' },
                { label: 'Independent Oversight', path: '/oversight' },
                { label: 'Policy & Advocacy', path: '/policy' },
                { label: 'Training', path: '/training' },
                { label: 'Arts in Prison', path: '/arts' },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    color: '#EDE8E4',
                    opacity: 0.6,
                    fontSize: '14px',
                    textDecoration: 'none',
                    lineHeight: 1.8,
                    transition: 'opacity 0.4s',
                  }}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.opacity = '1'; }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.opacity = '0.6'; }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Resources Column */}
          <div>
            <p
              className="font-sans-body"
              style={{
                fontSize: '11px',
                letterSpacing: '0.25em',
                color: 'rgba(237,232,228,0.3)',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}
            >
              Resources
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { label: 'Resources Hub', path: '/resources' },
                { label: 'News & Blog', path: '/news' },
                { label: 'Contact Us', path: '/contact' },
                { label: 'Donate', path: '/donate' },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    color: '#EDE8E4',
                    opacity: 0.6,
                    fontSize: '14px',
                    textDecoration: 'none',
                    lineHeight: 1.8,
                    transition: 'opacity 0.4s',
                  }}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.opacity = '1'; }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.opacity = '0.6'; }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Column */}
          <div>
            <p
              className="font-sans-body"
              style={{
                fontSize: '11px',
                letterSpacing: '0.25em',
                color: 'rgba(237,232,228,0.3)',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}
            >
              Contact
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span
                style={{
                  color: '#EDE8E4',
                  opacity: 0.6,
                  fontSize: '14px',
                  lineHeight: 1.8,
                  whiteSpace: 'pre-line',
                }}
              >
                {'Praxis Initiative\nPhoenix, Arizona'}
              </span>
              <a
                href="mailto:info@praxisinitiative.org"
                style={{
                  color: '#008C8C',
                  opacity: 0.8,
                  fontSize: '14px',
                  textDecoration: 'none',
                  lineHeight: 1.8,
                  transition: 'opacity 0.4s',
                }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.opacity = '1'; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.opacity = '0.8'; }}
              >
                info@praxisinitiative.org
              </a>
            </div>
          </div>

          {/* Newsletter Column */}
          <div>
            <p
              className="font-sans-body"
              style={{
                fontSize: '11px',
                letterSpacing: '0.25em',
                color: 'rgba(237,232,228,0.3)',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}
            >
              Stay Connected
            </p>
            <p
              className="font-sans-body"
              style={{
                color: 'rgba(237,232,228,0.6)',
                fontSize: '14px',
                lineHeight: 1.6,
                marginBottom: '16px',
              }}
            >
              Get updates on oversight, legislation, training, and community action.
            </p>
            {subscribed ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#008C8C' }}>
                <CheckCircle size={16} />
                <span className="font-sans-body" style={{ fontSize: '13px' }}>You're signed up!</span>
              </div>
            ) : (
              <>
                {newsletterError && (
                  <p className="font-sans-body" style={{ fontSize: '12px', color: '#E05555', marginBottom: '8px' }}>{newsletterError}</p>
                )}
                <form onSubmit={handleNewsletterSubmit} style={{ display: 'flex', gap: '8px' }}>
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="font-sans-body"
                    style={{
                      flex: 1,
                      padding: '10px 14px',
                      background: 'rgba(255,255,255,0.14)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '6px',
                      color: '#FFFFFF',
                      fontSize: '13px',
                      outline: 'none',
                    }}
                  />
                  <button
                    type="submit"
                    className="font-sans-body"
                    disabled={submitting}
                    style={{
                      padding: '10px 18px',
                      background: '#008C8C',
                      border: 'none',
                      borderRadius: '6px',
                      color: '#FFFFFF',
                      fontSize: '12px',
                      fontWeight: 500,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      cursor: submitting ? 'default' : 'pointer',
                      transition: 'background 0.3s ease',
                      whiteSpace: 'nowrap',
                      opacity: submitting ? 0.7 : 1,
                    }}
                    onMouseEnter={(e) => { if (!submitting) e.currentTarget.style.background = '#006666'; }}
                    onMouseLeave={(e) => { if (!submitting) e.currentTarget.style.background = '#008C8C'; }}
                  >
                    {submitting ? 'Sending...' : 'Sign Up'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            paddingTop: '32px',
          }}
        >
          <p
            className="font-serif-display"
            style={{
              fontSize: '16px',
              letterSpacing: '0.15em',
              color: 'rgba(237,232,228,0.5)',
            }}
          >
            PRAXIS INITIATIVE
          </p>

          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <Link
              to="/privacy-policy"
              style={{
                color: 'rgba(237,232,228,0.35)',
                fontSize: '12px',
                textDecoration: 'none',
                transition: 'color 0.3s',
              }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.color = 'rgba(237,232,228,0.7)'; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'rgba(237,232,228,0.35)'; }}
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-of-use"
              style={{
                color: 'rgba(237,232,228,0.35)',
                fontSize: '12px',
                textDecoration: 'none',
                transition: 'color 0.3s',
              }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.color = 'rgba(237,232,228,0.7)'; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'rgba(237,232,228,0.35)'; }}
            >
              Terms of Use
            </Link>
            <Link
              to="/accessibility"
              style={{
                color: 'rgba(237,232,228,0.35)',
                fontSize: '12px',
                textDecoration: 'none',
                transition: 'color 0.3s',
              }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.color = 'rgba(237,232,228,0.7)'; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'rgba(237,232,228,0.35)'; }}
            >
              Accessibility
            </Link>
          </div>

          <p
            className="font-sans-body"
            style={{
              fontSize: '11px',
              color: 'rgba(237,232,228,0.25)',
              textAlign: 'right',
            }}
          >
            Praxis Initiative is a registered 501(c)(3) nonprofit organization. EIN: 85-2496398. All contributions are tax-deductible to the extent permitted by law.
          </p>
        </div>
      </div>
    </footer>
  );
}
