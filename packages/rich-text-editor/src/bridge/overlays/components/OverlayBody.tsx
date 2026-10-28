/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode, Suspense } from 'react';

/** The props of `OverlayBody`. */
export type OverlayBodyProps = {
    /** The overlay's content. */
    children: ReactNode;
};

/** An overlay's body: one whose code loads lazily suspends here, so the surface stays mounted and editable. */
export const OverlayBody = ({ children }: OverlayBodyProps) => <Suspense fallback={null}>{children}</Suspense>;
OverlayBody.displayName = 'OverlayBody';
