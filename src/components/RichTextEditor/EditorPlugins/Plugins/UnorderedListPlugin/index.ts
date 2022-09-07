/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ELEMENT_UL, createListPlugin } from '@udecode/plate';
import { UnorderedListElement } from './UnorderedListElement';
import { UnorderedListButton } from './UnorderedListButton';
import { Plugin } from '../types';
import { ToolbarStorage } from '../../ToolbarStorage';

export const initListPlugin = () => {
    const toolbarStorage = ToolbarStorage.getInstance();

    toolbarStorage.setComponent(ELEMENT_UL, UnorderedListElement);
    toolbarStorage.setPlugins([createListPlugin()]);
    toolbarStorage.setButton(UnorderedListButton);
};

export class UnorderedListPlugin implements Plugin {
    public id = ELEMENT_UL;
    public element = UnorderedListElement;
    public button = UnorderedListButton;

    plugins() {
        return [createListPlugin()];
    }
}
