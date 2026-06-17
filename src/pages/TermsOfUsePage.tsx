import PageHero from '../components/PageHero';
import SEOHead from '../components/SEOHead';

export default function TermsOfUsePage() {
  return (
    <div style={{ position: 'relative', zIndex: 2, background: '#050A0F' }}>
      <SEOHead title="Terms of Use" description="Terms of use for the Praxis Initiative website. Acceptance of terms, intellectual property, disclaimer, and contact information." path="/terms-of-use" />
      <PageHero
        eyebrow="Legal"
        title="Terms of Use"
        subtitle="Terms governing the use of the Praxis Initiative website and services."
        gradientAccent="#008C8C"
      />
      <section style={{ padding: '80px 0 120px' }}>
        <div className="content-container-narrow">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
              <h2 className="font-serif-display" style={{ fontSize: '22px', fontWeight: 400, color: '#ffffff', marginBottom: '16px' }}>Acceptance of Terms</h2>
              <p className="font-sans-body" style={{ fontSize: '15px', lineHeight: 1.9, color: 'rgba(255,255,255,0.72)' }}>
                By accessing and using the Praxis Initiative website (praxisinitiative.org), you agree to these Terms of Use. If you do not agree, please do not use our website.
              </p>
            </div>
            <div>
              <h2 className="font-serif-display" style={{ fontSize: '22px', fontWeight: 400, color: '#ffffff', marginBottom: '16px' }}>Intellectual Property</h2>
              <p className="font-sans-body" style={{ fontSize: '15px', lineHeight: 1.9, color: 'rgba(255,255,255,0.72)' }}>
                All content on this website, including text, images, logos, and graphics, is the property of Praxis Initiative unless otherwise noted. You may share our content for non-commercial, educational, or advocacy purposes with proper attribution.
              </p>
            </div>
            <div>
              <h2 className="font-serif-display" style={{ fontSize: '22px', fontWeight: 400, color: '#ffffff', marginBottom: '16px' }}>Disclaimer</h2>
              <p className="font-sans-body" style={{ fontSize: '15px', lineHeight: 1.9, color: 'rgba(255,255,255,0.72)' }}>
                The information on this website is provided for general informational and advocacy purposes. Praxis Initiative makes no representations or warranties regarding the accuracy or completeness of the content. We are not responsible for the content of external websites linked from our site.
              </p>
            </div>
            <div>
              <h2 className="font-serif-display" style={{ fontSize: '22px', fontWeight: 400, color: '#ffffff', marginBottom: '16px' }}>Contact</h2>
              <p className="font-sans-body" style={{ fontSize: '15px', lineHeight: 1.9, color: 'rgba(255,255,255,0.72)' }}>
                For questions about these terms, contact{' '}
                <a href="mailto:info@praxisinitiative.org" style={{ color: '#008C8C', textDecoration: 'none' }}>info@praxisinitiative.org</a>.
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
