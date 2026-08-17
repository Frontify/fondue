/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createElement, type ReactNode } from 'react';

import { type RteBlockNode } from './core';
import { type RteBlock } from './documentFormat';
import {
    RichTextEditor as StructuralRichTextEditor,
    type RichTextEditorProps as StructuralRichTextEditorProps,
} from './editor';
import { defaultPlugins } from './plugins';
import {
    RichTextRenderer as StructuralRichTextRenderer,
    type RichTextRendererProps as StructuralRichTextRendererProps,
} from './renderer';

/**
 * The package's public API, and the composition root: the editor, the renderer,
 * the built-in plugins, and the official document format assembled from them.
 *
 * The folders behind it, innermost first — each may import the ones above it
 * and none of the ones below, which the linter enforces:
 *
 * - `core/`      document, plugin contract, commands, registry
 * - `plugins/`   features, each written against `core/` alone
 * - `renderer/`  JSON → React / HTML; no engine
 * - `editor/`    React shell + port; `engines/prosemirror/` is the replaceable adapter
 *
 * Swapping the engine means writing one more folder under `editor/engines/` and
 * changing the import in `useEditorHandle`. Plugins and stored JSON stay.
 */

export {
    type AutocompleteContext,
    type EditorControlApi,
    emptyDocument,
    type RteInlineNode,
    type RtePlugin,
} from './core';

export { defaultPlugins } from './plugins';
export { alignPlugin } from './plugins/Align';
export { autoformatPlugin } from './plugins/Autoformat';
export { blurOnBreakPlugin } from './plugins/BlurOnBreak';
export { boldPlugin } from './plugins/Bold';
export { checkListPlugin } from './plugins/CheckList';
export { codePlugin } from './plugins/Code';
export { columnBreakPlugin } from './plugins/ColumnBreak';
export { fontColorPlugin } from './plugins/FontColor';
export { italicPlugin } from './plugins/Italic';
export { linkPlugin } from './plugins/Link';
export { bulletListPlugin, numberedListPlugin } from './plugins/List';
export { mentionPlugin, type MentionItem } from './plugins/Mention';
export { quotePlugin } from './plugins/Quote';
export { resetFormattingPlugin } from './plugins/ResetFormatting';
export { softBreakPlugin } from './plugins/SoftBreak';
export { strikethroughPlugin } from './plugins/Strikethrough';
export { subscriptPlugin } from './plugins/Subscript';
export { superscriptPlugin } from './plugins/Superscript';
export { textStylePlugin } from './plugins/TextStyle';
export { underlinePlugin } from './plugins/Underline';
export { ToolbarButton } from './plugins/shared/ToolbarButton/ToolbarButton';

export { type RteBlock, type RteDocument, type RteDocumentWith, type RteText } from './documentFormat';

export { serializeToHtml, type SerializeToHtmlOptions } from './renderer';

export type RichTextEditorProps<TBlock extends RteBlockNode = RteBlock> = StructuralRichTextEditorProps<TBlock>;

export const RichTextEditor = <TBlock extends RteBlockNode = RteBlock>(props: RichTextEditorProps<TBlock>): ReactNode =>
    createElement(StructuralRichTextEditor as (next: RichTextEditorProps<TBlock>) => ReactNode, {
        ...props,
        plugins: props.plugins ?? defaultPlugins,
    });

export type RichTextRendererProps<TBlock extends RteBlockNode = RteBlock> = StructuralRichTextRendererProps<TBlock>;

export const RichTextRenderer = <TBlock extends RteBlockNode = RteBlock>(
    props: RichTextRendererProps<TBlock>,
): ReactNode =>
    createElement(StructuralRichTextRenderer as (next: RichTextRendererProps<TBlock>) => ReactNode, {
        ...props,
        plugins: props.plugins ?? defaultPlugins,
    });
