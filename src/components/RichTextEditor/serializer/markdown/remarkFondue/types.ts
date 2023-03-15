/* (c) Copyright Frontify Ltd., all rights reserved. */

export type NodeChild = {
    type: string;
    value?: string;
    text?: string;
    children?: NodeChild[];
};

export type ParagraphNode = {
    type: string;
    children: NodeChild[];
};

export type NodeChildKey = keyof NodeChild;

export type RemarkExtension = (tree: ParagraphNode) => void;
