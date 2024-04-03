/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ListPlugin } from '../ListPlugin';
import { LIST_PLUGIN } from '../id';
import { type ListPluginProps } from '../types';

import { UnorderedListButton } from './UnorderedListButton';
import { UnorderedListMarkupElement } from './UnorderedListMarkupElement';

export class UnorderedListPlugin extends ListPlugin {
    constructor(props?: ListPluginProps) {
        super({
            id: LIST_PLUGIN,
            button: UnorderedListButton,
            markupElement: new UnorderedListMarkupElement(),
            ...props,
        });
    }
}

export * from './UnorderedListButton';
export * from './UnorderedListMarkupElement';
