/* (c) Copyright Frontify Ltd., all rights reserved. */

import { LIST_PLUGIN } from '../id';
import { UnorderedListMarkupElement } from './UnorderedListMarkupElement';
import { UnorderedListButton } from './UnorderedListButton';
import { ListPlugin } from '../ListPlugin';
import { PluginProps } from '../../Plugin';

export class UnorderedListPlugin extends ListPlugin {
    constructor(props?: PluginProps) {
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
