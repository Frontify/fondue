/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createPluginFactory } from '@udecode/plate';
import { ELEMENT_HEADING2 } from './id';
import { Heading2MarkupElementNode } from './Heading2MarkupElementNode';

export const createHeading2Plugin = createPluginFactory({
    key: ELEMENT_HEADING2,
    isElement: true,
    component: Heading2MarkupElementNode,
    deserializeHtml: {
        rules: [{ validNodeName: ['h2', 'H2'] }],
    },
});
