import { Outlet, useLocation } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from '../sections/Footer';
import FluidBackground from './FluidBackground';

export default function Layout() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div style={{ position: 'relative' }}>
      {isHome && <FluidBackground isActive={true} />}
      <Navigation />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
