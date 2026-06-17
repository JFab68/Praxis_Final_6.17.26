import PageHero from '../components/PageHero';
import SEOHead from '../components/SEOHead';

export default function AccessibilityPage() {
  return (
    <div style={{ position: 'relative', zIndex: 2, background: '#050A0F' }}>
      <SEOHead title="Accessibility Statement" description="Praxis Initiative is committed to digital accessibility. WCAG 2.1 AA compliance, accessibility features, and how to report barriers." path="/accessibility" />
      <PageHero
        eyebrow="Commitment"
        title="Accessibility Statement"
        subtitle="Praxis Initiative is committed to ensuring digital accessibility for people with disabilities."
        gradientAccent="#008C8C"
      />
      <section style={{ padding: '80px 0 120px' }}>
        <div className="content-container-narrow">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
              <h2 className="font-serif-display" style={{ fontSize: '22px', fontWeight: 400, color: '#ffffff', marginBottom: '16px' }}>Our Commitment</h2>
              <p className="font-sans-body" style={{ fontSize: '15px', lineHeight: 1.9, color: 'rgba(255,255,255,0.72)' }}>
                Praxis Initiative is committed to making our website accessible to everyone, including people with disabilities. We strive to meet WCAG 2.1 Level AA standards and continuously work to improve the user experience for all visitors.
              </p>
            </div>
            <div>
              <h2 className="font-serif-display" style={{ fontSize: '22px', fontWeight: 400, color: '#ffffff', marginBottom: '16px' }}>Accessibility Features</h2>
              <p className="font-sans-body" style={{ fontSize: '15px', lineHeight: 1.9, color: 'rgba(255,255,255,0.72)' }}>
                Our website includes the following accessibility features:
              </p>
              <ul style={{ fontSize: '15px', lineHeight: 2, color: 'rgba(255,255,255,0.72)', paddingLeft: '20px', marginTop: '12px' }}>
                <li>Keyboard-navigable interface with visible focus indicators</li>
                <li>Semantic HTML structure with proper heading hierarchy</li>
                <li>Sufficient color contrast for text readability</li>
                <li>Descriptive link text and ARIA labels</li>
                <li>Responsive design that adapts to different screen sizes and zoom levels</li>
                <li>Reduced motion support for users who prefer minimal animations</li>
              </ul>
            </div>
            <div>
              <h2 className="font-serif-display" style={{ fontSize: '22px', fontWeight: 400, color: '#ffffff', marginBottom: '16px' }}>Ongoing Efforts</h2>
              <p className="font-sans-body" style={{ fontSize: '15px', lineHeight: 1.9, color: 'rgba(255,255,255,0.72)' }}>
                We regularly review our website for accessibility compliance and welcome feedback. We are committed to addressing accessibility issues promptly.
              </p>
            </div>
            <div>
              <h2 className="font-serif-display" style={{ fontSize: '22px', fontWeight: 400, color: '#ffffff', marginBottom: '16px' }}>Contact Us</h2>
              <p className="font-sans-body" style={{ fontSize: '15px', lineHeight: 1.9, color: 'rgba(255,255,255,0.72)' }}>
                If you encounter accessibility barriers on our website, please contact us at{' '}
                <a href="mailto:info@praxisinitiative.org" style={{ color: '#008C8C', textDecoration: 'none' }}>info@praxisinitiative.org</a>.
                We will make every effort to respond within 2-3 business days.
              </p>
            </div>
            <p className="font-sans-body" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginTop: '16px' }}>
              Last updated: June 2026
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
