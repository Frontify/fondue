/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createElement, type ReactNode } from 'react';

import { type RteBlockNode } from './core';
import { type RteBlock, type RteDocument } from './documentFormat';
import { type EditorShellProps, RichTextEditor as EditorShell } from './editor';
import { defaultPlugins } from './plugins';
import {
    type RendererProps,
    RichTextRenderer as Renderer,
    serializeToHtml as serialize,
    type SerializeToHtmlOptions,
} from './renderer';

// The package's public API, and the composition root: the editor, the renderer,
// the built-in plugins, and the official document format assembled from them.
//
// The folders behind it, innermost first — each may import the ones above it
// and none of the ones below, which the linter enforces:
//
// - `core/`      document, plugin contract, commands, registry
// - `plugins/`   features, each written against `core/` alone
// - `renderer/`  JSON → React / HTML; no engine
// - `editor/`    React shell + port; `engines/prosemirror/` is the replaceable adapter
//
// Swapping the engine means writing one more folder under `editor/engines/` and
// changing the import in `useEditorHandle`. Plugins and stored JSON stay.

// --- Editor & renderer ---

export { type ToolbarPlacement } from './editor';

/**
 * The editor's props. `TBlock` is the document's block union: the shipped
 * plugins' `RteBlock` unless a plugin of your own adds blocks —
 * `RichTextEditor<RteBlock | CalloutBlock>`.
 */
export type RichTextEditorProps<TBlock extends RteBlockNode = RteBlock> = EditorShellProps<TBlock>;

/**
 * The rich text editor: a document edited through the plugins it is given,
 * `defaultPlugins` when it is given none.
 */
export const RichTextEditor = <TBlock extends RteBlockNode = RteBlock>(props: RichTextEditorProps<TBlock>): ReactNode =>
    createElement(EditorShell as (next: RichTextEditorProps<TBlock>) => ReactNode, {
        ...props,
        plugins: props.plugins ?? defaultPlugins,
    });

/** The renderer's props; `TBlock` as for `RichTextEditorProps`. */
export type RichTextRendererProps<TBlock extends RteBlockNode = RteBlock> = RendererProps<TBlock>;

/**
 * A stored document drawn as React, without an editor — readonly display, on
 * the client or a server. Draws with `defaultPlugins` when given no `plugins`.
 */
export const RichTextRenderer = <TBlock extends RteBlockNode = RteBlock>(
    props: RichTextRendererProps<TBlock>,
): ReactNode =>
    createElement(Renderer as (next: RichTextRendererProps<TBlock>) => ReactNode, {
        ...props,
        plugins: props.plugins ?? defaultPlugins,
    });

/**
 * The document as an HTML string: each node's `toHtml`, the same markup copying
 * out of the editor produces — never a `render.component`, so what is exported
 * pastes back as what it was. No React, no browser needed.
 *
 * By default the blocks sit in the element `RichTextRenderer` draws around
 * them, carrying the classes that set how a document reads; `wrap: false`
 * leaves it out. A page showing the output wants this package's stylesheet
 * (`@frontify/fondue-rich-text-editor/styles`). An email client has no
 * stylesheet, so whatever builds the email has to inline the styles it needs.
 */
export const serializeToHtml = <TBlock extends RteBlockNode = RteBlock>(
    doc: RteDocument<TBlock>,
    options: SerializeToHtmlOptions,
): string => serialize(doc, options);

// --- Document format ---

export { type RteBlock, type RteDocument, type RteDocumentWith, type RteText } from './documentFormat';

// --- Plugins ---

export { defaultPlugins } from './plugins';
export { alignPlugin } from './plugins/Align';
export { blurOnBreakPlugin } from './plugins/BlurOnBreak';
export { boldPlugin } from './plugins/Bold';
export { checkListPlugin } from './plugins/CheckList';
export { codePlugin } from './plugins/Code';
export { columnBreakPlugin } from './plugins/ColumnBreak';
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
export { underlinePlugin } from './plugins/Underline';

// --- Plugin options ---

export { type ColumnBreakPluginOptions } from './plugins/ColumnBreak';
export { type MentionItem, type MentionPluginOptions } from './plugins/Mention';
export { type TextStylePluginOptions } from './plugins/TextStyle';

// --- Plugin authoring: everything the shipped plugins are written against ---

export {
    ANY_LIST,
    type BlockDefinition,
    defineBlock,
    defineInline,
    defineMark,
    type EditorControlApi,
    type EditProps,
    type HtmlSpec,
    type InlineDefinition,
    type MarkDefinition,
    type ParseRule,
    type PasteHandler,
    type RteInlineNode,
    type RteBlockCommand,
    type RtePlugin,
    type RteSelectionSnapshot,
    type ToolbarItemProps,
} from './core';
