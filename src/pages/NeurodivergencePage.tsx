import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from 'recharts';
import {
  Scale,
  ShieldAlert,
  Gavel,
  Lock,
  FileSearch,
  BrainCircuit,
  Search,
  X,
  ChevronRight,
  AlertTriangle,
} from 'lucide-react';
import PageHero from '../components/PageHero';
import PageQuote from '../components/PageQuote';
import SEOHead from '../components/SEOHead';

gsap.registerPlugin(ScrollTrigger);

// --- Types ---

type SectionTab = 'scope' | 'policing' | 'prosecution' | 'incarceration' | 'policy' | 'audit';
type ProfileKey = 'comm' | 'sensory' | 'exec' | 'social' | 'stress';
type CaseKey = 'saylor' | 'cameron' | 'osagie' | 'phxpd';
type ChartMode = 'total' | 'cognitive' | 'gender';
type PolicyStage = 'all' | 'disclosure' | 'police' | 'diversion' | 'restoration' | 'sentencing';

interface PolicyRow {
  stage: PolicyStage;
  stageLabel: string;
  state: string;
  statute: string;
  mechanism: string;
  evidence: string;
  evidenceTone: 'muted' | 'amber' | 'emerald' | 'teal';
  criticisms: string;
}

// --- Data ---

const SECTIONS: { id: SectionTab; label: string; icon: React.ReactNode }[] = [
  { id: 'scope', label: 'Scope & Prevalence', icon: <Scale size={16} /> },
  { id: 'policing', label: 'Policing & Contact', icon: <ShieldAlert size={16} /> },
  { id: 'prosecution', label: 'Liability & Defense', icon: <Gavel size={16} /> },
  { id: 'incarceration', label: 'Incarceration & Reentry', icon: <Lock size={16} /> },
  { id: 'policy', label: 'Policy Reform Matrix', icon: <BrainCircuit size={16} /> },
  { id: 'audit', label: 'Evidentiary Audit', icon: <FileSearch size={16} /> },
];

const CHART_DATA: Record<ChartMode, { label: string; value: number }[]> = {
  total: [
    { label: 'General Population', value: 10.0 },
    { label: 'State/Federal Prison', value: 32.0 },
    { label: 'Local Jail', value: 40.0 },
  ],
  cognitive: [
    { label: 'General Population', value: 4.5 },
    { label: 'State/Federal Prison', value: 19.0 },
    { label: 'Local Jail', value: 31.0 },
  ],
  gender: [
    { label: 'Gen Pop (Female)', value: 11.0 },
    { label: 'Gen Pop (Male)', value: 10.0 },
    { label: 'Prison (Female)', value: 40.0 },
    { label: 'Prison (Male)', value: 31.0 },
    { label: 'Jail (Female)', value: 49.0 },
    { label: 'Jail (Male)', value: 39.0 },
  ],
};

const CHART_COLORS: Record<ChartMode, string[]> = {
  total: ['#94a3b8', '#008C8C', '#b45309'],
  cognitive: ['#cbd5e1', '#0f766e', '#d97706'],
  gender: ['#cbd5e1', '#94a3b8', '#008C8C', '#115e59', '#d97706', '#b45309'],
};

const PROFILE_DATA: Record<ProfileKey, { title: string; content: string }> = {
  comm: {
    title: 'Communication Style & Receptive Language',
    content:
      'Individuals with ID and ASD exhibit marked discrepancies between expressive fluency and receptive comprehension. Autistic individuals process verbal speech literally, struggling with sarcasm or conditional commands. Under high cognitive load or stress, speech latency increases, leading to disfluency, delayed or immediate echolalia, or selective mutism.',
  },
  sensory: {
    title: 'Sensory Processing & Allostatic Load',
    content:
      'Atypical sensory processing manifests as hyper- or hypo-reactivity. Standard law enforcement environments—sirens, strobe lights, squawking radios, aggressive physical touches, metal echoes—induce sensory overload, triggering an involuntary neurological flight-or-fight state.',
  },
  exec: {
    title: 'Executive Functioning Deficits',
    content:
      'Frontostriatal circuit deficits compromise working memory, sequencing, flexibility, and impulse control. Individuals struggle to process multi-step directives ("step out, drop keys, hands up"), organize property under strict timelines, or evaluate downstream risks.',
  },
  social: {
    title: 'Social Reciprocity & Theory of Mind (ToM)',
    content:
      'Deficits in Theory of Mind (inferring others\' mental states) prevent recognition of subtle cues. Neurodivergent individuals may struggle to read aggressive postures, modulate vocal volume, or realize when they are being manipulated into criminal acts by peers.',
  },
  stress: {
    title: 'Stress Response, Meltdown & Shutdown',
    content:
      'When predictable routines shatter or sensory demands escalate, the nervous system experiences allostatic overload. This culminates in an autistic meltdown (involuntary vocalizations/flailing) or shutdown (complete catatonic withdrawal), neither of which constitutes willful defiance.',
  },
};

