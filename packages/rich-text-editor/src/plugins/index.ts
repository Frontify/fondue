/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RtePlugin } from '#/core';

import { alignPlugin } from './Align';
import { boldPlugin } from './Bold';
import { checkListPlugin } from './CheckList';
import { codePlugin } from './Code';
import { emojiPlugin } from './Emoji';
import { fontColorPlugin } from './FontColor';
import { historyPlugin } from './History';
import { italicPlugin } from './Italic';
import { linkPlugin } from './Link';
import { bulletListPlugin, numberedListPlugin } from './List';
import { pasteLinesPlugin } from './PasteLines';
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
 * The built-in plugins that need no configuration, which `RichTextEditor` mounts when given no `plugins`.
 * The toolbar draws them by `toolbarGroup` in the fixed group order, list order within a group, ungrouped plugins last.
 * Pass a subset, or spread it into your own list to add more.
 * Left out because they need arguments or change how the editor behaves: `mentionPlugin`, `columnBreakPlugin`,
 * `blurOnBreakPlugin` and `typographyPlugin`.
 */
export const defaultPlugins: readonly RtePlugin[] = Object.freeze([
    historyPlugin,
    textStylePlugin(),
    boldPlugin,
    italicPlugin,
    underlinePlugin,
    strikethroughPlugin,
    codePlugin,
    subscriptPlugin,
    superscriptPlugin,
    fontColorPlugin,
    /* @__PURE__ */ linkPlugin(),
    /* @__PURE__ */ alignPlugin(),
    bulletListPlugin,
    numberedListPlugin,
    checkListPlugin,
    quotePlugin,
    /* @__PURE__ */ resetFormattingPlugin(),
    // Default in the old editor too; it adds no node, only text.
    emojiPlugin(),
    // No toolbar of its own: a keybinding.
    softBreakPlugin,
    // Last, so the list plugins rebuild pasted lists before tables are flattened.
    pasteLinesPlugin(),
]);

export { alignPlugin } from './Align';
export { blurOnBreakPlugin } from './BlurOnBreak';
export { emojiPlugin } from './Emoji';
export { linkPlugin } from './Link';
export { pasteLinesPlugin } from './PasteLines';
export { resetFormattingPlugin } from './ResetFormatting';
export { typographyPlugin } from './Typography';
