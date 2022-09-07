/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createListPlugin } from '@udecode/plate';
import { LIST_PLUGIN } from '../id';
import { Plugin } from '../../types';
import { OrderedListMarkupElement } from './OrderedListMarkupElement';
import { OrderedListButton } from './OrderedListButton';

export class OrderedListPlugin implements Plugin {
    public type = LIST_PLUGIN;
    public markupElement = new OrderedListMarkupElement();
    public button = OrderedListButton;

    plugins() {
        return [createListPlugin()];
    }
}
