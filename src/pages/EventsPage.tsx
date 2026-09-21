import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Utensils,
  Lock,
  Mail,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';
import PageHero from '../components/PageHero';
import PageQuote from '../components/PageQuote';
import SEOHead from '../components/SEOHead';
import ActionNetworkEmbed from '../components/ActionNetworkEmbed';
import { trackOutcome } from '../lib/analytics';

gsap.registerPlugin(ScrollTrigger);

type EventCategory = 'all' | 'summit' | 'legislative' | 'recurring';

interface EventItem {
  id: string;
  title: string;
  subtitle: string;
  category: EventCategory;
  categoryLabel: string;
  host: string;
  hostRole?: string;
  schedule: string;
  time?: string;
  startDate?: string;
  endDate?: string;
  location: string;
  room?: string;
  address: string;
  description: string;
  badge?: string;
  badgeColor?: string;
  image?: string;
  catered?: string;
  securityNote?: string;
  rsvpEmail?: string;
  isFlagship?: boolean;
}

const EVENTS: EventItem[] = [
  {
    id: 'minds-justice-law',
    title: 'Minds, Justice, and the Law',
    subtitle: 'Neurodivergence and Developmental Disabilities in the Criminal Legal System',
    category: 'summit',
    categoryLabel: 'Public Summit',
    host: 'Praxis Initiative, FAIR Group & We Stand AZ',
    hostRole: 'Coalition Public Symposium',
    schedule: 'Monday, November 9, 2026',
    time: 'Doors 9:00 AM • Program 10:00 AM – 4:00 PM',
    startDate: '2026-11-09',
    endDate: '2026-11-09T16:00:00-07:00',
    location: 'Arizona State Capitol — Executive Tower',
    room: 'Second Floor Conference Room',
    address: '1700 W. Washington Street, Phoenix, AZ 85003',
    description:
      'A first-of-its-kind public event convening legal professionals, disability advocates, policymakers, families, and system-impacted leaders for an evidence-grounded discussion on neurodiversity, intellectual and developmental disabilities (ID/DD), public safety, and criminal law reform.',
    badge: 'First-of-its-Kind Event',
    badgeColor: '#E05555',
    image: '/images/minds-justice-and-the-law.webp',
    catered: 'Lunch is served to the first 100 registrants.',
    securityNote: 'Please allow extra time to pass through Arizona Capitol security screening.',
    rsvpEmail: 'Events@praxisinitiative.org',
    isFlagship: true,
  },
  {
    id: 'farnsworth-prison-info-group',
    title: 'ADCRR Prison Information Group',
    subtitle: 'Weekly Legislative Information Session & System Briefing',
    category: 'legislative',
    categoryLabel: 'Legislative Briefing',
    host: 'Senator David Farnsworth',
    hostRole: 'Arizona State Senate',
    schedule: 'Weekly on Mondays at 9:00 AM',
    time: '9:00 AM MST',
    startDate: 'Begins September 21, 2026 (Weekly)',
    location: 'Arizona State Capitol & Virtual Briefing',
    room: 'Senate Hearing Room & Digital Stream',
    address: '1700 W. Washington Street, Phoenix, AZ 85003',
    description:
      'A weekly informational briefing hosted by Senator Farnsworth and facilitated with Praxis Initiative to examine current Arizona Department of Corrections, Rehabilitation, and Reentry operations, facility conditions, family updates, and systemic accountability metrics.',
    badge: 'Weekly Session',
    badgeColor: '#008C8C',
    rsvpEmail: 'Events@praxisinitiative.org',
  },
  {
    id: 'blackman-oversight-committee',
    title: 'Committee on ADCRR Oversight Funding and Implementation',
    subtitle: 'Monthly Legislative Working Group on SB 1507 Operations',
    category: 'legislative',
    categoryLabel: 'Legislative Working Group',
    host: 'Representative Walt Blackman',
    hostRole: 'Arizona House of Representatives',
    schedule: 'Second Tuesday of Every Month',
    time: 'Time & Agenda Announced Prior to Each Session',
    location: 'Arizona State Capitol',
    room: 'House Committee Room / Briefing Suite',
    address: '1700 W. Washington Street, Phoenix, AZ 85003',
    description:
      'Monthly legislative working committee convened by Representative Walt Blackman tracking the implementation, statutory milestones, and startup appropriation for Arizona’s Independent Correctional Oversight Office (SB 1507). Focuses on budget allocations, director appointment readiness, and facility inspection protocols.',
    badge: 'Monthly — 2nd Tuesday',
    badgeColor: '#F59E0B',
    rsvpEmail: 'Events@praxisinitiative.org',
  },
  {
    id: 'powell-fair-group',
    title: "Representative Khyl Powell's FAIR Group Meeting",
    subtitle: 'Fairness, Accountability, Integrity, and Reform Coalition Assembly',
    category: 'recurring',
    categoryLabel: 'Coalition Assembly',
    host: 'Representative Khyl Powell',
    hostRole: 'Arizona House of Representatives • Co-administered with Kate Krejci (AACJ) & John Fabricius (Praxis)',
    schedule: 'October 1, November 2, & December 3, 2026',
    time: 'Confirmed Fall 2026 Assembly Dates',
    location: 'Arizona State Capitol / Legislative Hearing Suite',
    address: '1700 W. Washington Street, Phoenix, AZ 85003',
    description:
      'Initiated by Representative Khyl Powell in the Arizona House of Representatives and co-administered by Attorney Kate Krejci (Arizona Attorneys for Criminal Justice - AACJ) and John Fabricius (Praxis Initiative). The FAIR Group brings roughly 100 leaders—including county prosecutors, state agency directors, lawmakers, criminal defense counsel, advocacy organizations, and directly impacted community leaders—into the same room to build common-sense reforms. Operating across six working subgroups structured around Praxis Initiative’s "8 Ps" framework (Police, Pretrial, Prosecution, Probation, Prison, Parole, Parity, and Power), diverse teams collaboratively develop legislative proposals, recruit bill sponsors, and shepherd statutory reforms through the legislative process.',
    badge: '10/1 • 11/2 • 12/3',
    badgeColor: '#B088D8',
    rsvpEmail: 'Events@praxisinitiative.org',
  },
];

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState<EventCategory>('all');
  const [selectedPoster, setSelectedPoster] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredEvents = activeTab === 'all'
    ? EVENTS
    : EVENTS.filter((e) => e.category === activeTab);

  const flagshipEvent = EVENTS.find((e) => e.isFlagship);
  const otherEvents = filteredEvents.filter((e) => !e.isFlagship || activeTab !== 'all');

  // Event structured data for the flagship summit. Encodes the times that the
  // page copy, the printed flyer and the Action Network registration page all
  // have to agree on: doors 9:00 AM, program 10:00 AM, close 4:00 PM (MST).
  const flagshipSchema =
    flagshipEvent && flagshipEvent.endDate
      ? {
          '@context': 'https://schema.org',
          '@type': 'Event',
          name: flagshipEvent.title,
          description: flagshipEvent.description,
          startDate: `${flagshipEvent.startDate}T09:00:00-07:00`,
          endDate: flagshipEvent.endDate,
          eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
          eventStatus: 'https://schema.org/EventScheduled',
          image: ['https://praxisinitiative.org/images/minds-justice-and-the-law-og.jpg'],
          location: {
            '@type': 'Place',
            name: flagshipEvent.location,
            address: {
              '@type': 'PostalAddress',
              streetAddress: '1700 W. Washington Street',
              addressLocality: 'Phoenix',
              addressRegion: 'AZ',
              postalCode: '85003',
              addressCountry: 'US',
            },
          },
          organizer: {
            '@type': 'Organization',
            name: 'Praxis Initiative',
            url: 'https://praxisinitiative.org',
          },
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
            url: 'https://actionnetwork.org/events/minds-justice-and-the-law-neurodivergence-in-the-criminal-legal-system/',
          },
        }
      : undefined;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.event-card-reveal',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [activeTab]);

  return (
    <div style={{ position: 'relative', zIndex: 2, background: '#050A0F' }}>
      <SEOHead
        title="Public Events & Legislative Working Groups"
        description="Join Praxis Initiative, state lawmakers, and community leaders for public summits, weekly prison information briefings, and monthly legislative oversight committees."
        path="/events"
        ogImage="/images/minds-justice-and-the-law-og.jpg"
        schema={flagshipSchema}
      />

      <PageHero
        eyebrow="Convene • Advocate • Learn"
        title="Events & Legislative Working Groups"
        subtitle="Direct community engagement, legislative oversight committees, and educational symposiums advancing systemic transparency and accountability across Arizona."
        backgroundImage="/images/az-capitol.webp"
        gradientAccent="#008C8C"
      />

      <PageQuote
        quote="History, despite its wrenching pain, cannot be unlived, but if faced with courage, need not be lived again."
        attribution="Maya Angelou"
        accentColor="#008C8C"
      />

      <div ref={containerRef} style={{ padding: '0 0 120px' }}>
        <div className="content-container">

          {/* ─────────────────────────────────────────────────────────────
              FLAGSHIP EVENT SPOTLIGHT: MINDS, JUSTICE, AND THE LAW
             ───────────────────────────────────────────────────────────── */}
          {flagshipEvent && activeTab === 'all' && (
            <section style={{ marginBottom: '80px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '28px',
                }}
              >
                <Sparkles size={20} style={{ color: '#00CCCC' }} />
                <span
                  className="font-mono-data"
                  style={{
                    fontSize: '12px',
                    letterSpacing: '0.2em',
                    color: '#00CCCC',
                    textTransform: 'uppercase',
                  }}
                >
                  Featured Event Spotlight
                </span>
              </div>

              <div
                style={{
                  background: 'linear-gradient(135deg, rgba(0,140,140,0.12) 0%, rgba(10,17,24,0.95) 100%)',
                  border: '1px solid rgba(0,204,204,0.3)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 24px 60px rgba(0,0,0,0.6)',
                  display: 'grid',
                  gridTemplateColumns: 'minmax(320px, 420px) 1fr',
                  gap: '40px',
                  padding: '40px',
                }}
                className="flagship-grid"
              >
                {/* Poster / Flyer Preview Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div
                    style={{
                      position: 'relative',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: '1px solid rgba(255,255,255,0.15)',
                      boxShadow: '0 16px 36px rgba(0,0,0,0.5)',
                      cursor: 'pointer',
                      background: '#0D1821',
                    }}
                    onClick={() => setSelectedPoster(flagshipEvent.image || null)}
                    title="Click to view full flyer"
                  >
                    <img
                      src={flagshipEvent.image}
                      alt={flagshipEvent.title}
                      style={{
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                        transition: 'transform 0.4s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '12px',
                        right: '12px',
                        background: 'rgba(5,10,15,0.85)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '40px',
                        padding: '6px 14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '11px',
                        color: '#ffffff',
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      <ExternalLink size={12} style={{ color: '#00CCCC' }} /> Click to Enlarge Flyer
                    </div>
                  </div>

                  <div
                    style={{
                      padding: '16px 20px',
                      background: 'rgba(224,85,85,0.12)',
                      border: '1px solid rgba(224,85,85,0.25)',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                    }}
                  >
                    <AlertTriangle size={20} style={{ color: '#E05555', flexShrink: 0 }} />
                    <span className="font-sans-body" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.5 }}>
                      <strong>Seating is Limited:</strong> Early registration is strictly required to accommodate security protocols and catering numbers.
                    </span>
                  </div>
                </div>

                {/* Event Details Column */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    {/* Top Badges */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
                      <span
                        className="font-mono-data"
                        style={{
                          fontSize: '11px',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          padding: '4px 12px',
                          borderRadius: '4px',
                          background: 'rgba(224,85,85,0.2)',
                          color: '#FF7777',
                          border: '1px solid rgba(224,85,85,0.4)',
                        }}
                      >
                        ✦ First-of-its-Kind Public Event
                      </span>
                      <span
                        className="font-mono-data"
                        style={{
                          fontSize: '11px',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          padding: '4px 12px',
                          borderRadius: '4px',
                          background: 'rgba(0,140,140,0.2)',
                          color: '#00CCCC',
                          border: '1px solid rgba(0,140,140,0.4)',
                        }}
                      >
                        {flagshipEvent.categoryLabel}
                      </span>
                    </div>

                    <h2
                      className="font-serif-display"
                      style={{
                        fontSize: 'clamp(28px, 3.2vw, 42px)',
                        fontWeight: 300,
                        color: '#FFFFFF',
                        lineHeight: 1.15,
                        marginBottom: '10px',
                      }}
                    >
                      {flagshipEvent.title}
                    </h2>

                    <p
                      className="font-sans-body"
                      style={{
                        fontSize: 'clamp(16px, 1.8vw, 19px)',
                        color: '#00CCCC',
                        fontWeight: 400,
                        marginBottom: '20px',
                        lineHeight: 1.4,
                      }}
                    >
                      {flagshipEvent.subtitle}
                    </p>

                    <p
                      className="font-sans-body"
                      style={{
                        fontSize: '15px',
                        lineHeight: 1.8,
                        color: 'rgba(255,255,255,0.78)',
                        marginBottom: '32px',
                      }}
                    >
                      {flagshipEvent.description}
                    </p>

                    {/* Metadata Grid */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                        gap: '20px',
                        padding: '24px',
                        background: 'rgba(0,0,0,0.3)',
                        borderRadius: '8px',
                        border: '1px solid rgba(255,255,255,0.08)',
                        marginBottom: '32px',
                      }}
                    >
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        <Calendar size={18} style={{ color: '#00CCCC', marginTop: '2px', flexShrink: 0 }} />
                        <div>
                          <div className="font-mono-data" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase' }}>
                            Date & Schedule
                          </div>
                          <div className="font-sans-body" style={{ fontSize: '14px', color: '#FFFFFF', fontWeight: 500 }}>
                            {flagshipEvent.schedule}
                          </div>
                          <div className="font-sans-body" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)' }}>
                            {flagshipEvent.time}
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        <MapPin size={18} style={{ color: '#00CCCC', marginTop: '2px', flexShrink: 0 }} />
                        <div>
                          <div className="font-mono-data" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase' }}>
                            Location
                          </div>
                          <div className="font-sans-body" style={{ fontSize: '14px', color: '#FFFFFF', fontWeight: 500 }}>
                            {flagshipEvent.location}
                          </div>
                          <div className="font-sans-body" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)' }}>
                            {flagshipEvent.room}
                          </div>
                          <div className="font-sans-body" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)' }}>
                            {flagshipEvent.address}
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        <Utensils size={18} style={{ color: '#F59E0B', marginTop: '2px', flexShrink: 0 }} />
                        <div>
                          <div className="font-mono-data" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase' }}>
                            Catered Lunch
                          </div>
                          <div className="font-sans-body" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)' }}>
                            {flagshipEvent.catered}
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        <Lock size={18} style={{ color: '#E05555', marginTop: '2px', flexShrink: 0 }} />
                        <div>
                          <div className="font-mono-data" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase' }}>
                            Security Clearance
                          </div>
                          <div className="font-sans-body" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)' }}>
                            {flagshipEvent.securityNote}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar & Direct Action Network Registration */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '20px',
                      paddingTop: '24px',
                      borderTop: '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px' }}>
                      <a
                        href="https://actionnetwork.org/events/minds-justice-and-the-law-neurodivergence-in-the-criminal-legal-system/"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackOutcome('event_registration_opened', { event: 'minds-justice-law', surface: 'action_network' })}
                        className="btn-praxis-solid"
                        style={{ padding: '12px 28px', background: '#008C8C', color: '#ffffff', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                      >
                        Register on Action Network <ExternalLink size={16} />
                      </a>

                      <a
                        href="#action-network-form-embed"
                        onClick={() => trackOutcome('event_registration_opened', { event: 'minds-justice-law', surface: 'inline_form' })}
                        className="btn-praxis"
                        style={{ padding: '12px 24px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                      >
                        Complete Registration Below ↓
                      </a>

                      <span className="font-mono-data" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>
                        Questions: <a href="mailto:Events@praxisinitiative.org" style={{ color: '#00CCCC' }}>Events@praxisinitiative.org</a>
                      </span>
                    </div>

                    {/* Action Network Embedded Widget */}
                    <div
                      id="action-network-form-embed"
                      style={{
                        marginTop: '12px',
                        padding: '24px',
                        background: 'rgba(0,0,0,0.4)',
                        border: '1px solid rgba(0,204,204,0.3)',
                        borderRadius: '8px',
                      }}
                    >
                      <h4 className="font-serif-display" style={{ fontSize: '18px', fontWeight: 400, color: '#FFFFFF', marginBottom: '16px' }}>
                        Official Summit RSVP Form (Action Network)
                      </h4>
                      <ActionNetworkEmbed
                        targetId="can-event-area-minds-justice-and-the-law-neurodivergence-in-the-criminal-legal-system"
                        scriptSrc="https://actionnetwork.org/widgets/v6/event/minds-justice-and-the-law-neurodivergence-in-the-criminal-legal-system?format=js&source=widget"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ─────────────────────────────────────────────────────────────
              DIRECTORY & FILTER BAR
             ───────────────────────────────────────────────────────────── */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px',
              marginBottom: '36px',
              paddingBottom: '20px',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <div>
              <h3 className="font-serif-display" style={{ fontSize: '24px', fontWeight: 300, color: '#FFFFFF', margin: 0 }}>
                All Upcoming Working Groups & Sessions
              </h3>
              <p className="font-sans-body" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', margin: '4px 0 0' }}>
                Join legislative committee briefings, coalition working groups, and ongoing advocacy forums.
              </p>
            </div>

            {/* Filter Buttons */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {(
                [
                  { key: 'all', label: 'All Sessions' },
                  { key: 'legislative', label: 'Legislative Working Groups' },
                  { key: 'recurring', label: 'Coalition Meetings' },
                  { key: 'summit', label: 'Summits & Symposia' },
                ] as { key: EventCategory; label: string }[]
              ).map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className="font-mono-data"
                  style={{
                    padding: '8px 16px',
                    fontSize: '11px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    borderRadius: '40px',
                    cursor: 'pointer',
                    border: activeTab === tab.key ? '1px solid #00CCCC' : '1px solid rgba(255,255,255,0.15)',
                    background: activeTab === tab.key ? 'rgba(0,140,140,0.2)' : 'rgba(255,255,255,0.04)',
                    color: activeTab === tab.key ? '#00CCCC' : 'rgba(255,255,255,0.7)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              EVENT CARDS GRID
             ───────────────────────────────────────────────────────────── */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '24px',
            }}
          >
            {otherEvents.map((evt) => (
              <div
                key={evt.id}
                className="event-card-reveal"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '10px',
                  padding: '32px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.09)';
                  e.currentTarget.style.borderColor = 'rgba(0,140,140,0.35)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div>
                  {/* Category & Badge */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <span
                      className="font-mono-data"
                      style={{
                        fontSize: '10px',
                        letterSpacing: '0.15em',
                        color: evt.badgeColor || '#008C8C',
                        textTransform: 'uppercase',
                        padding: '4px 10px',
                        borderRadius: '3px',
                        background: 'rgba(255,255,255,0.05)',
                        border: `1px solid ${evt.badgeColor || 'rgba(0,140,140,0.3)'}40`,
                      }}
                    >
                      {evt.badge || evt.categoryLabel}
                    </span>

                    {evt.startDate && (
                      <span className="font-mono-data" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)' }}>
                        {evt.startDate}
                      </span>
                    )}
                  </div>

                  <h3
                    className="font-serif-display"
                    style={{
                      fontSize: '22px',
                      fontWeight: 400,
                      color: '#FFFFFF',
                      marginBottom: '8px',
                      lineHeight: 1.3,
                    }}
                  >
                    {evt.title}
                  </h3>

                  <p
                    className="font-sans-body"
                    style={{
                      fontSize: '13px',
                      color: '#00CCCC',
                      fontWeight: 400,
                      marginBottom: '16px',
                    }}
                  >
                    {evt.subtitle}
                  </p>

                  <div
                    style={{
                      padding: '12px 16px',
                      background: 'rgba(0,0,0,0.25)',
                      borderRadius: '6px',
                      border: '1px solid rgba(255,255,255,0.06)',
                      marginBottom: '20px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Calendar size={14} style={{ color: '#00CCCC' }} />
                      <span className="font-sans-body" style={{ fontSize: '13px', color: '#FFFFFF', fontWeight: 500 }}>
                        {evt.schedule}
                      </span>
                    </div>

                    {evt.time && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Clock size={14} style={{ color: 'rgba(255,255,255,0.4)' }} />
                        <span className="font-sans-body" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.65)' }}>
                          {evt.time}
                        </span>
                      </div>
                    )}

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <MapPin size={14} style={{ color: 'rgba(255,255,255,0.4)' }} />
                      <span className="font-sans-body" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.65)' }}>
                        {evt.location}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Users size={14} style={{ color: 'rgba(255,255,255,0.4)' }} />
                      <span className="font-sans-body" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.65)' }}>
                        Host: <strong>{evt.host}</strong> {evt.hostRole ? `(${evt.hostRole})` : ''}
                      </span>
                    </div>
                  </div>

                  <p
                    className="font-sans-body"
                    style={{
                      fontSize: '14px',
                      lineHeight: 1.7,
                      color: 'rgba(255,255,255,0.72)',
                      marginBottom: '24px',
                    }}
                  >
                    {evt.description}
                  </p>
                </div>

                <div
                  style={{
                    paddingTop: '16px',
                    borderTop: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <a
                    href={`mailto:${evt.rsvpEmail || 'Events@praxisinitiative.org'}?subject=${encodeURIComponent(
                      `Inquiry / Participation: ${evt.title}`
                    )}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '13px',
                      color: '#00CCCC',
                      textDecoration: 'none',
                      fontWeight: 500,
                    }}
                  >
                    <Mail size={14} /> Join / Contact Host <ChevronRight size={14} />
                  </a>

                  <span className="font-mono-data" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)' }}>
                    Praxis AZ
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* ─────────────────────────────────────────────────────────────
              EVENT INQUIRY & COALITION HOSTING SECTION
             ───────────────────────────────────────────────────────────── */}
          <section
            style={{
              marginTop: '80px',
              padding: '48px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, rgba(0,140,140,0.08) 0%, rgba(224,85,85,0.05) 100%)',
              border: '1px solid rgba(255,255,255,0.12)',
              display: 'grid',
              gridTemplateColumns: '1.2fr 1fr',
              gap: '40px',
              alignItems: 'center',
            }}
            className="inquiry-grid"
          >
            <div>
              <span className="font-mono-data" style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#00CCCC', textTransform: 'uppercase' }}>
                Host or Present With Praxis
              </span>
              <h3 className="font-serif-display" style={{ fontSize: '28px', fontWeight: 300, color: '#FFFFFF', marginTop: '10px', marginBottom: '16px' }}>
                Need Event Accommodations or Want to Coordinate a Working Group?
              </h3>
              <p className="font-sans-body" style={{ fontSize: '15px', lineHeight: 1.8, color: 'rgba(255,255,255,0.7)', marginBottom: '24px' }}>
                All Praxis public events prioritize ADA accessibility, ASL interpretation upon advance request, and community access. Reach out to our events coordinator to RSVP, request specific accommodations, or request co-sponsorship.
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <a
                  href="mailto:Events@praxisinitiative.org?subject=Event%20Inquiry%20or%20Accommodation%20Request"
                  className="btn-praxis-solid"
                >
                  <Mail size={16} /> Contact Events Coordinator
                </a>
                <Link to="/action" className="btn-praxis">
                  View Action Center Petitions
                </Link>
              </div>
            </div>

            <div
              style={{
                padding: '32px',
                background: 'rgba(5,10,15,0.6)',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <h4 className="font-serif-display" style={{ fontSize: '18px', fontWeight: 400, color: '#FFFFFF', marginBottom: '16px' }}>
                Upcoming Session Highlights
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: 'rgba(255,255,255,0.75)' }}>
                  <CheckCircle2 size={16} style={{ color: '#00CCCC', flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Sept 21, 2026:</strong> Senator Farnsworth's ADCRR Prison Information Group weekly launch</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: 'rgba(255,255,255,0.75)' }}>
                  <CheckCircle2 size={16} style={{ color: '#F59E0B', flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Oct 1, Nov 2, Dec 3, 2026:</strong> Rep. Powell's FAIR Group assembly dates</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: 'rgba(255,255,255,0.75)' }}>
                  <CheckCircle2 size={16} style={{ color: '#008C8C', flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Monthly (2nd Tuesday):</strong> Rep. Blackman's Committee on Oversight Funding</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: 'rgba(255,255,255,0.75)' }}>
                  <CheckCircle2 size={16} style={{ color: '#E05555', flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Nov 9, 2026:</strong> Minds, Justice, and the Law Summit at AZ State Capitol</span>
                </li>
              </ul>
            </div>
          </section>

        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          FULL-SCREEN FLYER POSTER MODAL
         ───────────────────────────────────────────────────────────── */}
      {selectedPoster && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: 'rgba(0,0,0,0.88)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
          onClick={() => setSelectedPoster(null)}
        >
          <div
            style={{
              position: 'relative',
              maxWidth: '90vw',
              maxHeight: '92vh',
              overflow: 'hidden',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.2)',
              boxShadow: '0 24px 64px rgba(0,0,0,0.8)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPoster(null)}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: 'rgba(0,0,0,0.75)',
                color: '#ffffff',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '18px',
                zIndex: 2,
              }}
            >
              ✕
            </button>
            <img
              src={selectedPoster}
              alt="Minds, Justice, and the Law Event Flyer"
              loading="lazy"
              style={{
                display: 'block',
                maxHeight: '90vh',
                maxWidth: '100%',
                objectFit: 'contain',
              }}
            />
          </div>
        </div>
      )}

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 960px) {
          .flagship-grid {
            grid-template-columns: 1fr !important;
            padding: 24px !important;
          }
          .inquiry-grid {
            grid-template-columns: 1fr !important;
            padding: 28px !important;
          }
        }
      `}</style>
    </div>
  );
}
