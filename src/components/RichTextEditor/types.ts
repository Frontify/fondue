/* (c) Copyright Frontify Ltd., all rights reserved. */

import type { TNode } from '@udecode/plate';
import type { CSSProperties } from 'react';

export enum PaddingSizes {
    None = 'tw-p-0',
    Small = 'tw-p-2',
    Medium = 'tw-p-5',
    Large = 'tw-p-6',
    XLarge = 'tw-p-8',
}

export type TreeOfNodes = TNode[];

export type CSSPropertiesHover = CSSProperties & { hover?: CSSProperties };
