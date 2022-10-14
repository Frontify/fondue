/* (c) Copyright Frontify Ltd., all rights reserved. */

import { LIST_PLUGIN } from '../id';
import { OrderedListMarkupElement } from './OrderedListMarkupElement';
import { OrderedListButton } from './OrderedListButton';
import { ListPlugin } from '../ListPlugin';
import { PluginProps } from '../../Plugin';

export class OrderedListPlugin extends ListPlugin {
    constructor(props?: PluginProps) {
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
