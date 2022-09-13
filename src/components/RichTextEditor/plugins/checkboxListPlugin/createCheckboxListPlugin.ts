/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createPluginFactory } from '@udecode/plate';
import { CheckboxListElementNode } from '../../components';
import { ELEMENT_CHECK_ITEM } from '../../EditorActions/Plugins/CheckboxListPlugin/id';

export const createCheckboxListPlugin = createPluginFactory({
    key: ELEMENT_CHECK_ITEM,
    isElement: true,
    component: CheckboxListElementNode,
});
