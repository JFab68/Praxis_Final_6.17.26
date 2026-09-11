import { useEffect, useRef } from 'react';

interface ActionNetworkEmbedProps {
  petitionId?: string;
  targetId?: string;
  scriptSrc: string;
}

export default function ActionNetworkEmbed({ petitionId, targetId, scriptSrc }: ActionNetworkEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const injectedRef = useRef(false);
  const elementId = targetId || petitionId || 'can-embed-area';

  useEffect(() => {
    if (!containerRef.current || injectedRef.current) return;
    injectedRef.current = true;

    // Inject Action Network CSS
    const cssId = 'an-embed-css-' + elementId;
    if (!document.getElementById(cssId)) {
      const link = document.createElement('link');
      link.id = cssId;
      link.href = 'https://actionnetwork.org/css/style-embed-v3.css';
      link.rel = 'stylesheet';
      link.type = 'text/css';
      document.head.appendChild(link);
    }

    // Create the target div
    const targetDiv = document.createElement('div');
    targetDiv.id = elementId;
    targetDiv.style.width = '100%';
    containerRef.current.appendChild(targetDiv);

    // Inject the script
    const script = document.createElement('script');
    script.src = scriptSrc;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      injectedRef.current = false;
      if (targetDiv.parentNode) {
        targetDiv.parentNode.removeChild(targetDiv);
      }
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [elementId, scriptSrc]);

  return <div ref={containerRef} style={{ width: '100%' }} />;
}
