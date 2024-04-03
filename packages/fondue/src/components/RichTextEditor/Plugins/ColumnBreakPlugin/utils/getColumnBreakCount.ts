/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PlateEditor } from '@udecode/plate-core';
import { type Value, getNodeEntries } from '@udecode/slate';

export const getColumnBreakCount = (editor: PlateEditor<Value>) => {
    return Array.from(getNodeEntries(editor, { at: [], match: (node) => !!node.breakAfterColumn })).length;
};
