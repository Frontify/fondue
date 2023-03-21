/* (c) Copyright Frontify Ltd., all rights reserved. */

import { VisitorResult, visit } from 'unist-util-visit';
import { NodeChild, RemarkExtension, TreeNode } from '../../types';

export default function Extension(): RemarkExtension {
    return transformer;
}

const transformer = (tree: TreeNode) => {
    visit(tree, 'listItem', visitor);

    function visitor(node: TreeNode): VisitorResult {
        const { children } = node;

        for (const child of children) {
            if (!isType(child, 'paragraph')) {
                continue;
            }

            changeTypeToListItemChild(child);
        }
    }
};

const isType = (node: NodeChild, type: string): boolean => node.type === type;
const changeTypeToListItemChild = (node: NodeChild) => (node.type = 'listItemChild');
