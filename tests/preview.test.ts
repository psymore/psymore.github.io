import { describe, expect, it } from 'vitest';
import { canAutoPreview, createPreviewGroup, type Playable } from '../src/preview';

function fakeVideo(fails = false) {
  const video = {
    playing: false,
    async play() {
      if (fails) throw new Error('NotAllowedError');
      video.playing = true;
    },
    pause() {
      video.playing = false;
    },
  };
  return video satisfies Playable;
}

describe('preview group', () => {
  it('plays one preview at a time', async () => {
    const group = createPreviewGroup();
    const a = fakeVideo();
    const b = fakeVideo();
    await group.play(a);
    await group.play(b);
    expect(a.playing).toBe(false);
    expect(b.playing).toBe(true);
    expect(group.current()).toBe(b);
  });

  it('stops and forgets the active preview', async () => {
    const group = createPreviewGroup();
    const a = fakeVideo();
    await group.play(a);
    group.stop(a);
    expect(a.playing).toBe(false);
    expect(group.current()).toBeNull();
  });

  it('forgets a preview the browser refused to play', async () => {
    const group = createPreviewGroup();
    await group.play(fakeVideo(true));
    expect(group.current()).toBeNull();
  });
});

describe('canAutoPreview', () => {
  it('allows hover previews only with a precise pointer and no motion or data limits', () => {
    expect(canAutoPreview({ hover: true, reducedMotion: false, saveData: false })).toBe(true);
    expect(canAutoPreview({ hover: false, reducedMotion: false, saveData: false })).toBe(false);
    expect(canAutoPreview({ hover: true, reducedMotion: true, saveData: false })).toBe(false);
    expect(canAutoPreview({ hover: true, reducedMotion: false, saveData: true })).toBe(false);
  });
});
