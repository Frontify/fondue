/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createPluginFactory } from '@udecode/plate-core';
import { onKeyDownBlurOnBreak } from './onKeyDownBlurOnBreak';
import { BlurOnBreakPlatePlugin } from './types';

export const KEY_BLUR_ON_BREAK = 'blurOnBreak';

export const createBlurOnBreakPlugin: ReturnType<typeof createPluginFactory<BlurOnBreakPlatePlugin>> =
    createPluginFactory<BlurOnBreakPlatePlugin>({
        key: KEY_BLUR_ON_BREAK,
        handlers: {
            onKeyDown: onKeyDownBlurOnBreak,
        },
    });
