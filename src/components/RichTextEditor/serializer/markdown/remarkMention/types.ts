/* (c) Copyright Frontify Ltd., all rights reserved. */

export type NodeChild = {
    type: string;
    value?: string;
    text?: string;
    children?: NodeChild[];
};

export type NodeChildKey = keyof NodeChild;

export type ParagraphNode = Record<string, string | [] | undefined> & {
    type: string;
    children: NodeChild[];
};

export type Transformer = (tree: ParagraphNode) => void;

export type RegExpMatchArray = string[] & {
    index: number;
    input: string;
};
