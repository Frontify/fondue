/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RtePlugin } from '#/core';

import { alignPlugin } from './Align';
import { autoformatPlugin } from './Autoformat';
import { boldPlugin } from './Bold';
import { checkListPlugin } from './CheckList';
import { codePlugin } from './Code';
import { fontColorPlugin } from './FontColor';
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

// One folder per plugin, plus `shared/` for what plugins are built *out of* —
// the toolbar button they all use. Nothing under `shared/` is a plugin, and it
// plays by the same rules as one: it may reach for the core (`#/core`) and
// nothing else. UI only one plugin needs stays with that plugin (Mention's
// picker, Link's flyout).

/**
 * The built-in plugins that need no configuration, in toolbar order — what
 * `RichTextEditor` and `RichTextRenderer` mount when given no `plugins`. Pass a
 * subset, or spread it into a list of your own to add more.
 *
 * Left out on purpose, because they need arguments or change how the editor
 * behaves: `mentionPlugin` (needs the people to mention), `columnBreakPlugin`
 * (lays the content out in columns) and `blurOnBreakPlugin` (makes Enter
 * commit instead of adding a paragraph).
 */
export const defaultPlugins: readonly RtePlugin[] = Object.freeze([
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
    resetFormattingPlugin(),
    // No toolbar of their own: a keybinding and a set of typing rules.
    softBreakPlugin(),
    autoformatPlugin(),
]);
