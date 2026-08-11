/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AlignPlugin } from './align';
import { AutoformatPlugin } from './autoformat';
import { BoldPlugin } from './bold';
import { CheckListPlugin } from './checkList';
import { CodePlugin } from './code';
import { EmojiPlugin } from './emoji';
import { FontColorPlugin } from './fontColor';
import { HeadingPlugin } from './heading';
import { ImagePlugin } from './image';
import { ItalicPlugin } from './italic';
import { LinkPlugin } from './link';
import { BulletListPlugin, NumberedListPlugin } from './list';
import { QuotePlugin } from './quote';
import { ResetFormattingPlugin } from './resetFormatting';
import { SoftBreakPlugin } from './softBreak';
import { StrikethroughPlugin } from './strikethrough';
import { SubscriptPlugin } from './subscript';
import { SuperscriptPlugin } from './superscript';
import { TextStylePlugin } from './textStyle';
import { UnderlinePlugin } from './underline';

/**
 * Convenience bundle of the built-in plugins that need no configuration, in
 * toolbar order. Nothing is mounted automatically — pass these (or a subset) to
 * RichTextEditor.
 *
 * Left out on purpose, because they change the editor's behaviour or need
 * arguments: `createMentionPlugin` (needs the mentionable items),
 * `createColumnBreakPlugin` (lays the content out in columns) and
 * `BlurOnBreakPlugin` (makes Enter commit instead of adding a paragraph).
 */
export const defaultPlugins = [
    HeadingPlugin,
    TextStylePlugin,
    BoldPlugin,
    ItalicPlugin,
    UnderlinePlugin,
    StrikethroughPlugin,
    CodePlugin,
    SubscriptPlugin,
    SuperscriptPlugin,
    FontColorPlugin,
    LinkPlugin,
    AlignPlugin,
    BulletListPlugin,
    NumberedListPlugin,
    CheckListPlugin,
    QuotePlugin,
    ImagePlugin,
    EmojiPlugin,
    ResetFormattingPlugin,
    // No toolbar of their own: a keybinding and a set of typing rules.
    SoftBreakPlugin,
    AutoformatPlugin,
];
