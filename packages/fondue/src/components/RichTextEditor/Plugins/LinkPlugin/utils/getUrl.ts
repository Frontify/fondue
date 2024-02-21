/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ELEMENT_LINK } from '@udecode/plate-link';
import { PlateEditor } from '@udecode/plate-core';
import { getAboveNode } from '@udecode/slate';
import { TLinkElement } from '../types';

const getLinkNode = (editor: PlateEditor, cb: (link: TLinkElement) => string): string => {
    const linkNode = getAboveNode<TLinkElement>(editor, { match: { type: ELEMENT_LINK } });

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

export const getUrlFromLinkOrLegacyLink = (link: TLinkElement): string => {
    return link.url || link.chosenLink?.searchResult?.link || '';
};

export const getUrlFromEditor = (editor: PlateEditor) => {
    return getLinkNode(editor, getUrlFromLinkOrLegacyLink);
};
