import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Layout from './components/Layout';

gsap.registerPlugin(ScrollTrigger);

// Eager-loaded for first paint
import HomePage from './pages/HomePage';

const AboutPage = lazy(() => import('./pages/AboutPage'));
const ProgramsPage = lazy(() => import('./pages/ProgramsPage'));
const OversightPage = lazy(() => import('./pages/OversightPage'));
const PolicyPage = lazy(() => import('./pages/PolicyPage'));
const TrainingPage = lazy(() => import('./pages/TrainingPage'));
const ArtsPage = lazy(() => import('./pages/ArtsPage'));
const ResourcesPage = lazy(() => import('./pages/ResourcesPage'));
const NewsPage = lazy(() => import('./pages/NewsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const DonatePage = lazy(() => import('./pages/DonatePage'));
const ActionCenterPage = lazy(() => import('./pages/ActionCenterPage'));
const PartnersPage = lazy(() => import('./pages/PartnersPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const TermsOfUsePage = lazy(() => import('./pages/TermsOfUsePage'));
const AccessibilityPage = lazy(() => import('./pages/AccessibilityPage'));
const BlogArticlePage = lazy(() => import('./pages/BlogArticlePage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function PageLoader() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '120px 0', background: '#050A0F' }}>
      <div
        style={{
          width: '32px',
          height: '32px',
          border: "3px solid rgba(255,255,255,0.15)",
          borderTopColor: '#008C8C',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.2 });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/programs" element={<ProgramsPage />} />
            <Route path="/oversight" element={<OversightPage />} />
            <Route path="/policy" element={<PolicyPage />} />
            <Route path="/training" element={<TrainingPage />} />
            <Route path="/arts" element={<ArtsPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/news/:slug" element={<BlogArticlePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/donate" element={<DonatePage />} />
            <Route path="/action" element={<ActionCenterPage />} />
            <Route path="/partners" element={<PartnersPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-use" element={<TermsOfUsePage />} />
            <Route path="/accessibility" element={<AccessibilityPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
