import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Monitor, Cpu, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import PageQuote from '../components/PageQuote';

gsap.registerPlugin(ScrollTrigger);

const programs = [
  {
    icon: <Monitor size={28} />,
    title: 'Digital Literacy for Returning Citizens',
    description: 'A foundational program that equips returning citizens with essential digital skills — from basic computer operation and internet navigation to email, online forms, video conferencing, and digital advocacy platforms. We meet participants where they are and build confidence through hands-on practice.',
    outcomes: [
      'Navigate the internet safely and effectively',
      'Use email, forms, and video conferencing',
      'Access government resources and services online',
      'Build confidence with modern technology',
    ],
    image: '/images/training-digital.jpg',
    color: '#008C8C',
  },
  {
    icon: <Monitor size={28} />,
    title: 'Digital Literacy for Returning Citizens — Age 50+',
    description: 'A specialized cohort designed for older adults who may be encountering modern technology for the first time after long-term incarceration. This program moves at a deliberate pace with extra support, patience, and peer mentorship to ensure no one is left behind.',
    outcomes: [
      'Patient, paced instruction for older learners',
      'Peer mentorship and mutual support',
      'Extra time on foundational skills',
      'Connection to age-appropriate resources',
    ],
    image: '/images/training-senior.jpg',
    color: '#B088D8',
  },
  {
    icon: <GraduationCap size={28} />,
    title: 'Core Civics and Advocacy Training',
    description: 'Our flagship civic education program trains returning citizens to understand government, tell their stories strategically, engage lawmakers, use digital advocacy tools, and participate in public policy without being tokenized.',
    outcomes: [
      'How Arizona government works',
      'How a bill becomes law',
      'How to contact and testify before lawmakers',
      'Strategic personal storytelling',
      'How to avoid tokenization',
      'How to lead with credibility',
    ],
    image: '/images/civic-training.jpg',
    color: '#008C8C',
  },
  {
    icon: <Cpu size={28} />,
    title: 'Intro to AI for Returning Citizens',
    description: 'An accessible introduction to artificial intelligence tools and concepts. Participants learn what AI is, how it is being used in the workforce, and how to begin using AI tools responsibly for job searching, communication, and personal projects.',
    outcomes: [
      'Understanding what AI is and how it works',
      'Hands-on experience with accessible AI tools',
      'Using AI for job searching and resume building',
      'Responsible and ethical AI use',
    ],
    image: '/images/training-ai.jpg',
    color: '#B088D8',
  },
  {
    icon: <Cpu size={28} />,
    title: 'Practical AI for Returning Citizens',
    description: 'Advanced training for participants ready to go deeper. This program covers practical applications of AI in the workplace, creative industries, entrepreneurship, and civic engagement. Participants build real projects and develop marketable skills.',
    outcomes: [
      'Advanced AI tool proficiency',
      'Workplace and entrepreneurial applications',
      'Building real projects with AI assistance',
      'Understanding AI in the job market',
      'Portfolio development',
    ],
    image: '/images/training-ai.jpg',
    color: '#008C8C',
  },
];

export default function TrainingPage() {
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
      <PageHero
        eyebrow="Training Programs"
        title="Skills Training for Returning Citizens"
        subtitle="Civic power should not be reserved for people who already know the system. Our training programs are growing quickly and represent a major forward-looking initiative centered on opportunity, workforce readiness, civic engagement, and modern skills."
        backgroundImage="/images/civic-training.jpg"
        gradientAccent="#B088D8"
      />
      <PageQuote
        quote="Each of us is more than the worst thing we've ever done."
        attribution="Bryan Stevenson"
        accentColor="#B088D8"
      />

      <section ref={contentRef} style={{ paddingBottom: '120px' }}>
        <div className="content-container">
          {/* Overview */}
          <div className="reveal-up" style={{ marginBottom: '80px', maxWidth: '800px' }}>
            <p className="font-sans-body" style={{ fontSize: '16px', lineHeight: 1.9, color: 'rgba(255,255,255,0.75)' }}>
              Praxis trains returning citizens to understand government, tell their stories strategically,
              engage lawmakers, use digital advocacy tools, and participate in public policy without being
              tokenized. We emphasize older adults, people returning after long incarceration, and people
              excluded from modern tools.
            </p>
          </div>

          {/* Training Programs */}
          {programs.map((program, index) => (
            <div
              key={program.title}
              className="reveal-up"
              style={{
                display: 'grid',
                gridTemplateColumns: index % 2 === 0 ? '1fr 1.2fr' : '1.2fr 1fr',
                gap: '60px',
                alignItems: 'center',
                marginBottom: '80px',
                padding: '48px',
                background: 'rgba(255,255,255,0.10)',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
            >
              {index % 2 !== 0 && (
                <div>
                  <img
                    src={program.image}
                    alt={program.title}
                    style={{
                      width: '100%',
                      aspectRatio: '16/10',
                      objectFit: 'cover',
                      borderRadius: '4px',
                    }}
                  />
                </div>
              )}

              <div>
                <div style={{ color: program.color, marginBottom: '16px' }}>
                  {program.icon}
                </div>
                <h2
                  className="font-serif-display"
                  style={{
                    fontSize: 'clamp(22px, 2.5vw, 32px)',
                    fontWeight: 300,
                    color: '#ffffff',
                    marginBottom: '16px',
                    lineHeight: 1.3,
                  }}
                >
                  {program.title}
                </h2>
                <p
                  className="font-sans-body"
                  style={{
                    fontSize: '15px',
                    lineHeight: 1.8,
                    color: 'rgba(255,255,255,0.7)',
                    marginBottom: '24px',
                  }}
                >
                  {program.description}
                </p>

                <p
                  className="font-mono-data"
                  style={{
                    fontSize: '11px',
                    letterSpacing: '0.2em',
                    color: 'rgba(255,255,255,0.4)',
                    textTransform: 'uppercase',
                    marginBottom: '12px',
                  }}
                >
                  What Participants Learn
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {program.outcomes.map((outcome) => (
                    <li
                      key={outcome}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        padding: '8px 0',
                        borderBottom: '1px solid rgba(255,255,255,0.12)',
                      }}
                    >
                      <CheckCircle size={14} style={{ color: program.color, flexShrink: 0, marginTop: '3px' }} />
                      <span className="font-sans-body" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.65)' }}>
                        {outcome}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {index % 2 === 0 && (
                <div>
                  <img
                    src={program.image}
                    alt={program.title}
                    style={{
                      width: '100%',
                      aspectRatio: '16/10',
                      objectFit: 'cover',
                      borderRadius: '4px',
                    }}
                  />
                </div>
              )}
            </div>
          ))}

          {/* CTA */}
          <div className="reveal-up" style={{ textAlign: 'center', padding: '60px 0' }}>
            <h2
              className="font-serif-display"
              style={{
                fontSize: 'clamp(24px, 3vw, 36px)',
                fontWeight: 300,
                color: '#ffffff',
                marginBottom: '24px',
              }}
            >
              Bring This Training to Your Community
            </h2>
            <Link to="/contact" className="btn-praxis-solid">
              Request Training <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
