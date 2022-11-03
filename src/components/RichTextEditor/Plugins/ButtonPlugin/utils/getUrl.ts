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

export const getLegacyUrl = (editor: PlateEditor) => {
    return getLinkNode(editor, (link) => link.chosenLink?.searchResult?.link || '');
};

export const getUrl = (editor: PlateEditor) => {
    return getLinkNode(editor, (link) => link.url || '');
};

export const getUrlFromLinkOrLegacyLink = (link: TButtonElement): string => {
    return link.url || link.chosenLink?.searchResult?.link || '';
};

export const getUrlFromEditor = (editor: PlateEditor) => {
    return getLinkNode(editor, getUrlFromLinkOrLegacyLink);
};
