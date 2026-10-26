/* (c) Copyright Frontify Ltd., all rights reserved. */

import { lazyPart } from '#/bridge/pluginApi/define';

export const AltTextDialog = lazyPart(() =>
    import('../components/AltTextDialog').then((loaded) => loaded.AltTextDialog),
);
AltTextDialog.displayName = 'AltTextDialog';
export const WidthDialog = lazyPart(() => import('../components/WidthDialog').then((loaded) => loaded.WidthDialog));
WidthDialog.displayName = 'WidthDialog';
export const UploadSlot = lazyPart(() => import('../components/UploadSlot').then((loaded) => loaded.UploadSlot));
UploadSlot.displayName = 'UploadSlot';
export const UploadControls = lazyPart(() =>
    import('../components/UploadControls').then((loaded) => loaded.UploadControls),
);
UploadControls.displayName = 'UploadControls';
