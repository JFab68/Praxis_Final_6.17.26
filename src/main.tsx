import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.tsx'

// Prerendered pages ship their title/description/canonical/social tags in <head>
// so crawlers and social scrapers see them without running JavaScript. React 19
// hoists its own copies of those tags into <head> at runtime, so the build-time
// copies are marked and removed here to avoid duplicate meta tags.
document.querySelectorAll('head [data-prerender]').forEach((el) => el.remove())

createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </HelmetProvider>
)
