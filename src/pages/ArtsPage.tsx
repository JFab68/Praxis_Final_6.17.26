import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Heart, Users, Brain, Sparkles, Music, Move } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import PageQuote from '../components/PageQuote';
import SEOHead from '../components/SEOHead';

gsap.registerPlugin(ScrollTrigger);

const outcomes = [
  { icon: <Brain size={24} />, title: 'Emotional Regulation', desc: 'Creative expression provides healthy outlets for processing complex emotions.' },
  { icon: <Sparkles size={24} />, title: 'Positive Identity', desc: 'Arts programming helps individuals develop identity beyond their incarceration.' },
  { icon: <Users size={24} />, title: 'Community Connection', desc: 'Collaborative art builds relationships and reduces isolation.' },
  { icon: <Heart size={24} />, title: 'Hope and Discipline', desc: 'Dedicated practice instills discipline and cultivates hope for the future.' },
];

export default function ArtsPage() {
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
      <SEOHead title="Arts in Prison" description="Praxis Initiative supports music, movement, and creative programming inside Arizona prisons — helping people build identity, connection, emotional regulation, and purpose." path="/arts"
        schema={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What arts programming does Praxis Initiative offer in Arizona prisons?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Praxis Initiative supports music, movement, and creative programming inside Arizona prisons. These programs include music education, contemporary dance and movement, creative writing, and visual arts. Arts programming helps incarcerated people build identity, connection, emotional regulation, and purpose."
              }
            },
            {
              "@type": "Question",
              "name": "Why are arts programs important in prisons?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Arts programming inside prisons helps people build identity, connection, emotional regulation, and purpose through disciplined creative practice. Research shows that arts programs reduce behavioral infractions, improve mental health outcomes, and support successful reentry by developing skills in self-expression, collaboration, and perseverance."
              }
            },
            {
              "@type": "Question",
              "name": "How can I support arts in prison programming?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "You can support arts in prison programming by donating to Praxis Initiative, volunteering as an arts instructor or mentor, donating musical instruments and art supplies, and advocating for expanded arts programming in correctional facilities. Contact Praxis for more information about how to get involved."
              }
            }
          ]
        }}
      />
      <PageHero
        eyebrow="Arts in Prison"
        title="Creativity Is Part of Rehabilitation"
        subtitle="Praxis supports arts programming inside Arizona prisons because music, movement, creativity, and disciplined practice help people build identity, connection, emotional regulation, and purpose."
        backgroundImage="/images/arts-music.jpg"
        gradientAccent="#B088D8"
      />
      <PageQuote
        quote="It is never too late to be what you might have been."
        attribution="George Eliot"
        accentColor="#B088D8"
      />

      <section ref={contentRef} style={{ paddingBottom: '120px' }}>
        <div className="content-container">
          {/* Why Arts Matter */}
          <div className="reveal-up" style={{ marginBottom: '80px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }} className="arts-grid">
              <img src="/images/arts-music.jpg" alt="Music education in prison" loading="lazy" style={{ width: '100%', aspectRatio: '16/10', objectFit: 'cover', borderRadius: '4px' }} />
              <div>
                <h2 className="font-serif-display" style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 300, color: '#ffffff', marginBottom: '20px' }}>Why Arts Inside Matter</h2>
                <p className="font-sans-body" style={{ fontSize: '15px', lineHeight: 1.9, color: 'rgba(255,255,255,0.75)', marginBottom: '20px' }}>
                  Decades of research show that arts programming in correctional facilities reduces violence, improves mental health, strengthens family connections, and reduces recidivism. Arts are not a luxury — they are a critical component of rehabilitation.
                </p>
                <p className="font-sans-body" style={{ fontSize: '15px', lineHeight: 1.9, color: 'rgba(255,255,255,0.75)' }}>
                  We support constructive, meaningful arts programming of many kinds inside correctional settings. Visual arts, music, writing, movement, theater, and other creative outlets consistently produce benefits in behavior, morale, learning, and rehabilitation. We want to support any serious program that expands human potential.
                </p>
              </div>
            </div>
          </div>

          {/* Think Motion */}
          <div className="reveal-up" style={{ marginBottom: '80px' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '60px',
                alignItems: 'center',
                padding: '48px',
                background: 'rgba(255,255,255,0.10)',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <Move size={28} style={{ color: '#008C8C' }} />
                  <span className="font-mono-data" style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#008C8C', textTransform: 'uppercase' }}>Flagship Program</span>
                </div>
                <h2 className="font-serif-display" style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 300, color: '#ffffff', marginBottom: '16px' }}>Think Motion</h2>
                <p className="font-sans-body" style={{ fontSize: '15px', lineHeight: 1.9, color: 'rgba(255,255,255,0.75)', marginBottom: '20px' }}>
                  Think Motion is a flagship therapeutic movement and creative engagement program led by Dr. Susan Bendix. For the last three years, Dr. Bendix has successfully led this program at Perryville Prison, delivering kinetic movement, therapeutic arts, and creative engagement to incarcerated participants.
                </p>
                <p className="font-sans-body" style={{ fontSize: '15px', lineHeight: 1.9, color: 'rgba(255,255,255,0.75)', marginBottom: '20px' }}>
                  The program has been well received and has shown meaningful results in emotional regulation, stress management, and community building. Praxis Initiative proudly sponsors and partners on Think Motion and intends to continue supporting its expansion.
                </p>
              </div>
              <img src="/images/think-motion.jpg" alt="Think Motion movement class" loading="lazy" style={{ width: '100%', aspectRatio: '16/10', objectFit: 'cover', borderRadius: '4px' }} />
            </div>
          </div>

          {/* Music Theory Initiative */}
          <div className="reveal-up" style={{ marginBottom: '80px' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '60px',
                alignItems: 'center',
                padding: '48px',
                background: 'rgba(91,60,136,0.04)',
                borderRadius: '8px',
                border: '1px solid rgba(91,60,136,0.12)',
              }}
            >
              <img src="/images/music-theory.jpg" alt="Music Theory Initiative" loading="lazy" style={{ width: '100%', aspectRatio: '16/10', objectFit: 'cover', borderRadius: '4px' }} />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <Music size={28} style={{ color: '#B088D8' }} />
                  <span className="font-mono-data" style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#B088D8', textTransform: 'uppercase' }}>Major Initiative</span>
                </div>
                <h2 className="font-serif-display" style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 300, color: '#ffffff', marginBottom: '16px' }}>Music Theory Initiative</h2>
                <p className="font-sans-body" style={{ fontSize: '15px', lineHeight: 1.9, color: 'rgba(255,255,255,0.75)', marginBottom: '20px' }}>
                  The Music Theory Initiative is modeled after the music theory program founded and taught by John Fabricius while incarcerated. The program helped participants develop discipline, confidence, communication, critical thinking, and real musical skill.
                </p>
                <p className="font-sans-body" style={{ fontSize: '15px', lineHeight: 1.9, color: 'rgba(255,255,255,0.75)', marginBottom: '20px' }}>
                  What made it especially powerful was that students eventually became teachers. A handful of committed learners mastered the material, then began teaching others in their housing units and communities — creating a multiplier effect where education spread peer-to-peer inside prison environments.
                </p>
                <p className="font-sans-body" style={{ fontSize: '15px', lineHeight: 1.9, color: 'rgba(255,255,255,0.75)' }}>
                  We are scaling this program through tablet-based learning modules, correspondence education, in-person workshops where possible, peer-led teaching models, and structured creative development tracks. This is not just music education. It is leadership development, emotional growth, discipline, communication, mentorship, and skill-building delivered through art.
                </p>
              </div>
            </div>
          </div>

          {/* Broader Arts Support */}
          <div className="reveal-up" style={{ marginBottom: '80px' }}>
            <div style={{ padding: '48px', background: 'rgba(255,255,255,0.10)', borderRadius: '8px', borderLeft: '3px solid #008C8C' }}>
              <h2 className="font-serif-display" style={{ fontSize: 'clamp(22px, 2.5vw, 30px)', fontWeight: 300, color: '#ffffff', marginBottom: '16px' }}>Broader Arts in Prison Support</h2>
              <p className="font-sans-body" style={{ fontSize: '15px', lineHeight: 1.9, color: 'rgba(255,255,255,0.75)' }}>
                We support constructive, meaningful arts programming of many kinds inside correctional settings. Visual arts, music, writing, movement, theater, and other creative outlets consistently produce benefits in behavior, morale, learning, and rehabilitation. We want to support any serious program that expands human potential — because creativity is part of rehabilitation, and everyone deserves access to the tools that help them grow.
              </p>
            </div>
          </div>

          {/* Program Outcomes */}
          <div className="reveal-up" style={{ marginBottom: '80px' }}>
            <h2 className="font-serif-display" style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 300, color: '#ffffff', marginBottom: '40px', textAlign: 'center' }}>Program Outcomes</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
              {outcomes.map((outcome) => (
                <div key={outcome.title} style={{ padding: '32px 24px', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '4px', textAlign: 'center' }}>
                  <div style={{ color: '#008C8C', marginBottom: '16px' }}>{outcome.icon}</div>
                  <h3 className="font-serif-display" style={{ fontSize: '18px', fontWeight: 400, color: '#ffffff', marginBottom: '10px' }}>{outcome.title}</h3>
                  <p className="font-sans-body" style={{ fontSize: '13px', lineHeight: 1.6, color: 'rgba(255,255,255,0.6)' }}>{outcome.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="reveal-up" style={{ textAlign: 'center', padding: '60px 0' }}>
            <h2 className="font-serif-display" style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 300, color: '#ffffff', marginBottom: '24px' }}>Support Arts Programming Inside Arizona Prisons</h2>
            <Link to="/donate" className="btn-praxis-solid">Donate Now <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
