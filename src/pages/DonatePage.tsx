import { Mail } from 'lucide-react';
import PageHero from '../components/PageHero';
import PageQuote from '../components/PageQuote';
import SEOHead from '../components/SEOHead';

const givingLevels = [
  { amount: '$25', impact: 'Supports public education and outreach.' },
  { amount: '$50', impact: 'Helps train returning citizens in civic advocacy.' },
  { amount: '$100', impact: 'Supports legislative materials and community organizing.' },
  { amount: '$250', impact: 'Helps sustain policy research and coalition work.' },
  { amount: '$500', impact: 'Supports oversight advocacy and public accountability.' },
  { amount: '$1,000', impact: 'Invests in statewide reform infrastructure.' },
];

export default function DonatePage() {
  return (
    <div style={{ position: 'relative', zIndex: 2, background: '#050A0F' }}>
      <SEOHead
        title="Donate"
        description="Support criminal legal system reform in Arizona. Your tax-deductible donation to Praxis Initiative funds prison oversight, civic training, and arts programming led by system-impacted people."
        path="/donate"
      />
      <PageHero
        eyebrow="Support Our Work"
        title="Invest in Reform Led by People Who Have Lived the System"
        subtitle="Your support helps Praxis Initiative train returning citizens, advance independent oversight, produce public education, support families, advocate for policy change, and build a stronger movement for transparency and accountability."
        backgroundImage="/images/arizona-landscape.jpg"
        gradientAccent="#E05555"
      />
      <PageQuote
        quote="It's not how far you fall, but how high you bounce that counts."
        attribution="Zig Ziglar"
        accentColor="#E05555"
      />

      <section style={{ paddingBottom: '120px' }}>
        <div className="content-container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '80px' }} className="donate-grid">

            {/* Feathr Donation Form */}
            <div>
              <h2 className="font-serif-display" style={{ fontSize: '22px', fontWeight: 300, color: '#ffffff', marginBottom: '32px' }}>
                Make a Donation
              </h2>
              <div id="myForm" data-feathr-form="6a302dbd8417097454cb2867" />
              <div style={{ marginTop: '24px', padding: '20px', background: 'rgba(255,255,255,0.06)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <p className="font-sans-body" style={{ fontSize: '12px', lineHeight: 1.8, color: 'rgba(255,255,255,0.55)' }}>
                  All donations are processed securely through Feathr. Praxis Initiative is a registered 501(c)(3) nonprofit. Contributions are tax-deductible to the extent allowed by law. A donation receipt will be emailed to you upon completion.
                </p>
              </div>
            </div>

            {/* Impact sidebar */}
            <div>
              <h2 className="font-serif-display" style={{ fontSize: '22px', fontWeight: 300, color: '#ffffff', marginBottom: '24px' }}>Your Impact</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {givingLevels.map((level) => (
                  <div
                    key={level.amount}
                    style={{
                      padding: '20px',
                      background: 'rgba(255,255,255,0.10)',
                      borderLeft: '2px solid rgba(255,255,255,0.15)',
                    }}
                  >
                    <span className="font-serif-display" style={{ fontSize: '18px', fontWeight: 400, color: '#ffffff', display: 'block', marginBottom: '4px' }}>
                      {level.amount}
                    </span>
                    <span className="font-sans-body" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
                      {level.impact}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '40px', padding: '28px', background: 'rgba(91,60,136,0.08)', borderRadius: '8px', borderLeft: '3px solid #B088D8' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <Mail size={18} style={{ color: '#B088D8' }} />
                  <h3 className="font-serif-display" style={{ fontSize: '16px', fontWeight: 400, color: '#ffffff' }}>Institutional Giving</h3>
                </div>
                <p className="font-sans-body" style={{ fontSize: '13px', lineHeight: 1.7, color: 'rgba(255,255,255,0.65)' }}>
                  For foundation grants, corporate partnerships, or institutional giving inquiries, please contact us at{' '}
                  <a href="mailto:info@praxisinitiative.org" style={{ color: '#B088D8', textDecoration: 'none' }}>info@praxisinitiative.org</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Responsive grid */}
      <style>{`
        @media (max-width: 768px) {
          .donate-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </div>
  );
}
