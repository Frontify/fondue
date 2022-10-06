/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createPluginFactory } from '@udecode/plate';
import { Custom3MarkupElementNode } from './Custom3MarkupElementNode';
import { TextStyles } from '../textStyles';

export const createCustom3Plugin = createPluginFactory({
    key: TextStyles.ELEMENT_CUSTOM3,
    isElement: true,
    component: Custom3MarkupElementNode,
});
