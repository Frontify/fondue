/* (c) Copyright Frontify Ltd., all rights reserved. */

// Mounted by contentFocusRing.ct.tsx: a host stylesheet rendered before the editor, so it comes after the editor's CSS.

import { RichTextEditor } from '../../index';

import { CONTENT_DOCUMENT, HOST_FOCUS_RING_CSS } from './contentFocusRingValues';

export const ContentFocusRingFrame = () => (
    <>
        <style>{HOST_FOCUS_RING_CSS}</style>
        <RichTextEditor value={CONTENT_DOCUMENT} />
    </>
);
