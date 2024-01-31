/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createPluginFactory } from '@udecode/plate';
import { onKeyDownBlurOnBreak } from './onKeyDownBlurOnBreak';
import { BlurOnBreakPlatePlugin } from './types';

export const KEY_BLUR_ON_BREAK = 'blurOnBreak';

export const createBlurOnBreakPlugin = createPluginFactory<BlurOnBreakPlatePlugin>({
    key: KEY_BLUR_ON_BREAK,
    handlers: {
        onKeyDown: onKeyDownBlurOnBreak,
    },
});
