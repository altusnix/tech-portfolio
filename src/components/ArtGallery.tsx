import { useEffect, useRef, useState } from 'react';
import './Lightbox.css';
import './ArtGallery.css';

export interface ArtPiece {
  title: string;
  venue: string;
  city: string;
  date: string;
  year: string;
  thumbSrc: string;
  fullSrc: string;
}

interface Props {
  pieces: ArtPiece[];
  years: string[];
}

export default function ArtGallery({ pieces, years }: Props) {
  const [filter, setFilter] = useState('all');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const visible = filter === 'all' ? pieces : pieces.filter((p) => p.year === filter);

  const close = () => {
    setOpenIndex(null);
    triggerRef.current?.focus();
  };

  const goTo = (delta: number) => {
    setOpenIndex((i) => (i === null ? null : (i + delta + visible.length) % visible.length));
  };

  const preventSave = (e: React.MouseEvent) => e.preventDefault();

  const selectFilter = (next: string) => {
    setFilter(next);
    setOpenIndex(null);
  };

  useEffect(() => {
    if (openIndex === null) return;

    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        close();
        return;
      }
      if (e.key === 'ArrowRight') goTo(1);
      if (e.key === 'ArrowLeft') goTo(-1);

      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>('button');
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openIndex, visible.length]);

  const current = openIndex !== null ? visible[openIndex] : null;

  return (
    <>
      <div className="art-gallery__filters" role="group" aria-label="Filter by year">
        <button
          type="button"
          className="art-gallery__pill"
          aria-pressed={filter === 'all'}
          onClick={() => selectFilter('all')}
        >
          All
        </button>
        {years.map((year) => (
          <button
            key={year}
            type="button"
            className="art-gallery__pill"
            aria-pressed={filter === year}
            onClick={() => selectFilter(filter === year ? 'all' : year)}
          >
            {year}
          </button>
        ))}
      </div>
      <p className="art-gallery__count" aria-live="polite">
        {visible.length} piece{visible.length === 1 ? '' : 's'}
      </p>

      <ul className="art-gallery__grid">
        {visible.map((piece, i) => (
          <li key={piece.title + piece.date}>
            <button
              type="button"
              className="art-gallery__card"
              onClick={(e) => {
                triggerRef.current = e.currentTarget;
                setOpenIndex(i);
              }}
            >
              <img
                src={piece.thumbSrc}
                alt={piece.title}
                className="art-gallery__thumb"
                loading="lazy"
                draggable={false}
                onContextMenu={preventSave}
              />
              <span className="art-gallery__caption">
                <span className="art-gallery__title">{piece.title}</span>
                <span className="art-gallery__venue">{piece.venue}, {piece.city}</span>
                <span className="art-gallery__date">{piece.date}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {current && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={current.title} ref={dialogRef}>
          <div className="lightbox__backdrop" onClick={close} />
          <div className="lightbox__content">
            <button ref={closeRef} type="button" className="lightbox__close" onClick={close} aria-label="Close">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            {visible.length > 1 && (
              <button type="button" className="lightbox__nav lightbox__nav--prev" aria-label="Previous image" onClick={() => goTo(-1)}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}

            <img
              src={current.fullSrc}
              alt={current.title}
              className="lightbox__image art-gallery__lightbox-image"
              draggable={false}
              onContextMenu={preventSave}
            />

            {visible.length > 1 && (
              <button type="button" className="lightbox__nav lightbox__nav--next" aria-label="Next image" onClick={() => goTo(1)}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}

            <p className="art-gallery__lightbox-caption">
              <span className="art-gallery__lightbox-title">{current.title}</span>
              <span className="art-gallery__lightbox-meta">
                {current.venue}, {current.city} &middot; {current.date}
                {visible.length > 1 && (
                  <span className="art-gallery__lightbox-count">
                    {' '}
                    &middot; {openIndex! + 1} / {visible.length}
                  </span>
                )}
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
