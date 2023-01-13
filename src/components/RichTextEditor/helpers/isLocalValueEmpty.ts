/* (c) Copyright Frontify Ltd., all rights reserved. */

import { SlateToMarkdown, Transform } from '../serializer';
import { TreeOfNodes } from '../types';

export const isLocalValueEmpty = (value: TreeOfNodes): Promise<boolean> =>
    new Promise((resolve) => {
        const result = Transform.use<TreeOfNodes, string>(new SlateToMarkdown()).process(value);
        resolve(result.length === 0);
    });
