/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PluginComposer } from './PluginComposer';
import {
    ListItemContentMarkupElement,
    ListItemMarkupElement,
    OrderedListPlugin,
    UnorderedListPlugin,
} from './ListPlugin';
import { BoldPlugin } from './BoldPlugin';

export const defaultEditorActions = new PluginComposer();
defaultEditorActions
    .setElement([new ListItemMarkupElement(), new ListItemContentMarkupElement()])
    .setPlugin([new BoldPlugin(), [new OrderedListPlugin(), new UnorderedListPlugin()]]);

export * from './ListPlugin';
export * from './BoldPlugin';
