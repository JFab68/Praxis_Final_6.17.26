import type { CSSProperties } from 'react';

interface TeamPortraitProps {
  name: string;
  /** Image path, or null/undefined while a photo is still to come. */
  image?: string | null;
  /** Rendered height in px — every card in a set must pass the same value so the cards match. */
  height: number | string;
  style?: CSSProperties;
}

/**
 * A staff portrait that stays the same size and shape whether or not a photo exists yet.
 *
 * When `image` is absent it renders a designed monogram panel rather than a broken
 * <img>, so a new team member can be published before their photo is ready without
 * leaving a phantom hole in the layout. Swapping in `image: '/images/<file>.webp'`
 * needs no other change.
 */
export default function TeamPortrait({ name, image, height, style }: TeamPortraitProps) {
  if (image) {
    return (
      <img
        src={image}
        alt={name}
        loading="lazy"
        style={{
          width: '100%',
          height,
          objectFit: 'cover',
          objectPosition: 'top center',
          display: 'block',
          ...style,
        }}
      />
    );
  }

  const initials = name
    .split(/\s+/)
    .filter((word) => /^[A-Za-z]/.test(word))
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();

  const numericHeight = typeof height === 'number' ? height : null;

  return (
    <div
      role="img"
      aria-label={`${name} — portrait photo coming soon`}
      style={{
        width: '100%',
        height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background:
          'linear-gradient(135deg, rgba(0, 140, 140, 0.34) 0%, rgba(91, 60, 136, 0.30) 60%, rgba(5, 10, 15, 0.9) 100%)',
        ...style,
      }}
    >
      <span
        className="font-serif-display"
        style={{
          fontSize: numericHeight ? `clamp(40px, ${Math.round(numericHeight * 0.3)}px, 96px)` : '64px',
          fontWeight: 400,
          letterSpacing: '0.06em',
          color: 'rgba(255,255,255,0.92)',
          lineHeight: 1,
        }}
      >
        {initials}
      </span>
    </div>
  );
}