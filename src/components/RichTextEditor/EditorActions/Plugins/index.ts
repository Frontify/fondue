/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PluginComposer } from './PluginComposer';
import {
    ListItemContentMarkupElement,
    ListItemMarkupElement,
    OrderedListPlugin,
    UnorderedListPlugin,
} from './ListPlugin';
import { BoldPlugin } from './BoldPlugin';
import { AlignCenterPlugin, AlignJustifyPlugin, AlignLeftPlugin, AlignRightPlugin } from './AlignPlugin';

export const defaultEditorActions = new PluginComposer();
defaultEditorActions
    .setElement([new ListItemMarkupElement(), new ListItemContentMarkupElement()])
    .setPlugin([new BoldPlugin(), [new OrderedListPlugin(), new UnorderedListPlugin()]])
    .setPlugin([[new AlignLeftPlugin(), new AlignCenterPlugin(), new AlignRightPlugin(), new AlignJustifyPlugin()]]);

export * from './ListPlugin';
export * from './BoldPlugin';
