import React, { useState, useEffect } from 'react';
import {
  Heart,
  ShieldCheck,
  Sparkles,
  Lock,
  Building2,
  FileCheck,
  CheckCircle2,
  Award,
  ExternalLink,
} from 'lucide-react';
import PageHero from '../components/PageHero';
import PageQuote from '../components/PageQuote';
import SEOHead from '../components/SEOHead';

interface GivingTier {
  amount: string;
  label: string;
  impact: string;
  highlight?: boolean;
}

const GIVING_TIERS: GivingTier[] = [
  {
    amount: '$25',
    label: 'Community Ally',
    impact: 'Funds informational packets and statutory guides distributed to system-impacted families.',
  },
  {
    amount: '$50',
    label: 'Civic Advocate',
    impact: 'Supplies training curriculum and digital literacy coursework for one returning citizen cohort.',
  },
  {
    amount: '$100',
    label: 'Reform Champion',
    impact: 'Supports legislative research, policy briefs, and committee hearing testimony at the Capitol.',
    highlight: true,
  },
  {
    amount: '$250',
    label: 'Accountability Leader',
    impact: 'Directly powers investigative oversight research and prison conditions report publishing.',
  },
  {
    amount: '$500',
    label: 'Systems Transformer',
    impact: 'Sponsors community forums across Phoenix, Tucson, and rural Arizona to organize testimony.',
  },
  {
    amount: '$1,000',
    label: 'Justice Catalyst',
    impact: 'Underwrites legal research and technical drafting for statewide statutory reform bills.',
  },
];

