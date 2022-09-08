/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createListPlugin } from '@udecode/plate';
import { MarkupElement } from '../MarkupElement';
import { Plugin } from '../Plugin';
import { PluginButton } from '../types';
import { LIST_PLUGIN } from './id';
import { ListItemContentMarkupElement } from './ListItemContentMarkupElement';
import { ListItemMarkupElement } from './ListItemMarkupElement';

export class ListPlugin extends Plugin {
    constructor(id = LIST_PLUGIN, button?: PluginButton, markupElement?: MarkupElement) {
        const leafMarkupElement = [new ListItemContentMarkupElement(), new ListItemMarkupElement()];
        super(id, button, markupElement, leafMarkupElement);
    }

    plugins() {
        return [createListPlugin()];
    }
}
