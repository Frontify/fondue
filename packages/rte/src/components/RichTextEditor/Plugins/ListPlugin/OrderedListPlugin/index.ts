/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ListPlugin } from '../ListPlugin';
import { LIST_PLUGIN } from '../id';
import { type ListPluginProps } from '../types';

import { OrderedListButton } from './OrderedListButton';
import { OrderedListMarkupElement } from './OrderedListMarkupElement';

export class OrderedListPlugin extends ListPlugin {
    constructor(props?: ListPluginProps) {
        super({
            id: LIST_PLUGIN,
            button: OrderedListButton,
            markupElement: new OrderedListMarkupElement(),
            ...props,
        });
    }
}

export * from './OrderedListButton';
export * from './OrderedListMarkupElement';
