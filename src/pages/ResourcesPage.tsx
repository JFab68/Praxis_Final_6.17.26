import { useState } from 'react';
import { FileText, Download, ExternalLink, BookOpen, Gavel, Heart, Users, Mic, FolderOpen, Eye } from 'lucide-react';
import PageHero from '../components/PageHero';
import PageQuote from '../components/PageQuote';

interface Resource {
  title: string;
  description: string;
  category: string;
  type: 'document' | 'link' | 'report';
}

const categories = [
  { id: 'all', label: 'All Resources' },
  { id: 'oversight', label: 'Independent Oversight' },
  { id: 'legislation', label: 'Arizona Legislation' },
  { id: 'conditions', label: 'Prison Conditions' },
  { id: 'reentry', label: 'Reentry' },
  { id: 'drug-policy', label: 'Drug Policy & Reform' },
  { id: 'civic', label: 'Civic Advocacy' },
  { id: 'reports', label: 'Reports & Toolkits' },
  { id: 'media', label: 'Media Statements' },
];

const resources: Resource[] = [
  { title: 'Arizona SB 1507: Office of Correctional Oversight', description: 'Full text of the legislation creating Arizona\'s independent prison oversight body.', category: 'oversight', type: 'document' },
  { title: 'Independent Oversight Implementation Guide', description: 'A framework for establishing and operating effective correctional oversight.', category: 'oversight', type: 'report' },
  { title: '2025 Arizona Legislative Session Summary', description: 'Key bills and outcomes from the 2025 legislative session affecting criminal legal system reform.', category: 'legislation', type: 'report' },
  { title: 'Home Confinement Policy Brief', description: 'Analysis of home confinement as a public safety and reentry strategy in Arizona.', category: 'legislation', type: 'document' },
  { title: 'Arizona Prison Conditions Report', description: 'Documentation of conditions inside Arizona state prisons based on firsthand accounts.', category: 'conditions', type: 'report' },
  { title: 'Family Resource Guide', description: 'Information and support for families with incarcerated loved ones in Arizona.', category: 'conditions', type: 'document' },
  { title: 'Reentry Resource Directory', description: 'Comprehensive directory of services for returning citizens in Maricopa County and statewide.', category: 'reentry', type: 'document' },
  { title: 'Employment Rights for Returning Citizens', description: 'Legal guide to employment rights and protections for formerly incarcerated people in Arizona.', category: 'reentry', type: 'document' },
  { title: 'Overdose Prevention Toolkit', description: 'Community guide to overdose prevention, naloxone access, and harm reduction strategies.', category: 'drug-policy', type: 'report' },
  { title: 'Harm Reduction Policy Framework', description: 'Evidence-based policy recommendations for reducing overdose deaths in Arizona.', category: 'drug-policy', type: 'report' },
  { title: 'Civic Advocacy Training Manual', description: 'Training materials for returning citizens learning to engage in legislative advocacy.', category: 'civic', type: 'document' },
  { title: 'Digital Literacy for Advocates', description: 'Guide to using digital tools for civic engagement and policy advocacy.', category: 'civic', type: 'document' },
  { title: 'Coalition Building Toolkit', description: 'Best practices for building bipartisan reform coalitions in Arizona.', category: 'reports', type: 'report' },
  { title: 'The Case for Arts in Prison', description: 'Research summary on the impact of arts programming in correctional facilities.', category: 'reports', type: 'report' },
  { title: 'Praxis Initiative Launch Statement', description: 'Official statement on the launch of Praxis Initiative in 2025.', category: 'media', type: 'link' },
  { title: 'Statement on SB 1507 Passage', description: 'Praxis Initiative response to the passage of Arizona\'s oversight legislation.', category: 'media', type: 'link' },
];

const categoryIcons: Record<string, React.ReactNode> = {
  oversight: <Eye size={16} />,
  legislation: <Gavel size={16} />,
  conditions: <FileText size={16} />,
  reentry: <Users size={16} />,
  'drug-policy': <Heart size={16} />,
  civic: <Mic size={16} />,
  reports: <BookOpen size={16} />,
  media: <FolderOpen size={16} />,
};

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredResources = activeCategory === 'all'
    ? resources
    : resources.filter((r) => r.category === activeCategory);

  return (
    <div style={{ position: 'relative', zIndex: 2, background: '#050A0F' }}>
      <PageHero
        eyebrow="Resource Hub"
        title="Resources"
        subtitle="Reports, toolkits, policy briefs, and guides for advocates, lawmakers, families, and community members."
        backgroundImage="/images/policy-documents.jpg"
        gradientAccent="#B088D8"
      />
      <PageQuote
        quote="It always seems impossible until it's done."
        attribution="Nelson Mandela"
        accentColor="#B088D8"
      />

      <section style={{ paddingBottom: '120px' }}>
        <div className="content-container">
          {/* Category Filter */}
          <div style={{ marginBottom: '48px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="font-sans-body"
                style={{
                  padding: '10px 18px',
                  background: activeCategory === cat.id ? 'rgba(0,140,140,0.15)' : 'rgba(255,255,255,0.12)',
                  border: '1px solid ' + (activeCategory === cat.id ? 'rgba(0,140,140,0.4)' : 'rgba(255,255,255,0.18)'),
                  borderRadius: '40px',
                  color: activeCategory === cat.id ? '#008C8C' : 'rgba(255,255,255,0.6)',
                  fontSize: '13px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  letterSpacing: '0.05em',
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Resources Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
            {filteredResources.map((resource) => (
              <div
                key={resource.title}
                style={{
                  padding: '28px',
                  background: 'rgba(255,255,255,0.10)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '4px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
                  e.currentTarget.style.borderColor = 'rgba(0,140,140,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.10)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <span style={{ color: '#008C8C' }}>{categoryIcons[resource.category]}</span>
                  <span className="font-mono-data" style={{ fontSize: '10px', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>
                    {categories.find((c) => c.id === resource.category)?.label}
                  </span>
                </div>
                <h3 className="font-serif-display" style={{ fontSize: '17px', fontWeight: 400, color: '#ffffff', marginBottom: '8px', lineHeight: 1.4 }}>
                  {resource.title}
                </h3>
                <p className="font-sans-body" style={{ fontSize: '13px', lineHeight: 1.6, color: 'rgba(255,255,255,0.55)', marginBottom: '16px' }}>
                  {resource.description}
                </p>
                <span
                  className="font-sans-body"
                  style={{
                    fontSize: '12px',
                    letterSpacing: '0.1em',
                    color: '#008C8C',
                    textTransform: 'uppercase',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  {resource.type === 'link' ? <><ExternalLink size={12} /> View</> : <><Download size={12} /> Download</>}
                </span>
              </div>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <p className="font-sans-body" style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)' }}>No resources found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
