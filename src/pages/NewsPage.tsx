import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import PageQuote from '../components/PageQuote';
import SEOHead from '../components/SEOHead';
import { getFeaturedArticle, getAllArticles } from '../data/articles';

gsap.registerPlugin(ScrollTrigger);

export default function NewsPage() {
  const contentRef = useRef<HTMLDivElement>(null);

  const featuredPost = getFeaturedArticle();
  const regularPosts = getAllArticles().filter((p) => !p.featured).slice(0, 6);

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
        }
      );
    });

    return () => ctx.revert();
  }, []);

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
            <Link
              to={`/news/${featuredPost.slug}`}
              className="blog-card"
              style={{ display: 'block', marginBottom: '60px', textDecoration: 'none' }}
            >
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
                  cursor: 'pointer',
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
                    <span className="font-sans-body" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>{new Date(featuredPost.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                </div>
                <img src={featuredPost.image} alt={featuredPost.title} loading="lazy" style={{ width: '100%', aspectRatio: '16/10', objectFit: 'cover', borderRadius: '4px' }} />
              </div>
            </Link>
          )}

          {/* Blog Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
            {regularPosts.map((post) => (
              <Link
                key={post.slug}
                to={`/news/${post.slug}`}
                className="blog-card"
                style={{
                  display: 'block',
                  textDecoration: 'none',
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
                      <span className="font-sans-body" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <span style={{ color: '#008C8C', display: 'flex', alignItems: 'center' }}>
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}