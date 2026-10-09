import type { ReactNode } from 'react';

interface Props {
  href: string;
  /** Screen-reader-only text appended to the visible label, e.g. ": Metronome (opens in a new tab)". */
  hint: string;
  className?: string;
  children: ReactNode;
}

export function ExternalLink({ href, hint, className, children }: Props) {
  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr-only">{hint}</span>
    </a>
  );
}
