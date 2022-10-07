/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createPluginFactory } from '@udecode/plate';
import { Heading4MarkupElementNode } from './Heading4MarkupElementNode';
import { TextStyles } from '../textStyles';

export const createHeading4Plugin = createPluginFactory({
    key: TextStyles.ELEMENT_HEADING4,
    isElement: true,
    component: Heading4MarkupElementNode,
    deserializeHtml: {
        rules: [{ validNodeName: ['h4', 'H4'] }],
    },
});
