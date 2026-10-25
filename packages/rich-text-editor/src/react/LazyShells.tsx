/* (c) Copyright Frontify Ltd., all rights reserved. */

import { lazyPart } from '#/bridge/lazyPart';

// A healthy mount never shows these, so their code and the reader they render with load apart from the first render.
export const BlockedShell = lazyPart(() => import('./Shells').then((loaded) => loaded.BlockedShell));
export const RecoveryShell = lazyPart(() => import('./Shells').then((loaded) => loaded.RecoveryShell));
