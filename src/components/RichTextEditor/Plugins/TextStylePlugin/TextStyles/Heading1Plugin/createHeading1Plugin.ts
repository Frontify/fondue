/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createPluginFactory } from '@udecode/plate';
import { Heading1MarkupElementNode } from './Heading1MarkupElementNode';
import { TextStyles } from '../textStyles';

export const createHeading1Plugin = createPluginFactory({
    key: TextStyles.ELEMENT_HEADING1,
    isElement: true,
    component: Heading1MarkupElementNode,
    deserializeHtml: {
        rules: [{ validNodeName: ['h1', 'H1'] }],
    },
});
