/* (c) Copyright Frontify Ltd., all rights reserved. */

import { RemarkExtension, TreeNode } from './types';
import remarkMention from './extensions/mention';
import remarkList from './extensions/list';
import remarkLink from './extensions/link';

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
