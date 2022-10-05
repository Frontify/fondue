/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createPluginFactory } from '@udecode/plate';
import { ELEMENT_HEADING3 } from './id';
import { Heading3MarkupElementNode } from './Heading3MarkupElementNode';

export const createHeading3Plugin = createPluginFactory({
    key: ELEMENT_HEADING3,
    isElement: true,
    component: Heading3MarkupElementNode,
    deserializeHtml: {
        rules: [{ validNodeName: ['h3', 'H3'] }],
    },
});
