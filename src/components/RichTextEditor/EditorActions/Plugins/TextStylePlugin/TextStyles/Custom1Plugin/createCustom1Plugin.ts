/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createPluginFactory } from '@udecode/plate';
import { ELEMENT_CUSTOM1 } from './id';
import { Custom1MarkupElementNode } from './Custom1MarkupElementNode';

export const createCustom1Plugin = createPluginFactory({
    key: ELEMENT_CUSTOM1,
    isElement: true,
    component: Custom1MarkupElementNode,
});
