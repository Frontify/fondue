/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ContentNodeJSON } from '#/model';
import { islandText } from '#/model/internal';

/** The stored nodes that replace an island with its text: a paragraph per line for a block, else one run of text with spaces for line breaks. */
export const islandReplacement = (inline: boolean, original: unknown): readonly ContentNodeJSON[] => {
    const text = islandText(original);
    if (inline) {
        if (text === '') {
            return [];
        }

        return [{ type: 'text', text: text.replaceAll('\n', ' ') }];
    }

    return text.split('\n').map((line): ContentNodeJSON => {
        if (line === '') {
            return { type: 'paragraph' };
        }

        return { type: 'paragraph', content: [{ type: 'text', text: line }] };
    });
};
