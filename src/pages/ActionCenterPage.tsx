import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import PageQuote from '../components/PageQuote';
import ActionNetworkEmbed from '../components/ActionNetworkEmbed';

gsap.registerPlugin(ScrollTrigger);

const petitions = [
  {
    id: 'can-petition-area-sign-now-let-arizonas-non-violent-offenders-work-support-their-families-and-come-home',
    scriptSrc: 'https://actionnetwork.org/widgets/v6/petition/sign-now-let-arizonas-non-violent-offenders-work-support-their-families-and-come-home?format=js&source=widget',
    title: 'Let Arizona\'s Non-Violent Offenders Work, Support Their Families, and Come Home',
    description: 'Sign the petition calling for Arizona to allow non-violent offenders the opportunity to work, support their families, and return home.',
  },
  {
    id: 'can-petition-area-governor-hobbs-sign-the-funding-bill-arizonas-prison-oversight-office-cant-wait',
    scriptSrc: 'https://actionnetwork.org/widgets/v6/petition/governor-hobbs-sign-the-funding-bill-arizonas-prison-oversight-office-cant-wait?format=js&source=widget',
    title: 'Governor Hobbs: Sign the Funding Bill — Arizona\'s Prison Oversight Office Can\'t Wait',
    description: 'Urge Governor Hobbs to sign the funding bill for Arizona\'s independent prison oversight office.',
  },
  {
    id: 'can-petition-area-tell-governor-hobbs-attorney-general-kris-mayes-and-director-ryan-thornell-withdraw-the-jensen-appeal',
    scriptSrc: 'https://actionnetwork.org/widgets/v6/petition/tell-governor-hobbs-attorney-general-kris-mayes-and-director-ryan-thornell-withdraw-the-jensen-appeal?format=js&source=widget',
    title: 'Tell Governor Hobbs, Attorney General Mayes, and Director Thornell: Withdraw the Jensen Appeal',
    description: 'Call on Arizona leaders to withdraw the Jensen appeal and stand for accountability.',
  },
];

const events = [
  {
    title: 'Civic Advocacy Training — Core Civics Cohort',
    date: 'Monthly Sessions',
    location: 'Phoenix, Arizona',
    description: 'Our flagship training program for returning citizens. Learn how Arizona government works, how to contact lawmakers, and how to tell your story strategically.',
    status: 'Ongoing',
  },
  {
    title: 'Digital Literacy for Returning Citizens — Age 50+',
    date: 'Quarterly Cohorts',
    location: 'Phoenix, Arizona',
    description: 'A specialized cohort designed for older adults returning from long-term incarceration. Patient, paced instruction with peer mentorship.',
    status: 'Enrolling',
  },
  {
    title: 'Intro to AI for Returning Citizens',
    date: 'Coming Soon',
    location: 'Phoenix, Arizona',
    description: 'An accessible introduction to artificial intelligence tools and concepts for workforce readiness and modern civic engagement.',
    status: 'Coming Soon',
  },
];

export default function ActionCenterPage() {
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

  return (
    <div style={{ position: 'relative', zIndex: 2, background: '#050A0F' }}>
      <PageHero
        eyebrow="Take Action"
        title="Action Center"
        subtitle="Change will not come if we wait for some other person or if we wait for some other time. We are the ones we've been waiting for. Take action with Praxis Initiative today."
        backgroundImage="/images/hero-capitol.jpg"
        gradientAccent="#E05555"
      />
      <PageQuote
        quote="Change will not come if we wait for some other person or if we wait for some other time. We are the ones we've been waiting for. We are the change that we seek."
        attribution="Barack Obama"
        accentColor="#E05555"
      />

      {/* Petitions Section */}
      <section style={{ padding: '100px 0' }}>
        <div className="content-container">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p className="eyebrow-label" style={{ marginBottom: '16px', color: '#E05555' }}>Active Petitions</p>
            <h2 className="font-serif-display" style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 300, color: '#ffffff', lineHeight: 1.2 }}>
              Add Your Voice
            </h2>
            <p className="font-sans-body" style={{ fontSize: '15px', lineHeight: 1.8, color: 'rgba(255,255,255,0.7)', maxWidth: '640px', margin: '16px auto 0' }}>
              Sign our active petitions to demand accountability, support reform, and stand with system-impacted communities across Arizona.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            {petitions.map((petition) => (
              <div
                key={petition.id}
                style={{
                  padding: '40px',
                  background: '#111820',
                  border: '1px solid rgba(255,255,255,0.18)',
                  borderRadius: '6px',
                }}
              >
                <h3
                  className="font-serif-display"
                  style={{
                    fontSize: '20px',
                    fontWeight: 400,
                    color: '#ffffff',
                    marginBottom: '8px',
                    lineHeight: 1.4,
                  }}
                >
                  {petition.title}
                </h3>
                <p
                  className="font-sans-body"
                  style={{
                    fontSize: '14px',
                    lineHeight: 1.7,
                    color: 'rgba(255,255,255,0.6)',
                    marginBottom: '24px',
                  }}
                >
                  {petition.description}
                </p>
                <ActionNetworkEmbed petitionId={petition.id} scriptSrc={petition.scriptSrc} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section ref={contentRef} style={{ paddingBottom: '120px' }}>
        <div className="content-container">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p className="eyebrow-label" style={{ marginBottom: '16px', color: '#008C8C' }}>Upcoming</p>
            <h2 className="font-serif-display" style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 300, color: '#ffffff', lineHeight: 1.2 }}>
              Events
            </h2>
            <p className="font-sans-body" style={{ fontSize: '15px', lineHeight: 1.8, color: 'rgba(255,255,255,0.7)', maxWidth: '640px', margin: '16px auto 0' }}>
              Do your little bit of good where you are; it's those little bits of good put together that overwhelm the world.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {events.map((event) => (
              <div
                key={event.title}
                className="reveal-up"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  gap: '32px',
                  alignItems: 'center',
                  padding: '32px',
                  background: '#111820',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '6px',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                    <span
                      className="font-mono-data"
                      style={{
                        fontSize: '10px',
                        letterSpacing: '0.15em',
                        color: event.status === 'Ongoing' ? '#008C8C' : event.status === 'Enrolling' ? '#B088D8' : 'rgba(255,255,255,0.5)',
                        textTransform: 'uppercase',
                      }}
                    >
                      {event.status}
                    </span>
                  </div>
                  <h3
                    className="font-serif-display"
                    style={{ fontSize: '20px', fontWeight: 400, color: '#ffffff', marginBottom: '10px', lineHeight: 1.3 }}
                  >
                    {event.title}
                  </h3>
                  <p
                    className="font-sans-body"
                    style={{ fontSize: '14px', lineHeight: 1.7, color: 'rgba(255,255,255,0.6)', marginBottom: '12px' }}
                  >
                    {event.description}
                  </p>
                  <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Calendar size={14} style={{ color: 'rgba(255,255,255,0.4)' }} />
                      <span className="font-sans-body" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>{event.date}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <MapPin size={14} style={{ color: 'rgba(255,255,255,0.4)' }} />
                      <span className="font-sans-body" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>{event.location}</span>
                    </div>
                  </div>
                </div>
                <Link
                  to="/contact"
                  className="btn-praxis"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  Learn More <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
