import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, CheckCircle } from 'lucide-react';
import PageHero from '../components/PageHero';
import PageQuote from '../components/PageQuote';

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
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
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: content, start: 'top 80%', toggleActions: 'play none none none' },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const values = [
    'Lived Experience as Expertise',
    'Accountability Without Partisanship',
    'Transparency in Public Systems',
    'Second Chances',
    'Public Safety Through Practical Reform',
    'Community Leadership',
    'Policy That Can Survive Contact With Reality',
  ];

  const team = [
    { name: 'J Alexandria Hunt-Garcia', role: 'Community health, drug policy, and system-change leadership' },
    { name: 'Jessica Johnson', role: 'Legislative reform and capital mitigation experience' },
    { name: 'Mindi Kraicinski', role: 'Retired corrections officer providing operational insight' },
    { name: 'Sherri Skates', role: 'Community organizing and family-impact storytelling' },
  ];

  return (
    <div style={{ position: 'relative', zIndex: 2, background: '#050A0F' }}>
      <PageHero
        eyebrow="About Us"
        title="Praxis Initiative Is Built by People Who Know the System Firsthand"
        backgroundImage="/images/john-fabricius.jpg"
        gradientAccent="#008C8C"
      />
      <PageQuote
        quote="For to be free is not merely to cast off one's chains, but to live in a way that respects and enhances the freedom of others."
        attribution="Nelson Mandela"
        accentColor="#B088D8"
      />

      <section ref={contentRef} style={{ paddingBottom: '120px' }}>
        <div className="content-container">
          <div className="reveal-up" style={{ marginBottom: '80px', maxWidth: '800px' }}>
            <h2 className="font-serif-display" style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 300, color: '#ffffff', marginBottom: '24px' }}>Our Origin</h2>
            <p className="font-sans-body" style={{ fontSize: '16px', lineHeight: 1.9, color: 'rgba(255,255,255,0.75)', marginBottom: '20px' }}>
              Praxis began as ATAC — Arizonans for Transparency and Accountability in Corrections — focused on prison oversight. In 2025, the organization rebranded as Praxis Initiative to reflect broader work across independent oversight, criminal legal system reform, skills training for returning citizens, and arts in prison programming.
            </p>
          </div>

          <div className="reveal-up" style={{ marginBottom: '80px', padding: '48px', background: 'rgba(0,140,140,0.06)', borderLeft: '3px solid #008C8C', maxWidth: '800px' }}>
            <h2 className="font-serif-display" style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 300, color: '#ffffff', marginBottom: '20px' }}>What Praxis Means</h2>
            <p className="font-sans-body" style={{ fontSize: '16px', lineHeight: 1.9, color: 'rgba(255,255,255,0.75)' }}>
              Praxis is the connection between reflection and action: turning lived experience, analysis, and strategy into real-world change. It is the practice of applying what you know from direct experience to create meaningful, lasting reform.
            </p>
          </div>

          <div className="reveal-up" style={{ marginBottom: '100px' }}>
            <h2 className="font-serif-display" style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 300, color: '#ffffff', marginBottom: '40px' }}>Leadership</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '60px', alignItems: 'start' }} className="bio-grid">
              <div>
                <img src="/images/john-fabricius.jpg" alt="John Fabricius" style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', borderRadius: '4px' }} />
              </div>
              <div>
                <h3 className="font-serif-display" style={{ fontSize: '28px', fontWeight: 400, color: '#ffffff', marginBottom: '8px' }}>John Fabricius</h3>
                <p className="font-mono-data" style={{ fontSize: '12px', letterSpacing: '0.15em', color: '#008C8C', textTransform: 'uppercase', marginBottom: '24px' }}>Co-Founder & Executive Director</p>
                <div className="font-sans-body" style={{ fontSize: '15px', lineHeight: 1.9, color: 'rgba(255,255,255,0.75)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <p>John Fabricius is the Co-Founder and Executive Director of Praxis Initiative, a 100% system-impacted nonprofit transforming Arizona's criminal legal system through independent prison oversight, sentencing reform, drug policy advocacy, and civic training for returning citizens.</p>
                  <p>Born in Phoenix, John served 15 years in Arizona state and contracted prisons across multiple complexes and out-of-state facilities. During incarceration, he earned a paralegal degree, supported post-conviction and civil rights litigation, and created a music education program that continues inside ADCRR facilities.</p>
                  <p>After release, John worked in civil rights legal support, digital organizing, and legislative campaign strategy. From 2022 to 2024, he served as a Senior Digital and Legislative Campaigner at Dream.Org, supporting reform campaigns across multiple states and federal efforts. In Arizona, he helped lead campaigns for Home Confinement and Independent Prison Oversight.</p>
                  <p>In 2025, John and a bipartisan coalition helped pass SB 1507, creating Arizona's Office of Correctional Oversight. Today, he leads Praxis Initiative full-time, combining lived experience, legal analysis, coalition strategy, and public education to advance transparency, accountability, and second chances.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="reveal-up" style={{ marginBottom: '100px' }}>
            <h2 className="font-serif-display" style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 300, color: '#ffffff', marginBottom: '40px' }}>Our Team</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
              {team.map((member) => (
                <div key={member.name} style={{ padding: '28px', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '4px' }}>
                  <h4 className="font-serif-display" style={{ fontSize: '17px', fontWeight: 400, color: '#ffffff', marginBottom: '8px' }}>{member.name}</h4>
                  <p className="font-sans-body" style={{ fontSize: '13px', lineHeight: 1.6, color: 'rgba(255,255,255,0.55)' }}>{member.role}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal-up" style={{ marginBottom: '100px' }}>
            <h2 className="font-serif-display" style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 300, color: '#ffffff', marginBottom: '40px' }}>Our Values</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              {values.map((value) => (
                <div key={value} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '20px', background: 'rgba(255,255,255,0.10)', borderRadius: '4px' }}>
                  <CheckCircle size={20} style={{ color: '#008C8C', flexShrink: 0, marginTop: '2px' }} />
                  <span className="font-sans-body" style={{ fontSize: '15px', color: 'rgba(255,255,255,0.8)' }}>{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal-up" style={{ textAlign: 'center', padding: '60px 0' }}>
            <h2 className="font-serif-display" style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 300, color: '#ffffff', marginBottom: '24px' }}>Partner With Praxis</h2>
            <Link to="/contact" className="btn-praxis-solid">Contact Us <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
