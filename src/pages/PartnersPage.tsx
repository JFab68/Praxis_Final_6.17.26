import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Handshake } from 'lucide-react';
import PageHero from '../components/PageHero';
import PageQuote from '../components/PageQuote';

gsap.registerPlugin(ScrollTrigger);

interface Partner {
  name: string;
  description: string;
  website: string;
  focus: string;
}

const partners: Partner[] = [
  {
    name: 'American Friends Service Committee — Arizona',
    description: 'AFSC Arizona works to end mass incarceration and build justice through direct service, policy advocacy, and community organizing. They support incarcerated people, returning citizens, and families impacted by the criminal legal system.',
    website: 'https://www.afsc.org/office/arizona',
    focus: 'Prison reform, direct service, policy advocacy',
  },
  {
    name: 'Arizona Justice Project',
    description: 'The Arizona Justice Project reviews and assists in cases of actual innocence or cases in which a miscarriage of justice has occurred. They investigate claims of innocence and work to exonerate wrongfully convicted individuals.',
    website: 'https://www.azjusticeproject.org',
    focus: 'Wrongful conviction, post-conviction relief',
  },
  {
    name: 'Crossroads Programs',
    description: 'Crossroads Programs provides transitional housing, employment services, and case management for individuals returning to the community from incarceration. They focus on reducing recidivism through stable housing and employment.',
    website: 'https://www.crossroadsprograms.org',
    focus: 'Reentry, housing, employment',
  },
  {
    name: 'Dream.Org',
    description: 'Dream.Org is a national nonprofit working at the intersection of social justice and environmental progress. Their Justice Reform team supports policy campaigns, technology initiatives, and green workforce development for returning citizens.',
    website: 'https://dream.org',
    focus: 'National reform, green workforce, technology',
  },
  {
    name: 'FWD.us',
    description: 'FWD.us is a bipartisan political organization working to reform immigration and criminal justice policies. Their Arizona team supports sentencing reform, prison oversight, and policies that reduce unnecessary incarceration.',
    website: 'https://www.fwd.us',
    focus: 'Criminal justice reform, immigration, advocacy',
  },
  {
    name: 'Phoenix Indian Center',
    description: 'The Phoenix Indian Center provides culturally responsive services to American Indian communities, including reentry support, workforce development, and cultural programming that honors traditional pathways to healing.',
    website: 'https://www.phoenixindcenter.org',
    focus: 'Indigenous communities, reentry, cultural services',
  },
  {
    name: 'Arizona Coalition to End Sexual and Domestic Violence',
    description: 'ACESDV provides direct services, training, and policy advocacy to end sexual and domestic violence in Arizona. Their work includes supporting incarcerated survivors and addressing the intersection of domestic violence and the criminal legal system.',
    website: 'https://www.acesdv.org',
    focus: 'Domestic violence, sexual assault, survivor support',
  },
  {
    name: 'Reframe Reentry',
    description: 'Reframe Reentry is a community organization dedicated to changing the narrative around returning citizens. They provide peer mentorship, employment connections, and advocacy to support successful reintegration.',
    website: 'https://reframereentry.org',
    focus: 'Peer mentorship, employment, narrative change',
  },
];

export default function PartnersPage() {
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
          duration: 0.7,
          stagger: 0.1,
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
        eyebrow="Our Network"
        title="Partners"
        subtitle="We work alongside organizations across Arizona and nationally that share our commitment to transforming the criminal legal system, supporting returning citizens, and building a more just society."
        backgroundImage="/images/coalition-meeting.jpg"
        gradientAccent="#008C8C"
      />
      <PageQuote
        quote="Never doubt that a small group of thoughtful, committed citizens can change the world; indeed, it's the only thing that ever has."
        attribution="Margaret Mead"
        accentColor="#008C8C"
      />

      <section ref={contentRef} style={{ paddingBottom: '120px' }}>
        <div className="content-container">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p className="eyebrow-label" style={{ marginBottom: '16px' }}>Collaborating Organizations</p>
            <h2 className="font-serif-display" style={{ fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 300, color: '#ffffff', lineHeight: 1.2 }}>
              Organizations We Work With
            </h2>
            <p className="font-sans-body" style={{ fontSize: '15px', lineHeight: 1.8, color: 'rgba(255,255,255,0.7)', maxWidth: '640px', margin: '16px auto 0' }}>
              These are organizations in our space that we collaborate with, support, or wish to work with. Each represents a vital piece of the movement for criminal legal system reform.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }} className="partners-grid">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="reveal-up"
                style={{
                  padding: '32px',
                  background: '#111820',
                  border: '1px solid rgba(255,255,255,0.18)',
                  borderLeft: '3px solid #008C8C',
                  borderRadius: '4px',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#1a2330';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#111820';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <Handshake size={18} style={{ color: '#008C8C' }} />
                  <span className="font-mono-data" style={{ fontSize: '10px', letterSpacing: '0.15em', color: '#008C8C', textTransform: 'uppercase' }}>
                    {partner.focus}
                  </span>
                </div>
                <h3 className="font-serif-display" style={{ fontSize: '18px', fontWeight: 400, color: '#ffffff', marginBottom: '10px', lineHeight: 1.4 }}>
                  {partner.name}
                </h3>
                <p className="font-sans-body" style={{ fontSize: '13px', lineHeight: 1.7, color: 'rgba(255,255,255,0.6)', marginBottom: '16px' }}>
                  {partner.description}
                </p>
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: '12px',
                    letterSpacing: '0.1em',
                    color: '#008C8C',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  Visit Website <ExternalLink size={12} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`@media (max-width: 900px) { .partners-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}
