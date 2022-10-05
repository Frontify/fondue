/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createPluginFactory } from '@udecode/plate';
import { ELEMENT_HEADING4 } from './id';
import { Heading4MarkupElementNode } from './Heading4MarkupElementNode';

export const createHeading4Plugin = createPluginFactory({
    key: ELEMENT_HEADING4,
    isElement: true,
    component: Heading4MarkupElementNode,
    deserializeHtml: {
        rules: [{ validNodeName: ['h4', 'H4'] }],
    },
});
