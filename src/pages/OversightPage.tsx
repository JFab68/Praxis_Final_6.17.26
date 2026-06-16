import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AlertTriangle, CheckCircle, DollarSign, FileText } from 'lucide-react';
import PageHero from '../components/PageHero';
import PageQuote from '../components/PageQuote';

gsap.registerPlugin(ScrollTrigger);

export default function OversightPage() {
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

  const problems = [
    'Prisons are closed institutions.',
    'Families often cannot get reliable answers.',
    'Staff can face unsafe working conditions.',
    'Incarcerated people have limited access to meaningful complaint systems.',
    'Lawmakers often receive incomplete or filtered information.',
    'Litigation is slow, expensive, and reactive.',
    'Oversight provides earlier detection and public accountability.',
  ];

  const solutions = [
    'Receive and investigate complaints',
    'Inspect facilities',
    'Issue public reports',
    'Identify systemic risks',
    'Monitor deaths, medical failures, use of force, restrictive housing, staffing, and grievance patterns',
    'Provide lawmakers and the public with independent information',
    'Protect against retaliation',
    'Operate outside ADCRR control',
  ];

  return (
    <div style={{ position: 'relative', zIndex: 2, background: '#050A0F' }}>
      <PageHero
        eyebrow="Priority Campaign"
        title="Independent Prison Oversight Is Not Optional. It Is Basic Public Accountability."
        subtitle="Arizona spends enormous public resources on incarceration. The public has a right to know what is happening inside prisons, whether conditions are safe, whether taxpayer funds are used responsibly, and whether the state is meeting constitutional and statutory obligations."
        backgroundImage="/images/oversight-spotlight.jpg"
        gradientAccent="#008C8C"
      />
      <PageQuote
        quote="The degree of civilization in a society can be judged by entering its prisons."
        attribution="Fyodor Dostoyevsky"
        accentColor="#008C8C"
      />

      <section ref={contentRef} style={{ paddingBottom: '120px' }}>
        <div className="content-container">
          {/* Context */}
          <div className="reveal-up" style={{ marginBottom: '80px', maxWidth: '800px' }}>
            <p className="font-sans-body" style={{ fontSize: '16px', lineHeight: 1.9, color: 'rgba(255,255,255,0.75)' }}>
              Praxis began thinking about independent prison oversight before it was politically popular.
              The effort intensified after serious prison security failures and years of documented problems
              inside Arizona prisons. Praxis helped build the public, legislative, and coalition foundation
              for Arizona's first independent correctional oversight body.
            </p>
          </div>

          {/* The Problem */}
          <div className="reveal-up" style={{ marginBottom: '80px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
              <AlertTriangle size={24} style={{ color: '#E05555' }} />
              <h2 className="font-serif-display" style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 300, color: '#ffffff' }}>The Problem</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
              {problems.map((problem) => (
                <div key={problem} style={{ padding: '20px 24px', background: 'rgba(128,0,0,0.08)', borderLeft: '2px solid #800000' }}>
                  <p className="font-sans-body" style={{ fontSize: '14px', lineHeight: 1.6, color: 'rgba(255,255,255,0.75)' }}>{problem}</p>
                </div>
              ))}
            </div>
          </div>

          {/* The Solution */}
          <div className="reveal-up" style={{ marginBottom: '80px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
              <CheckCircle size={24} style={{ color: '#008C8C' }} />
              <h2 className="font-serif-display" style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 300, color: '#ffffff' }}>The Solution</h2>
            </div>
            <p className="font-sans-body" style={{ fontSize: '15px', lineHeight: 1.8, color: 'rgba(255,255,255,0.7)', marginBottom: '24px', maxWidth: '700px' }}>
              An Independent Correctional Oversight Office should:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
              {solutions.map((solution) => (
                <div key={solution} style={{ padding: '20px 24px', background: 'rgba(0,140,140,0.06)', borderLeft: '2px solid #008C8C' }}>
                  <p className="font-sans-body" style={{ fontSize: '14px', lineHeight: 1.6, color: 'rgba(255,255,255,0.75)' }}>{solution}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Why Funding Matters */}
          <div className="reveal-up" style={{ marginBottom: '80px', padding: '48px', background: 'rgba(0,140,140,0.06)', borderRadius: '8px', borderLeft: '3px solid #008C8C' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <DollarSign size={24} style={{ color: '#008C8C' }} />
              <h2 className="font-serif-display" style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 300, color: '#ffffff' }}>Why Funding Matters</h2>
            </div>
            <p className="font-sans-body" style={{ fontSize: '16px', lineHeight: 1.9, color: 'rgba(255,255,255,0.8)' }}>
              Creating an office on paper is not enough. Without funding, staffing, authority, reporting
              infrastructure, and public access, oversight becomes symbolic. Praxis is working to ensure
              Arizona funds and implements a real office, not a hollow title.
            </p>
          </div>

          {/* Cost Comparison */}
          <div className="reveal-up" style={{ marginBottom: '80px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
              <FileText size={24} style={{ color: '#008C8C' }} />
              <h2 className="font-serif-display" style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 300, color: '#ffffff' }}>The Cost of Oversight vs. The Cost of Ignorance</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
              {[
                { value: '$1.5M', label: 'to establish and operate the Office of Correctional Oversight in its first year', accent: '#008C8C' },
                { value: '$1.8B', label: 'Arizona spends approximately this annually on corrections', accent: '#E05555' },
                { value: '$1 : $1,200', label: 'For every $1,200 spent on the corrections status quo, $1 would support independent oversight', accent: '#B088D8' },
              ].map((stat) => (
                <div key={stat.label} style={{ padding: '36px 28px', background: 'rgba(255,255,255,0.10)', borderTop: '3px solid ' + stat.accent, textAlign: 'center' }}>
                  <p className="font-serif-display" style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 400, color: stat.accent, marginBottom: '12px', lineHeight: 1.1 }}>
                    {stat.value}
                  </p>
                  <p className="font-sans-body" style={{ fontSize: '13px', lineHeight: 1.6, color: 'rgba(255,255,255,0.6)' }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="reveal-up" style={{ textAlign: 'center', padding: '60px 48px', background: '#800000', borderRadius: '8px' }}>
            <h2 className="font-serif-display" style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 300, color: '#ffffff', marginBottom: '20px' }}>
              Tell Arizona Leaders: Fund Independent Prison Oversight
            </h2>
            <p className="font-sans-body" style={{ fontSize: '15px', lineHeight: 1.7, color: 'rgba(255,255,255,0.85)', marginBottom: '32px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
              Independent oversight is a small investment compared to the cost of unchecked failure. Join us in demanding real accountability.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/contact" className="btn-praxis-solid" style={{ background: '#ffffff', color: '#E05555' }}>Take Action</a>
              <a href="/donate" className="btn-praxis">Donate to Support</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
