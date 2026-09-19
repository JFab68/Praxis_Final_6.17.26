import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Layout from './components/Layout';
import Analytics from './components/Analytics';

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
const EventsPage = lazy(() => import('./pages/EventsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const DonatePage = lazy(() => import('./pages/DonatePage'));
const ActionCenterPage = lazy(() => import('./pages/ActionCenterPage'));
const PartnersPage = lazy(() => import('./pages/PartnersPage'));
const NeurodivergencePage = lazy(() => import('./pages/NeurodivergencePage'));
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
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: 'auto', block: 'start' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

/** Lenis smooth scrolling is a desktop-only enhancement: it is skipped on touch
 *  devices, narrow viewports and when the visitor asks for reduced motion. */
function useSmoothScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarsePointer = window.matchMedia('(pointer: coarse)');
    const narrowViewport = window.matchMedia('(max-width: 900px)');
    if (reducedMotion.matches || coarsePointer.matches || narrowViewport.matches) return;

    let lenis: { destroy: () => void; on: (e: string, cb: () => void) => void; raf: (t: number) => void } | null = null;
    let tick: ((time: number) => void) | null = null;
    let cancelled = false;

    import('lenis').then(({ default: Lenis }) => {
      if (cancelled) return;
      const instance = new Lenis({ lerp: 0.2 });
      lenis = instance as unknown as typeof lenis;
      instance.on('scroll', ScrollTrigger.update);
      tick = (time: number) => instance.raf(time * 1000);
      gsap.ticker.add(tick);
    });

    return () => {
      cancelled = true;
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
    };
  }, []);
}

function App() {
  useSmoothScroll();

  return (
    <>
      <Analytics />
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
            <Route path="/events" element={<EventsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/donate" element={<DonatePage />} />
            <Route path="/action" element={<ActionCenterPage />} />
            <Route path="/partners" element={<PartnersPage />} />
            <Route path="/neurodivergence" element={<NeurodivergencePage />} />
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
