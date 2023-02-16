/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateEditor, Value, getNodeEntries } from '@udecode/plate';
import { Location } from 'slate';
import { ColumnBreakValue, setColumnBreaks } from './setColumnBreaks';

export const updateColumnBreak = (editor: PlateEditor<Value>, at: Location, value: ColumnBreakValue) => {
    setColumnBreaks<Value>(editor, { at, value });
};

export const updateColumnBreaks = (editor: PlateEditor<Value>, columns: number) => {
    const nodeEntries = Array.from(getNodeEntries(editor, { at: [], match: (node) => !!node.breakAfterColumn }));
    console.log('update breaks');
    for (const [index, [, path]] of nodeEntries.entries()) {
        updateColumnBreak(editor, path, index < columns - 1 ? 'active' : 'inactive');
    }
};
