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

export const defaultPlugins = new PluginComposer();
defaultPlugins
    .setElement([new ListItemMarkupElement(), new ListItemContentMarkupElement()])
    .setPlugin([new BoldPlugin()])
    .setPlugin([[new AlignLeftPlugin(), new AlignCenterPlugin(), new AlignRightPlugin(), new AlignJustifyPlugin()]])
    .setPlugin([[new UnorderedListPlugin(), new OrderedListPlugin()]]);

export * from './PluginComposer';
export * from './ListPlugin';
export * from './BoldPlugin';
export * from './AlignPlugin';
