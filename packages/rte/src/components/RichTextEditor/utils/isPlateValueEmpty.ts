/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type TNode } from '@udecode/slate';

import { type TreeOfNodes } from '../types';

type TextNode = { [key: string]: string };

const hasPropertyType = (node: TNode) => {
    return 'type' in node && typeof node.type === 'string' && node.type.length > 0;
};

const hasOneChild = (node: TNode) => {
    return 'children' in node && Array.isArray(node.children) && node.children.length === 1;
};

const isChildTextEmpty = (node: TextNode) => {
    return typeof node === 'object' && 'text' in node && typeof node.text === 'string' && node.text.length === 0;
};

const hasPropertyChildren = (node: TNode) => {
    return hasOneChild(node) && isChildTextEmpty((node.children as TextNode[])[0]);
};

export const isPlateValueEmpty = (value: TreeOfNodes | null) => {
    if (!value) {
        return true;
    }

    if (Array.isArray(value) && value.length < 2) {
        if (value.length === 0) {
            return true;
        }

        const node = value[0];
        if (hasPropertyType(node) && hasPropertyChildren(node)) {
            return true;
        }
    }

    return false;
};
