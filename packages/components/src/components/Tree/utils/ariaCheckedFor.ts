/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RowCheckedState } from './computeCheckedStates';

/**
 * Maps a row's checked state onto `aria-checked`. VoiceOver needs the literal strings —
 * booleans silently announce "selected" instead of the checkbox state.
 */
export const ariaCheckedFor = (state: RowCheckedState): 'true' | 'false' | 'mixed' => {
    if (state === true) {
        return 'true';
    }
    if (state === 'indeterminate') {
        return 'mixed';
    }
    return 'false';
};
