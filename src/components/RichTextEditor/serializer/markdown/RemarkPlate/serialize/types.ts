/* (c) Copyright Frontify Ltd., all rights reserved. */

import { InputNodeTypes } from '../astTypes';

export type Options = {
    nodeTypes: InputNodeTypes;
    listDepth: number;
    ignoreParagraphNewline: boolean;
    linkDestinationKey: string;
};
