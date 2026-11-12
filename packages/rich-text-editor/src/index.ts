/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createElement, type ReactNode } from 'react';

import {
    type BlockDefinition,
    type DefaultStyle,
    type EditorControlApi,
    type EditProps,
    type HtmlSpec,
    type InlineDefinition,
    isEmpty,
    type MarkClearRule,
    type MarkDefinition,
    type MarkIgnoreRule,
    type MarkParseRule,
    type ParseRule,
    type InsertTextOptions,
    type InsertTextUndo,
    type Paste,
    type PasteHandler,
    type PasteSource,
    type RteBlockCommand,
    type RteBlockNode,
    type RteContent,
    type RteEditView,
    type RteIcon,
    type RteInlineNode,
    type RtePlugin as CorePlugin,
    type RteMarkState,
    type RteSelectionSnapshot,
    type RteToolbarEntry,
    type RteToolbarGroup,
    type RtePluginDefinition,
    type StyleParseRule,
    type ToolbarItemProps,
    toPlainText as plainText,
    type ToPlainTextOptions,
} from './core';
import { type RteBlock, type RteDocument } from './documentFormat';
import { type EditorShellProps, RichTextEditor as EditorShell } from './editor';
import { defaultPlugins } from './plugins';
import { defaultContent } from './plugins/defaultContent';
import {
    type RendererProps,
    RichTextRenderer as Renderer,
    serializeToHtml as serialize,
    type SerializeToHtmlOptions,
} from './renderer';

// The public API. Layers import inward only (core ← plugins ← renderer ← editor);
// see the README. Plugin authoring types live under `RtePlugin.*`.

// --- Editor & renderer ---

/** `TBlock` widens the document when a plugin adds blocks: `RichTextEditorProps<RteBlock | CalloutBlock>`. */
export type RichTextEditorProps<TBlock extends RteBlockNode = RteBlock> = EditorShellProps<TBlock>;

/**
 * The editor. Uses `defaultPlugins` when given no `plugins`.
 *
 * @experimental The API and document format can change in any release until 1.0.
 */
export const RichTextEditor = <TBlock extends RteBlockNode = RteBlock>(props: RichTextEditorProps<TBlock>): ReactNode =>
    createElement(EditorShell as (next: RichTextEditorProps<TBlock>) => ReactNode, {
        ...props,
        plugins: props.plugins ?? defaultPlugins,
    });

/** `TBlock` as for `RichTextEditorProps`. */
export type RichTextRendererProps<TBlock extends RteBlockNode = RteBlock> = RendererProps<TBlock>;

/**
 * A readonly view of a document; works on the server. Uses `defaultContent` when given no `plugins`.
 *
 * @experimental The API and document format can change in any release until 1.0.
 */
export const RichTextRenderer = <TBlock extends RteBlockNode = RteBlock>(
    props: RichTextRendererProps<TBlock>,
): ReactNode =>
    createElement(Renderer as (next: RichTextRendererProps<TBlock>) => ReactNode, {
        ...props,
        plugins: props.plugins ?? defaultContent,
    });

/**
 * The document as an HTML string: the reading markup `RichTextRenderer` draws,
 * as static HTML, without its screen-reader-only text (a link's new-tab note), so
 * the HTML shows nothing extra where the stylesheet is missing. No React or browser needed. Uses `defaultContent` when given no
 * `plugins`; `wrap: false` leaves out the root element. Style it with this
 * package's stylesheet (emails need the styles inlined).
 * @example
 * const html = serializeToHtml(
 *     { version: 1, blocks: [{ type: 'paragraph', children: [{ text: 'Hello', bold: true }] }] },
 *     { wrap: false },
 * );
 */
export const serializeToHtml = <TBlock extends RteBlockNode = RteBlock>(
    doc: RteDocument<TBlock>,
    options: SerializeToHtmlOptions = {},
): string => serialize(doc, { ...options, plugins: options.plugins ?? defaultContent });

// --- Document format ---

export { type RteBlock, type RteDocument, type RteDocumentWith } from './documentFormat';

export { isEmpty };

/**
 * The document's text, one line per text block. Inlines read as their plugin's
 * markup (a mention as `@jane`). Uses `defaultContent` when given no `plugins`.
 */
export const toPlainText = <TBlock extends RteBlockNode = RteBlock>(
    doc: RteDocument<TBlock>,
    options: ToPlainTextOptions = {},
): string => plainText(doc, { ...options, plugins: options.plugins ?? defaultContent });

// --- Plugins ---

