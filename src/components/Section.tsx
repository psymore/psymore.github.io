import type { ReactNode } from 'react';

interface Props {
  id: string;
  title: string;
  children: ReactNode;
}

/** tabIndex -1 lets the skip link move focus here, not just scroll. */
export function Section({ id, title, children }: Props) {
  return (
    <section id={id} className="section" aria-labelledby={`${id}-title`} tabIndex={-1}>
      <h2 id={`${id}-title`} className="section__title">
        {title}
      </h2>
      {children}
    </section>
  );
}
