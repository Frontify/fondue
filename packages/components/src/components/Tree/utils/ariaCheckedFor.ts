/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CheckedState } from '@headless-tree/core';

/**
 * Maps headless-tree's `CheckedState` enum onto the `aria-checked` attribute. VoiceOver
 * requires the literal strings — passing `true`/`false` booleans silently broadcasts
 * "selected" instead of the intended checkbox state.
 */
export const ariaCheckedFor = (state: CheckedState): 'true' | 'false' | 'mixed' => {
    if (state === CheckedState.Checked) {
        return 'true';
    }
    if (state === CheckedState.Indeterminate) {
        return 'mixed';
    }
    return 'false';
};
