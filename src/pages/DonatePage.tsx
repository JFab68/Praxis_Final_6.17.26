import { useState } from 'react';
import { Heart, DollarSign, Repeat, Mail } from 'lucide-react';
import PageHero from '../components/PageHero';
import PageQuote from '../components/PageQuote';

const givingLevels = [
  { amount: '$25', impact: 'Supports public education and outreach.' },
  { amount: '$50', impact: 'Helps train returning citizens in civic advocacy.' },
  { amount: '$100', impact: 'Supports legislative materials and community organizing.' },
  { amount: '$250', impact: 'Helps sustain policy research and coalition work.' },
  { amount: '$500', impact: 'Supports oversight advocacy and public accountability.' },
  { amount: '$1,000', impact: 'Invests in statewide reform infrastructure.' },
];

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState<string | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [recurring, setRecurring] = useState(false);

  const handleDonate = () => {
    const amount = selectedAmount || customAmount;
    if (!amount) {
      alert('Please select or enter a donation amount.');
      return;
    }
    const msg = 'Thank you for your commitment to donate ' + amount + (recurring ? ' monthly' : '') +
      '! This is a demo site - actual donation processing would be integrated with Givebutter, Stripe, or a similar platform.';
    alert(msg);
  };

  return (
    <div style={{ position: 'relative', zIndex: 2, background: '#050A0F' }}>
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
            <div>
              <div style={{ marginBottom: '40px' }}>
                <h2 className="font-serif-display" style={{ fontSize: '22px', fontWeight: 300, color: '#ffffff', marginBottom: '24px' }}>Select an Amount</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }} className="amount-grid">
                  {givingLevels.map((level) => (
                    <button
                      key={level.amount}
                      onClick={() => { setSelectedAmount(level.amount); setCustomAmount(''); }}
                      className="font-sans-body"
                      style={{
                        padding: '18px',
                        background: selectedAmount === level.amount ? 'rgba(0,140,140,0.15)' : 'rgba(255,255,255,0.12)',
                        border: '2px solid ' + (selectedAmount === level.amount ? '#008C8C' : 'rgba(255,255,255,0.1)'),
                        borderRadius: '8px',
                        color: '#ffffff',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        textAlign: 'center',
                      }}
                    >
                      <span style={{ fontSize: '20px', fontWeight: 500, display: 'block', marginBottom: '4px' }}>{level.amount}</span>
                    </button>
                  ))}
                </div>

                <div style={{ marginTop: '16px' }}>
                  <label className="font-sans-body" style={{ fontSize: '12px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Custom Amount</label>
                  <div style={{ position: 'relative' }}>
                    <DollarSign size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }} />
                    <input
                      type="number"
                      value={customAmount}
                      onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                      placeholder="Enter amount"
                      className="font-sans-body"
                      style={{ width: '100%', padding: '14px 16px 14px 40px', background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '6px', color: '#FFFFFF', fontSize: '16px',  }}
                    />
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '40px' }}>
                <button
                  onClick={() => setRecurring(!recurring)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '16px 20px',
                    background: recurring ? 'rgba(0,140,140,0.1)' : 'rgba(255,255,255,0.12)',
                    border: '1px solid ' + (recurring ? 'rgba(0,140,140,0.3)' : 'rgba(255,255,255,0.18)'),
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    width: '100%',
                  }}
                >
                  <Repeat size={20} style={{ color: recurring ? '#008C8C' : 'rgba(255,255,255,0.4)' }} />
                  <div style={{ textAlign: 'left' }}>
                    <p className="font-sans-body" style={{ fontSize: '14px', fontWeight: 500, color: '#ffffff' }}>Make this a monthly gift</p>
                    <p className="font-sans-body" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>Sustaining gifts provide reliable support for our work</p>
                  </div>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid ' + (recurring ? '#008C8C' : 'rgba(255,255,255,0.3)'), background: recurring ? '#008C8C' : 'transparent', marginLeft: 'auto', flexShrink: 0 }} />
                </button>
              </div>

              <button onClick={handleDonate} className="btn-praxis-solid" style={{ width: '100%', padding: '18px', fontSize: '16px' }}>
                <Heart size={18} /> {recurring ? 'Give Monthly' : 'Donate Now'}
              </button>
            </div>

            <div>
              <h2 className="font-serif-display" style={{ fontSize: '22px', fontWeight: 300, color: '#ffffff', marginBottom: '24px' }}>Your Impact</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {givingLevels.map((level) => (
                  <div
                    key={level.amount}
                    style={{
                      padding: '20px',
                      background: selectedAmount === level.amount ? 'rgba(0,140,140,0.08)' : 'rgba(255,255,255,0.10)',
                      borderLeft: '2px solid ' + (selectedAmount === level.amount ? '#008C8C' : 'rgba(255,255,255,0.15)'),
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <span className="font-serif-display" style={{ fontSize: '18px', fontWeight: 400, color: selectedAmount === level.amount ? '#008C8C' : '#ffffff', display: 'block', marginBottom: '4px' }}>
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
    </div>
  );
}
