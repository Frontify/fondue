/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode, Suspense } from 'react';

/** An overlay's body: one whose code loads lazily suspends here, so the surface stays mounted and editable. */
export const OverlayBody = ({ children }: { children: ReactNode }) => <Suspense fallback={null}>{children}</Suspense>;
OverlayBody.displayName = 'OverlayBody';
