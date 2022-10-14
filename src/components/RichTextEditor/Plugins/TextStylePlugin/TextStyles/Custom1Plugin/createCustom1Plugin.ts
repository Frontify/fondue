/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createPluginFactory } from '@udecode/plate';
import { Custom1MarkupElementNode } from './Custom1MarkupElementNode';
import { TextStyles } from '../textStyles';

export const createCustom1Plugin = createPluginFactory({
    key: TextStyles.ELEMENT_CUSTOM1,
    isElement: true,
    component: Custom1MarkupElementNode,
});
