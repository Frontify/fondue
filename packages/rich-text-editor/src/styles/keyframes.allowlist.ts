/* (c) Copyright Frontify Ltd., all rights reserved. */

/** The only keyframes the package CSS may define, none of which changes luminance. */
export const KEYFRAMES_ALLOWLIST: readonly string[] = [
    // The gap cursor's blink, which only hides and shows a 1 px line, under `prefers-reduced-motion: no-preference`.
    'ProseMirror-cursor-blink',
];
