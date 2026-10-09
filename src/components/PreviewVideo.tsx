import { useCallback, useEffect, useRef, useState } from 'react';
import { canAutoPreview, previewGroup } from '../preview';

interface Props {
  src: string;
  labels: { play: string; pause: string };
}

/**
 * Silent preview over the poster. Nothing loads until the first intent:
 * hover/focus on precise pointers, otherwise an explicit button.
 */
export function PreviewVideo({ src, labels }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  // null during prerender and the first client render, so hydration matches.
  const [auto, setAuto] = useState<boolean | null>(null);
  const [playing, setPlaying] = useState(false);

  const start = useCallback(() => {
    const video = ref.current;
    if (!video) return;
    if (!video.getAttribute('src')) video.src = src;
    void previewGroup.play(video);
  }, [src]);

  const stop = useCallback(() => {
    if (ref.current) previewGroup.stop(ref.current);
  }, []);

  useEffect(() => {
    const matches = (query: string) => window.matchMedia(query).matches;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    setAuto(
      canAutoPreview({
        hover: matches('(hover: hover) and (pointer: fine)'),
        reducedMotion: matches('(prefers-reduced-motion: reduce)'),
        saveData: Boolean(connection?.saveData),
      }),
    );
  }, []);

  useEffect(() => {
    const card = ref.current?.closest('article');
    if (!auto || !card) return;
    let timer = 0;
    const enter = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(start, 150);
    };
    const leave = () => {
      window.clearTimeout(timer);
      stop();
    };
    const focusOut = (event: FocusEvent) => {
      if (!card.contains(event.relatedTarget as Node | null)) leave();
    };
    card.addEventListener('pointerenter', enter);
    card.addEventListener('pointerleave', leave);
    card.addEventListener('focusin', enter);
    card.addEventListener('focusout', focusOut);
    return () => {
      window.clearTimeout(timer);
      card.removeEventListener('pointerenter', enter);
      card.removeEventListener('pointerleave', leave);
      card.removeEventListener('focusin', enter);
      card.removeEventListener('focusout', focusOut);
    };
  }, [auto, start, stop]);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) stop();
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, [stop]);

  return (
    <>
      <video
        ref={ref}
        className={playing ? 'media__video is-playing' : 'media__video'}
        muted
        playsInline
        loop
        preload="none"
        aria-hidden="true"
        data-hydrate=""
        onPlaying={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      {auto === false && (
        <button type="button" className="preview-toggle" aria-pressed={playing} onClick={playing ? stop : start}>
          {playing ? labels.pause : labels.play}
        </button>
      )}
    </>
  );
}
