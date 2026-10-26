/* (c) Copyright Frontify Ltd., all rights reserved. */

import { lazyPart } from '#/bridge/define';

export const AltTextDialog = lazyPart(() => import('../components/AltTextDialog').then((loaded) => loaded.AltTextDialog));
export const WidthDialog = lazyPart(() => import('../components/WidthDialog').then((loaded) => loaded.WidthDialog));
