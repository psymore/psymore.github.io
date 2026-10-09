/** Anything that plays like a <video>; lets tests use plain objects. */
export interface Playable {
  play(): Promise<void>;
  pause(): void;
}

/** Keeps at most one preview playing at a time. */
export function createPreviewGroup() {
  let active: Playable | null = null;
  return {
    async play(item: Playable): Promise<void> {
      if (active && active !== item) active.pause();
      active = item;
      try {
        await item.play();
      } catch {
        // Autoplay refused or source failed: the poster simply stays.
        if (active === item) active = null;
      }
    },
    stop(item: Playable): void {
      item.pause();
      if (active === item) active = null;
    },
    current(): Playable | null {
      return active;
    },
  };
}

export const previewGroup = createPreviewGroup();

export interface PreviewEnv {
  hover: boolean;
  reducedMotion: boolean;
  saveData: boolean;
}

/** Hover previews only on precise pointers, never with reduced motion or Save-Data. */
export function canAutoPreview(env: PreviewEnv): boolean {
  return env.hover && !env.reducedMotion && !env.saveData;
}
