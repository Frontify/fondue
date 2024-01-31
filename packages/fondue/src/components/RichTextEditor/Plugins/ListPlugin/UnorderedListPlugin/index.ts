/* (c) Copyright Frontify Ltd., all rights reserved. */

import { LIST_PLUGIN } from '../id';
import { UnorderedListMarkupElement } from './UnorderedListMarkupElement';
import { UnorderedListButton } from './UnorderedListButton';
import { ListPlugin } from '../ListPlugin';
import { ListPluginProps } from '../types';

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
