import { useEffect, useRef, useState } from 'react';
import './Lightbox.css';

export interface LightboxImage {
  thumbSrc: string;
  fullSrc: string;
  alt: string;
}

interface Props {
  images: LightboxImage[];
}

export default function Lightbox({ images }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const close = () => {
    setOpenIndex(null);
    triggerRef.current?.focus();
  };

  const goTo = (delta: number) => {
    setOpenIndex((i) => (i === null ? null : (i + delta + images.length) % images.length));
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

      // simple focus trap across the dialog's few focusable elements
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
  }, [openIndex]);

  return (
    <>
      <ul className="gallery" aria-label="Additional screenshots">
        {images.map((img, i) => (
          <li key={img.thumbSrc}>
            <button
              type="button"
              className="gallery__thumb-button"
              onClick={(e) => {
                triggerRef.current = e.currentTarget;
                setOpenIndex(i);
              }}
            >
              <img src={img.thumbSrc} alt={img.alt} className="gallery__image" loading="lazy" />
            </button>
          </li>
        ))}
      </ul>

      {openIndex !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={images[openIndex].alt} ref={dialogRef}>
          <div className="lightbox__backdrop" onClick={close} />
          <div className="lightbox__content">
            <button ref={closeRef} type="button" className="lightbox__close" onClick={close} aria-label="Close">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            {images.length > 1 && (
              <button type="button" className="lightbox__nav lightbox__nav--prev" aria-label="Previous image" onClick={() => goTo(-1)}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}

            <img src={images[openIndex].fullSrc} alt={images[openIndex].alt} className="lightbox__image" />

            {images.length > 1 && (
              <button type="button" className="lightbox__nav lightbox__nav--next" aria-label="Next image" onClick={() => goTo(1)}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}

            <p className="lightbox__caption">
              {images[openIndex].alt}
              {images.length > 1 && (
                <span className="lightbox__count">
                  {' '}
                  &middot; {openIndex + 1} / {images.length}
                </span>
              )}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
