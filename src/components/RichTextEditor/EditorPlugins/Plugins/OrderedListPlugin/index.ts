/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ELEMENT_OL, createListPlugin } from '@udecode/plate';
import { OrderedListElement } from './OrderedListElement';
import { OrderedListButton } from './OrderedListButton';
import { Plugin } from '../types';

export class OrderedListPlugin implements Plugin {
    public id = ELEMENT_OL;
    public element = OrderedListElement;
    public button = OrderedListButton;

    plugins() {
        return [createListPlugin()];
    }
}
