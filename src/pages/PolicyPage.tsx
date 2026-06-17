import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import PageQuote from '../components/PageQuote';
import SEOHead from '../components/SEOHead';

gsap.registerPlugin(ScrollTrigger);

const priorities = [
  'Fund Independent Prison Oversight',
  'Home Confinement',
  'Sentencing Reform',
  'Reentry Support',
  'Drug Policy and Overdose Prevention',
  'Public Health Approaches to Substance Use',
  'Access to Courts and Legal Information',
  'Prison Conditions and Accountability',
];

const sevenPs = [
  { letter: 'P', word: 'Police', desc: 'Law enforcement practices and accountability' },
  { letter: 'P', word: 'Pre-Trial', desc: 'Bail reform and pre-trial detention policies' },
  { letter: 'P', word: 'Prosecution', desc: 'Prosecutorial discretion and charging practices' },
  { letter: 'P', word: 'Probation', desc: 'Community supervision and probation reform' },
  { letter: 'P', word: 'Prison', desc: 'Conditions, programming, and oversight' },
  { letter: 'P', word: 'Post-Release', desc: 'Reentry, employment, and housing support' },
  { letter: 'P', word: 'Power', desc: 'Civic engagement and community leadership' },
];

export default function PolicyPage() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        content.querySelectorAll('.reveal-up'),
        { y: 30 },
        {
          y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: content,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div style={{ position: 'relative', zIndex: 2, background: '#050A0F' }}>
      <SEOHead title="Policy & Advocacy" description="Praxis Initiative advances bipartisan criminal legal system reform in Arizona — sentencing reform, reentry, probation and parole, drug policy, and coalition advocacy." path="/policy" />
      <PageHero
        eyebrow="Policy & Advocacy"
        title="Policy Change Requires More Than Good Intentions"
        subtitle="Praxis works with lawmakers, families, directly impacted people, attorneys, advocates, and bipartisan partners to move practical reforms across the entire criminal legal system."
        backgroundImage="/images/policy-documents.jpg"
        gradientAccent="#008C8C"
      />
      <PageQuote
        quote="Injustice anywhere is a threat to justice everywhere."
        attribution="Martin Luther King, Jr."
        accentColor="#B088D8"
      />

      <section ref={contentRef} style={{ paddingBottom: '120px' }}>
        <div className="content-container">
          {/* Legislative Strategy */}
          <div className="reveal-up" style={{ marginBottom: '80px', maxWidth: '800px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <Target size={24} style={{ color: '#008C8C' }} />
              <h2 className="font-serif-display" style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 300, color: '#ffffff' }}>Legislative Strategy</h2>
            </div>
            <p className="font-sans-body" style={{ fontSize: '16px', lineHeight: 1.9, color: 'rgba(255,255,255,0.75)', marginBottom: '20px' }}>
              Praxis works with lawmakers, families, directly impacted people, attorneys, advocates, and bipartisan partners to move practical reforms. We combine legal analysis, coalition organizing, public education, and legislative strategy to advance policies that can survive contact with reality.
            </p>
          </div>

          {/* Current Priorities */}
          <div className="reveal-up" style={{ marginBottom: '80px' }}>
            <h2 className="font-serif-display" style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 300, color: '#ffffff', marginBottom: '32px' }}>Current Priorities</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              {priorities.map((p) => (
                <div key={p} style={{ padding: '20px 24px', background: 'rgba(0,140,140,0.06)', borderLeft: '2px solid #008C8C' }}>
                  <p className="font-sans-body" style={{ fontSize: '15px', color: 'rgba(255,255,255,0.85)' }}>{p}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Drug Policy Integration */}
          <div
            className="reveal-up"
            style={{
              marginBottom: '80px',
              padding: '48px',
              background: 'rgba(91,60,136,0.06)',
              borderRadius: '8px',
              borderLeft: '3px solid #B088D8',
            }}
          >
            <h2 className="font-serif-display" style={{ fontSize: 'clamp(22px, 2.5vw, 30px)', fontWeight: 300, color: '#ffffff', marginBottom: '16px' }}>
              Drug Policy & Overdose Prevention
            </h2>
            <p className="font-sans-body" style={{ fontSize: '15px', lineHeight: 1.9, color: 'rgba(255,255,255,0.75)', marginBottom: '16px' }}>
              Drug policy and overdose prevention are now integrated into our broader Criminal Legal System Reform portfolio. Praxis supports pragmatic, health-centered approaches that reduce death, reduce stigma, and connect people to support instead of cycling them through jail and prison.
            </p>
            <p className="font-sans-body" style={{ fontSize: '15px', lineHeight: 1.9, color: 'rgba(255,255,255,0.75)' }}>
              This work includes overdose prevention education, harm reduction policy advocacy, public health approaches to substance use, community education, legislative strategy, and coalition partnership — all pursued within a complete systems-reform framework.
            </p>
          </div>

          {/* Seven Ps Framework */}
          <div className="reveal-up" style={{ marginBottom: '80px' }}>
            <h2 className="font-serif-display" style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 300, color: '#ffffff', marginBottom: '16px' }}>The Seven Ps Framework</h2>
            <p className="font-sans-body" style={{ fontSize: '15px', lineHeight: 1.8, color: 'rgba(255,255,255,0.6)', marginBottom: '32px', maxWidth: '640px' }}>
              Our comprehensive framework for understanding and reforming every stage of the criminal legal system:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              {sevenPs.map((item, i) => (
                <div key={item.word} style={{ padding: '28px 24px', background: 'rgba(255,255,255,0.12)', borderRadius: '4px', textAlign: 'center' }}>
                  <span className="font-serif-display" style={{ fontSize: '36px', fontWeight: 400, color: ['#008C8C', '#B088D8', '#008C8C', '#B088D8', '#008C8C', '#B088D8', '#E05555'][i], display: 'block', marginBottom: '8px' }}>
                    {item.letter}
                  </span>
                  <p className="font-sans-body" style={{ fontSize: '14px', fontWeight: 500, color: '#ffffff', marginBottom: '6px' }}>{item.word}</p>
                  <p className="font-sans-body" style={{ fontSize: '12px', lineHeight: 1.5, color: 'rgba(255,255,255,0.5)' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Coalition Work */}
          <div className="reveal-up" style={{ marginBottom: '80px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <Users size={24} style={{ color: '#008C8C' }} />
              <h2 className="font-serif-display" style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 300, color: '#ffffff' }}>Coalition Work</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }} className="coalition-grid">
              <p className="font-sans-body" style={{ fontSize: '15px', lineHeight: 1.9, color: 'rgba(255,255,255,0.75)' }}>
                Praxis helps convene, coordinate, and support coalitions that include people across political, professional, and lived-experience lines. We believe lasting reform requires diverse stakeholders working together toward common goals. Our coalition partners include lawmakers, attorneys, advocates, families, correctional staff, faith leaders, and directly impacted people.
              </p>
              <img src="/images/coalition-meeting.jpg" alt="Coalition meeting" loading="lazy" style={{ width: '100%', aspectRatio: '16/10', objectFit: 'cover', borderRadius: '4px' }} />
            </div>
          </div>

          {/* CTA */}
          <div className="reveal-up" style={{ textAlign: 'center', padding: '60px 0' }}>
            <h2 className="font-serif-display" style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 300, color: '#ffffff', marginBottom: '24px' }}>Work With Praxis on Policy Reform</h2>
            <Link to="/contact" className="btn-praxis-solid">Contact Us <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
