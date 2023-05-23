/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    ELEMENT_PARAGRAPH,
    createParagraphPlugin as createPlateParagraphPlugin,
    createPluginFactory,
} from '@udecode/plate';
import { ParagraphMarkupElementNode } from './ParagraphMarkupElement';

export const createParagraphPlugin = createPluginFactory({
    ...createPlateParagraphPlugin(),
    key: ELEMENT_PARAGRAPH,
    isElement: true,
    component: ParagraphMarkupElementNode,
});
