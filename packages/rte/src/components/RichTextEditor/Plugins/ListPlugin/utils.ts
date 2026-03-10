/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PlateEditor } from '@udecode/plate-core';
import { ELEMENT_LI } from '@udecode/plate-list';
import { type TElement, getNodeAncestors } from '@udecode/slate';
import { findNodePath } from '@udecode/slate-react';

export const getNestingLevel = (editor: PlateEditor, element: TElement) => {
    const path = findNodePath(editor, element);
    if (!path) {
        return 0;
    }

    const nodeAncestors = getNodeAncestors(editor, path);
    return Array.from(nodeAncestors).filter((node) => node[0].type === ELEMENT_LI).length;
};
