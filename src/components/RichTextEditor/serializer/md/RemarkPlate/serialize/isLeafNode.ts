/* (c) Copyright Frontify Ltd., all rights reserved. */

import { LeafType, NodeType } from '../astTypes';

export const isLeafNode = (node: NodeType): node is LeafType => {
    return typeof (node as LeafType).text === 'string';
};
