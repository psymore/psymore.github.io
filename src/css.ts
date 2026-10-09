import type { CSSProperties } from 'react';

/** Inline CSS custom properties, which React's CSSProperties type does not list. */
export function cssVars(vars: Record<`--${string}`, string | number>): CSSProperties {
  return vars as CSSProperties;
}
