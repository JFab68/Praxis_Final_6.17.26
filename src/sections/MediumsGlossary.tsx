import { useEffect, useRef, useCallback, useState } from 'react';
import gsap from 'gsap';
import { mediumsConfig } from '../config';
import type { MediumItem } from '../config';

function GooeyTextRow({ item, filterId, onHover, onLeaveHover, isActive, onTap }: {
  item: MediumItem;
  filterId: string;
  onHover: () => void;
  onLeaveHover: () => void;
  isActive: boolean;
  onTap: () => void;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<SVGTextElement>(null);
  const text2Ref = useRef<SVGTextElement>(null);
  const textsGroupRef = useRef<SVGGElement>(null);
  const feBlurRef = useRef<SVGFEGaussianBlurElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const primitiveValues = useRef({ stdDeviation: 0 });
  const isHovered = useRef(false);

  const buildTimeline = useCallback(() => {
    if (!text1Ref.current || !text2Ref.current || !textsGroupRef.current || !feBlurRef.current) return;

    const tl = gsap.timeline({
      paused: true,
      onComplete: () => {
        if (textsGroupRef.current) textsGroupRef.current.style.filter = 'none';
      },
      onReverseComplete: () => {
        if (textsGroupRef.current) textsGroupRef.current.style.filter = 'none';
      },
      onUpdate: () => {
        if (feBlurRef.current) {
          feBlurRef.current.setAttribute('stdDeviation', String(primitiveValues.current.stdDeviation));
        }
      },
    });

    tl.to(primitiveValues.current, {
      duration: 0.5,
      ease: 'none',
      stdDeviation: 1.5,
      startAt: { stdDeviation: 0 },
    }, 0);

    tl.to(primitiveValues.current, {
      duration: 0.5,
      ease: 'none',
      stdDeviation: 0,
    });

    tl.to(text1Ref.current, {
      duration: 1,
      ease: 'none',
      opacity: 0,
    }, 0);

    tl.to(text2Ref.current, {
      duration: 1,
      ease: 'none',
      opacity: 1,
    }, 0);

    tl.to(text1Ref.current, {
      duration: 1,
      ease: 'Power2.easeInOut',
      x: 8,
    }, 0);

    tl.to(text2Ref.current, {
      duration: 1,
      ease: 'Power2.easeInOut',
      startAt: { x: -8 },
      x: 0,
    }, 0);

    tlRef.current = tl;
  }, []);

  useEffect(() => {
    if (text2Ref.current) {
      gsap.set(text2Ref.current, { opacity: 0 });
    }
    buildTimeline();

    return () => {
      if (tlRef.current) tlRef.current.kill();
    };
  }, [buildTimeline]);

  // Play/reverse based on isActive (for mobile tap) or hover (for desktop)
  useEffect(() => {
    if (!tlRef.current) return;
    if (isActive) {
      if (textsGroupRef.current) {
        textsGroupRef.current.style.filter = `url(#${filterId})`;
      }
      tlRef.current.play();
    } else {
      if (textsGroupRef.current) {
        textsGroupRef.current.style.filter = `url(#${filterId})`;
      }
      tlRef.current.reverse();
    }
  }, [isActive, filterId]);

  const onEnter = () => {
    isHovered.current = true;
    if (textsGroupRef.current) {
      textsGroupRef.current.style.filter = `url(#${filterId})`;
    }
    if (tlRef.current) tlRef.current.play();
    onHover();
  };

  const onLeave = () => {
    isHovered.current = false;
    if (textsGroupRef.current) {
      textsGroupRef.current.style.filter = `url(#${filterId})`;
    }
    if (tlRef.current) tlRef.current.reverse();
    onLeaveHover();
  };

  return (
    <div
      ref={rowRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onTap}
      style={{
        cursor: 'pointer',
        borderBottom: `1px solid ${isActive ? 'rgba(48,176,208,0.3)' : 'rgba(255,255,255,0.08)'}`,
        padding: '28px 0',
        transition: 'border-color 0.4s',
      }}
    >
      <svg
        viewBox="0 0 400 50"
        style={{ width: '100%', maxWidth: '500px', height: '50px', overflow: 'visible' }}
        preserveAspectRatio="xMinYMid meet"
      >
        <defs>
          <filter id={filterId}>
            <feGaussianBlur
              ref={feBlurRef}
              in="SourceGraphic"
              stdDeviation="0"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  1 0 1 0 0  0 0 0 16 -7"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
        <g ref={textsGroupRef}>
          <text
            ref={text1Ref}
            x="0"
            y="35"
            fill="#EDE8E4"
            fontFamily="'Noto Serif SC', Georgia, serif"
            fontSize="32"
            fontWeight="300"
            letterSpacing="0.08em"
          >
            {item.cn}
          </text>
          <text
            ref={text2Ref}
            x="0"
            y="35"
            fill="#30B0D0"
            fontFamily="'Noto Sans SC', Helvetica, sans-serif"
            fontSize="28"
            fontWeight="700"
            letterSpacing="0.12em"
          >
            {item.en}
          </text>
        </g>
      </svg>
    </div>
  );
}

export default function MediumsGlossary() {
  const mediums = mediumsConfig.items;
  // Desktop: hover-based. Mobile: tap-to-toggle
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tappedIndex, setTappedIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth <= 768
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const activeIndex = isMobile ? tappedIndex : hoveredIndex;
  const hovered = activeIndex !== null ? mediums[activeIndex] : null;

  const handleTap = (idx: number) => {
    setTappedIndex((prev) => (prev === idx ? null : idx));
  };

  if (mediums.length === 0) {
    return null;
  }

  return (
    <section
      id="mediums"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '80vh',
        background: '#050A0F',
        zIndex: 4,
        display: 'flex',
        padding: '16vh 8vw',
        gap: '8vw',
      }}
      className="mediums-section"
    >
      {/* Left — titles */}
      <div className="mediums-left" style={{ flex: '0 0 50%' }}>
        <p
          className="font-sans-body"
          style={{
            fontSize: '12px',
            letterSpacing: '0.3em',
            color: 'rgba(237,232,228,0.35)',
            textTransform: 'uppercase',
            marginBottom: '48px',
          }}
        >
          {mediumsConfig.sectionLabel}
        </p>
        <div>
          {mediums.map((item, idx) => (
            <GooeyTextRow
              key={idx}
              item={item}
              filterId={`goo-suliu-${idx}`}
              onHover={() => setHoveredIndex(idx)}
              onLeaveHover={() => setHoveredIndex(null)}
              isActive={activeIndex === idx}
              onTap={() => handleTap(idx)}
            />
          ))}
        </div>
      </div>

      {/* Right — description */}
      <div
        className="mediums-right"
        style={{
          flex: '1 1 50%',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
            maxWidth: '420px',
          }}
        >
          {hovered && (
            <>
              <p
                className="font-sans-body"
                style={{
                  fontSize: '12px',
                  letterSpacing: '0.25em',
                  color: '#30B0D0',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                }}
              >
                {hovered.en}
              </p>
              <p
                className="font-sans-body"
                style={{
                  fontSize: '22px',
                  lineHeight: 2,
                  color: 'rgba(237,232,228,0.65)',
                  fontWeight: 300,
                }}
              >
                {hovered.description}
              </p>
            </>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mediums-section {
            flex-direction: column !important;
            padding: 10vh 6vw !important;
            min-height: auto !important;
          }
          .mediums-left {
            flex: none !important;
            width: 100% !important;
          }
          .mediums-right {
            flex: none !important;
            width: 100% !important;
            min-height: 120px !important;
            padding: 24px 0 !important;
            align-items: flex-start !important;
          }
          .mediums-right > div {
            max-width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}