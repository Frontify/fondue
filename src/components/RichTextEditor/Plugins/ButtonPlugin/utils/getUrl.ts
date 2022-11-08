/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateEditor, getAboveNode } from '@udecode/plate';
import { ELEMENT_BUTTON } from '../createButtonPlugin';
import { TButtonElement } from '../types';

const getLinkNode = (editor: PlateEditor, cb: (link: TButtonElement) => string): string => {
    const linkNode = getAboveNode<TButtonElement>(editor, { match: { type: ELEMENT_BUTTON } });

    if (!Array.isArray(linkNode)) {
        return '';
    }

    return cb(linkNode[0]);
};

export const getUrlFromEditor = (editor: PlateEditor) => {
    return getLinkNode(editor, (link) => link.url ?? '');
};
