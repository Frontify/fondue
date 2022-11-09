/* (c) Copyright Frontify Ltd., all rights reserved. */

import { LeafType, NodeType } from '../astTypes';

export const isLeafNode = (node: NodeType): node is LeafType => !('type' in node);
