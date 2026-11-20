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
    type PasteHandler,
    type RteBlockCommand,
    type RteBlockNode,
    type RteHotkey,
    type RteInlineNode,
    type RtePlugin as CorePlugin,
    type RteSelectionSnapshot,
    type ToolbarItemProps,
    toPlainText as plainText,
    type ToPlainTextOptions,
} from './core';
import { type RteBlock, type RteDocument } from './documentFormat';
import {
    type EditorShellProps,
    RichTextEditor as EditorShell,
    parseHtml as parse,
    type ParseHtmlOptions,
} from './editor';
import { defaultPlugins } from './plugins/defaultPlugins';
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
 * A readonly view of a document; works on the server. The host passes the plugins whose content the document uses.
 *
 * @experimental The API and document format can change in any release until 1.0.
 */
export const RichTextRenderer = <TBlock extends RteBlockNode = RteBlock>(
    props: RichTextRendererProps<TBlock>,
): ReactNode => createElement(Renderer as (next: RichTextRendererProps<TBlock>) => ReactNode, props);

/**
 * The document as an HTML string, the same markup the editor copies to the
 * clipboard. No React or browser needed. The host passes the plugins whose
 * content the document uses; `wrap: false` leaves out the root element. Style
 * it with this package's stylesheet (emails need the styles inlined).
 * @example
 * const html = serializeToHtml(
 *     { version: 1, blocks: [{ type: 'paragraph', children: [{ text: 'Hello', bold: true }] }] },
 *     { plugins: [boldContent], wrap: false },
 * );
 */
export const serializeToHtml = <TBlock extends RteBlockNode = RteBlock>(
    doc: RteDocument<TBlock>,
    options: SerializeToHtmlOptions,
): string => serialize(doc, options);

/**
 * HTML as a document, read by the same rules as a paste into the editor, but
 * without the clean-up only a clipboard needs (Word, Outlook, Google Docs). What
 * no plugin reads stays as its text. Opens what `serializeToHtml` saved. The
 * host passes the plugins whose content the HTML uses. It reads with the page's
 * `document` when given none; without a browser, pass one from a DOM library.
 * The blocks are whatever the plugins read, so the document's block type is the open one.
 * Plugin `onPaste` handlers do not run: they act on a live editor's selection,
 * and there is none here.
 *
 * @example
 * const value = parseHtml(storedHtml, { plugins: [...defaultContent, mentionContent()] });
 */
export const parseHtml = (html: string, options: ParseHtmlOptions): RteDocument<RteBlockNode> => parse(html, options);

// --- Document format ---

export { type RteBlock, type RteDocument, type RteDocumentWith } from './documentFormat';

export { isEmpty };

/**
 * The document's text, one line per text block. Inlines read as their plugin's
 * markup (a mention as `@jane`). The host passes the plugins whose content the document uses.
 */
export const toPlainText = <TBlock extends RteBlockNode = RteBlock>(
    doc: RteDocument<TBlock>,
    options: ToPlainTextOptions,
): string => plainText(doc, options);

// --- Plugin authoring ---

export { defineBlock, defineContent, defineInline, defineMark, definePlugin } from './core';

/** A plugin. The types to write one with are nested: `RtePlugin.EditorControlApi`, `RtePlugin.BlockDefinition<T>`, … */
export type RtePlugin = CorePlugin;

// Aliases so a namespace member doesn't refer to itself (`type HtmlSpec = HtmlSpec`).
type ControlApi = EditorControlApi;
type ToolbarProps = ToolbarItemProps;
type OnPaste = PasteHandler;
type BlockDef<TValue> = BlockDefinition<TValue>;
type MarkDef<TValue> = MarkDefinition<TValue>;
type InlineDef<TValue> = InlineDefinition<TValue>;
type EditComponentProps<TValue, TCurrent> = EditProps<TValue, TCurrent>;
type Html = HtmlSpec;

// oxlint-disable-next-line typescript/no-namespace -- types only; groups the authoring types under `RtePlugin`.
export declare namespace RtePlugin {
    export type EditorControlApi = ControlApi;
    export type SelectionSnapshot = RteSelectionSnapshot;
    export type ToolbarItemProps = ToolbarProps;
    export type EditProps<TValue, TCurrent = TValue> = EditComponentProps<TValue, TCurrent>;
    export type BlockNode = RteBlockNode;
    export type InlineNode = RteInlineNode;
    export type Hotkey = RteHotkey;
    export type BlockDefinition<TValue = Record<string, unknown>> = BlockDef<TValue>;
    export type MarkDefinition<TValue = Record<string, unknown>> = MarkDef<TValue>;
    export type InlineDefinition<TValue = Record<string, unknown>> = InlineDef<TValue>;
    export type BlockCommand = RteBlockCommand;
    export type PasteHandler = OnPaste;
    export type HtmlSpec = Html;
}
