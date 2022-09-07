/* (c) Copyright Frontify Ltd., all rights reserved. */

import { LIST_PLUGIN } from '../id';
import { OrderedListMarkupElement } from './OrderedListMarkupElement';
import { OrderedListButton } from './OrderedListButton';
import { ListPlugin } from '../ListPlugin';

export class OrderedListPlugin extends ListPlugin {
    constructor(id = LIST_PLUGIN, button = OrderedListButton, markupElement = new OrderedListMarkupElement()) {
        super(id, button, markupElement);
    }
}
