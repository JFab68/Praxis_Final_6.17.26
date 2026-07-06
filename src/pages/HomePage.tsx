import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Eye, Scale, Users, Music } from 'lucide-react';
import PhilosophyCarousel from '../sections/PhilosophyCarousel';
import MediumsGlossary from '../sections/MediumsGlossary';
import PageQuote from '../components/PageQuote';
import SEOHead from '../components/SEOHead';

gsap.registerPlugin(ScrollTrigger);

/* ─── Hero Section ─── */
function HeroSection() {
  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        height: 'auto',
        minHeight: '100vh',
        paddingTop: '100px',
        zIndex: 1,
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          alignItems: 'center',
          padding: '10px 6vw 0',
          gap: '6vw',
          width: '100%',
          maxWidth: '1400px',
        }}
        className="hero-grid"
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h1
            className="font-serif-display"
            style={{
              fontSize: 'clamp(42px, 6vw, 96px)',
              fontWeight: 300,
              color: '#ffffff',
              letterSpacing: '0.12em',
              textShadow: '0 2px 24px rgba(0,0,0,0.45)',
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            PRAXIS
            <br />
            INITIATIVE
          </h1>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            textAlign: 'left',
            maxWidth: '480px',
          }}
        >
          <p
            className="font-mono-data"
            style={{
              fontSize: '11px',
              letterSpacing: '0.3em',
              color: 'rgba(255,255,255,0.75)',
              textTransform: 'uppercase',
              marginBottom: '18px',
              textShadow: '0 2px 24px rgba(0,0,0,0.45)',
            }}
          >
            Arizona Criminal Legal System Reform
          </p>
          <h2
            className="font-serif-display"
            style={{
              fontSize: 'clamp(22px, 2.6vw, 40px)',
              fontWeight: 300,
              lineHeight: 1.25,
              color: '#ffffff',
              wordBreak: 'keep-all',
              marginBottom: '24px',
              textShadow: '0 2px 24px rgba(0,0,0,0.45)',
            }}
          >
            System-Impacted Leadership
            <br />
            Transforming Arizona's
            <br />
            Criminal Legal System
          </h2>
          <p
            className="font-sans-body"
            style={{
              fontSize: '15px',
              lineHeight: 1.9,
              color: 'rgba(255,255,255,0.75)',
              fontWeight: 300,
              marginBottom: '22px',
              textShadow: '0 2px 24px rgba(0,0,0,0.45)',
            }}
          >
            Praxis Initiative advances independent prison oversight, criminal legal system reform,
            skills training for returning citizens, and arts programming inside Arizona prisons.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/donate" className="btn-praxis-solid">Donate</Link>
            <Link to="/contact" className="btn-praxis">Join the Movement</Link>
          </div>
          <p
            className="font-mono-data"
            style={{
              fontSize: '10px',
              letterSpacing: '0.2em',
              color: 'rgba(255,255,255,0.5)',
              textTransform: 'uppercase',
              marginTop: '18px',
              textShadow: '0 2px 24px rgba(0,0,0,0.45)',
            }}
          >
            100% system-impacted. Arizona-rooted. Policy-driven.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
            text-align: center !important;
          }
          .hero-grid > div:last-child {
            align-items: center !important;
            text-align: center !important;
            max-width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ─── Impact Statement ─── */
function ImpactStatement() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll('.reveal-up'),
        { y: 30 },
        {
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none none' },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        zIndex: 2,
        background: 'rgba(5, 10, 15, 0.85)',
        backdropFilter: 'blur(8px)',
        padding: '100px 0',
      }}
    >
      <div className="content-container-narrow" style={{ textAlign: 'center' }}>
        <p
          className="reveal-up font-sans-body"
          style={{
            fontSize: 'clamp(18px, 2.2vw, 24px)',
            lineHeight: 1.9,
            color: 'rgba(255,255,255,0.85)',
            fontWeight: 300,
            marginBottom: '48px',
          }}
        >
          Praxis Initiative exists because the people closest to incarceration, reentry, prosecution,
          sentencing, and prison conditions understand the failures of the system in ways no report can
          fully capture. We turn that experience into policy, public education, coalition power, and
          practical reform.
        </p>
        <div className="reveal-up" style={{ position: 'relative', padding: '32px 0' }}>
          <div style={{ width: '40px', height: '1px', background: 'rgba(0,140,140,0.6)', margin: '0 auto 32px' }} />
          <p className="font-serif-display" style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 300, lineHeight: 1.6, color: '#ffffff', fontStyle: 'italic', marginBottom: '16px', maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto' }}>
            "The arc of the moral universe bends toward justice, but it needs hands that have been there to pull it."
          </p>
          <p className="font-sans-body" style={{ fontSize: '14px', letterSpacing: '0.15em', color: 'rgba(0,140,140,0.8)', textTransform: 'uppercase' }}>
            — Praxis Initiative
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─── Core Programs Section ─── */
function CorePrograms() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll('.program-card'),
        { y: 40 },
        {
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none none' },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const programs = [
    { icon: <Eye size={26} />, title: 'Independent Oversight of ADCRR', desc: 'We helped lead the campaign to create Arizona\'s Office of Correctional Oversight. Now we ensure it is funded, independent, and effective.', path: '/oversight', accent: '#008C8C' },
    { icon: <Scale size={26} />, title: 'Criminal Legal System Reform', desc: 'Sentencing reform, reentry, probation and parole reform, drug policy, and broader legislative advocacy across the criminal legal system.', path: '/policy', accent: '#B088D8' },
    { icon: <Users size={26} />, title: 'Skills Training for Returning Citizens', desc: 'Digital literacy, civic advocacy, and AI training to build opportunity, workforce readiness, and civic engagement.', path: '/training', accent: '#008C8C' },
    { icon: <Music size={26} />, title: 'Arts in Prison', desc: 'Music, movement, creativity, and disciplined practice help people build identity, connection, emotional regulation, and purpose.', path: '/arts', accent: '#B088D8' },
  ];

  return (
    <section ref={sectionRef} style={{ position: 'relative', zIndex: 2, background: '#0A1118', padding: '100px 0' }}>
      <div className="content-container">
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p className="eyebrow-label" style={{ marginBottom: '16px' }}>Our Programs</p>
          <h2 className="font-serif-display" style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 300, color: '#ffffff', lineHeight: 1.2 }}>
            Four Pillars of Reform
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }} className="programs-grid">
          {programs.map((program) => (
            <Link
              key={program.title}
              to={program.path}
              className="program-card"
              style={{
                display: 'block',
                padding: '32px 24px',
                background: '#111820',
                border: '1px solid rgba(255,255,255,0.15)',
                borderTop: '3px solid ' + program.accent,
                borderRadius: '6px',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                opacity: 1,
                visibility: 'visible',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#1a2330'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#111820'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <div style={{ color: program.accent, marginBottom: '16px' }}>{program.icon}</div>
              <h3 className="font-serif-display" style={{ fontSize: '17px', fontWeight: 400, color: '#ffffff', marginBottom: '10px', lineHeight: 1.3 }}>{program.title}</h3>
              <p className="font-sans-body" style={{ fontSize: '13px', lineHeight: 1.7, color: 'rgba(255,255,255,0.72)', marginBottom: '16px' }}>{program.desc}</p>
              <span className="font-sans-body" style={{ fontSize: '11px', letterSpacing: '0.12em', color: program.accent, textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                Learn More <ArrowRight size={12} />
              </span>
            </Link>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 1024px) and (min-width: 769px) {
          .programs-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) { .programs-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

/* ─── Oversight Highlight ─── */
function OversightHighlight() {
  const sectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll('.reveal-up'),
        { y: 30 },
        { y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none none' } }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{ position: 'relative', zIndex: 2, background: 'linear-gradient(180deg, #0A1118 0%, #050A0F 100%)', padding: '100px 0' }}>
      <div className="content-container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }} className="oversight-grid">
          <div>
            <p className="reveal-up eyebrow-label" style={{ marginBottom: '16px', color: '#008C8C' }}>Priority Campaign</p>
            <h2 className="reveal-up font-serif-display" style={{ fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 300, color: '#ffffff', lineHeight: 1.2, marginBottom: '20px' }}>
              Arizona Needs Independent Prison Oversight
            </h2>
            <p className="reveal-up font-sans-body" style={{ fontSize: '15px', lineHeight: 1.8, color: 'rgba(255,255,255,0.78)',marginBottom: '24px' }}>
              For years, families, incarcerated people, correctional staff, advocates, attorneys, and lawmakers have raised alarms about conditions inside Arizona prisons. Praxis Initiative helped lead the campaign that created Arizona's Office of Correctional Oversight. Now the work is making sure it is funded, implemented, independent, and effective.
            </p>
            <Link to="/oversight" className="reveal-up btn-praxis">Support Oversight</Link>
          </div>
          <div className="reveal-up">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                { value: '$1.5M', label: 'to establish and operate the Office of Correctional Oversight in its first year' },
                { value: '$1.8B', label: 'Arizona spends approximately this annually on corrections' },
                { value: '$1 : $1,200', label: 'For every $1,200 spent on corrections, $1 would support independent oversight' },
              ].map((stat) => (
                <div key={stat.label} style={{ padding: '24px 20px', background: '#111820', borderLeft: '3px solid #008C8C' }}>
                  <p className="font-serif-display" style={{ fontSize: 'clamp(24px, 2.5vw, 36px)', fontWeight: 400, color: '#ffffff', marginBottom: '6px', lineHeight: 1.1 }}>{stat.value}</p>
                  <p className="font-sans-body" style={{ fontSize: '12px', lineHeight: 1.6, color: 'rgba(255,255,255,0.6)' }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 1024px) {
          .oversight-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}

/* ─── Why Praxis ─── */
function WhyPraxis() {
  const sectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll('.reveal-up'),
        { y: 30 },
        { y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none none' } }
      );
    });
    return () => ctx.revert();
  }, []);

  const reasons = [
    { title: 'We know the system from the inside.', desc: 'Praxis is led by people directly impacted by incarceration, reentry, overdose, family separation, and criminal legal system harm.' },
    { title: 'We build bipartisan reform coalitions.', desc: 'We work across political lines, bringing together lawmakers, advocates, families, attorneys, and directly impacted people.' },
    { title: 'We translate lived experience into durable policy.', desc: 'The organization combines lived experience with policy advocacy, legal analysis, coalition organizing, public education, and legislative strategy.' },
  ];

  return (
    <section ref={sectionRef} style={{ position: 'relative', zIndex: 2, background: '#050A0F', padding: '100px 0' }}>
      <div className="content-container">
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p className="eyebrow-label" style={{ marginBottom: '16px' }}>Why Praxis</p>
          <h2 className="font-serif-display" style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 300, color: '#ffffff', lineHeight: 1.2 }}>
            Lived Experience. Legal Knowledge.<br />Legislative Strategy.
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }} className="why-grid">
          {reasons.map((reason) => (
            <div key={reason.title} className="reveal-up" style={{ padding: '36px 28px', borderTop: '2px solid #008C8C', background: '#111820' }}>
              <h3 className="font-serif-display" style={{ fontSize: '18px', fontWeight: 400, color: '#ffffff', marginBottom: '12px', lineHeight: 1.4 }}>{reason.title}</h3>
              <p className="font-sans-body" style={{ fontSize: '14px', lineHeight: 1.7, color: 'rgba(255,255,255,0.72)' }}>{reason.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 1024px) and (min-width: 769px) { .why-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 768px) { .why-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

/* ─── Leadership Section ─── */
function LeadershipSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll('.reveal-up'),
        { y: 30 },
        { y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none none' } }
      );
    });
    return () => ctx.revert();
  }, []);

  const team = [
    { name: 'J Alexandria Hunt-Garcia', role: 'Community health, drug policy, and system-change leadership' },
    { name: 'Jessica Johnson', role: 'Legislative reform and capital mitigation experience' },
    { name: 'Mindi Kraicinski', role: 'Retired corrections officer providing operational insight' },
    { name: 'Sherri Skates', role: 'Community organizing and family-impact storytelling' },
  ];

  return (
    <section ref={sectionRef} style={{ position: 'relative', zIndex: 2, background: '#0A1118', padding: '100px 0' }}>
      <div className="content-container">
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p className="reveal-up eyebrow-label" style={{ marginBottom: '16px' }}>Leadership</p>
          <h2 className="reveal-up font-serif-display" style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 300, color: '#ffffff', lineHeight: 1.2 }}>
            Led by People Who Know the System
          </h2>
        </div>
        <div className="reveal-up" style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '48px', alignItems: 'start', marginBottom: '64px', padding: '40px', background: '#111820', borderRadius: '6px' }}>
          <div>
            <img src="/images/john-fabricius.jpg" alt="John Fabricius" loading="lazy" style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', borderRadius: '4px', filter: 'brightness(1.2) contrast(1.05)' }} />
          </div>
          <div>
            <h3 className="font-serif-display" style={{ fontSize: '24px', fontWeight: 400, color: '#ffffff', marginBottom: '6px' }}>John Fabricius</h3>
            <p className="font-mono-data" style={{ fontSize: '11px', letterSpacing: '0.15em', color: '#008C8C', textTransform: 'uppercase', marginBottom: '20px' }}>Co-Founder & Executive Director</p>
            <p className="font-sans-body" style={{ fontSize: '14px', lineHeight: 1.8, color: 'rgba(255,255,255,0.78)' }}>
              John Fabricius is the Co-Founder and Executive Director of Praxis Initiative. After serving 15 years in Arizona state and contracted prisons, he became a paralegal, campaign strategist, coalition leader, and one of the primary architects of Arizona's independent prison oversight effort. From 2022 to 2024, he served as a Senior Digital and Legislative Campaigner at Dream.Org. In 2025, John and a bipartisan coalition helped pass SB 1507, creating Arizona's Office of Correctional Oversight. Today, he leads Praxis Initiative full-time.
            </p>
            <Link to="/about" style={{ fontSize: '12px', letterSpacing: '0.1em', color: '#008C8C', textTransform: 'uppercase', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '12px' }}>
              Full Bio <ArrowRight size={12} />
            </Link>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }} className="team-grid">
          {team.map((member) => (
            <div key={member.name} className="reveal-up" style={{ padding: '24px', background: '#111820', border: '1px solid rgba(255,255,255,0.18)', borderRadius: '4px' }}>
              <h4 className="font-serif-display" style={{ fontSize: '15px', fontWeight: 400, color: '#ffffff', marginBottom: '6px' }}>{member.name}</h4>
              <p className="font-sans-body" style={{ fontSize: '12px', lineHeight: 1.6, color: 'rgba(255,255,255,0.55)' }}>{member.role}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 1024px) and (min-width: 769px) {
          .team-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) { .team-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

/* ─── Donation Section ─── */
function DonationSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll('.reveal-up'),
        { y: 30 },
        { y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none none' } }
      );
    });
    return () => ctx.revert();
  }, []);

  const amounts = ['$25', '$50', '$100', '$250', '$500'];

  return (
    <section ref={sectionRef} style={{ position: 'relative', zIndex: 2, background: '#800000', padding: '100px 0' }}>
      <div className="content-container-narrow" style={{ textAlign: 'center' }}>
        <h2 className="reveal-up font-serif-display" style={{ fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 300, color: '#ffffff', lineHeight: 1.2, marginBottom: '20px' }}>
          Fund Reform Led by People Who Have Lived It
        </h2>
        <p className="reveal-up font-sans-body" style={{ fontSize: '15px', lineHeight: 1.8, color: 'rgba(255,255,255,0.85)', marginBottom: '40px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
          Your support helps Praxis Initiative train returning citizens, advance independent oversight, produce public education, support families, advocate for policy change, and build a stronger movement for transparency and accountability.
        </p>
        <div className="reveal-up" style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '28px' }}>
          {amounts.map((amount) => (
            <Link key={amount} to="/donate" style={{ padding: '12px 24px', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '40px', color: '#ffffff', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 500, textDecoration: 'none', transition: 'all 0.3s ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.9)'; e.currentTarget.style.color = '#CC3333'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#ffffff'; }}>{amount}</Link>
          ))}
          <Link to="/donate" style={{ padding: '12px 24px', background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '40px', color: '#ffffff', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 500, textDecoration: 'none', transition: 'all 0.3s ease' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.9)'; e.currentTarget.style.color = '#CC3333'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#ffffff'; }}>Other</Link>
        </div>
        <Link to="/donate" className="reveal-up btn-praxis-solid" style={{ background: '#ffffff', color: '#E05555' }}>Donate Now</Link>
      </div>
    </section>
  );
}

/* ─── Justice Manifesto: US in JUSTICE ─── */
function JusticeManifesto() {
  const sectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll('.reveal-up'),
        { y: 30 },
        { y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none none' } }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        zIndex: 2,
        background: 'linear-gradient(180deg, #050A0F 0%, #0A1118 50%, #050A0F 100%)',
        padding: '100px 0',
        overflow: 'hidden',
      }}
    >
      {/* Subtle background radial glow behind the US */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(0,140,140,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="content-container-narrow" style={{ textAlign: 'center' }}>
        {/* The big visual: J  U S  T I C E with US highlighted */}
        <div className="reveal-up" style={{ marginBottom: '48px' }}>
          <div
            className="font-serif-display"
            style={{
              fontSize: 'clamp(48px, 8vw, 120px)',
              fontWeight: 300,
              letterSpacing: '0.08em',
              color: 'rgba(255,255,255,0.12)',
              lineHeight: 1,
              userSelect: 'none',
              position: 'relative',
              display: 'inline-block',
            }}
          >
            J
            <span style={{
              color: '#ffffff',
              textShadow: '0 0 40px rgba(0,204,204,0.5), 0 0 80px rgba(0,140,140,0.3)',
              display: 'inline-block',
              position: 'relative',
              fontWeight: 400,
            }}>US</span>
            TICE
          </div>
          <div
            style={{
              width: '60px',
              height: '2px',
              background: '#008C8C',
              margin: '24px auto',
            }}
          />
        </div>

        {/* The tagline */}
        <h2
          className="reveal-up font-serif-display"
          style={{
            fontSize: 'clamp(24px, 3vw, 42px)',
            fontWeight: 300,
            color: '#ffffff',
            lineHeight: 1.3,
            marginBottom: '32px',
          }}
        >
          You Can't Have Justice Without Us
        </h2>

        {/* The explanation */}
        <div className="reveal-up" style={{ maxWidth: '720px', margin: '0 auto 40px' }}>
          <p
            className="font-sans-body"
            style={{
              fontSize: '16px',
              lineHeight: 1.9,
              color: 'rgba(255,255,255,0.78)',
              fontWeight: 300,
              marginBottom: '20px',
            }}
          >
            Look at the word <strong style={{ color: '#ffffff', fontWeight: 500 }}>JUSTICE</strong>.
            At its center — literally — is <strong style={{ color: '#00CCCC', fontWeight: 500 }}>US</strong>.
          </p>
          <p
            className="font-sans-body"
            style={{
              fontSize: '16px',
              lineHeight: 1.9,
              color: 'rgba(255,255,255,0.78)',
              fontWeight: 300,
              marginBottom: '20px',
            }}
          >
            This is not a slogan. It's a truth about democracy. Justice is not something
            handed down from above — it is built by and for the people most affected by the system.
            The incarcerated. The returning. The marginalized. The families torn apart. The communities
            over-policed and under-heard.
          </p>
          <p
            className="font-sans-body"
            style={{
              fontSize: '16px',
              lineHeight: 1.9,
              color: 'rgba(255,255,255,0.78)',
              fontWeight: 300,
              marginBottom: '20px',
            }}
          >
            When we say <em style={{ color: 'rgba(255,255,255,0.9)' }}>"no US, no justice,"</em> we are
            not making a selfish demand. We are stating a democratic principle: a system that excludes
            the voices of those it harms cannot produce justice. Remove us from the equation — remove
            the lived experience, the direct knowledge, the moral authority of the impacted — and what
            remains is not justice at all. It's administration. It's procedure. It's the status quo
            wearing a different name.
          </p>
          <p
            className="font-sans-body"
            style={{
              fontSize: '16px',
              lineHeight: 1.9,
              color: 'rgba(255,255,255,0.78)',
              fontWeight: 300,
              marginBottom: '32px',
            }}
          >
            <strong style={{ color: '#ffffff', fontWeight: 500 }}>We the people</strong> — that's who
            the US in JUSTICE represents. In a republic, in a democracy, the people are ultimately in
            charge. And the people closest to the problem are closest to the solution. Unite with us.
            Because without us, there is no justice.
          </p>
        </div>

        <div className="reveal-up" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/about" className="btn-praxis">Read Our Full Philosophy</Link>
          <Link to="/contact" className="btn-praxis">Join the Movement</Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Final CTA ─── */
function FinalCTA() {
  return (
    <section style={{ position: 'relative', zIndex: 2, background: '#050A0F', padding: '100px 0', textAlign: 'center' }}>
      <div className="content-container-narrow">
        <h2 className="font-serif-display" style={{ fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 300, color: '#ffffff', lineHeight: 1.2, marginBottom: '32px' }}>
          Help Build the Next Chapter of Reform in Arizona
        </h2>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/donate" className="btn-praxis-solid">Donate</Link>
          <Link to="/contact" className="btn-praxis">Join the Movement</Link>
          <Link to="/contact" className="btn-praxis">Contact Praxis</Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Main HomePage ─── */
export default function HomePage() {
  return (
    <>
      <SEOHead
        title="Arizona Criminal Legal System Reform"
        description="Praxis Initiative is a 100% system-impacted Arizona nonprofit advancing independent prison oversight, criminal legal system reform, overdose prevention, civic advocacy training, and arts in prison programming."
        path="/"
      />
      <HeroSection />
      <PageQuote
        quote="People closest to the problem are closest to the solution but furthest from power and resources."
        attribution="Glenn E. Martin"
        accentColor="#008C8C"
      />
      <ImpactStatement />
      <JusticeManifesto />
      <PhilosophyCarousel />
      <CorePrograms />
      <OversightHighlight />
      <WhyPraxis />
      <MediumsGlossary />
      <LeadershipSection />
      <DonationSection />
      <FinalCTA />
    </>
  );
}
