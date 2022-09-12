/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ELEMENT_CHECK_ITEM } from '@components/RichTextEditor/EditorActions/Plugins/CheckboxListPlugin/id';
import { createPluginFactory } from '@udecode/plate';
import { CheckboxListElementNode } from '../../components';

export const createCheckboxListPlugin = createPluginFactory({
    key: ELEMENT_CHECK_ITEM,
    isElement: true,
    component: CheckboxListElementNode,
});
