/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateEditor, Value, getNodeEntries } from '@udecode/plate';

export const getColumnBreakEntries = (editor: PlateEditor<Value>) => {
    return Array.from(getNodeEntries(editor, { at: [], match: (node) => !!node.breakAfterColumn }));
};
