/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AlignPlugin } from './Align';
import { AutoformatPlugin } from './Autoformat';
import { BoldPlugin } from './Bold';
import { CheckListPlugin } from './CheckList';
import { CodePlugin } from './Code';
import { EmojiPlugin } from './Emoji';
import { FontColorPlugin } from './FontColor';
import { ImagePlugin } from './Image';
import { ItalicPlugin } from './Italic';
import { LinkPlugin } from './Link';
import { BulletListPlugin, NumberedListPlugin } from './List';
import { QuotePlugin } from './Quote';
import { ResetFormattingPlugin } from './ResetFormatting';
import { SoftBreakPlugin } from './SoftBreak';
import { StrikethroughPlugin } from './Strikethrough';
import { SubscriptPlugin } from './Subscript';
import { SuperscriptPlugin } from './Superscript';
import { TextStylePlugin } from './TextStyle';
import { UnderlinePlugin } from './Underline';

/**
 * Convenience bundle of the built-in plugins that need no configuration, in
 * toolbar order. Nothing is mounted automatically — pass these (or a subset) to
 * RichTextEditor.
 *
 * Left out on purpose, because they change the editor's behaviour or need
 * arguments: `MentionPlugin` (needs the mentionable items), `ColumnBreakPlugin`
 * (lays the content out in columns) and `BlurOnBreakPlugin` (makes Enter commit
 * instead of adding a paragraph).
 */
export const defaultPlugins = [
    new TextStylePlugin(),
    new BoldPlugin(),
    new ItalicPlugin(),
    new UnderlinePlugin(),
    new StrikethroughPlugin(),
    new CodePlugin(),
    new SubscriptPlugin(),
    new SuperscriptPlugin(),
    new FontColorPlugin(),
    new LinkPlugin(),
    new AlignPlugin(),
    new BulletListPlugin(),
    new NumberedListPlugin(),
    new CheckListPlugin(),
    new QuotePlugin(),
    new ImagePlugin(),
    new EmojiPlugin(),
    new ResetFormattingPlugin(),
    // No toolbar of their own: a keybinding and a set of typing rules.
    new SoftBreakPlugin(),
    new AutoformatPlugin(),
];
