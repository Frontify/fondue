/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createPluginFactory } from '@udecode/plate';
import { CheckboxListElement } from './CheckboxListElement';
import { CheckboxListButton } from './CheckboxListButton';
import { Plugin } from '../types';

export const ELEMENT_CHECK_ITEM = 'checkbox_item';

export const createCheckboxListPlugin = createPluginFactory({
    key: ELEMENT_CHECK_ITEM,
    isElement: true,
});

export class CheckboxListPlugin implements Plugin {
    public id = ELEMENT_CHECK_ITEM;
    public element = CheckboxListElement;
    public button = CheckboxListButton;

    plugins() {
        return [createCheckboxListPlugin()];
    }
}
