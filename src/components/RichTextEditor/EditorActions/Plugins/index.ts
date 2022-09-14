/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PluginComposer } from './PluginComposer';
import { OrderedListPlugin, UnorderedListPlugin } from './ListPlugin';
import { CheckboxListPlugin } from './CheckboxListPlugin';
import { BoldPlugin } from './BoldPlugin';
import { AlignCenterPlugin, AlignJustifyPlugin, AlignLeftPlugin, AlignRightPlugin } from './AlignPlugin';
import { CodePlugin } from './CodePlugin';
import { ItalicPlugin } from './ItalicPlugin';
import { UnderlinePlugin } from './UnderlinePlugin';
import { StrikethroughPlugin } from './StrikethroughPlugin';

export const defaultPlugins = new PluginComposer();
defaultPlugins
    .setPlugin([
        [new BoldPlugin(), new ItalicPlugin(), new UnderlinePlugin(), new StrikethroughPlugin(), new CodePlugin()],
    ])
    .setPlugin([[new AlignLeftPlugin(), new AlignCenterPlugin(), new AlignRightPlugin(), new AlignJustifyPlugin()]])
    .setPlugin([[new UnorderedListPlugin(), new CheckboxListPlugin(), new OrderedListPlugin()]]);

export * from './PluginComposer';
export * from './ListPlugin';
export * from './BoldPlugin';
export * from './AlignPlugin';
export * from './CheckboxListPlugin';
export * from './CodePlugin';
export * from './ItalicPlugin';
export * from './UnderlinePlugin';
export * from './StrikethroughPlugin';
