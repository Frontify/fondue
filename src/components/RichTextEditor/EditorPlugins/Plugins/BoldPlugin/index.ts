/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MARK_BOLD, createBoldPlugin } from '@udecode/plate';
import { BoldElement } from './BoldElement';
import { BoldButton } from './BoldButton';
import { Plugin } from '../types';

import { ToolbarStorage } from '../../ToolbarStorage';

export const initBoldPlugin = () => {
    const toolbarStorage = ToolbarStorage.getInstance();

    toolbarStorage.setComponent(MARK_BOLD, BoldElement);
    toolbarStorage.setPlugins([createBoldPlugin()]);
    toolbarStorage.setButton(BoldButton);
};

export class BoldPlugin implements Plugin {
    public id = MARK_BOLD;
    public element = BoldElement;
    public button = BoldButton;

    plugins() {
        return [createBoldPlugin()];
    }
}
