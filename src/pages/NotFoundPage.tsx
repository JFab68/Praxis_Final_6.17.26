import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import SEOHead from '../components/SEOHead';

export default function NotFoundPage() {
  return (
    <div style={{ position: 'relative', zIndex: 2, background: '#050A0F', minHeight: '80vh' }}>
      <SEOHead title="Page Not Found" description="The page you are looking for does not exist or has been moved. Return to the Praxis Initiative homepage." />
      <PageHero
        eyebrow="404"
        title="Page Not Found"
        subtitle="The page you're looking for doesn't exist or has been moved."
        gradientAccent="#E05555"
      />
      <section style={{ padding: '60px 0 120px', textAlign: 'center' }}>
        <div className="content-container-narrow">
          <p className="font-sans-body" style={{ fontSize: '16px', lineHeight: 1.8, color: 'rgba(255,255,255,0.7)', marginBottom: '32px' }}>
            You may have followed an outdated link or mistyped the URL.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/" className="btn-praxis-solid">Go Home</Link>
            <Link to="/contact" className="btn-praxis">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
