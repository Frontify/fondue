/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createPluginFactory } from '@udecode/plate';
import { Heading2MarkupElementNode } from './Heading2MarkupElementNode';
import { TextStyles } from '../textStyles';

export const createHeading2Plugin = createPluginFactory({
    key: TextStyles.ELEMENT_HEADING2,
    isElement: true,
    component: Heading2MarkupElementNode,
    deserializeHtml: {
        rules: [{ validNodeName: ['h2', 'H2'] }],
    },
});
