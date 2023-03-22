/* (c) Copyright Frontify Ltd., all rights reserved. */

import { VisitorResult, visit } from 'unist-util-visit';
import { TargetValue } from '../../../types';
import { NodeChild, RemarkExtension, TreeNode } from '../../types';

export default function Extension(): RemarkExtension {
    return transformer;
}

const transformer = (tree: TreeNode) => {
    visit(tree, 'link', visitor);

    function visitor(node: TreeNode, index: number, parent: TreeNode): VisitorResult {
        const child = parent.children[index + 1];
        updateLinkNodeWithTarget(node, child);
    }
};

const regex = new RegExp(`{:target="(${Object.values(TargetValue).join('|')})"}`);
const getTarget = (child: NodeChild): TargetValue | undefined => {
    const match = child.value?.match(regex);

    if (!match) {
        return TargetValue.SELF;
    }

    if (match[1] === '_blank') {
        return undefined;
    }

    return match[1] as TargetValue;
};
const replaceChildValue = (child: NodeChild): string => child.value?.replace(regex, '') ?? '';

const updateLinkNodeWithTarget = (node: TreeNode, child: NodeChild) => {
    if (!child) {
        return;
    }

    node.target = getTarget(child);
    child.value = replaceChildValue(child);
};
