import PageHero from '../components/PageHero';
import SEOHead from '../components/SEOHead';

export default function PrivacyPolicyPage() {
  return (
    <div style={{ position: 'relative', zIndex: 2, background: '#050A0F' }}>
      <SEOHead title="Privacy Policy" description="Praxis Initiative privacy policy. How we collect, use, and protect your information. Donor privacy, data security, and your rights." path="/privacy-policy" />
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="How Praxis Initiative collects, uses, and protects your information."
        gradientAccent="#008C8C"
      />
      <section style={{ padding: '80px 0 120px' }}>
        <div className="content-container-narrow">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
              <h2 className="font-serif-display" style={{ fontSize: '22px', fontWeight: 400, color: '#ffffff', marginBottom: '16px' }}>Information We Collect</h2>
              <p className="font-sans-body" style={{ fontSize: '15px', lineHeight: 1.9, color: 'rgba(255,255,255,0.72)' }}>
                Praxis Initiative collects information you voluntarily provide when you sign petitions, subscribe to our newsletter, make donations, or contact us. This may include your name, email address, phone number, mailing address, and donation history.
              </p>
            </div>
            <div>
              <h2 className="font-serif-display" style={{ fontSize: '22px', fontWeight: 400, color: '#ffffff', marginBottom: '16px' }}>How We Use Your Information</h2>
              <p className="font-sans-body" style={{ fontSize: '15px', lineHeight: 1.9, color: 'rgba(255,255,255,0.72)' }}>
                We use your information to process donations, send receipts, communicate about our work and campaigns, respond to inquiries, and comply with legal obligations. We do not sell, rent, or trade your personal information to third parties.
              </p>
            </div>
            <div>
              <h2 className="font-serif-display" style={{ fontSize: '22px', fontWeight: 400, color: '#ffffff', marginBottom: '16px' }}>Donor Privacy</h2>
              <p className="font-sans-body" style={{ fontSize: '15px', lineHeight: 1.9, color: 'rgba(255,255,255,0.72)' }}>
                Praxis Initiative respects the privacy of our donors. We do not share, sell, or trade donor information with any other organization. Donor information is used solely for processing contributions, issuing tax receipts, and communicating about our work.
              </p>
            </div>
            <div>
              <h2 className="font-serif-display" style={{ fontSize: '22px', fontWeight: 400, color: '#ffffff', marginBottom: '16px' }}>Data Security</h2>
              <p className="font-sans-body" style={{ fontSize: '15px', lineHeight: 1.9, color: 'rgba(255,255,255,0.72)' }}>
                We implement reasonable security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. All donation transactions are processed through secure, encrypted connections (HTTPS) through our payment processing partners.
              </p>
            </div>
            <div>
              <h2 className="font-serif-display" style={{ fontSize: '22px', fontWeight: 400, color: '#ffffff', marginBottom: '16px' }}>Contact Us</h2>
              <p className="font-sans-body" style={{ fontSize: '15px', lineHeight: 1.9, color: 'rgba(255,255,255,0.72)' }}>
                If you have questions about this privacy policy, contact us at{' '}
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
