/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createPluginFactory } from '@udecode/plate';
import { Custom2MarkupElementNode } from './Custom2MarkupElementNode';
import { TextStyles } from '../textStyles';

export const createCustom2Plugin = createPluginFactory({
    key: TextStyles.ELEMENT_CUSTOM2,
    isElement: true,
    component: Custom2MarkupElementNode,
});