const CASE_DATA: Record<CaseKey, { title: string; subtitle: string; body: React.ReactNode }> = {
  saylor: {
    title: 'Robert Ethan Saylor (2013)',
    subtitle: 'Frederick County, MD • Off-Duty Deputies / Mall Security Encounter',
    body: (
      <div style={{ display: 'grid', gap: '12px' }}>
        <div style={{ padding: '12px', background: 'rgba(255,255,255,0.06)', borderRadius: '6px' }}>
          <strong>Factual Record:</strong> Saylor, a 26-year-old man with Down syndrome (IQ ~40), stayed in a movie theater to watch a second screening without buying an extra ticket. Theater staff called off-duty deputies acting as mall security. Saylor&apos;s support aide explicitly warned deputies of his intellectual disability, advised that he would become distressed if touched, and offered to handle the situation.
        </div>
        <div style={{ padding: '12px', background: 'rgba(255,255,255,0.06)', borderRadius: '6px' }}>
          <strong>Use of Force:</strong> Disregarding warnings, deputies dragged Saylor from his seat, wrestled him face down, and applied three sets of linked handcuffs in a prone position. Saylor suffered a fractured larynx and died of asphyxiation. The Chief Medical Examiner ruled it a homicide.
        </div>
        <div style={{ padding: '12px', background: 'rgba(255,255,255,0.06)', borderRadius: '6px' }}>
          <strong>Litigation & Policy Takeaway:</strong> The Fourth Circuit affirmed the denial of qualified immunity. Defendants settled for $1.9 million. The case prompted Maryland&apos;s Ethan Saylor Alliance legislation (Md. Code, Pub. Safety § 3-516).
        </div>
      </div>
    ),
  },
  cameron: {
    title: 'Linden Cameron (2020)',
    subtitle: 'Salt Lake City, UT • Response to Mental Health 911 Call',
    body: (
      <div style={{ display: 'grid', gap: '12px' }}>
        <div style={{ padding: '12px', background: 'rgba(255,255,255,0.06)', borderRadius: '6px' }}>
          <strong>Factual Record:</strong> Linden Cameron, an unarmed 13-year-old autistic boy experiencing a mental health crisis, ran down an alley when officers approached. His mother had called 911 requesting a Crisis Intervention Team (CIT), explicitly warning dispatchers that her son was autistic, unarmed, terrified of police uniforms, and would flee.
        </div>
        <div style={{ padding: '12px', background: 'rgba(255,255,255,0.06)', borderRadius: '6px' }}>
          <strong>Use of Force:</strong> Officer Matthew Farillas pursued the boy and fired 11 shots, striking Cameron 6 times. Cameron survived with permanent severe injuries to his intestines, bladder, colon, and limbs. He was confirmed entirely unarmed.
        </div>
        <div style={{ padding: '12px', background: 'rgba(255,255,255,0.06)', borderRadius: '6px' }}>
          <strong>Litigation & Policy Takeaway:</strong> Salt Lake City settled the family&apos;s federal lawsuit for $3.0 million in 2022. The DA declined criminal charges citing conflicting use-of-force expert opinions. Highlights failure of CIT dispatch routing for agitated autistic youth.
        </div>
      </div>
    ),
  },
  osagie: {
    title: 'Osaze Osagie (2019)',
    subtitle: 'State College, PA • Involuntary Commitment Warrant Execution',
    body: (
      <div style={{ display: 'grid', gap: '12px' }}>
        <div style={{ padding: '12px', background: 'rgba(255,255,255,0.06)', borderRadius: '6px' }}>
          <strong>Factual Record:</strong> Officers were dispatched to execute a Section 302 mental health warrant on Osagie, a 29-year-old African American man diagnosed with autism. His father had requested medical intervention due to suicidal threats.
        </div>
        <div style={{ padding: '12px', background: 'rgba(255,255,255,0.06)', borderRadius: '6px' }}>
          <strong>Use of Force:</strong> Officers cornered Osagie in a narrow apartment hallway. When Osagie moved toward officers with a steak knife, a Taser deployment failed, and an officer shot Osagie three times in the chest, killing him.
        </div>
        <div style={{ padding: '12px', background: 'rgba(255,255,255,0.06)', borderRadius: '6px' }}>
          <strong>Litigation & Policy Takeaway:</strong> State College settled a federal wrongful death lawsuit for $4.0 million in 2024. Demonstrates danger of executing psychiatric warrants with armed police in constrained spatial environments.
        </div>
      </div>
    ),
  },
  phxpd: {
    title: 'Phoenix Police Department Findings (2024)',
    subtitle: 'DOJ Civil Rights Division • 34 U.S.C. § 12601 Investigation',
    body: (
      <div style={{ display: 'grid', gap: '12px' }}>
        <div style={{ padding: '12px', background: 'rgba(255,255,255,0.06)', borderRadius: '6px' }}>
          <strong>DOJ Investigation Findings (June 13, 2024):</strong> The DOJ established reasonable cause to believe PhxPD engages in a systemic pattern or practice of excessive force and unlawful discrimination against individuals with behavioral health and cognitive disabilities.
        </div>
        <div style={{ padding: '12px', background: 'rgba(255,255,255,0.06)', borderRadius: '6px' }}>
          <strong>Systemic Violations Documented:</strong> Officers repeatedly escalated encounters with disabled subjects who posed no threat, criminalized behavioral symptoms of cognitive deficits, and failed to provide reasonable accommodations under Title II of the Americans with Disabilities Act.
        </div>
      </div>
    ),
  },
};

const POLICY_ROWS: PolicyRow[] = [
  {
    stage: 'disclosure',
    stageLabel: 'Identification & Disclosure',
    state: 'Arizona',
    statute: 'A.R.S. § 28-459 (HB 2330)',
    mechanism: 'Requests "Communication Accommodation" notation in ADOT records; populates MDT; includes 500-char detail text box.',
    evidence: 'Unverified',
    evidenceTone: 'muted',
    criticisms: 'Creates false security; places disclosure burden on driver; officers may not check MDT prior to acting.',
  },
  {
    stage: 'disclosure',
    stageLabel: 'Identification & Disclosure',
    state: 'Connecticut',
    statute: 'C.G.S. § 14-11j (P.A. 19-161)',
    mechanism: 'Authorizes DMV blue envelope distribution containing registration with driver/officer instructions.',
    evidence: 'Unverified (DMV counts only)',
    evidenceTone: 'muted',
    criticisms: 'Reaching into glove box during tense traffic stop can be misconstrued as reaching for a weapon.',
  },
  {
    stage: 'disclosure',
    stageLabel: 'First Responder Registry',
    state: 'Florida',
    statute: 'Fla. Stat. § 402.88 (SB 784)',
    mechanism: 'Voluntary Persons with Disabilities Registry alerting 911 dispatch; shielded from public records.',
    evidence: 'Unverified',
    evidenceTone: 'muted',
    criticisms: 'Creates police tracking databases for disabled citizens; often used for tactical entry rather than de-escalation.',
  },
  {
    stage: 'police',
    stageLabel: 'Police Standards',
    state: 'Maryland',
    statute: 'Md. Code, Pub. Safety § 3-516',
    mechanism: 'Saylor Alliance: mandates statewide Police Standards Commission to integrate I/DD training with self-advocates.',
    evidence: 'Limited (Knowledge gains only)',
    evidenceTone: 'amber',
    criticisms: 'Tokenistic implementation: brief classroom sessions fail to alter patrol behavior without strict disciplinary accountability.',
  },
  {
    stage: 'diversion',
    stageLabel: 'Pretrial Diversion',
    state: 'California',
    statute: 'Cal. Penal Code § 1001.36',
    mechanism: 'Judicial discretion to grant pretrial diversion for mental health/neurodevelopmental conditions up to 2 years.',
    evidence: 'Moderate (Reduced recidivism)',
    evidenceTone: 'emerald',
    criticisms: 'Prosecutorial gatekeeping: excludes violent offenses, barring access for individuals whose sensory meltdowns produced assault charges.',
  },
  {
    stage: 'restoration',
    stageLabel: 'Capacity & Restorability',
    state: 'Texas',
    statute: 'Tex. Code Crim. Proc. 46B.102',
    mechanism: 'Prohibits indefinite competency restoration for permanent ID; routes directly to civil developmental authorities.',
    evidence: 'Moderate (Shorter hospital waits)',
    evidenceTone: 'emerald',
    criticisms: 'Civil service options underfunded; shifts individuals from criminal to civil institutional confinement rather than community care.',
  },
  {
    stage: 'sentencing',
    stageLabel: 'Sentencing Exclusion',
    state: 'Ohio',
    statute: 'Ohio Rev. Code § 2929.025 (HB 136)',
    mechanism: 'Bars death penalty for serious mental illness at time of offense; establishes pretrial evaluation process.',
    evidence: 'High (Immediate conversions)',
    evidenceTone: 'teal',
    criticisms: 'Excludes neurodivergence: limits eligibility to psychiatric categories, omitting ASD, TBI, and developmental conditions.',
  },
  {
    stage: 'sentencing',
    stageLabel: 'Post-Conviction Relief',
    state: 'Texas',
    statute: 'Tex. Code Crim. Proc. 11.073',
    mechanism: 'Habeas relief when scientific knowledge changes, allowing challenges to convictions based on outdated diagnostic criteria.',
    evidence: 'High (Multiple resentencings)',
    evidenceTone: 'teal',
    criticisms: 'Requires expensive post-conviction counsel and private testing, inaccessible to indigent prisoners.',
  },
];

const POLICY_STAGES: { id: PolicyStage; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'disclosure', label: 'Disclosure' },
  { id: 'police', label: 'Police Standards' },
  { id: 'diversion', label: 'Diversion' },
  { id: 'restoration', label: 'Restoration' },
  { id: 'sentencing', label: 'Sentencing/Post-Conv' },
];

// --- Helpers ---

