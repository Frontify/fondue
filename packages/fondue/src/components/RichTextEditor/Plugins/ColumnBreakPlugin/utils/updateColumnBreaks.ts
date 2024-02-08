/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Value, getNodeEntries } from '@udecode/slate';
import { PlateEditor } from '@udecode/plate-core';
import { TLocation } from '@udecode/slate';
import { ColumnBreakValue, setColumnBreaks } from './setColumnBreaks';

export const updateColumnBreak = (editor: PlateEditor<Value>, at: TLocation, value: ColumnBreakValue) => {
    setColumnBreaks<Value>(editor, { at, value });
};

export const updateColumnBreaks = (editor: PlateEditor<Value>, columns: number) => {
    const nodeEntries = Array.from(getNodeEntries(editor, { at: [], match: (node) => !!node.breakAfterColumn }));
    for (const [index, [, path]] of nodeEntries.entries()) {
        updateColumnBreak(editor, path, index < columns - 1 ? 'active' : 'inactive');
    }
};
