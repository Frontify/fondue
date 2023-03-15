/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ParagraphNode, RemarkExtension } from './types';
import remarkMention from './extensions/mention';
import remarkList from './extensions/list';

const transformer = (tree: ParagraphNode) => {
    const extensions = new Map<string, RemarkExtension>();

    extensions.set('mentionExtension', remarkMention());
    extensions.set('listExtension', remarkList());

    for (const extension of extensions.values()) {
        extension(tree);
    }
};

export const remarkFondue = () => transformer;
