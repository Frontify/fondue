/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createPluginFactory } from '@udecode/plate';
import { ELEMENT_CUSTOM2 } from './id';
import { Custom2MarkupElementNode } from './Custom2MarkupElementNode';

export const createCustom2Plugin = createPluginFactory({
    key: ELEMENT_CUSTOM2,
    isElement: true,
    component: Custom2MarkupElementNode,
});
