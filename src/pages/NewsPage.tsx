import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Calendar } from 'lucide-react';
import PageHero from '../components/PageHero';
import PageQuote from '../components/PageQuote';
import SEOHead from '../components/SEOHead';

gsap.registerPlugin(ScrollTrigger);

const blogPosts = [
  {
    title: 'Why Arizona Must Fund Independent Prison Oversight',
    excerpt: 'Creating an office on paper is not enough. Without adequate funding, independent oversight becomes symbolic rather than transformative.',
    date: '2025',
    category: 'Oversight',
    image: '/images/oversight-spotlight.jpg',
    featured: true,
  },
  {
    title: 'Oversight on Paper Is Not Oversight in Practice',
    excerpt: 'The difference between symbolic oversight and real accountability comes down to funding, staffing, authority, and public access.',
    date: '2025',
    category: 'Oversight',
    image: '/images/policy-documents.jpg',
    featured: false,
  },
  {
    title: 'What Returning Citizens Know About Public Policy That Lawmakers Need to Hear',
    excerpt: 'People who have experienced incarceration firsthand bring perspectives that no policy brief can replicate.',
    date: '2025',
    category: 'Advocacy',
    image: '/images/civic-training.jpg',
    featured: false,
  },
  {
    title: 'The Real Cost of Ignoring Prison Conditions',
    excerpt: 'When prisons operate without meaningful oversight, the human and financial costs compound over time.',
    date: '2025',
    category: 'Conditions',
    image: '/images/family-impact.jpg',
    featured: false,
  },
  {
    title: 'Why Home Confinement Is a Public Safety Strategy',
    excerpt: 'Allowing eligible individuals to transition home under supervision strengthens families and communities while reducing costs.',
    date: '2025',
    category: 'Reform',
    image: '/images/home-confinement.jpg',
    featured: false,
  },
  {
    title: 'Drug Policy Should Reduce Death, Not Recycle People Through Jail',
    excerpt: 'A health-centered approach to drug policy saves lives, reduces stigma, and connects people to support.',
    date: '2025',
    category: 'Drug Policy',
    image: '/images/overdose-prevention.jpg',
    featured: false,
  },
  {
    title: 'Arts Programming Inside Prisons Is Not a Luxury',
    excerpt: 'Music, movement, and creativity are essential tools for rehabilitation, emotional regulation, and building purpose.',
    date: '2025',
    category: 'Arts',
    image: '/images/arts-music.jpg',
    featured: false,
  },
];

export default function NewsPage() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        content.querySelectorAll('.blog-card'),
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

  const featuredPost = blogPosts.find((p) => p.featured);
  const regularPosts = blogPosts.filter((p) => !p.featured);

  return (
    <div style={{ position: 'relative', zIndex: 2, background: '#050A0F' }}>
      <SEOHead title="News & Updates" description="Stay informed on Arizona criminal legal system reform. Latest news, campaign updates, and stories from Praxis Initiative." path="/news" />
      <PageHero
        eyebrow="News & Updates"
        title="News & Blog"
        subtitle="Updates on our campaigns, policy developments, and perspectives from the front lines of criminal legal system reform in Arizona."
        backgroundImage="/images/hero-capitol.jpg"
        gradientAccent="#008C8C"
      />
      <PageQuote
        quote="Every setback is a setup for a comeback."
        attribution="Anonymous"
        accentColor="#008C8C"
      />

      <section ref={contentRef} style={{ paddingBottom: '120px' }}>
        <div className="content-container">
          {/* Featured Post */}
          {featuredPost && (
            <div className="blog-card" style={{ marginBottom: '60px', cursor: 'pointer' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.2fr 1fr',
                  gap: '48px',
                  alignItems: 'center',
                  padding: '48px',
                  background: 'rgba(255,255,255,0.12)',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.15)',
                  transition: 'all 0.4s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.14)';
                  e.currentTarget.style.borderColor = 'rgba(0,140,140,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                }}
              >
                <div>
                  <span className="font-mono-data" style={{ fontSize: '11px', letterSpacing: '0.15em', color: '#008C8C', textTransform: 'uppercase' }}>
                    Featured — {featuredPost.category}
                  </span>
                  <h2 className="font-serif-display" style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 300, color: '#ffffff', marginTop: '12px', marginBottom: '16px', lineHeight: 1.3 }}>
                    {featuredPost.title}
                  </h2>
                  <p className="font-sans-body" style={{ fontSize: '15px', lineHeight: 1.8, color: 'rgba(255,255,255,0.7)', marginBottom: '24px' }}>
                    {featuredPost.excerpt}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Calendar size={14} style={{ color: 'rgba(255,255,255,0.4)' }} />
                    <span className="font-sans-body" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>{featuredPost.date}</span>
                  </div>
                </div>
                <img src={featuredPost.image} alt={featuredPost.title} loading="lazy" style={{ width: '100%', aspectRatio: '16/10', objectFit: 'cover', borderRadius: '4px' }} />
              </div>
            </div>
          )}

          {/* Blog Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
            {regularPosts.map((post) => (
              <div
                key={post.title}
                className="blog-card"
                style={{
                  background: 'rgba(255,255,255,0.10)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  transition: 'all 0.4s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
                  e.currentTarget.style.borderColor = 'rgba(0,140,140,0.2)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.10)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <img src={post.image} alt={post.title} loading="lazy" style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover' }} />
                <div style={{ padding: '24px' }}>
                  <span className="font-mono-data" style={{ fontSize: '10px', letterSpacing: '0.15em', color: '#008C8C', textTransform: 'uppercase' }}>
                    {post.category}
                  </span>
                  <h3 className="font-serif-display" style={{ fontSize: '18px', fontWeight: 400, color: '#ffffff', marginTop: '8px', marginBottom: '10px', lineHeight: 1.4 }}>
                    {post.title}
                  </h3>
                  <p className="font-sans-body" style={{ fontSize: '13px', lineHeight: 1.6, color: 'rgba(255,255,255,0.55)', marginBottom: '16px' }}>
                    {post.excerpt}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Calendar size={12} style={{ color: 'rgba(255,255,255,0.4)' }} />
                      <span className="font-sans-body" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>{post.date}</span>
                    </div>
                    <span style={{ color: '#008C8C', display: 'flex', alignItems: 'center' }}>
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
