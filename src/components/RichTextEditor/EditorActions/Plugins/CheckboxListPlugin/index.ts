/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createPluginFactory } from '@udecode/plate';
import { CHECKBOX_LIST_PLUGIN, ELEMENT_CHECK_ITEM } from './id';
import { CheckboxListElement } from './CheckboxListElement';
import { CheckboxListButton } from './CheckboxListButton';
import { Plugin } from '../Plugin';

export const createCheckboxListPlugin = createPluginFactory({
    key: ELEMENT_CHECK_ITEM,
    isElement: true,
});

export class CheckboxListPlugin extends Plugin {
    constructor(id = CHECKBOX_LIST_PLUGIN, button = CheckboxListButton, markupElement = new CheckboxListElement()) {
        super(id, button, markupElement);
    }

    plugins() {
        return [createCheckboxListPlugin()];
    }
}
