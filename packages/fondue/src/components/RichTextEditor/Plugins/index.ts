/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AlignCenterPlugin, AlignJustifyPlugin, AlignLeftPlugin, AlignRightPlugin } from './AlignPlugin';
import { CheckboxListPlugin } from './CheckboxListPlugin';
import { EmojiPlugin } from './EmojiPlugin';
import { SoftBreakPlugin } from './SoftBreakPlugin';
import { BoldPlugin, CodePlugin, ItalicPlugin, StrikethroughPlugin, UnderlinePlugin } from './MarkPlugin';
import { LinkPlugin } from './LinkPlugin';
import { OrderedListPlugin, UnorderedListPlugin } from './ListPlugin';
import { PluginComposer } from './PluginComposer';
import { ResetFormattingPlugin } from './ResetFormattingPlugin';
import { ParagraphPlugin, TextStylePlugin } from './TextStylePlugin';

export const defaultPlugins = new PluginComposer();
defaultPlugins
    .setPlugin(new SoftBreakPlugin())
    .setPlugin(new TextStylePlugin({ textStyles: [new ParagraphPlugin()] }))
    .setPlugin(
        [
            new BoldPlugin(),
            new ItalicPlugin(),
            new UnderlinePlugin(),
            new StrikethroughPlugin(),
            new LinkPlugin(),
            new CodePlugin(),
        ],
        [
            new AlignLeftPlugin(),
            new AlignCenterPlugin(),
            new AlignRightPlugin(),
            new AlignJustifyPlugin(),
            new UnorderedListPlugin(),
            new CheckboxListPlugin(),
            new OrderedListPlugin(),
            new ResetFormattingPlugin(),
            new EmojiPlugin(),
        ],
    );

export * from './Plugin';
export * from './AlignPlugin';
export * from './AutoformatPlugin';
export * from './ColumnBreakPlugin';
export * from './CheckboxListPlugin';
export * from './EmojiPlugin';
export * from './GeneratePlugins';
export * from './SoftBreakPlugin';
export * from './MarkPlugin';
export * from './LinkPlugin';
export * from './ListPlugin';
export * from './MentionPlugin';
export * from './PluginComposer';
export * from './ResetFormattingPlugin';
export * from './TextStylePlugin';
export * from './BlurOnBreakPlugin';
export * from './MarkupElement';
export * from './helper';
export type { PluginButtonProps } from './types';
