/* (c) Copyright Frontify Ltd., all rights reserved. */

// One folder per plugin, plus `shared/` for what plugins are built *out of* —
// the toolbar button they all use. Nothing under `shared/` is a plugin, and it
// plays by the same rules as one: it may reach for the core (`#/core`) and
// nothing else. UI only one plugin needs stays with that plugin (Mention's
// picker, Link's flyout).

// The `@frontify/fondue-rich-text-editor/plugins` package entry: every export here is public API.

// --- Plugins ---

export { defaultPlugins } from './defaultPlugins';
export { defaultContent } from './defaultContent';
export { alignContent, alignPlugin } from './Align';
export { blurOnBreakPlugin } from './BlurOnBreak';
export { boldContent, boldPlugin } from './Bold';
export { checkListContent, checkListPlugin } from './CheckList';
export { codeContent, codePlugin } from './Code';
export { codeBlockContent, codeBlockPlugin } from './CodeBlock';
export { columnBreakContent, columnBreakPlugin } from './ColumnBreak';
export { defaultEmojis, emojiPlugin } from './Emoji';
export { fontColorContent, fontColorPlugin } from './FontColor';
export { historyPlugin } from './History';
export { italicContent, italicPlugin } from './Italic';
export { linkContent, linkPlugin } from './Link';
export { bulletListContent, bulletListPlugin, numberedListContent, numberedListPlugin } from './List';
export { mentionContent, mentionPlugin } from './Mention';
export { quoteContent, quotePlugin } from './Quote';
export { resetFormattingPlugin } from './ResetFormatting';
export { softBreakContent, softBreakPlugin } from './SoftBreak';
export { strikethroughContent, strikethroughPlugin } from './Strikethrough';
export { subscriptContent, subscriptPlugin } from './Subscript';
export { superscriptContent, superscriptPlugin } from './Superscript';
export { tableContent, tablePlugin } from './Table';
export { textStyleContent, textStylePlugin } from './TextStyle';
export { typographyPlugin } from './Typography';
export { underlineContent, underlinePlugin } from './Underline';

// --- Plugin options ---

export { type BlurOnBreakPluginOptions } from './BlurOnBreak';
export { type ColumnBreakPluginOptions } from './ColumnBreak';
export { type EmojiItem, type EmojiPluginOptions } from './Emoji';
export {
    type ButtonHoverLook,
    type ButtonLink,
    type ButtonLook,
    type LinkAppearance,
    type LinkContentOptions,
    type LinkDestination,
    type LinkKind,
    type LinkLook,
    type LinkPluginOptions,
    type LinkSearch,
    type TextLink,
    type TextLinkLook,
} from './Link';
export {
    type BulletLevelLook,
    type BulletListLook,
    type BulletListPluginOptions,
    type ListLook,
    type NumberedLevelLook,
    type NumberedListLook,
    type NumberedListPluginOptions,
} from './List';
export { type MentionContentOptions, type MentionItem, type MentionPluginOptions, type MentionValue } from './Mention';
export { type TextLook } from '#/core';
export {
    type TextStyleContentOptions,
    type TextStyleName,
    type TextStylePluginOptions,
    type TextStyleLook,
} from './TextStyle';
export { type TypographyGroup, type TypographyPluginOptions } from './Typography';
