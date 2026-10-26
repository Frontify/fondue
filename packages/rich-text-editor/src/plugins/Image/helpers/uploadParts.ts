/* (c) Copyright Frontify Ltd., all rights reserved. */

import { lazyPart } from '#/bridge/define';

export const UploadSlot = lazyPart(() => import('../components/upload').then((loaded) => loaded.UploadSlot));
export const UploadControls = lazyPart(() => import('../components/upload').then((loaded) => loaded.UploadControls));
