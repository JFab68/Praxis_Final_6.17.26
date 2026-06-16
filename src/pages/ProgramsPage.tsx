import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Eye, Scale, Users, Music, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import PageQuote from '../components/PageQuote';

gsap.registerPlugin(ScrollTrigger);

interface Program {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  activities: string[];
  image: string;
  color: string;
}

const programs: Program[] = [
  {
    icon: <Eye size={32} />,
    title: 'Independent Oversight of ADCRR',
    subtitle: 'Accountability Through Transparency',
    description: 'Praxis Initiative helped lead the campaign to create Arizona\'s Office of Correctional Oversight. Our work now focuses on funding, implementation, public education, family engagement, legislative accountability, and ensuring that oversight remains independent, meaningful, and accessible.',
    activities: [
      'Legislative advocacy',
      'Coalition coordination',
      'Public education',
      'Family and community engagement',
      'Oversight implementation monitoring',
      'Policy analysis',
      'Media and public messaging',
    ],
    image: '/images/oversight-spotlight.jpg',
    color: '#008C8C',
  },
  {
    icon: <Scale size={32} />,
    title: 'Criminal Legal System Reform',
    subtitle: 'Systemic Change Across Every Stage',
    description: 'Praxis works to reduce unnecessary incarceration, expand second chances, improve sentencing policy, support home confinement reform, and challenge practices that keep people trapped in cycles of punishment without improving public safety. This work includes drug policy advocacy, overdose prevention, public health approaches to substance use, and broader legislative advocacy across the criminal legal system.',
    activities: [
      'Sentencing reform',
      'Home confinement advocacy',
      'Reentry policy',
      'Probation and parole reform',
      'Drug policy and overdose prevention',
      'Public health approaches to substance use',
      'Legal education',
      'Coalition support',
      'Legislative analysis',
    ],
    image: '/images/advocacy-speaking.jpg',
    color: '#B088D8',
  },
  {
    icon: <Users size={32} />,
    title: 'Skills Training for Returning Citizens',
    subtitle: 'Opportunity, Readiness, and Civic Power',
    description: 'Praxis trains returning citizens to understand government, tell their stories strategically, engage lawmakers, use digital advocacy tools, and participate in public policy without being tokenized. Our training programs are growing quickly and represent a major forward-looking initiative centered on opportunity, workforce readiness, civic engagement, and modern skills.',
    activities: [
      'Digital Literacy for Returning Citizens',
      'Digital Literacy for Returning Citizens age 50+',
      'Core Civics and Advocacy Training',
      'Intro to AI for Returning Citizens',
      'Practical AI for Returning Citizens (advanced)',
      'Storytelling strategy',
      'Public comment training',
      'Coalition participation',
    ],
    image: '/images/civic-training.jpg',
    color: '#008C8C',
  },
  {
    icon: <Music size={32} />,
    title: 'Arts in Prison',
    subtitle: 'Creativity as Rehabilitation',
    description: 'Praxis supports arts programming inside Arizona prisons because music, movement, creativity, and disciplined practice help people build identity, connection, emotional regulation, and purpose. Our flagship programs include Think Motion, led by Dr. Susan Bendix, and the Music Theory Initiative, modeled after a peer-led program founded by John Fabricius during incarceration.',
    activities: [
      'Think Motion — therapeutic movement and creative engagement',
      'Music Theory Initiative — peer-led music education',
      'Tablet-based learning modules',
      'Correspondence education',
      'In-person workshops where possible',
      'Visual arts, writing, theater, and other creative outlets',
      'Inside/outside community connection',
    ],
    image: '/images/arts-music.jpg',
    color: '#B088D8',
  },
];

export default function ProgramsPage() {
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
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: content, start: 'top 80%', toggleActions: 'play none none none' },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div style={{ position: 'relative', zIndex: 2, background: '#050A0F' }}>
      <PageHero
        eyebrow="Our Work"
        title="Programs"
        subtitle="Praxis Initiative operates across four core program areas, each grounded in lived experience and directed toward measurable, durable reform."
        backgroundImage="/images/arizona-landscape.jpg"
        gradientAccent="#008C8C"
      />
      <PageQuote
        quote="Not everything that is faced can be changed, but nothing can be changed until it is faced."
        attribution="James Baldwin"
        accentColor="#008C8C"
      />

      <section ref={contentRef} style={{ paddingBottom: '120px' }}>
        <div className="content-container">
          {programs.map((program, index) => (
            <div
              key={program.title}
              className="reveal-up"
              style={{
                display: 'grid',
                gridTemplateColumns: index % 2 === 0 ? '1fr 1.2fr' : '1.2fr 1fr',
                gap: '60px',
                alignItems: 'center',
                marginBottom: '100px',
                padding: '48px',
                background: 'rgba(255,255,255,0.10)',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
            >
              {index % 2 !== 0 && (
                <div>
                  <img src={program.image} alt={program.title} style={{ width: '100%', aspectRatio: '16/10', objectFit: 'cover', borderRadius: '4px' }} />
                </div>
              )}
              <div>
                <div style={{ color: program.color, marginBottom: '16px' }}>{program.icon}</div>
                <p className="font-mono-data" style={{ fontSize: '11px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '8px' }}>{program.subtitle}</p>
                <h2 className="font-serif-display" style={{ fontSize: 'clamp(22px, 2.5vw, 32px)', fontWeight: 300, color: '#ffffff', marginBottom: '16px', lineHeight: 1.3 }}>{program.title}</h2>
                <p className="font-sans-body" style={{ fontSize: '15px', lineHeight: 1.8, color: 'rgba(255,255,255,0.7)', marginBottom: '24px' }}>{program.description}</p>
                <p className="font-mono-data" style={{ fontSize: '11px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '12px' }}>Key Activities</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, marginBottom: '28px' }}>
                  {program.activities.map((activity) => (
                    <li key={activity} className="font-sans-body" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', padding: '6px 0', paddingLeft: '16px', position: 'relative', borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
                      <span style={{ position: 'absolute', left: 0, color: program.color }}>—</span>{activity}
                    </li>
                  ))}
                </ul>
                <Link
                  to={program.title.includes('Oversight') ? '/oversight' : program.title.includes('Training') ? '/training' : program.title.includes('Arts') ? '/arts' : '/policy'}
                  style={{ fontSize: '13px', letterSpacing: '0.1em', color: program.color, textTransform: 'uppercase', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  Learn More <ArrowRight size={14} />
                </Link>
              </div>
              {index % 2 === 0 && (
                <div>
                  <img src={program.image} alt={program.title} style={{ width: '100%', aspectRatio: '16/10', objectFit: 'cover', borderRadius: '4px' }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
