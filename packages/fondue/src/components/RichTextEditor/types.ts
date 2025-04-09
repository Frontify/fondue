/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type NodeType } from './serializer/markdown/types';

export type PlaceholderOpacity = 'low' | 'high';

export enum PaddingSizes {
    None = 'tw-p-0',
    Small = 'tw-py-2 tw-px-3',
    Medium = 'tw-p-5',
    Large = 'tw-p-6',
    XLarge = 'tw-p-8',
}

export type TreeOfNodes = NodeType[];
