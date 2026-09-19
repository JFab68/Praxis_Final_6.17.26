import { Outlet, useLocation } from 'react-router-dom';
import { Suspense, lazy, useEffect, useState } from 'react';
import Navigation from './Navigation';
import Footer from '../sections/Footer';

// The animated fluid background pulls in three.js (~600 KB). It is only ever
// rendered on the homepage, so it must never sit in the entry bundle and must
// not run on phones or for visitors who ask for reduced motion.
const FluidBackground = lazy(() => import('./FluidBackground'));

function useDecorativeEffectsEnabled() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarsePointer = window.matchMedia('(pointer: coarse)');
    const narrowViewport = window.matchMedia('(max-width: 900px)');

    const update = () =>
      setEnabled(!reducedMotion.matches && !coarsePointer.matches && !narrowViewport.matches);

    update();
    reducedMotion.addEventListener('change', update);
    coarsePointer.addEventListener('change', update);
    narrowViewport.addEventListener('change', update);
    return () => {
      reducedMotion.removeEventListener('change', update);
      coarsePointer.removeEventListener('change', update);
      narrowViewport.removeEventListener('change', update);
    };
  }, []);

  return enabled;
}

export default function Layout() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const decorative = useDecorativeEffectsEnabled();

  return (
    <div style={{ position: 'relative' }}>
      {isHome && decorative && (
        <Suspense fallback={<div className="home-ambient-fallback" aria-hidden="true" />}>
          <FluidBackground isActive={true} />
        </Suspense>
      )}
      {isHome && !decorative && <div className="home-ambient-fallback" aria-hidden="true" />}
      <Navigation />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
