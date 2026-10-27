/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createElement, type ReactNode } from 'react';

import {
    type BlockDefinition,
    type EditorControlApi,
    type EditProps,
    type HtmlSpec,
    type InlineDefinition,
    isEmpty,
    type MarkDefinition,
    type ParseRule,
    type PasteHandler,
    type RteBlockCommand,
    type RteBlockNode,
    type RteInlineNode,
    type RtePlugin as CorePlugin,
    type RteSelectionSnapshot,
    type ToolbarItemProps,
    toPlainText as plainText,
    type ToPlainTextOptions,
} from './core';
import { type RteBlock, type RteDocument } from './documentFormat';
import { type EditorShellProps, RichTextEditor as EditorShell } from './editor';
import { defaultPlugins } from './plugins';
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

/** The editor. Uses `defaultPlugins` when given no `plugins`. */
export const RichTextEditor = <TBlock extends RteBlockNode = RteBlock>(props: RichTextEditorProps<TBlock>): ReactNode =>
    createElement(EditorShell as (next: RichTextEditorProps<TBlock>) => ReactNode, {
        ...props,
        plugins: props.plugins ?? defaultPlugins,
    });

/** `TBlock` as for `RichTextEditorProps`. */
export type RichTextRendererProps<TBlock extends RteBlockNode = RteBlock> = RendererProps<TBlock>;

/** A readonly view of a document; works on the server. Uses `defaultPlugins` when given no `plugins`. */
export const RichTextRenderer = <TBlock extends RteBlockNode = RteBlock>(
    props: RichTextRendererProps<TBlock>,
): ReactNode =>
    createElement(Renderer as (next: RichTextRendererProps<TBlock>) => ReactNode, {
        ...props,
        plugins: props.plugins ?? defaultPlugins,
    });

/**
 * The document as an HTML string, the same markup the editor copies to the
 * clipboard. No React or browser needed. Uses `defaultPlugins` when given no
 * `plugins`; `wrap: false` leaves out the root element. Style it with this
 * package's stylesheet (emails need the styles inlined).
 */
export const serializeToHtml = <TBlock extends RteBlockNode = RteBlock>(
    doc: RteDocument<TBlock>,
    options: SerializeToHtmlOptions = {},
): string => serialize(doc, { ...options, plugins: options.plugins ?? defaultPlugins });

// --- Document format ---

export { type RteBlock, type RteDocument, type RteDocumentWith } from './documentFormat';

export { isEmpty };

/**
 * The document's text, one line per text block. Inlines read as their plugin's
 * markup (a mention as `@jane`). Uses `defaultPlugins` when given no `plugins`.
 */
export const toPlainText = <TBlock extends RteBlockNode = RteBlock>(
    doc: RteDocument<TBlock>,
    options: ToPlainTextOptions = {},
): string => plainText(doc, { ...options, plugins: options.plugins ?? defaultPlugins });

// --- Plugins ---

export { defaultPlugins } from './plugins';
export { alignPlugin } from './plugins/Align';
export { blurOnBreakPlugin } from './plugins/BlurOnBreak';
export { boldPlugin } from './plugins/Bold';
export { checkListPlugin } from './plugins/CheckList';
export { codePlugin } from './plugins/Code';
export { columnBreakPlugin } from './plugins/ColumnBreak';
export { defaultEmojis, emojiPlugin } from './plugins/Emoji';
export { fontColorPlugin } from './plugins/FontColor';
export { italicPlugin } from './plugins/Italic';
export { linkPlugin } from './plugins/Link';
export { bulletListPlugin, numberedListPlugin } from './plugins/List';
export { mentionPlugin } from './plugins/Mention';
export { quotePlugin } from './plugins/Quote';
export { resetFormattingPlugin } from './plugins/ResetFormatting';
export { softBreakPlugin } from './plugins/SoftBreak';
export { strikethroughPlugin } from './plugins/Strikethrough';
export { subscriptPlugin } from './plugins/Subscript';
export { superscriptPlugin } from './plugins/Superscript';
export { textStylePlugin } from './plugins/TextStyle';
export { typographyPlugin } from './plugins/Typography';
export { underlinePlugin } from './plugins/Underline';

// --- Plugin options ---

export { type ColumnBreakPluginOptions } from './plugins/ColumnBreak';
export { type EmojiItem, type EmojiPluginOptions } from './plugins/Emoji';
export { type MentionItem, type MentionPluginOptions, type MentionValue } from './plugins/Mention';
export { type TextStylePluginOptions } from './plugins/TextStyle';

// --- Plugin authoring ---

export { ANY_LIST, defineBlock, defineInline, defineMark } from './core';

/** A plugin. The types to write one with are nested: `RtePlugin.EditorControlApi`, `RtePlugin.BlockDefinition<T>`, … */
export type RtePlugin = CorePlugin;

// Aliases so a namespace member doesn't refer to itself (`type ParseRule<T> = ParseRule<T>`).
type ControlApi = EditorControlApi;
type ToolbarProps = ToolbarItemProps;
type OnPaste = PasteHandler;
type BlockDef<TValue> = BlockDefinition<TValue>;
type MarkDef<TValue> = MarkDefinition<TValue>;
type InlineDef<TValue> = InlineDefinition<TValue>;
type EditComponentProps<TValue, TCurrent> = EditProps<TValue, TCurrent>;
type Parse<TValue> = ParseRule<TValue>;
type Html = HtmlSpec;

// oxlint-disable-next-line typescript/no-namespace -- types only; groups the authoring types under `RtePlugin`.
export declare namespace RtePlugin {
    export type EditorControlApi = ControlApi;
    export type SelectionSnapshot = RteSelectionSnapshot;
    export type BlockCommand = RteBlockCommand;
    export type ToolbarItemProps = ToolbarProps;
    export type PasteHandler = OnPaste;
    export type BlockDefinition<TValue = Record<string, unknown>> = BlockDef<TValue>;
    export type MarkDefinition<TValue = Record<string, unknown>> = MarkDef<TValue>;
    export type InlineDefinition<TValue = Record<string, unknown>> = InlineDef<TValue>;
    export type EditProps<TValue, TCurrent = TValue> = EditComponentProps<TValue, TCurrent>;
    export type ParseRule<TValue> = Parse<TValue>;
    export type HtmlSpec = Html;
    export type BlockNode = RteBlockNode;
    export type InlineNode = RteInlineNode;
}
