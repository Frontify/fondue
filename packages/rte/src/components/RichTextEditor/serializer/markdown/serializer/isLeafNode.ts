/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type LeafType, type NodeType } from '../types';

export const isLeafNode = (node: NodeType): node is LeafType => !('type' in node);
