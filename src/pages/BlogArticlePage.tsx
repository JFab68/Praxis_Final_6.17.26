import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, Calendar, Clock, Share2, Twitter, Facebook, Linkedin, ArrowRight } from 'lucide-react';
import { getArticle } from '../data/articles';
import articles from '../data/articles';
import SEOHead from '../components/SEOHead';

gsap.registerPlugin(ScrollTrigger);

// ─── Reading time calculator ───
function readingTime(html: string): number {
  const words = html.replace(/<[^>]*>/g, '').split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 225));
}

// ─── Article schema for SEO ───
function articleSchema(article: ReturnType<typeof getArticle>) {
  if (!article) return undefined;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    description: article.excerpt,
    image: article.image,
    datePublished: article.date,
    author: { '@type': 'Organization', name: 'Praxis Initiative' },
    publisher: { '@type': 'Organization', name: 'Praxis Initiative' },
  };
}

export default function BlogArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticle(slug) : undefined;
  const contentRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [showShare, setShowShare] = useState(false);

  // Scroll-triggered animations
  useEffect(() => {
    if (!contentRef.current || !article) return;
    const ctx = gsap.context(() => {
      // Staggered reveals
      gsap.fromTo(
        contentRef.current!.querySelectorAll('.reveal-up'),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Pull quotes fade in with accent line
      gsap.fromTo(
        contentRef.current!.querySelectorAll('.article-pullquote'),
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Full-width images scale in
      gsap.fromTo(
        contentRef.current!.querySelectorAll('.article-full-img'),
        { scale: 0.97, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // Reading progress bar
    const handleScroll = () => {
      if (!progressRef.current) return;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressRef.current.style.width = `${Math.min(progress, 100)}%`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      ctx.revert();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [article]);

  // Scroll to top on article change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) {
    return (
      <div style={{ position: 'relative', zIndex: 2, background: '#050A0F', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', padding: '120px 24px' }}>
          <h1 className="font-serif-display" style={{ fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 300, color: '#ffffff', marginBottom: '16px' }}>Article Not Found</h1>
          <p className="font-sans-body" style={{ color: 'rgba(255,255,255,0.65)', marginBottom: '32px' }}>The article you're looking for doesn't exist or has been moved.</p>
          <Link to="/news" className="btn-praxis">← Back to News</Link>
        </div>
      </div>
    );
  }

  const readMin = readingTime(article.bodyHtml);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = article.headline;

  return (
    <div style={{ position: 'relative', zIndex: 2, background: '#050A0F' }}>
      <SEOHead
        title={article.seoTitle}
        description={article.seoDescription}
        path={`/news/${article.slug}`}
        ogImage={article.image}
        schema={articleSchema(article)}
      />

      {/* Reading Progress Bar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 9999,
          height: '3px',
          background: 'linear-gradient(90deg, #008C8C, #00CCCC)',
          boxShadow: '0 0 8px rgba(0,204,204,0.4)',
          transition: 'width 0.2s ease',
        }}
        ref={progressRef}
      />

      {/* ─── HERO HEADER ─── */}
      <section
        style={{
          position: 'relative',
          padding: '140px 0 64px',
          background: 'linear-gradient(180deg, rgba(0,140,140,0.06) 0%, #050A0F 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {/* Back link */}
        <div className="content-container-narrow" style={{ marginBottom: '32px' }}>
          <Link
            to="/news"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: 'rgba(255,255,255,0.5)',
              textDecoration: 'none',
              fontSize: '13px',
              fontFamily: 'Inter, sans-serif',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#008C8C')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
          >
            <ArrowLeft size={14} /> Back to News
          </Link>
        </div>

        <div className="content-container-narrow">
          {/* Category badge */}
          <span
            className="font-mono-data"
            style={{
              display: 'inline-block',
              padding: '6px 14px',
              background: 'rgba(0,140,140,0.12)',
              border: '1px solid rgba(0,140,140,0.25)',
              borderRadius: '40px',
              fontSize: '10px',
              letterSpacing: '0.15em',
              color: '#00CCCC',
              textTransform: 'uppercase',
              marginBottom: '24px',
            }}
          >
            {article.category}
            {article.featured && (
              <span style={{ marginLeft: '8px', color: 'rgba(255,255,255,0.5)' }}>✦ FEATURED</span>
            )}
          </span>

          <h1
            className="font-serif-display"
            style={{
              fontSize: 'clamp(28px, 4vw, 52px)',
              fontWeight: 300,
              color: '#ffffff',
              lineHeight: 1.15,
              marginBottom: '20px',
              letterSpacing: '-0.01em',
            }}
          >
            {article.headline}
          </h1>

          <p
            className="font-sans-body"
            style={{
              fontSize: 'clamp(16px, 1.8vw, 20px)',
              lineHeight: 1.65,
              color: 'rgba(255,255,255,0.68)',
              fontWeight: 300,
              marginBottom: '32px',
              maxWidth: '680px',
            }}
          >
            {article.subheadline}
          </p>

          {/* Meta bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              flexWrap: 'wrap',
              paddingTop: '20px',
              borderTop: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={14} style={{ color: 'rgba(255,255,255,0.4)' }} />
              <span className="font-mono-data" style={{ fontSize: '12px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>
                {new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={14} style={{ color: 'rgba(255,255,255,0.4)' }} />
              <span className="font-mono-data" style={{ fontSize: '12px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>
                {readMin} min read
              </span>
            </div>
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowShare(!showShare)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 14px',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '40px',
                  color: 'rgba(255,255,255,0.7)',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontFamily: 'Inter, sans-serif',
                  transition: 'all 0.3s ease',
                }}
              >
                <Share2 size={12} /> Share
              </button>
              {showShare && (
                <div
                  style={{
                    position: 'absolute',
                    top: '44px',
                    left: 0,
                    display: 'flex',
                    gap: '8px',
                    padding: '12px 16px',
                    background: '#111820',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '8px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                    zIndex: 10,
                  }}
                >
                  <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.6)', padding: '6px' }} title="Share on X">
                    <Twitter size={16} />
                  </a>
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.6)', padding: '6px' }} title="Share on Facebook">
                    <Facebook size={16} />
                  </a>
                  <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.6)', padding: '6px' }} title="Share on LinkedIn">
                    <Linkedin size={16} />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURED IMAGE ─── */}
      <div className="content-container" style={{ marginTop: '-20px', marginBottom: '56px' }}>
        <img
          src={article.image}
          alt={article.headline}
          style={{
            width: '100%',
            maxHeight: '520px',
            objectFit: 'cover',
            borderRadius: '8px',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 4px 40px rgba(0,0,0,0.4)',
          }}
        />
      </div>

      {/* ─── ARTICLE BODY ─── */}
      <section ref={contentRef} style={{ paddingBottom: '120px' }}>
        <div className="content-container-narrow">
          {/* Pull quotes sidebar-style */}
          <div
            className="reveal-up"
            style={{
              float: 'right',
              width: '280px',
              margin: '0 0 32px 48px',
              padding: '28px 24px',
              background: 'linear-gradient(135deg, rgba(0,140,140,0.08) 0%, rgba(0,140,140,0.02) 100%)',
              border: '1px solid rgba(0,140,140,0.18)',
              borderLeft: '3px solid #008C8C',
              borderRadius: '4px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            {article.pullQuotes.slice(0, 2).map((pq, i) => (
              <div key={i}>
                <p
                  className="font-serif-display"
                  style={{
                    fontSize: '15px',
                    fontWeight: 300,
                    fontStyle: 'italic',
                    lineHeight: 1.6,
                    color: 'rgba(255,255,255,0.85)',
                    marginBottom: pq.attribution ? '8px' : '0',
                  }}
                >
                  "{pq.quote}"
                </p>
                {pq.attribution && (
                  <cite
                    className="font-mono-data"
                    style={{ fontSize: '10px', letterSpacing: '0.1em', color: '#008C8C', textTransform: 'uppercase', fontStyle: 'normal' }}
                  >
                    — {pq.attribution}
                  </cite>
                )}
                {i < article.pullQuotes.slice(0, 2).length - 1 && (
                  <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', margin: '20px 0' }} />
                )}
              </div>
            ))}
          </div>

          {/* Main content rendered from HTML */}
          <div
            className="article-content"
            dangerouslySetInnerHTML={{ __html: article.bodyHtml }}
          />

          {/* Section images gallery */}
          {article.images.length > 1 && (
            <div
              className="reveal-up"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '16px',
                marginTop: '64px',
                marginBottom: '64px',
                padding: '48px',
                background: 'rgba(255,255,255,0.04)',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {article.images.slice(1).map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${article.title} — image ${i + 2}`}
                  style={{
                    width: '100%',
                    aspectRatio: '16/10',
                    objectFit: 'cover',
                    borderRadius: '4px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    transition: 'transform 0.4s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
              ))}
            </div>
          )}

          {/* Remaining pull quotes inline */}
          {article.pullQuotes.slice(2).map((pq, i) => (
            <blockquote
              key={i}
              className="article-pullquote reveal-up"
              style={{
                margin: '48px 0',
                padding: '28px 32px',
                background: 'linear-gradient(135deg, rgba(91,60,136,0.06) 0%, rgba(91,60,136,0.01) 100%)',
                borderLeft: '4px solid #B088D8',
                borderRadius: '0 6px 6px 0',
              }}
            >
              <p
                className="font-serif-display"
                style={{
                  fontSize: 'clamp(17px, 1.8vw, 22px)',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  lineHeight: 1.65,
                  color: 'rgba(255,255,255,0.9)',
                  marginBottom: pq.attribution ? '12px' : '0',
                }}
              >
                "{pq.quote}"
              </p>
              {pq.attribution && (
                <cite
                  className="font-mono-data"
                  style={{ fontSize: '11px', letterSpacing: '0.12em', color: '#B088D8', textTransform: 'uppercase', fontStyle: 'normal' }}
                >
                  — {pq.attribution}
                </cite>
              )}
            </blockquote>
          ))}

          {/* Chart/Data visualization suggestions section */}
          {article.charts.length > 0 && (
            <div
              className="reveal-up"
              style={{
                marginTop: '64px',
                padding: '40px',
                background: 'rgba(0,140,140,0.05)',
                borderRadius: '8px',
                border: '1px solid rgba(0,140,140,0.15)',
              }}
            >
              <h3
                className="font-serif-display"
                style={{ fontSize: '20px', fontWeight: 300, color: '#ffffff', marginBottom: '20px' }}
              >
                Key Data & Visualizations
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {article.charts.map((chart, i) => (
                  <li
                    key={i}
                    className="font-sans-body"
                    style={{
                      fontSize: '14px',
                      color: 'rgba(255,255,255,0.65)',
                      padding: '12px 16px',
                      background: 'rgba(255,255,255,0.04)',
                      borderRadius: '4px',
                      borderLeft: '2px solid rgba(0,140,140,0.3)',
                    }}
                  >
                    <span style={{ color: '#00CCCC', fontWeight: 500, marginRight: '8px' }}>Chart {i + 1}:</span>
                    {chart}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Citations */}
          {article.citations.length > 0 && (
            <div className="reveal-up" style={{ marginTop: '48px', paddingTop: '40px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <h3
                className="font-mono-data"
                style={{ fontSize: '11px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '16px' }}
              >
                Sources & References
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {article.citations.map((cite, i) => (
                  <li
                    key={i}
                    className="font-sans-body"
                    style={{ fontSize: '12px', lineHeight: 1.6, color: 'rgba(255,255,255,0.45)', paddingLeft: '16px', position: 'relative' }}
                  >
                    <span style={{ position: 'absolute', left: 0, color: 'rgba(0,140,140,0.5)' }}>—</span>
                    {cite}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ─── AUTHOR BIO ─── */}
          <div
            className="reveal-up"
            style={{
              marginTop: '64px',
              padding: '36px',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '8px',
              display: 'flex',
              gap: '24px',
              alignItems: 'flex-start',
            }}
          >
            <img
              src="/images/john-fabricius.jpg"
              alt="Praxis Initiative"
              style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0, filter: 'brightness(1.2) contrast(1.05)' }}
            />
            <div>
              <h3 className="font-serif-display" style={{ fontSize: '16px', fontWeight: 400, color: '#ffffff', marginBottom: '6px' }}>
                Praxis Initiative
              </h3>
              <p className="font-sans-body" style={{ fontSize: '13px', lineHeight: 1.7, color: 'rgba(255,255,255,0.6)' }}>
                Praxis Initiative is a 100% system-impacted Arizona nonprofit advancing independent prison oversight, criminal legal system reform, overdose prevention, civic advocacy training, and arts in prison programming. Built by people who know the system firsthand.
              </p>
              <Link
                to="/about"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  marginTop: '8px',
                  fontSize: '12px',
                  letterSpacing: '0.08em',
                  color: '#008C8C',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                }}
              >
                Learn About Us <ArrowRight size={12} />
              </Link>
            </div>
          </div>

          {/* ─── RELATED ARTICLES ─── */}
          <div className="reveal-up" style={{ marginTop: '48px' }}>
            <h3 className="font-mono-data" style={{ fontSize: '11px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '24px' }}>
              More from Praxis
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
              {articles
                .filter((a) => a.slug !== article.slug)
                .slice(0, 3)
                .map((related) => (
                  <Link
                    key={related.slug}
                    to={`/news/${related.slug}`}
                    style={{
                      display: 'block',
                      padding: '20px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '6px',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(0,140,140,0.08)';
                      e.currentTarget.style.borderColor = 'rgba(0,140,140,0.25)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <img
                      src={related.image}
                      alt={related.title}
                      style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', borderRadius: '4px', marginBottom: '12px' }}
                    />
                    <span className="font-mono-data" style={{ fontSize: '10px', letterSpacing: '0.15em', color: '#008C8C', textTransform: 'uppercase' }}>
                      {related.category}
                    </span>
                    <h4 className="font-serif-display" style={{ fontSize: '15px', fontWeight: 400, color: '#ffffff', marginTop: '6px', lineHeight: 1.35 }}>
                      {related.title}
                    </h4>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── ARTICLE-SPECIFIC STYLES ─── */}
      <style>{`
        .article-content {
          font-family: 'Inter', system-ui, sans-serif;
        }
        .article-content p {
          font-size: 17px;
          line-height: 1.85;
          color: rgba(255,255,255,0.78);
          margin-bottom: 24px;
          font-weight: 350;
        }
        .article-content p.article-lede {
          font-size: 20px;
          line-height: 1.7;
          color: rgba(255,255,255,0.9);
          font-weight: 300;
          margin-bottom: 36px;
        }
        .article-content h2 {
          font-family: 'Times New Roman', 'Georgia', serif;
          font-size: 28px;
          font-weight: 300;
          color: #ffffff;
          line-height: 1.2;
          margin: 56px 0 20px;
          letter-spacing: -0.01em;
        }
        .article-content h3 {
          font-family: 'Times New Roman', 'Georgia', serif;
          font-size: 22px;
          font-weight: 300;
          color: #ffffff;
          line-height: 1.3;
          margin: 40px 0 16px;
        }
        .article-content strong {
          color: rgba(255,255,255,0.95);
          font-weight: 550;
        }
        .article-content a {
          color: #00CCCC;
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: color 0.3s ease;
        }
        .article-content a:hover { color: #008C8C; }
        .article-content em {
          font-style: italic;
          color: rgba(255,255,255,0.85);
        }
        .article-content img.article-full-img {
          width: 100%;
          max-height: 460px;
          object-fit: cover;
          border-radius: 6px;
          margin: 40px 0;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .article-content blockquote.article-pullquote {
          margin: 40px 0;
          padding: 24px 28px;
          background: linear-gradient(135deg, rgba(0,140,140,0.06) 0%, rgba(0,140,140,0.01) 100%);
          border-left: 4px solid #008C8C;
          border-radius: 0 6px 6px 0;
        }
        .article-content blockquote.article-pullquote p {
          font-size: 19px;
          font-style: italic;
          color: rgba(255,255,255,0.9);
          margin-bottom: 8px;
          font-weight: 300;
        }
        .article-content blockquote.article-pullquote cite {
          font-size: 11px;
          letter-spacing: 0.15em;
          color: #008C8C;
          text-transform: uppercase;
          font-style: normal;
        }
        .article-content .article-cta-section {
          margin: 56px 0 24px;
          padding: 40px;
          background: linear-gradient(135deg, rgba(128,0,0,0.08) 0%, rgba(128,0,0,0.02) 100%);
          border: 1px solid rgba(128,0,0,0.2);
          border-radius: 8px;
          border-left: 4px solid #E05555;
        }
        .article-content .article-cta-section h3 {
          margin-top: 0;
          color: #ffffff;
        }
        .article-content .article-cta-section p {
          color: rgba(255,255,255,0.78);
          margin-bottom: 16px;
        }
        .article-content .article-cta-section a {
          color: #E05555;
        }
        .article-content .article-cta-section strong {
          color: #ffffff;
        }
        .article-content ul, .article-content ol {
          margin: 16px 0 24px;
          padding-left: 24px;
        }
        .article-content li {
          font-size: 16px;
          line-height: 1.8;
          color: rgba(255,255,255,0.72);
          margin-bottom: 8px;
        }

        /* Float pull quote collapse on mobile */
        @media (max-width: 768px) {
          .article-content h2 { font-size: 24px; margin: 48px 0 16px; }
          .article-content h3 { font-size: 19px; }
          .article-content p { font-size: 16px; }
          .article-content p.article-lede { font-size: 18px; }
          .article-content blockquote.article-pullquote { margin: 32px 0; padding: 20px; }
          .article-content blockquote.article-pullquote p { font-size: 17px; }
          .article-content img.article-full-img { margin: 28px 0; max-height: 320px; }
          .article-content .article-cta-section { padding: 28px; margin: 40px 0; }
        }
      `}</style>
    </div>
  );
}