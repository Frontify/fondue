/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createPluginFactory } from '@udecode/plate-core';
import { onKeyDownBlurOnBreak } from './onKeyDownBlurOnBreak';

export const KEY_BLUR_ON_BREAK = 'blurOnBreak';

export const createBlurOnBreakPlugin = createPluginFactory({
    key: KEY_BLUR_ON_BREAK,
    handlers: {
        onKeyDown: onKeyDownBlurOnBreak,
    },
});
