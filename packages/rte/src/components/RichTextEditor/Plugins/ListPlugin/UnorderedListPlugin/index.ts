/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ListPlugin } from '../ListPlugin';
import { LIST_PLUGIN } from '../id';
import { type UnorderedListLevelStyle, type UnorderedListPluginProps } from '../types';

import { UnorderedListButton } from './UnorderedListButton';
import { UnorderedListMarkupElement, createUnorderedListNode } from './UnorderedListMarkupElement';

export class UnorderedListPlugin extends ListPlugin {
    public readonly listStyles?: UnorderedListLevelStyle[];

    constructor(props?: UnorderedListPluginProps) {
        const { listStyles, ...rest } = props ?? {};

        super({
            id: LIST_PLUGIN,
            button: UnorderedListButton,
            markupElement: new UnorderedListMarkupElement(undefined, createUnorderedListNode(listStyles)),
            ...rest,
        });

        this.listStyles = listStyles;
    }
}

export * from './UnorderedListButton';
export * from './UnorderedListMarkupElement';
