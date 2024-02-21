/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Value, getNodeEntries } from '@udecode/slate';
import { PlateEditor } from '@udecode/plate-core';

export const getColumnBreakEntries = (editor: PlateEditor<Value>) => {
    return Array.from(getNodeEntries(editor, { at: [], match: (node) => !!node.breakAfterColumn }));
};
