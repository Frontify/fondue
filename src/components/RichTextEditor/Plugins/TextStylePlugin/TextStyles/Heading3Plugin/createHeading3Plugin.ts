/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createPluginFactory } from '@udecode/plate';
import { Heading3MarkupElementNode } from './Heading3MarkupElementNode';
import { TextStyles } from '../textStyles';

export const createHeading3Plugin = createPluginFactory({
    key: TextStyles.ELEMENT_HEADING3,
    isElement: true,
    component: Heading3MarkupElementNode,
    deserializeHtml: {
        rules: [{ validNodeName: ['h3', 'H3'] }],
    },
});
