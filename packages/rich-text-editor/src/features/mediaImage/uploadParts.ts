/* (c) Copyright Frontify Ltd., all rights reserved. */

import { lazyPart } from '#/bridge/define';

export const UploadSlot = lazyPart(() => import('./upload').then((loaded) => loaded.UploadSlot));
export const UploadControls = lazyPart(() => import('./upload').then((loaded) => loaded.UploadControls));
