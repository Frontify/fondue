/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createPluginFactory } from '@udecode/plate';
import { CheckboxItemElement } from '../components';

export const ELEMENT_CHECK_ITEM = 'checkbox_item';

export const createCheckboxListPlugin = createPluginFactory({
    key: ELEMENT_CHECK_ITEM,
    isElement: true,
    component: CheckboxItemElement,
});
