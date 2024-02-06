/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AlignCenterPlugin, AlignJustifyPlugin, AlignLeftPlugin, AlignRightPlugin } from './AlignPlugin';
import { BoldPlugin } from './MarkPlugin/BoldPlugin';
import { CheckboxListPlugin } from './CheckboxListPlugin';
import { CodePlugin } from './MarkPlugin/CodePlugin';
import { EmojiPlugin } from './EmojiPlugin';
import { SoftBreakPlugin } from './SoftBreakPlugin';
import { ItalicPlugin } from './MarkPlugin/ItalicPlugin';
import { LinkPlugin } from './LinkPlugin';
import { OrderedListPlugin, UnorderedListPlugin } from './ListPlugin';
import { PluginComposer } from './PluginComposer';
import { ResetFormattingPlugin } from './ResetFormattingPlugin';
import { StrikethroughPlugin } from './MarkPlugin/StrikethroughPlugin';
import { ParagraphPlugin, TextStylePlugin } from './TextStylePlugin';
import { UnderlinePlugin } from './MarkPlugin/UnderlinePlugin';

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
