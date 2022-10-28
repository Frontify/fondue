/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BlockType, LeafType } from 'remark-slate';

export type MdToSlateReturn = (BlockType | LeafType)[];
