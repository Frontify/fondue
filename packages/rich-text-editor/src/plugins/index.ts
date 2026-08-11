/* (c) Copyright Frontify Ltd., all rights reserved. */

import { alignPlugin } from './Align';
import { autoformatPlugin } from './Autoformat';
import { boldPlugin } from './Bold';
import { checkListPlugin } from './CheckList';
import { codePlugin } from './Code';
import { fontColorPlugin } from './FontColor';
import { imagePlugin } from './Image';
import { italicPlugin } from './Italic';
import { linkPlugin } from './Link';
import { bulletListPlugin, numberedListPlugin } from './List';
import { quotePlugin } from './Quote';
import { resetFormattingPlugin } from './ResetFormatting';
import { softBreakPlugin } from './SoftBreak';
import { strikethroughPlugin } from './Strikethrough';
import { subscriptPlugin } from './Subscript';
import { superscriptPlugin } from './Superscript';
import { textStylePlugin } from './TextStyle';
import { underlinePlugin } from './Underline';

/**
 * One folder per plugin, plus `shared/` for what plugins are built *out of*
 * rather than what they are — currently the toolbar button they all use. Nothing
 * under `shared/` is a plugin, and it plays by the same rules as one: the only
 * thing it may reach for is the domain (`#/domain`). UI only one plugin needs
 * stays with that plugin (Mention's picker, Link's panel).
 *
 * Convenience bundle of the built-in plugins that need no configuration, in
 * toolbar order. Nothing is mounted automatically — pass these (or a subset) to
 * RichTextEditor.
 *
 * Left out on purpose, because they change the editor's behaviour or need
 * arguments: `mentionPlugin` (needs the mentionable items), `columnBreakPlugin`
 * (lays the content out in columns) and `blurOnBreakPlugin` (makes Enter commit
 * instead of adding a paragraph).
 */
export const defaultPlugins = [
    textStylePlugin(),
    boldPlugin(),
    italicPlugin(),
    underlinePlugin(),
    strikethroughPlugin(),
    codePlugin(),
    subscriptPlugin(),
    superscriptPlugin(),
    fontColorPlugin(),
    linkPlugin(),
    alignPlugin(),
    bulletListPlugin(),
    numberedListPlugin(),
    checkListPlugin(),
    quotePlugin(),
    imagePlugin(),
    resetFormattingPlugin(),
    // No toolbar of their own: a keybinding and a set of typing rules.
    softBreakPlugin(),
    autoformatPlugin(),
];
