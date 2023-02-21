/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateEditor, Value, getNodeEntries } from '@udecode/plate';

export const getColumnBreakCount = (editor: PlateEditor<Value>) => {
    return Array.from(getNodeEntries(editor, { at: [], match: (node) => !!node.breakAfterColumn })).length;
};