export { defaultPlugins } from './plugins';
export { defaultContent } from './plugins/defaultContent';
export { alignContent, alignPlugin } from './plugins/Align';
export { blurOnBreakPlugin } from './plugins/BlurOnBreak';
export { boldContent, boldPlugin } from './plugins/Bold';
export { checkListContent, checkListPlugin } from './plugins/CheckList';
export { codeContent, codePlugin } from './plugins/Code';
export { columnBreakContent, columnBreakPlugin } from './plugins/ColumnBreak';
export { defaultEmojis, emojiPlugin } from './plugins/Emoji';
export { fontColorContent, fontColorPlugin } from './plugins/FontColor';
export { historyPlugin } from './plugins/History';
export { italicContent, italicPlugin } from './plugins/Italic';
export { linkContent, linkPlugin } from './plugins/Link';
export { bulletListContent, bulletListPlugin, numberedListContent, numberedListPlugin } from './plugins/List';
export { mentionContent, mentionPlugin } from './plugins/Mention';
export { quoteContent, quotePlugin } from './plugins/Quote';
export { resetFormattingPlugin } from './plugins/ResetFormatting';
export { softBreakContent, softBreakPlugin } from './plugins/SoftBreak';
export { strikethroughContent, strikethroughPlugin } from './plugins/Strikethrough';
export { subscriptContent, subscriptPlugin } from './plugins/Subscript';
export { superscriptContent, superscriptPlugin } from './plugins/Superscript';
export { textStyleContent, textStylePlugin } from './plugins/TextStyle';
export { typographyPlugin } from './plugins/Typography';
export { underlineContent, underlinePlugin } from './plugins/Underline';

// --- Plugin options ---

export { type ColumnBreakPluginOptions } from './plugins/ColumnBreak';
export { type EmojiItem, type EmojiPluginOptions } from './plugins/Emoji';
export {
    type LinkDestination,
    type LinkPluginOptions,
    type LinkPolicy,
    type LinkScheme,
    type LinkSearch,
} from './plugins/Link';
export {
    type MentionContentOptions,
    type MentionItem,
    type MentionPluginOptions,
    type MentionValue,
} from './plugins/Mention';
export { type TextStylePluginOptions } from './plugins/TextStyle';
export { type TypographyGroup, type TypographyPluginOptions } from './plugins/Typography';

// --- Plugin authoring ---

export { ANY_LIST, defineBlock, defineContent, defineInline, defineMark, definePlugin } from './core';

/** A plugin. The types to write one with are nested: `RtePlugin.EditorControlApi`, `RtePlugin.BlockDefinition<T>`, … */
export type RtePlugin = CorePlugin;

// Aliases so a namespace member doesn't refer to itself (`type ParseRule<T> = ParseRule<T>`).
type ControlApi = EditorControlApi;
type ToolbarProps = ToolbarItemProps;
type OnPaste = PasteHandler;
type Pasted = Paste;
type InsertOptions = InsertTextOptions;
type InsertUndo = InsertTextUndo;
type PastedFrom = PasteSource;
type BlockDef<TValue> = BlockDefinition<TValue>;
type MarkDef<TValue> = MarkDefinition<TValue>;
type InlineDef<TValue> = InlineDefinition<TValue>;
type EditComponentProps<TValue, TCurrent> = EditProps<TValue, TCurrent>;
type Parse<TValue> = ParseRule<TValue>;
type MarkParse<TValue> = MarkParseRule<TValue>;
type StyleParse<TValue> = StyleParseRule<TValue>;
type MarkClear = MarkClearRule;
type MarkIgnore = MarkIgnoreRule;
type DefaultStyleType = DefaultStyle;
type Html = HtmlSpec;

// oxlint-disable-next-line typescript/no-namespace -- types only; groups the authoring types under `RtePlugin`.
export declare namespace RtePlugin {
    export type EditorControlApi = ControlApi;
    export type SelectionSnapshot = RteSelectionSnapshot;
    export type MarkState = RteMarkState;
    export type BlockCommand = RteBlockCommand;
    export type ToolbarItemProps = ToolbarProps;
    export type ToolbarGroup = RteToolbarGroup;
    export type PasteHandler = OnPaste;
    // A namespace member cannot take the name of the type it renames, so each of these needs an alias outside.
    export type Paste = Pasted; // NOSONAR
    export type InsertTextOptions = InsertOptions; // NOSONAR
    export type InsertTextUndo = InsertUndo; // NOSONAR
    export type PasteSource = PastedFrom; // NOSONAR
    export type BlockDefinition<TValue = Record<string, unknown>> = BlockDef<TValue>;
    export type MarkDefinition<TValue = Record<string, unknown>> = MarkDef<TValue>;
    export type InlineDefinition<TValue = Record<string, unknown>> = InlineDef<TValue>;
    export type EditProps<TValue, TCurrent = TValue> = EditComponentProps<TValue, TCurrent>;
    export type ParseRule<TValue> = Parse<TValue>;
    export type MarkParseRule<TValue> = MarkParse<TValue>;
    export type StyleParseRule<TValue> = StyleParse<TValue>;
    // Same reason as above.
    export type MarkClearRule = MarkClear; // NOSONAR
    export type MarkIgnoreRule = MarkIgnore; // NOSONAR
    export type DefaultStyle = DefaultStyleType; // NOSONAR
    export type HtmlSpec = Html;
    export type Content = RteContent;
    export type ToolbarEntry = RteToolbarEntry;
    export type EditView = RteEditView;
    export type Icon = RteIcon;
    export type Definition = RtePluginDefinition;
    export type BlockNode = RteBlockNode;
    export type InlineNode = RteInlineNode;
}