export default function DonatePage() {
  const [selectedTier, setSelectedTier] = useState<string>('$100');
  const [feathrFailed, setFeathrFailed] = useState<boolean>(false);

  useEffect(() => {
    // 1. Givebutter Widget Script (Account: VAFHlg7pVLZ4fmxv)
    const gbScriptId = 'givebutter-widget-script';
    if (!document.getElementById(gbScriptId)) {
      const script = document.createElement('script');
      script.id = gbScriptId;
      script.src = 'https://widgets.givebutter.com/latest.umd.cjs?acct=VAFHlg7pVLZ4fmxv';
      script.async = true;
      document.head.appendChild(script);
    }

    // 2. Feathr embed script attempt with fallback detection
    const feathrScriptId = 'feathr-form-script';
    const feathrTimer = setTimeout(() => {
      // Check if Feathr loaded or iframe initialized
      const myForm = document.getElementById('myForm');
      if (myForm && (!myForm.children || myForm.children.length === 0)) {
        setFeathrFailed(true);
      }
    }, 2500);

    if (!document.getElementById(feathrScriptId)) {
      const script = document.createElement('script');
      script.id = feathrScriptId;
      script.src = 'https://fthr-content.praxisinitiative.org/forms-js/embed-v2.js';
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.onerror = () => setFeathrFailed(true);
      document.body.appendChild(script);
    }

    return () => {
      clearTimeout(feathrTimer);
    };
  }, []);

  return (
    <div style={{ position: 'relative', zIndex: 2, background: '#050A0F', color: '#FFFFFF' }}>
      <SEOHead
        title="Donate & Invest in Criminal Legal System Reform"
        description="Your tax-deductible contribution to Praxis Initiative funds independent prison oversight, civic training, and sentencing reform led 100% by system-impacted leaders in Arizona."
        path="/donate"
        ogImage="/images/og-image.jpg"
      />

      <PageHero
        eyebrow="Power the Movement"
        title="Invest in Reform Led by People Who Have Lived the System"
        subtitle="Those closest to the problem are closest to the solution, but furthest from power and resources. Your financial support bridges that divide—giving formerly incarcerated leaders the tools to transform Arizona justice."
        backgroundImage="/images/az-capitol.jpg"
        gradientAccent="#008C8C"
      />

      <PageQuote
        quote="Those closest to the problem are closest to the solution, but furthest from the power and resources."
        attribution="Glenn E. Martin"
        accentColor="#008C8C"
      />

      <section style={{ padding: '0 0 120px' }}>
        <div className="content-container">

          {/* ─────────────────────────────────────────────────────────────
              FUTURISTIC GLASSMORPHISM HERO DONATION CARDS GRID
             ───────────────────────────────────────────────────────────── */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(320px, 1.35fr) minmax(300px, 1fr)',
              gap: '40px',
              alignItems: 'start',
            }}
            className="donation-layout-grid"
          >

            {/* LEFT COLUMN: THE DONATION PORTAL & EMBEDDED ENGINE */}
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(8, 18, 28, 0.85) 0%, rgba(5, 10, 15, 0.95) 100%)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(0, 204, 204, 0.28)',
                borderRadius: '16px',
                padding: '40px',
                boxShadow: '0 24px 64px rgba(0,0,0,0.65), 0 0 32px rgba(0,140,140,0.12)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Subtle Ambient Radial Glow */}
              <div
                style={{
                  position: 'absolute',
                  top: '-80px',
                  right: '-80px',
                  width: '260px',
                  height: '260px',
                  background: 'radial-gradient(circle, rgba(0,140,140,0.22) 0%, transparent 70%)',
                  borderRadius: '50%',
                  pointerEvents: 'none',
                }}
              />

              {/* Portal Header */}
              <div style={{ marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '14px' }}>
                  <span
                    className="font-mono-data"
                    style={{
                      fontSize: '11px',
                      letterSpacing: '0.18em',
                      color: '#00CCCC',
                      textTransform: 'uppercase',
                      padding: '4px 12px',
                      background: 'rgba(0,140,140,0.14)',
                      border: '1px solid rgba(0,204,204,0.3)',
                      borderRadius: '40px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <Sparkles size={12} /> Secure Contribution Portal
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10B981', fontSize: '12px' }}>
                    <ShieldCheck size={15} />
                    <span className="font-mono-data" style={{ letterSpacing: '0.05em' }}>501(c)(3) TAX-DEDUCTIBLE</span>
                  </div>
                </div>

                <h2
                  className="font-serif-display"
                  style={{
                    fontSize: 'clamp(26px, 3vw, 36px)',
                    fontWeight: 300,
                    color: '#FFFFFF',
                    margin: '0 0 10px',
                    lineHeight: 1.2,
                  }}
                >
                  Fuel Systematic Change
                </h2>
                <p className="font-sans-body" style={{ fontSize: '15px', color: 'rgba(255,255,255,0.72)', margin: 0, lineHeight: 1.6 }}>
                  Choose your level of investment or enter a custom amount. 100% of grassroots funds go directly toward policy advocacy, prison oversight monitoring, and returning citizen leadership.
                </p>
              </div>

              {/* QUICK AMOUNT SELECTOR */}
              <div style={{ marginBottom: '32px' }}>
                <label
                  className="font-mono-data"
                  style={{
                    fontSize: '11px',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.5)',
                    display: 'block',
                    marginBottom: '12px',
                  }}
                >
                  Select Contribution Amount
                </label>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '12px',
                  }}
                >
                  {GIVING_TIERS.map((tier) => {
                    const isSelected = selectedTier === tier.amount;
                    return (
                      <button
                        key={tier.amount}
                        type="button"
                        onClick={() => setSelectedTier(tier.amount)}
                        style={{
                          padding: '16px 12px',
                          background: isSelected
                            ? 'linear-gradient(135deg, rgba(0,140,140,0.35) 0%, rgba(0,204,204,0.18) 100%)'
                            : 'rgba(255,255,255,0.05)',
                          border: isSelected
                            ? '2px solid #00CCCC'
                            : '1px solid rgba(255,255,255,0.12)',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          textAlign: 'center',
                          transition: 'all 0.25s ease',
                          boxShadow: isSelected ? '0 0 20px rgba(0,204,204,0.3)' : 'none',
                        }}
                      >
                        <div
                          className="font-serif-display"
                          style={{
                            fontSize: '22px',
                            fontWeight: isSelected ? 600 : 400,
                            color: isSelected ? '#FFFFFF' : 'rgba(255,255,255,0.9)',
                            marginBottom: '4px',
                          }}
                        >
                          {tier.amount}
                        </div>
                        <div
                          className="font-mono-data"
                          style={{
                            fontSize: '10px',
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            color: isSelected ? '#00CCCC' : 'rgba(255,255,255,0.45)',
                          }}
                        >
                          {tier.label}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* LIVE EMBEDDED DONATION ENGINE SECTION */}
              <div
                style={{
                  background: 'rgba(5, 10, 15, 0.75)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '12px',
                  padding: '24px',
                  marginBottom: '28px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Heart size={16} style={{ color: '#E05555' }} />
                    <span className="font-serif-display" style={{ fontSize: '16px', fontWeight: 400, color: '#FFFFFF' }}>
                      Complete Your Gift Online
                    </span>
                  </div>
                  <span className="font-mono-data" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>
                    Instant Receipt • Zero Friction
                  </span>
                </div>

                {/* Givebutter Interactive Form Component */}
                <div style={{ minHeight: '380px' }}>
                  {React.createElement('givebutter-giving-form', { campaign: 'A3SS1L' })}
                </div>

                {/* Feathr Embed Fallback Container */}
                <div
                  id="myForm"
                  data-feathr-form="6a302dbd8417097454cb2867"
                  style={{ display: feathrFailed ? 'none' : 'block' }}
                />

                {/* Direct Action Modal CTA Button */}
                <div
                  style={{
                    marginTop: '20px',
                    paddingTop: '20px',
                    borderTop: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '14px',
                  }}
                >
                  <a
                    href="https://givebutter.com/a3sS1L"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-praxis-solid"
                    style={{
                      padding: '14px 28px',
                      background: 'linear-gradient(135deg, #008C8C 0%, #006666 100%)',
                      color: '#FFFFFF',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '14px',
                      boxShadow: '0 8px 24px rgba(0,140,140,0.35)',
                    }}
                  >
                    Open Fullscreen Donor Portal <ExternalLink size={16} />
                  </a>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {React.createElement('givebutter-button', { campaign: 'A3SS1L' })}
                  </div>
                </div>
              </div>

              {/* Tax & Verification Badges */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '16px',
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.55)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Lock size={15} style={{ color: '#00CCCC' }} />
                  <span>256-Bit Bank-Grade Encryption</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FileCheck size={15} style={{ color: '#00CCCC' }} />
                  <span>EIN: 85-2496398 (501c3 Public Charity)</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: IMPACT SIDEBAR & INSTITUTIONAL GIVING */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

              {/* Detailed Impact Breakdown */}
              <div
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '16px',
                  padding: '36px',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                  <Award size={20} style={{ color: '#00CCCC' }} />
                  <h3 className="font-serif-display" style={{ fontSize: '22px', fontWeight: 400, color: '#FFFFFF', margin: 0 }}>
                    What Your Support Achieves
                  </h3>
                </div>

                <p className="font-sans-body" style={{ fontSize: '14px', lineHeight: 1.7, color: 'rgba(255,255,255,0.7)', marginBottom: '24px' }}>
                  Because Praxis is led 100% by system-impacted people, every dollar translates into authentic, experienced-based advocacy that entrenched bureaucracies cannot ignore.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {GIVING_TIERS.map((tier) => {
                    const isSelected = selectedTier === tier.amount;
                    return (
                      <div
                        key={tier.amount}
                        style={{
                          padding: '16px 20px',
                          background: isSelected ? 'rgba(0,140,140,0.12)' : 'rgba(255,255,255,0.03)',
                          borderLeft: isSelected ? '3px solid #00CCCC' : '3px solid rgba(255,255,255,0.12)',
                          borderRadius: '0 8px 8px 0',
                          transition: 'all 0.25s ease',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                          <span className="font-serif-display" style={{ fontSize: '17px', fontWeight: 500, color: isSelected ? '#00CCCC' : '#FFFFFF' }}>
                            {tier.amount}
                          </span>
                          <span className="font-mono-data" style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>
                            {tier.label}
                          </span>
                        </div>
                        <p className="font-sans-body" style={{ fontSize: '13px', lineHeight: 1.6, color: 'rgba(255,255,255,0.68)', margin: 0 }}>
                          {tier.impact}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Major Supporters & Institutional Grants */}
              <div
                style={{
                  background: 'linear-gradient(135deg, rgba(176,136,216,0.1) 0%, rgba(10,17,24,0.85) 100%)',
                  border: '1px solid rgba(176,136,216,0.25)',
                  borderRadius: '16px',
                  padding: '36px',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <Building2 size={20} style={{ color: '#B088D8' }} />
                  <h3 className="font-serif-display" style={{ fontSize: '20px', fontWeight: 400, color: '#FFFFFF', margin: 0 }}>
                    Institutional & Major Giving
                  </h3>
                </div>

                <p className="font-sans-body" style={{ fontSize: '14px', lineHeight: 1.75, color: 'rgba(255,255,255,0.72)', marginBottom: '20px' }}>
                  Supported by philanthropic leaders including <strong>Arnold Ventures (2024–2026)</strong>. For foundation grants, corporate matching gifts, donor-advised funds (DAF), or institutional partnership proposals:
                </p>

                <div
                  style={{
                    padding: '16px 20px',
                    background: 'rgba(0,0,0,0.3)',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    marginBottom: '16px',
                  }}
                >
                  <div className="font-mono-data" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Executive Director Direct Contact
                  </div>
                  <a
                    href="mailto:jfabricius@praxisinitiative.org?subject=Institutional%20Giving%20Inquiry"
                    style={{ fontSize: '14px', color: '#B088D8', textDecoration: 'underline', fontWeight: 500 }}
                  >
                    jfabricius@praxisinitiative.org
                  </a>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>
                  <CheckCircle2 size={14} style={{ color: '#B088D8' }} />
                  <span>ACH wire transfers & stock donations accepted</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 960px) {
          .donation-layout-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
        }
      `}</style>
    </div>
  );
}
