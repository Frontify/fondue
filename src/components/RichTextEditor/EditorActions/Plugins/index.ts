/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PluginComposer } from './PluginComposer';
import { OrderedListPlugin, UnorderedListPlugin } from './ListPlugin';
import { CheckboxListPlugin } from './CheckboxListPlugin';
import { BoldPlugin } from './BoldPlugin';
import { AlignCenterPlugin, AlignJustifyPlugin, AlignLeftPlugin, AlignRightPlugin } from './AlignPlugin';

export const defaultPlugins = new PluginComposer();
defaultPlugins
    .setPlugin([new BoldPlugin()])
    .setPlugin([[new AlignLeftPlugin(), new AlignCenterPlugin(), new AlignRightPlugin(), new AlignJustifyPlugin()]])
    .setPlugin([[new UnorderedListPlugin(), new CheckboxListPlugin(), new OrderedListPlugin()]]);

export * from './PluginComposer';
export * from './ListPlugin';
export * from './BoldPlugin';
export * from './AlignPlugin';
