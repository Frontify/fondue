/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BlockType, LeafType } from '../astTypes';

export const isLeafNode = (node: BlockType | LeafType): node is LeafType => {
    return typeof (node as LeafType).text === 'string';
};
