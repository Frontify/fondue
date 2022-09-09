/* (c) Copyright Frontify Ltd., all rights reserved. */

import { LIST_PLUGIN } from '../id';
import { UnorderedListMarkupElement } from './UnorderedListMarkupElement';
import { UnorderedListButton } from './UnorderedListButton';
import { ListPlugin } from '../ListPlugin';

export class UnorderedListPlugin extends ListPlugin {
    constructor(id = LIST_PLUGIN, button = UnorderedListButton, markupElement = new UnorderedListMarkupElement()) {
        super(id, button, markupElement);
    }
}