const evidenceBadge = (tone: PolicyRow['evidenceTone'], text: string) => {
  const styles: Record<PolicyRow['evidenceTone'], React.CSSProperties> = {
    muted: { background: 'rgba(255,255,255,0.10)', color: 'rgba(255,255,255,0.55)' },
    amber: { background: 'rgba(217,119,6,0.15)', color: '#fbbf24' },
    emerald: { background: 'rgba(16,185,129,0.15)', color: '#34d399' },
    teal: { background: 'rgba(0,140,140,0.15)', color: '#00CCCC' },
  };
  return (
    <span
      className="font-mono-data"
      style={{
        display: 'inline-block',
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '10px',
        fontWeight: 600,
        letterSpacing: '0.05em',
        ...styles[tone],
      }}
    >
      {text}
    </span>
  );
};

// --- Components ---

export default function NeurodivergencePage() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<SectionTab>('scope');
  const [chartMode, setChartMode] = useState<ChartMode>('total');
  const [activeProfile, setActiveProfile] = useState<ProfileKey>('comm');
  const [activeCase, setActiveCase] = useState<CaseKey | null>(null);
  const [policyStage, setPolicyStage] = useState<PolicyStage>('all');
  const [policySearch, setPolicySearch] = useState('');

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        content.querySelectorAll('.reveal-up'),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: content,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const filteredPolicies = useMemo(() => {
    const term = policySearch.toLowerCase();
    return POLICY_ROWS.filter((row) => {
      const matchesStage = policyStage === 'all' || row.stage === policyStage;
      const matchesSearch =
        term === '' ||
        row.state.toLowerCase().includes(term) ||
        row.statute.toLowerCase().includes(term) ||
        row.mechanism.toLowerCase().includes(term) ||
        row.stageLabel.toLowerCase().includes(term);
      return matchesStage && matchesSearch;
    });
  }, [policyStage, policySearch]);

  const chartData = CHART_DATA[chartMode];
  const chartColors = CHART_COLORS[chartMode];

  const sectionCardStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '8px',
    padding: '32px',
  };

  const sectionHeadingStyle: React.CSSProperties = {
    fontSize: 'clamp(22px, 2.8vw, 32px)',
    fontWeight: 300,
    color: '#ffffff',
    marginBottom: '16px',
  };

  const bodyTextStyle: React.CSSProperties = {
    fontSize: '15px',
    lineHeight: 1.8,
    color: 'rgba(255,255,255,0.7)',
  };

  return (
    <div style={{ position: 'relative', zIndex: 2, background: '#050A0F' }}>
      <SEOHead
        title="Neurodivergence & Criminal Justice Reform"
        description="A Praxis Initiative legislative white paper on the systemic criminalization of neurodivergence, intellectual disability, and developmental disability across the criminal legal system."
        path="/neurodivergence"
      />
      <PageHero
        eyebrow="Legislative White Paper"
        title="Neurodivergence & Criminal Justice Reform"
        subtitle="A clinical, legal, and policy framework for ending the systemic criminalization of intellectual disability, developmental disability, and neurodivergence across the justice continuum."
        gradientAccent="#008C8C"
        minHeight="70vh"
      />
      <PageQuote
        quote="The measure of a society is found in how it treats its most vulnerable."
        attribution="Nelson Mandela"
        accentColor="#B088D8"
      />

      <section ref={contentRef} style={{ padding: '80px 0 120px' }}>
        <div className="content-container">
          {/* Executive Summary */}
          <div
            className="reveal-up"
            style={{
              ...sectionCardStyle,
              marginBottom: '48px',
              borderLeft: '3px solid #008C8C',
            }}
          >
            <div className="eyebrow-label" style={{ marginBottom: '12px', color: '#00CCCC' }}>
              Analytical Executive Overview
            </div>
            <h2 className="font-serif-display" style={{ ...sectionHeadingStyle, marginBottom: '16px' }}>
              A Clinical, Legal, and Policy Framework for Legislative Reform
            </h2>
            <p className="font-sans-body" style={bodyTextStyle}>
              Incarcerated individuals in state and federal prisons are nearly <strong>three times as likely</strong>, and local jail inmates <strong>more than four times as likely</strong>, as the standardized noninstitutionalized general population to report a disability. This white paper establishes the factual, clinical, and statutory foundation to address the systemic criminalization of neurodivergence, intellectual disability, and developmental disability across the justice continuum.
            </p>
          </div>

          {/* Section Tab Navigation */}
          <div
            className="reveal-up"
            style={{
              position: 'sticky',
              top: '72px',
              zIndex: 10,
              background: 'rgba(5,10,15,0.92)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '8px',
              padding: '8px',
              marginBottom: '48px',
              overflowX: 'auto',
            }}
          >
            <div style={{ display: 'flex', gap: '4px', minWidth: 'max-content' }}>
              {SECTIONS.map((s) => {
                const active = activeTab === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setActiveTab(s.id)}
                    className="font-sans-body"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 14px',
                      borderRadius: '6px',
                      border: 'none',
                      background: active ? 'rgba(0,140,140,0.18)' : 'transparent',
                      color: active ? '#00CCCC' : 'rgba(255,255,255,0.55)',
                      fontSize: '12px',
                      fontWeight: active ? 500 : 400,
                      letterSpacing: '0.05em',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {s.icon}
                    {s.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 1: SCOPE & PREVALENCE */}
          {activeTab === 'scope' && (
            <div className="reveal-up" style={sectionCardStyle}>
              <h2 className="font-serif-display" style={sectionHeadingStyle}>
                1. Clinical, Legal, and Educational Frameworks
              </h2>
              <p className="font-sans-body" style={{ ...bodyTextStyle, marginBottom: '32px' }}>
                This section defines the statutory and clinical criteria governing neurodevelopmental conditions. While clinical frameworks rely on dimensional assessments of support needs, criminal codes frequently enforce rigid, categorical thresholds.
              </p>

              {/* Frameworks Table */}
              <div style={{ overflowX: 'auto', marginBottom: '40px' }}>
                <table style={{ width: '100%', minWidth: '700px', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ background: 'rgba(255,255,255,0.08)' }}>
                      {['Classification', 'Governing Authority', 'Nature of Standard', 'Primary Defining Criteria', 'Criminal Legal Significance'].map((h) => (
                        <th
                          key={h}
                          className="font-sans-body"
                          style={{
                            padding: '14px',
                            textAlign: 'left',
                            color: 'rgba(255,255,255,0.85)',
                            fontWeight: 600,
                            borderBottom: '1px solid rgba(255,255,255,0.15)',
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Neurodivergence', 'Sociological / Neurodiversity Movement', 'Non-clinical conceptual umbrella', 'Neurocognitive variations (ASD, ADHD, Tourette\'s, FASD, learning disorders).', 'Informs systemic advocacy; lacks categorical statutory standing outside specific diversion statutes.'],
                      ['Intellectual Disability (ID)', 'DSM-5-TR / AAIDD (12th ed. 2021)', 'Clinical diagnosis & constitutional status', 'Intellectual deficits (IQ ≤ 70 ± 5), adaptive functioning limits, developmental onset (≤ 22).', 'Categorical exemption from death penalty (Atkins); grounds for incompetence and insanity defenses.'],
                      ['Developmental Disability (DD)', 'DD Act (42 U.S.C. § 15002(8))', 'Federal / State administrative statute', 'Severe chronic impairment before age 22; functional limits in ≥ 3 of 7 major life domains.', 'Establishes eligibility for community-based services, adult protective frameworks, and specialized diversion.'],
                      ['IDEA Classifications', '20 U.S.C. § 1401(3); 34 C.F.R. § 300.8', 'Educational entitlement standard', 'Impairment categories adversely impacting educational progress.', 'Generates essential documentation of developmental onset for Atkins claims and mitigating evidence.'],
                    ].map((row, i) => (
                      <tr
                        key={i}
                        style={{
                          borderBottom: '1px solid rgba(255,255,255,0.08)',
                          transition: 'background 0.2s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                      >
                        {row.map((cell, j) => (
                          <td
                            key={j}
                            className={j === 0 ? 'font-serif-display' : 'font-sans-body'}
                            style={{
                              padding: '14px',
                              color: j === 0 ? '#ffffff' : 'rgba(255,255,255,0.65)',
                              fontWeight: j === 0 ? 500 : 400,
                              verticalAlign: 'top',
                            }}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Chart & Explanations */}
              <div className="neuro-grid-chart" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }}>
                <div
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.10)',
                    borderRadius: '8px',
                    padding: '24px',
                  }}
                >
                  <div
                    className="neuro-chart-header"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: '12px',
                      marginBottom: '20px',
                    }}
                  >
                    <div>
                      <h3 className="font-serif-display" style={{ fontSize: '16px', color: '#ffffff', marginBottom: '4px' }}>
                        National Prevalence vs. Carceral Disparities
                      </h3>
                      <p className="font-sans-body" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>
                        Source: BJS NIS-3 Data & CDC Community Surveys
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '4px', background: 'rgba(0,0,0,0.25)', padding: '4px', borderRadius: '6px' }}>
                      {([
                        { key: 'total', label: 'Any Disability' },
                        { key: 'cognitive', label: 'Cognitive Only' },
                        { key: 'gender', label: 'Gender Breakdown' },
                      ] as { key: ChartMode; label: string }[]).map((b) => (
                        <button
                          key={b.key}
                          onClick={() => setChartMode(b.key)}
                          className="font-sans-body"
                          style={{
                            padding: '6px 10px',
                            borderRadius: '4px',
                            border: 'none',
                            background: chartMode === b.key ? 'rgba(0,140,140,0.35)' : 'transparent',
                            color: chartMode === b.key ? '#ffffff' : 'rgba(255,255,255,0.55)',
                            fontSize: '11px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {b.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ width: '100%', height: '360px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 40 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" vertical={false} />
                        <XAxis
                          dataKey="label"
                          tick={{ fill: 'rgba(255,255,255,0.55)', fontSize: 11 }}
                          axisLine={{ stroke: 'rgba(255,255,255,0.15)' }}
                          tickLine={false}
                          angle={chartMode === 'gender' ? -30 : 0}
                          textAnchor={chartMode === 'gender' ? 'end' : 'middle'}
                          height={chartMode === 'gender' ? 60 : 30}
                        />
                        <YAxis
                          tick={{ fill: 'rgba(255,255,255,0.55)', fontSize: 11 }}
                          axisLine={false}
                          tickLine={false}
                          tickFormatter={(v) => `${v}%`}
                          domain={[0, chartMode === 'cognitive' ? 40 : 60]}
                        />
                        <Tooltip
                          cursor={{ fill: 'rgba(255,255,255,0.04)' }}
                          contentStyle={{
                            background: '#0D1B2A',
                            border: '1px solid rgba(255,255,255,0.15)',
                            borderRadius: '6px',
                            color: '#ffffff',
                            fontSize: '12px',
                          }}
                          formatter={(value: number) => [`${value}%`, 'Prevalence']}
                        />
                        <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                          {chartData.map((_, i) => (
                            <Cell key={`cell-${i}`} fill={chartColors[i % chartColors.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="font-sans-body" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '12px', textAlign: 'center', fontStyle: 'italic' }}>
                    *Cognitive disability is defined as "serious difficulty concentrating, remembering, or making decisions."
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div
                    style={{
                      background: 'rgba(217,119,6,0.10)',
                      border: '1px solid rgba(217,119,6,0.25)',
                      borderRadius: '8px',
                      padding: '20px',
                    }}
                  >
                    <h4 className="font-serif-display" style={{ fontSize: '15px', color: '#fbbf24', marginBottom: '8px' }}>
                      Key Disparity: Cognitive Impairment
                    </h4>
                    <p className="font-sans-body" style={{ fontSize: '13px', lineHeight: 1.7, color: 'rgba(255,255,255,0.75)' }}>
                      Cognitive disability is reported by <strong>19% of state/federal prisoners</strong> and <strong>31% of local jail inmates</strong>, compared to just <strong>4.0–5.0%</strong> in the standardized general population.
                    </p>
                  </div>

                  <div
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.10)',
                      borderRadius: '8px',
                      padding: '20px',
                    }}
                  >
                    <h4 className="font-serif-display" style={{ fontSize: '15px', color: '#ffffff', marginBottom: '12px' }}>
                      Why Estimates Diverge
                    </h4>
                    <ul className="font-sans-body" style={{ fontSize: '13px', lineHeight: 1.7, color: 'rgba(255,255,255,0.65)', paddingLeft: '18px', margin: 0 }}>
                      <li><strong>Definitional Breadth:</strong> BJS captures functional limitations alongside lifelong ID.</li>
                      <li><strong>Systemic Under-Identification:</strong> Jails rarely conduct standardized booking screens.</li>
                      <li><strong>Autism Diagnostic Void:</strong> BJS does not disaggregate ASD; forensic estimates place secure facility ASD prevalence between 2% and 9%.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Functional Profiles Explorer */}
              <div style={{ marginTop: '40px', paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.10)' }}>
                <h3 className="font-serif-display" style={{ fontSize: '18px', color: '#ffffff', marginBottom: '8px' }}>
                  Daily Functional Profiles & Neurological Architecture
                </h3>
                <p className="font-sans-body" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', marginBottom: '16px' }}>
                  Select a functional domain to explore how neurodevelopmental traits are routinely criminalized in custodial environments.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '8px', marginBottom: '16px' }}>
                  {(Object.keys(PROFILE_DATA) as ProfileKey[]).map((key) => {
                    const active = activeProfile === key;
                    const labels: Record<ProfileKey, string> = {
                      comm: 'Communication & Language',
                      sensory: 'Sensory & Allostatic Load',
                      exec: 'Executive Functioning',
                      social: 'Social Reciprocity & ToM',
                      stress: 'Stress Response & Breakdown',
                    };
                    return (
                      <button
                        key={key}
                        onClick={() => setActiveProfile(key)}
                        className="font-sans-body"
                        style={{
                          padding: '12px',
                          borderRadius: '6px',
                          border: '1px solid ' + (active ? '#008C8C' : 'rgba(255,255,255,0.12)'),
                          background: active ? 'rgba(0,140,140,0.18)' : 'rgba(255,255,255,0.06)',
                          color: active ? '#00CCCC' : 'rgba(255,255,255,0.7)',
                          fontSize: '12px',
                          fontWeight: active ? 500 : 400,
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          textAlign: 'left',
                        }}
                      >
                        {labels[key]}
                      </button>
                    );
                  })}
                </div>
                <div
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.10)',
                    borderRadius: '8px',
                    padding: '20px',
                  }}
                >
                  <h4 className="font-serif-display" style={{ fontSize: '16px', color: '#ffffff', marginBottom: '8px' }}>
                    {PROFILE_DATA[activeProfile].title}
                  </h4>
                  <p className="font-sans-body" style={{ fontSize: '14px', lineHeight: 1.8, color: 'rgba(255,255,255,0.7)', margin: 0 }}>
                    {PROFILE_DATA[activeProfile].content}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 2: POLICING AND FIRST CONTACT */}
          {activeTab === 'policing' && (
            <div className="reveal-up" style={sectionCardStyle}>
              <h2 className="font-serif-display" style={sectionHeadingStyle}>
                2. Policing and First Contact
              </h2>
              <p className="font-sans-body" style={{ ...bodyTextStyle, marginBottom: '32px' }}>
                Police tactics presume a neurotypical baseline. When officers encounter auditory delays, eye contact aversion, or stimming, these behaviors are frequently misconstrued as active resistance, intoxication, or deception.
              </p>

              <h3 className="font-serif-display" style={{ fontSize: '17px', color: '#ffffff', marginBottom: '16px' }}>
                Misinterpretation of Neurodivergent Traits in Patrol Settings
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px', marginBottom: '40px' }}>
                {[
                  { trait: 'Response Latency', risk: 'High Risk', riskColor: '#ef4444', perception: 'Deliberate refusal, stalling, or preparing to launch an attack.', reality: 'Auditory processing delays under high stress requiring extended latency to decode commands.' },
                  { trait: 'Aversion to Eye Contact', risk: 'High Risk', riskColor: '#ef4444', perception: 'Guilt, deception, evasiveness, or scanning for an exit/ambush.', reality: 'Direct gaze causes severe visual overstimulation or physical discomfort in autistic individuals.' },
                  { trait: 'Motor Stereotypies ("Stimming")', risk: 'Moderate Risk', riskColor: '#fbbf24', perception: 'Methamphetamine/PCP intoxication, erratic agitation, or pre-assault indicators.', reality: 'Involuntary self-soothing behaviors (hand-flapping, pacing, rocking) to regulate anxiety.' },
                  { trait: 'Echolalia / Scripting', risk: 'Moderate Risk', riskColor: '#fbbf24', perception: 'Mockery, disrespect, hostility, or willful defiance of authority.', reality: 'Immediate or delayed repetition of spoken phrases to process stressful language.' },
                  { trait: 'Literal Interpretation & Frozen Compliance', risk: 'High Risk', riskColor: '#ef4444', perception: 'Non-compliance with subsequent commands.', reality: 'Rigid literal adherence to initial command creates physical immobility and cognitive freeze.' },
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.10)',
                      borderRadius: '8px',
                      padding: '20px',
                      transition: 'all 0.25s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(0,140,140,0.3)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <span className="font-serif-display" style={{ fontSize: '15px', color: '#ffffff' }}>{item.trait}</span>
                      <span
                        className="font-mono-data"
                        style={{
                          fontSize: '10px',
                          fontWeight: 600,
                          color: item.riskColor,
                          background: item.riskColor + '20',
                          padding: '3px 8px',
                          borderRadius: '4px',
                        }}
                      >
                        {item.risk}
                      </span>
                    </div>
                    <p className="font-sans-body" style={{ fontSize: '12px', lineHeight: 1.6, color: 'rgba(255,255,255,0.55)', marginBottom: '8px' }}>
                      <strong style={{ color: 'rgba(255,255,255,0.75)' }}>Officer Perception:</strong> {item.perception}
                    </p>
                    <p className="font-sans-body" style={{ fontSize: '12px', lineHeight: 1.6, color: 'rgba(255,255,255,0.65)', margin: 0 }}>
                      <strong style={{ color: 'rgba(255,255,255,0.85)' }}>Clinical Reality:</strong> {item.reality}
                    </p>
                  </div>
                ))}
              </div>

              {/* Case Studies */}
              <div style={{ marginBottom: '40px' }}>
                <h3 className="font-serif-display" style={{ fontSize: '17px', color: '#ffffff', marginBottom: '4px' }}>
                  Documented Use-of-Force Case Records
                </h3>
                <p className="font-sans-body" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', marginBottom: '16px' }}>
                  Select a case record to inspect factual findings, legal outcome, and systemic takeaways.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
                  {(Object.keys(CASE_DATA) as CaseKey[]).map((key) => (
                    <button
                      key={key}
                      onClick={() => setActiveCase(key)}
                      style={{
                        textAlign: 'left',
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.10)',
                        borderRadius: '8px',
                        padding: '20px',
                        cursor: 'pointer',
                        transition: 'all 0.25s ease',
                        color: 'inherit',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(0,140,140,0.3)';
                        e.currentTarget.style.background = 'rgba(255,255,255,0.09)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)';
                        e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                        <div>
                          <h4 className="font-serif-display" style={{ fontSize: '15px', color: '#ffffff', marginBottom: '2px' }}>
                            {CASE_DATA[key].title}
                          </h4>
                          <p className="font-sans-body" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', margin: 0 }}>
                            {CASE_DATA[key].subtitle}
                          </p>
                        </div>
                        <ChevronRight size={16} style={{ color: '#008C8C', flexShrink: 0 }} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                <div>
                  <h3 className="font-serif-display" style={{ fontSize: '16px', color: '#ffffff', marginBottom: '12px' }}>
                    Evaluations of Response Models
                  </h3>
                  {[
                    { title: 'Crisis Intervention Team (CIT) Training', text: 'Increases diversion rates to health facilities, but meta-analyses show no statistically significant reduction in total use-of-force events. Structural flaw: standard de-escalation can trigger sensory meltdowns in autistic subjects.' },
                    { title: 'Co-Responder & Mobile Crisis (e.g., STAR Denver)', text: 'Civilian teams reduced low-level offenses by 34% with zero injuries. Limitation: dispatch protocols often route agitated I/DD calls back into armed police channels.' },
                    { title: 'Specialized I/DD Curricula (Saylor Alliance / Pathways)', text: 'Improves short-term officer knowledge, but longitudinal studies show no sustained reduction in field arrests without command accountability.' },
                  ].map((item, i) => (
                    <div key={i} style={{ padding: '14px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', marginBottom: '10px' }}>
                      <h4 className="font-sans-body" style={{ fontSize: '13px', fontWeight: 600, color: '#ffffff', marginBottom: '6px' }}>{item.title}</h4>
                      <p className="font-sans-body" style={{ fontSize: '12px', lineHeight: 1.6, color: 'rgba(255,255,255,0.6)', margin: 0 }}>{item.text}</p>
                    </div>
                  ))}
                </div>
                <div>
                  <h3 className="font-serif-display" style={{ fontSize: '16px', color: '#ffffff', marginBottom: '12px' }}>
                    State Identification & Disclosure Tools
                  </h3>
                  {[
                    { title: "Arizona A.R.S. § 28-459", text: 'Populates "Communication Accommodation" on Mobile Data Terminal (MDT) without physical card notation. Features a 500-character detail text box.' },
                    { title: 'Connecticut C.G.S. § 14-11j', text: 'Envelope holds registration/license; exterior provides driver guidance on front and officer instructions on reverse side.' },
                    { title: 'Florida Fla. Stat. § 402.88', text: 'Voluntary municipal databases alerting 911 dispatch. Explicitly shielded from public record laws.' },
                  ].map((item, i) => (
                    <div key={i} style={{ padding: '14px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', marginBottom: '10px' }}>
                      <h4 className="font-sans-body" style={{ fontSize: '13px', fontWeight: 600, color: '#ffffff', marginBottom: '6px' }}>{item.title}</h4>
                      <p className="font-sans-body" style={{ fontSize: '12px', lineHeight: 1.6, color: 'rgba(255,255,255,0.6)', margin: 0 }}>{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SECTION 3: PROSECUTION AND CRIMINAL LIABILITY */}
          {activeTab === 'prosecution' && (
            <div className="reveal-up" style={sectionCardStyle}>
              <h2 className="font-serif-display" style={sectionHeadingStyle}>
                3. Prosecution and Criminal Liability
              </h2>
              <p className="font-sans-body" style={{ ...bodyTextStyle, marginBottom: '32px' }}>
                Criminal law doctrines were constructed around episodic, treatable psychiatric conditions. When applied to lifelong neurodevelopmental conditions, these doctrines break down.
              </p>

              <div style={{ overflowX: 'auto', marginBottom: '40px' }}>
                <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ background: 'rgba(255,255,255,0.08)' }}>
                      {['Legal Doctrine', 'Relevant Time Frame', 'Controlling Standard', 'Legal Consequence'].map((h) => (
                        <th
                          key={h}
                          className="font-sans-body"
                          style={{
                            padding: '14px',
                            textAlign: 'left',
                            color: 'rgba(255,255,255,0.85)',
                            fontWeight: 600,
                            borderBottom: '1px solid rgba(255,255,255,0.15)',
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Competency to Stand Trial', 'Present (During Adjudication)', 'Dusky v. United States (Rational/factual understanding & ability to assist counsel)', 'Proceedings suspended; diversion to state restoration programs or civil commitment.'],
                      ['Criminal Responsibility (Sanity)', 'Past (Time of Offense)', "M'Naghten, MPC § 4.01, or Durham Product Test", 'Not Guilty by Reason of Insanity (NGRI); indefinite forensic psychiatric commitment.'],
                      ['Mens Rea', 'Past (Time of Offense)', 'Statutory Offense Elements (Purpose, Knowledge, Recklessness, Negligence)', 'Failure of proof results in acquittal or conviction on lesser-included offenses.'],
                    ].map((row, i) => (
                      <tr
                        key={i}
                        style={{
                          borderBottom: '1px solid rgba(255,255,255,0.08)',
                          transition: 'background 0.2s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                      >
                        {row.map((cell, j) => (
                          <td
                            key={j}
                            className={j === 0 ? 'font-serif-display' : 'font-sans-body'}
                            style={{
                              padding: '14px',
                              color: j === 0 ? '#ffffff' : 'rgba(255,255,255,0.65)',
                              fontWeight: j === 0 ? 500 : 400,
                              verticalAlign: 'top',
                            }}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '40px' }}>
                {[
                  { title: '1. The Competency Fiction', text: 'Under Jackson v. Indiana (1972), defendants cannot be held indefinitely for restoration if unrestorable. Because ID/autism are permanent, state hospitals teach basic legal vocabulary using flashcards. Passing tests like CAST-MR creates a competency fiction, returning defendants to trial despite lacking adaptive capacity to evaluate plea offers.' },
                  { title: '2. The "Sanity Gap"', text: "M'Naghten evaluates rule-based knowledge of wrongfulness. Autistic individuals can state theft is 'against the law,' but fail to appreciate why or realize they are being manipulated by peers due to Theory of Mind deficits. They are routinely found legally sane despite profound moral comprehension gaps." },
                  { title: '3. Diminished Capacity Bar', text: 'In Clark v. Arizona (2006), the Supreme Court affirmed state authority to restrict psychiatric evidence offered to negate mens rea outside insanity. In states abolishing diminished capacity, executive function deficits cannot challenge mens rea, forcing evaluation under a neurotypical recklessness standard.' },
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '20px',
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.10)',
                      borderRadius: '8px',
                      borderTop: '3px solid #008C8C',
                    }}
                  >
                    <h4 className="font-serif-display" style={{ fontSize: '15px', color: '#00CCCC', marginBottom: '8px' }}>{item.title}</h4>
                    <p className="font-sans-body" style={{ fontSize: '13px', lineHeight: 1.7, color: 'rgba(255,255,255,0.65)', margin: 0 }}>{item.text}</p>
                  </div>
                ))}
              </div>

              <div style={{ paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.10)' }}>
                <h3 className="font-serif-display" style={{ fontSize: '18px', color: '#ffffff', marginBottom: '16px' }}>
                  Eighth Amendment Capital Jurisprudence & Limits
                </h3>
                <div style={{ display: 'grid', gap: '12px', marginBottom: '24px' }}>
                  {[
                    { title: 'Atkins v. Virginia, 536 U.S. 304 (2002)', text: 'Categorically barred the execution of individuals with intellectual disability under the Eighth Amendment, citing reduced moral culpability and heightened risk of false confessions.' },
                    { title: 'Hall v. Florida, 572 U.S. 701 (2014)', text: 'Invalidated rigid IQ cutoffs (70), requiring courts to account for the Standard Error of Measurement (±5 points) and clinical adaptive functioning evidence.' },
                    { title: 'Moore v. Texas, 581 U.S. 1 (2017) & Moore II (2019)', text: 'Struck down non-clinical lay stereotypes (the Ex parte Briseno factors) and mandated adherence to current diagnostic manuals (DSM-5 / AAIDD).' },
                  ].map((item, i) => (
                    <div
                      key={i}
                      style={{
                        borderLeft: '3px solid #008C8C',
                        paddingLeft: '16px',
                        paddingTop: '4px',
                        paddingBottom: '4px',
                      }}
                    >
                      <h4 className="font-sans-body" style={{ fontSize: '14px', fontWeight: 600, color: '#ffffff', marginBottom: '4px' }}>{item.title}</h4>
                      <p className="font-sans-body" style={{ fontSize: '13px', lineHeight: 1.7, color: 'rgba(255,255,255,0.6)', margin: 0 }}>{item.text}</p>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    background: 'rgba(217,119,6,0.10)',
                    border: '1px solid rgba(217,119,6,0.25)',
                    borderRadius: '8px',
                    padding: '20px',
                  }}
                >
                  <h4 className="font-serif-display" style={{ fontSize: '15px', color: '#fbbf24', marginBottom: '12px' }}>
                    Categorical Boundaries of Constitutional Relief
                  </h4>
                  <ul className="font-sans-body" style={{ fontSize: '13px', lineHeight: 1.8, color: 'rgba(255,255,255,0.75)', paddingLeft: '18px', margin: 0 }}>
                    <li><strong>No Non-Capital Extension:</strong> Federal courts have refused to extend Atkins to Life Without Parole or severe term-of-years sentences.</li>
                    <li><strong>Exclusion of Autism:</strong> ASD has not been recognized as a categorical bar to execution or non-capital sentences.</li>
                    <li><strong>Procedural Hurdles:</strong> Georgia requires proof of ID beyond a reasonable doubt at trial (O.C.G.A. § 17-7-131), a standard no capital defendant has met in a contested trial since inception.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 4: INCARCERATION AND REENTRY */}
          {activeTab === 'incarceration' && (
            <div className="reveal-up" style={sectionCardStyle}>
              <h2 className="font-serif-display" style={sectionHeadingStyle}>
                4. Incarceration and Reentry
              </h2>
              <p className="font-sans-body" style={{ ...bodyTextStyle, marginBottom: '32px' }}>
                Prisons and jails require strict behavioral uniformity and rapid obedience. For neurodivergent individuals, sensory overstimulation and executive dysfunction lead to disciplinary write-ups, solitary confinement, and severe inmate exploitation.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                <div>
                  <h3 className="font-serif-display" style={{ fontSize: '17px', color: '#ffffff', marginBottom: '16px' }}>
                    Conditions of Confinement
                  </h3>
                  {[
                    { title: 'Disciplinary Segregation & Solitary', text: 'Officers interpret delayed responses or sensory meltdowns as direct insubordination. In solitary confinement (23-hour isolation), neurodivergent individuals suffer severe psychological decompensation and self-harm.' },
                    { title: 'Exploitation & Victimization', text: 'Outside prison, individuals with cognitive disabilities face violent crime at 83.3 per 1,000 (highest rate of any group). Inside, social acquiescence leads to coercion—forced to store contraband or take blame for gang infractions.' },
                    { title: 'Inaccessibility of ADA Accommodations', text: 'Programs require 8th-grade reading levels, excluding individuals with ID from early release credits. Electronic kiosks for medical/grievance requests are unusable for those with motor/cognitive deficits.' },
                  ].map((item, i) => (
                    <div key={i} style={{ padding: '16px', background: 'rgba(255,255,255,0.06)', borderRadius: '8px', marginBottom: '12px' }}>
                      <h4 className="font-sans-body" style={{ fontSize: '14px', fontWeight: 600, color: '#ffffff', marginBottom: '6px' }}>{item.title}</h4>
                      <p className="font-sans-body" style={{ fontSize: '13px', lineHeight: 1.7, color: 'rgba(255,255,255,0.6)', margin: 0 }}>{item.text}</p>
                    </div>
                  ))}
                </div>
                <div>
                  <h3 className="font-serif-display" style={{ fontSize: '17px', color: '#ffffff', marginBottom: '16px' }}>
                    Reentry & Supervision Trajectories
                  </h3>
                  {[
                    { title: 'Technical Violation Trajectories', text: 'Probation conditions contain dozens of complex rules. Reincarceration stems from nonviolent administrative lapses: missing appointments due to bus confusion, failing to charge GPS monitors, or failing written therapy worksheets.', highlight: false },
                    { title: 'The Medicaid Waiver Gap', text: 'Federal law mandates suspension/termination of Medicaid upon incarceration. Released individuals with ID face multi-year waitlists to reactivate HCBS 1915(c) waivers for housing and job coaching, leaving them without support during reentry.', highlight: true },
                    { title: 'Litigation Benchmark: Armstrong v. Newsom', text: 'Class action establishing systematic California prison ADA violations for disabled incarcerated people, prompting court-ordered tracking and external staff misconduct monitoring.', highlight: false },
                  ].map((item, i) => (
                    <div
                      key={i}
                      style={{
                        padding: '16px',
                        borderRadius: '8px',
                        marginBottom: '12px',
                        background: item.highlight ? 'rgba(217,119,6,0.10)' : 'rgba(255,255,255,0.06)',
                        border: '1px solid ' + (item.highlight ? 'rgba(217,119,6,0.25)' : 'rgba(255,255,255,0.10)'),
                      }}
                    >
                      <h4 className="font-sans-body" style={{ fontSize: '14px', fontWeight: 600, color: item.highlight ? '#fbbf24' : '#ffffff', marginBottom: '6px' }}>{item.title}</h4>
                      <p className="font-sans-body" style={{ fontSize: '13px', lineHeight: 1.7, color: item.highlight ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.6)', margin: 0 }}>{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SECTION 5: POLICY MODELS AND REFORM INVENTORY */}
          {activeTab === 'policy' && (
            <div className="reveal-up" style={sectionCardStyle}>
              <h2 className="font-serif-display" style={sectionHeadingStyle}>
                5. State Policy Models and Reform Inventory
              </h2>
              <p className="font-sans-body" style={{ ...bodyTextStyle, marginBottom: '24px' }}>
                This filterable policy inventory examines enacted state statutory reforms. Each entry analyzes statutory mechanics, independent outcome evaluations, and criticisms raised by disability rights advocates.
              </p>

              {/* Filter Controls */}
              <div
                className="policy-filter-row"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px',
                  background: 'rgba(255,255,255,0.06)',
                  borderRadius: '8px',
                  marginBottom: '24px',
                }}
              >
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
                  <span className="font-sans-body" style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.1em', marginRight: '6px' }}>
                    Stage:
                  </span>
                  {POLICY_STAGES.map((s) => {
                    const active = policyStage === s.id;
                    return (
                      <button
                        key={s.id}
                        onClick={() => setPolicyStage(s.id)}
                        className="font-sans-body"
                        style={{
                          padding: '6px 12px',
                          borderRadius: '40px',
                          border: '1px solid ' + (active ? 'rgba(0,140,140,0.5)' : 'rgba(255,255,255,0.15)'),
                          background: active ? 'rgba(0,140,140,0.18)' : 'transparent',
                          color: active ? '#00CCCC' : 'rgba(255,255,255,0.6)',
                          fontSize: '11px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {s.label}
                      </button>
                    );
                  })}
                </div>
                <div style={{ position: 'relative', width: '100%', maxWidth: '280px' }}>
                  <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }} />
                  <input
                    type="text"
                    value={policySearch}
                    onChange={(e) => setPolicySearch(e.target.value)}
                    placeholder="Search state, statute, mechanism..."
                    className="font-sans-body"
                    style={{
                      width: '100%',
                      padding: '8px 12px 8px 34px',
                      background: 'rgba(0,0,0,0.25)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '6px',
                      color: '#ffffff',
                      fontSize: '12px',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              {/* Policy Table */}
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', minWidth: '800px', borderCollapse: 'collapse', fontSize: '12px' }}>
                  <thead>
                    <tr style={{ background: 'rgba(255,255,255,0.08)' }}>
                      {['Stage & State', 'Enabling Statute', 'Statutory Mechanism', 'Outcome Data Strength', 'Credible Criticisms / Risks'].map((h) => (
                        <th
                          key={h}
                          className="font-sans-body"
                          style={{
                            padding: '14px',
                            textAlign: 'left',
                            color: 'rgba(255,255,255,0.85)',
                            fontWeight: 600,
                            borderBottom: '1px solid rgba(255,255,255,0.15)',
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPolicies.map((row, i) => (
                      <tr
                        key={i}
                        style={{
                          borderBottom: '1px solid rgba(255,255,255,0.08)',
                          transition: 'background 0.2s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                      >
                        <td className="font-sans-body" style={{ padding: '14px', verticalAlign: 'top' }}>
                          <div style={{ fontWeight: 500, color: '#ffffff' }}>{row.stageLabel}</div>
                          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', marginTop: '2px' }}>{row.state}</div>
                        </td>
                        <td className="font-mono-data" style={{ padding: '14px', color: 'rgba(255,255,255,0.65)', fontSize: '11px', verticalAlign: 'top' }}>
                          {row.statute}
                        </td>
                        <td className="font-sans-body" style={{ padding: '14px', color: 'rgba(255,255,255,0.7)', verticalAlign: 'top', lineHeight: 1.6 }}>
                          {row.mechanism}
                        </td>
                        <td className="font-sans-body" style={{ padding: '14px', verticalAlign: 'top' }}>
                          {evidenceBadge(row.evidenceTone, row.evidence)}
                        </td>
                        <td className="font-sans-body" style={{ padding: '14px', color: 'rgba(255,255,255,0.55)', verticalAlign: 'top', lineHeight: 1.6 }}>
                          {row.criticisms}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredPolicies.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '40px 0' }}>
                    <p className="font-sans-body" style={{ color: 'rgba(255,255,255,0.45)' }}>No reforms match your filters.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SECTION 6: EVIDENTIARY AUDIT */}
          {activeTab === 'audit' && (
            <div className="reveal-up" style={sectionCardStyle}>
              <h2 className="font-serif-display" style={sectionHeadingStyle}>
                Evidentiary Audit: Claims Unverified on the Record
              </h2>
              <p className="font-sans-body" style={{ ...bodyTextStyle, marginBottom: '32px' }}>
                Exacting research standards require flagging claims that lack empirical confirmation and naming the required records to resolve them.
              </p>

              <div style={{ display: 'grid', gap: '20px' }}>
                {[
                  {
                    title: '1. Quantitative Force Reductions from Disclosure & Registry Tools',
                    type: 'Unverified Claim',
                    analysis: 'While states have authorized driver notations, Blue Envelopes, and registries, no independent, peer-reviewed study exists demonstrating a measurable reduction in use-of-force incidents, arrests, or officer-involved shootings.',
                    record: 'Controlled study comparing municipal dispatch logs, traffic stop records, and internal affairs reports across matched jurisdictions tracking encounters where notations were accessed versus unaccessed.',
                  },
                  {
                    title: '2. Disaggregated National Incarceration Prevalence for Autism (ASD)',
                    type: 'Unverified Claim',
                    analysis: 'BJS surveys aggregate cognitive conditions into a broad functional category. BJS does not report disaggregated nationwide prevalence counts specifically for Autism Spectrum Disorder in state/federal prisons.',
                    record: 'Nationwide correctional health survey conducted by BJS or NIJ utilizing validated clinical diagnostic assessments (e.g., ADOS-2) administered across a stratified national carceral sample.',
                  },
                  {
                    title: '3. Categorical Statutory/Judicial LWOP Ban for Adults with Intellectual Disability',
                    type: 'Negative Finding',
                    analysis: 'Despite legal scholarship advocating for the extension of Atkins v. Virginia to non-capital sentences, no state legislature has enacted a statutory ban, and no state supreme court or federal circuit court has ruled categorically prohibiting Life Without Parole for adult defendants with ID.',
                    record: 'Continuous tracking of state criminal code revisions and appellate dockets for Atkins-equivalent non-capital extensions.',
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      background: 'rgba(217,119,6,0.10)',
                      border: '1px solid rgba(217,119,6,0.25)',
                      borderRadius: '8px',
                      padding: '24px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                      <h3 className="font-serif-display" style={{ fontSize: '15px', color: '#fbbf24' }}>{item.title}</h3>
                      <span className="font-mono-data" style={{ fontSize: '10px', fontWeight: 600, color: '#fbbf24', background: 'rgba(217,119,6,0.2)', padding: '4px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
                        {item.type}
                      </span>
                    </div>
                    <p className="font-sans-body" style={{ fontSize: '13px', lineHeight: 1.7, color: 'rgba(255,255,255,0.75)', marginBottom: '12px' }}>
                      <strong>Analysis:</strong> {item.analysis}
                    </p>
                    <div
                      style={{
                        background: 'rgba(0,0,0,0.2)',
                        border: '1px solid rgba(217,119,6,0.2)',
                        borderRadius: '6px',
                        padding: '12px',
                      }}
                    >
                      <p className="font-sans-body" style={{ fontSize: '12px', lineHeight: 1.7, color: 'rgba(255,255,255,0.7)', margin: 0 }}>
                        <strong>Record Needed to Resolve:</strong> {item.record}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Case Study Modal */}
      {activeCase && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(5,10,15,0.85)',
            backdropFilter: 'blur(8px)',
            zIndex: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setActiveCase(null)}
        >
          <div
            style={{
              background: '#0D1B2A',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '12px',
              maxWidth: '680px',
              width: '100%',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                padding: '20px 24px',
                borderBottom: '1px solid rgba(255,255,255,0.10)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
            >
              <div>
                <h3 className="font-serif-display" style={{ fontSize: '20px', color: '#ffffff', marginBottom: '4px' }}>
                  {CASE_DATA[activeCase].title}
                </h3>
                <p className="font-sans-body" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', margin: 0 }}>
                  {CASE_DATA[activeCase].subtitle}
                </p>
              </div>
              <button
                onClick={() => setActiveCase(null)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                  padding: '4px',
                }}
                aria-label="Close case inspector"
              >
                <X size={24} />
              </button>
            </div>
            <div
              className="font-sans-body"
              style={{
                padding: '24px',
                overflowY: 'auto',
                color: 'rgba(255,255,255,0.75)',
                fontSize: '14px',
                lineHeight: 1.8,
              }}
            >
              {CASE_DATA[activeCase].body}
            </div>
            <div
              style={{
                padding: '16px 24px',
                borderTop: '1px solid rgba(255,255,255,0.10)',
                textAlign: 'right',
              }}
            >
              <button
                onClick={() => setActiveCase(null)}
                className="font-sans-body"
                style={{
                  padding: '10px 20px',
                  background: 'rgba(0,140,140,0.2)',
                  border: '1px solid rgba(0,140,140,0.4)',
                  borderRadius: '6px',
                  color: '#00CCCC',
                  fontSize: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 1024px) {
          .neuro-grid-chart {
            grid-template-columns: 7fr 5fr !important;
          }
        }
        @media (min-width: 640px) {
          .neuro-chart-header {
            flex-direction: row !important;
            align-items: center;
          }
          .policy-filter-row {
            flex-direction: row !important;
          }
        }
      `}</style>

      {/* Source Footer */}
      <section style={{ padding: '60px 0', borderTop: '1px solid rgba(255,255,255,0.08)', background: '#050A0F' }}>
        <div className="content-container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <AlertTriangle size={18} style={{ color: '#fbbf24' }} />
            <h3 className="font-serif-display" style={{ fontSize: '16px', color: '#ffffff' }}>Sourcing & Methodology</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', fontSize: '11px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>
            <div>
              <strong style={{ color: 'rgba(255,255,255,0.7)' }}>Statutory & Case Law:</strong>
              <p style={{ margin: '6px 0 0' }}>Dusky v. U.S.; Atkins v. VA; Hall v. FL; Moore v. TX; Clark v. AZ; Cal. PC § 1001.36; Tex. CCP Art. 46B; A.R.S. § 28-459; C.G.S. § 14-11j; Fla. Stat. § 402.88.</p>
            </div>
            <div>
              <strong style={{ color: 'rgba(255,255,255,0.7)' }}>Federal Reports & Data:</strong>
              <p style={{ margin: '6px 0 0' }}>BJS National Inmate Survey (NIS-3); DOJ Civil Rights Division PhxPD Findings Letter (2024); CDC ASD Prevalence Reports; AAIDD 12th Edition (2021); DSM-5-TR (APA 2022).</p>
            </div>
            <div>
              <strong style={{ color: 'rgba(255,255,255,0.7)' }}>Litigation Records:</strong>
              <p style={{ margin: '6px 0 0' }}>Estate of Saylor v. Regal Cinemas; Cameron v. SLC; Osagie v. Borough of State College; Armstrong v. Newsom.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
