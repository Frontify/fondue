/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PluginComposer } from './PluginComposer';
import { OrderedListPlugin, UnorderedListPlugin } from './ListPlugin';
import { CheckboxListPlugin } from './CheckboxListPlugin';
import { BoldPlugin } from './BoldPlugin';
import { AlignCenterPlugin, AlignJustifyPlugin, AlignLeftPlugin, AlignRightPlugin } from './AlignPlugin';
import { CodePlugin } from './CodePlugin';
import { ItalicPlugin } from './ItalicPlugin';
import { MentionPlugin } from './MentionPlugin';

import { mentionable } from '../../utils/exampleValues';

export const defaultPlugins = new PluginComposer();
defaultPlugins
    .setPlugin([[new BoldPlugin(), new ItalicPlugin(), new CodePlugin()]])
    .setPlugin([[new AlignLeftPlugin(), new AlignCenterPlugin(), new AlignRightPlugin(), new AlignJustifyPlugin()]])
    .setPlugin([[new UnorderedListPlugin(), new CheckboxListPlugin(), new OrderedListPlugin()]]);

export const mentionPlugins = new PluginComposer();
mentionPlugins
    .setPlugin([new MentionPlugin({ mentionableItems: mentionable })])
    .setPlugin([[new UnorderedListPlugin(), new OrderedListPlugin()]])
    .setPlugin([new BoldPlugin()]);

export * from './PluginComposer';
export * from './ListPlugin';
export * from './BoldPlugin';
export * from './AlignPlugin';
export * from './CheckboxListPlugin';
export * from './CodePlugin';
export * from './ItalicPlugin';
export * from './MentionPlugin';
