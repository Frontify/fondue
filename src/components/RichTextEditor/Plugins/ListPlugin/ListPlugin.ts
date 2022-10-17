/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createListPlugin } from '@udecode/plate';
import { Plugin, PluginProps } from '../Plugin';
import { LIST_PLUGIN } from './id';
import { ListItemContentMarkupElement } from './ListItemContentMarkupElement';
import { ListItemMarkupElement } from './ListItemMarkupElement';

export class ListPlugin extends Plugin {
    constructor(props?: PluginProps) {
        super(LIST_PLUGIN, {
            leafMarkupElements: [new ListItemContentMarkupElement(), new ListItemMarkupElement()],
            ...props,
        });
    }

    plugins() {
        return [createListPlugin()];
    }
}
