/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AlignPlugin } from './Align/Align';
import { AutoformatPlugin } from './Autoformat/Autoformat';
import { BoldPlugin } from './Bold/Bold';
import { CheckListPlugin } from './CheckList/CheckList';
import { CodePlugin } from './Code/Code';
import { EmojiPlugin } from './Emoji/Emoji';
import { FontColorPlugin } from './FontColor/FontColor';
import { ImagePlugin } from './Image/Image';
import { ItalicPlugin } from './Italic/Italic';
import { LinkPlugin } from './Link/Link';
import { BulletListPlugin, NumberedListPlugin } from './List/List';
import { QuotePlugin } from './Quote/Quote';
import { ResetFormattingPlugin } from './ResetFormatting/ResetFormatting';
import { SoftBreakPlugin } from './SoftBreak/SoftBreak';
import { StrikethroughPlugin } from './Strikethrough/Strikethrough';
import { SubscriptPlugin } from './Subscript/Subscript';
import { SuperscriptPlugin } from './Superscript/Superscript';
import { TextStylePlugin } from './TextStyle/TextStyle';
import { UnderlinePlugin } from './Underline/Underline';

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
