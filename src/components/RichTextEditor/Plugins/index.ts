/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AlignCenterPlugin, AlignJustifyPlugin, AlignLeftPlugin, AlignRightPlugin } from './AlignPlugin';
import { BoldPlugin } from './BoldPlugin';
import { ButtonPlugin } from './ButtonPlugin';
import { CheckboxListPlugin } from './CheckboxListPlugin';
import { CodePlugin } from './CodePlugin';
import { EmojiPlugin } from './EmojiPlugin';
import { SoftBreakPlugin } from './SoftBreakPlugin';
import { ItalicPlugin } from './ItalicPlugin';
import { LinkPlugin } from './LinkPlugin';
import { OrderedListPlugin, UnorderedListPlugin } from './ListPlugin';
import { ParagraphPlugin } from './ParagraphPlugin';
import { PluginComposer } from './PluginComposer';
import { ResetFormattingPlugin } from './ResetFormattingPlugin';
import { StrikethroughPlugin } from './StrikethroughPlugin';
import { UnderlinePlugin } from './UnderlinePlugin';

export const defaultPlugins = new PluginComposer();
defaultPlugins
    .setPlugin(new SoftBreakPlugin(), new ParagraphPlugin())
    .setPlugin(
        [
            new BoldPlugin(),
            new ItalicPlugin(),
            new UnderlinePlugin(),
            new StrikethroughPlugin(),
            new LinkPlugin(),
            new ButtonPlugin(),
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
export * from './BoldPlugin';
export * from './ColumnBreakPlugin';
export * from './ButtonPlugin';
export * from './CheckboxListPlugin';
export * from './CodePlugin';
export * from './EmojiPlugin';
export * from './GeneratePlugins';
export * from './SoftBreakPlugin';
export * from './ItalicPlugin';
export * from './LinkPlugin';
export * from './ListPlugin';
export * from './MentionPlugin';
export * from './ParagraphPlugin';
export * from './PluginComposer';
export * from './ResetFormattingPlugin';
export * from './StrikethroughPlugin';
export * from './TextStylePlugin';
export * from './UnderlinePlugin';
export * from './BlurOnBreakPlugin';
export * from './MarkupElement';
export * from './helper';
export type { PluginButtonProps } from './types';
