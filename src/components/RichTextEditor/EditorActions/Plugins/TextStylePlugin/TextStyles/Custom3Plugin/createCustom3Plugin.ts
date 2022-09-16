/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createPluginFactory } from '@udecode/plate';
import { ELEMENT_CUSTOM3 } from './id';
import { Custom3MarkupElementNode } from './Custom3MarkupElementNode';

export const createCustom3Plugin = createPluginFactory({
    key: ELEMENT_CUSTOM3,
    isElement: true,
    component: Custom3MarkupElementNode,
});
