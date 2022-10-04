/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createPluginFactory } from '@udecode/plate';
import { ELEMENT_QUOTE } from './id';
import { QuoteMarkupElementNode } from './QuoteMarkupElementNode';

export const createQuotePlugin = createPluginFactory({
    key: ELEMENT_QUOTE,
    isElement: true,
    component: QuoteMarkupElementNode,
});
