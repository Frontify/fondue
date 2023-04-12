/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TargetValue } from '../types';

export type NodeChild = {
    type: string;
    value?: string;
    text?: string;
    target?: TargetValue;
    children?: NodeChild[];
};

export type TreeNode = {
    type: string;
    target?: TargetValue;
    children: NodeChild[];
};

export type NodeChildKey = keyof NodeChild;

export type RemarkExtension = (tree: TreeNode) => void;
