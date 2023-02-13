/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateEditor, Value, getNodeEntries } from '@udecode/plate';
import { setBreakWithinRange } from './setBreakWithinRange';

/**
 * Toggles breakWithinRange on breakAfterColumn elements to consider whether a column break should be applied
 */
export const toggleBreakWithinRange = (editor: PlateEditor<Value>, columns: number) => {
    const nodeEntries = Array.from(getNodeEntries(editor, { at: [], match: { breakAfterColumn: true } }));
    for (const [index, [, path]] of nodeEntries.entries()) {
        setBreakWithinRange<Value>(editor, path, columns > index + 1);
    }
};
