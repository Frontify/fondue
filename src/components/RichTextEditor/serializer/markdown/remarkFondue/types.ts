/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TargetType } from '../types';

export type NodeChild = {
    type: string;
    value?: string;
    text?: string;
    target: TargetType;
    children: NodeChild[];
};

export type TreeNode = NodeChild;

export type NodeChildKey = keyof NodeChild;

export type RemarkExtension = (tree: TreeNode) => void;
