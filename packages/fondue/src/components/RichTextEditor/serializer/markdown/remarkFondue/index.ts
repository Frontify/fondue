/* (c) Copyright Frontify Ltd., all rights reserved. */

import remarkLink from './extensions/link';
import remarkList from './extensions/list';
import remarkMention from './extensions/mention';
import { type RemarkExtension, type TreeNode } from './types';

const transformer = (tree: TreeNode) => {
    const extensions = new Map<string, RemarkExtension>();

    extensions.set('mentionExtension', remarkMention());
    extensions.set('listExtension', remarkList());
    extensions.set('linkExtension', remarkLink());

    for (const extension of extensions.values()) {
        extension(tree);
    }
};

export const remarkFondue = () => transformer;
