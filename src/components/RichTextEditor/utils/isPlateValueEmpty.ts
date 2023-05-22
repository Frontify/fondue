/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TNode } from '@udecode/plate';
import { TreeOfNodes } from '../types';

type TextNode = { [key: string]: string };

const hasPropertyType = (node: TNode) =>
    node.hasOwnProperty('type') && typeof node.type === 'string' && node.type.length > 0;

const hasOneChild = (node: TNode) =>
    node.hasOwnProperty('children') && Array.isArray(node.children) && node.children.length === 1;

const isChildTextEmpty = (node: TextNode) =>
    typeof node === 'object' && node.hasOwnProperty('text') && typeof node.text === 'string' && node.text.length === 0;

const hasPropertyChildren = (node: TNode) => hasOneChild(node) && isChildTextEmpty((node.children as TextNode[])[0]);

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
