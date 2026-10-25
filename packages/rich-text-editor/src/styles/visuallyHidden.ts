/* (c) Copyright Frontify Ltd., all rights reserved. */

// Inline, since the reader renders without the editor's stylesheet; read by screen readers and never seen.
export const VISUALLY_HIDDEN = {
    position: 'absolute',
    inlineSize: 1,
    blockSize: 1,
    overflow: 'hidden',
    clipPath: 'inset(50%)',
    whiteSpace: 'nowrap',
} as const;
