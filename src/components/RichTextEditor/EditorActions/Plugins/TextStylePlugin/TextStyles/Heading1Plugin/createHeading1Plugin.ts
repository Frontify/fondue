/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createPluginFactory } from '@udecode/plate';
import { ELEMENT_HEADING1 } from './id';
import { Heading1MarkupElementNode } from './Heading1MarkupElementNode';

export const createHeading1Plugin = createPluginFactory({
    key: ELEMENT_HEADING1,
    isElement: true,
    component: Heading1MarkupElementNode,
    deserializeHtml: {
        rules: [{ validNodeName: ['h1', 'H1'] }],
    },
});
