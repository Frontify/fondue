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
import { TextStylePlugin } from './TextStylePlugin';
import { InitPlugin } from './InitPlugin';
import { ParagraphPlugin } from './ParagraphPlugin';
import { ButtonPlugin } from './ButtonPlugin';
import { ResetFormattingPlugin } from './ResetFormattingPlugin';
import { BreakAfterPlugin } from './BreakAfterPlugin';
import { LinkPlugin } from './LinkPlugin';
import { EmojiPlugin } from './EmojiPlugin';

export const defaultPlugins = new PluginComposer();
defaultPlugins
    .setPlugin(new InitPlugin(), new ParagraphPlugin())
    .setPlugin(new TextStylePlugin())
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

export const defaultPluginsWithColumns = new PluginComposer();
defaultPluginsWithColumns.setPlugin(
    [new InitPlugin(), new ParagraphPlugin()],
    [new TextStylePlugin()],
    [
        new BoldPlugin(),
        new ItalicPlugin(),
        new UnderlinePlugin(),
        new StrikethroughPlugin(),
        new LinkPlugin(),
        new ButtonPlugin(),
        new CodePlugin(),
        new BreakAfterPlugin(),
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

export * from './InitPlugin';
export * from './ListPlugin';
export * from './BoldPlugin';
export * from './AlignPlugin';
export * from './BreakAfterPlugin';
export * from './CheckboxListPlugin';
export * from './CodePlugin';
export * from './ResetFormattingPlugin';
export * from './ItalicPlugin';
export * from './UnderlinePlugin';
export * from './StrikethroughPlugin';
export * from './ButtonPlugin';
export * from './TextStylePlugin';
export * from './ParagraphPlugin';
export * from './EmojiPlugin';
export * from './LinkPlugin';
export * from './MentionPlugin';
