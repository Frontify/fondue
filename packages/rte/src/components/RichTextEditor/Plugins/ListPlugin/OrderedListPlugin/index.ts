/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ListPlugin } from '../ListPlugin';
import { LIST_PLUGIN } from '../id';
import { type OrderedListLevelStyle, type OrderedListPluginProps } from '../types';

import { OrderedListButton } from './OrderedListButton';
import { OrderedListMarkupElement, createOrderedListNode } from './OrderedListMarkupElement';

export class OrderedListPlugin extends ListPlugin {
    public readonly listStyles?: OrderedListLevelStyle[];

    constructor(props?: OrderedListPluginProps) {
        const { listStyles, ...rest } = props ?? {};

        super({
            id: LIST_PLUGIN,
            button: OrderedListButton,
            markupElement: new OrderedListMarkupElement(undefined, createOrderedListNode(listStyles)),
            ...rest,
        });

        this.listStyles = listStyles;
    }
}

export * from './OrderedListButton';
export * from './OrderedListMarkupElement';
