/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createPluginFactory } from '@udecode/plate';
import { QuoteMarkupElementNode } from './QuoteMarkupElementNode';
import { TextStyles } from '../textStyles';

export const createQuotePlugin = createPluginFactory({
    key: TextStyles.ELEMENT_QUOTE,
    isElement: true,
    component: QuoteMarkupElementNode,
});
