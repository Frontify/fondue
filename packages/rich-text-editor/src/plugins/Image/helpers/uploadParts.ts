/* (c) Copyright Frontify Ltd., all rights reserved. */

import { lazyPart } from '#/bridge/define';

export const UploadSlot = lazyPart(() => import('../components/UploadSlot').then((loaded) => loaded.UploadSlot));
export const UploadControls = lazyPart(() => import('../components/UploadControls').then((loaded) => loaded.UploadControls));
