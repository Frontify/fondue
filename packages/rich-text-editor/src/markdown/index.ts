/* (c) Copyright Frontify Ltd., all rights reserved. */

// The `@frontify/fondue-rich-text-editor/markdown` package entry: every export here is public API.
// It imports no ProseMirror, React or editor code, so it runs in Node with no DOM.

import { type MarkdownBlockForm, type MarkdownInlineForm, type MarkdownMarkForm, type RteBlockNode } from '#/core';
import { type RteBlock, type RteDocument } from '#/documentFormat';
import { type SerializeToHtmlOptions } from '#/renderer';

/** Replaces a node's Markdown form, by the name the node is stored under. */
export type MarkdownOverrides = {
    blocks?: Record<string, MarkdownBlockForm>;
    marks?: Record<string, MarkdownMarkForm>;
    inlines?: Record<string, MarkdownInlineForm>;
};

export type MarkdownOptions = {
    /** The plugins, or only their content, whose Markdown forms to read and write with. */
    plugins: SerializeToHtmlOptions['plugins'];
    /**
     * A single newline reads as a line break, and a line break writes as a bare newline.
     * @default false
     */
    breaks?: boolean;
    /** Replaces a node's Markdown form, by node name. */
    overrides?: MarkdownOverrides;
};

/** What a node lost on write: `path` is the index of each block, child and inline from `document.blocks` down to it. */
export type MarkdownLoss = {
    path: readonly number[];
    /** The block type, mark key, inline type or block attribute name that has no Markdown form. */
    type: string;
};

export type SerializeToMarkdownResult = {
    markdown: string;
    losses: MarkdownLoss[];
};

/**
 * Markdown as a document. What no plugin reads stays as its text. Raw HTML in the
 * Markdown is text, never markup. The host passes the plugins whose content the Markdown uses.
 *
 * @example
 * const value = parseMarkdown('**Hello**', { plugins: defaultContent });
 */
export const parseMarkdown = (_markdown: string, _options: MarkdownOptions): RteDocument<RteBlockNode> => {
    throw new Error('not implemented');
};

/**
 * The document as Markdown. A node with no Markdown form is written as its text and
 * listed in `losses`; nothing throws on a document a host can send.
 *
 * @example
 * const { markdown, losses } = serializeToMarkdown(value, { plugins: defaultContent });
 */
export const serializeToMarkdown = <TBlock extends RteBlockNode = RteBlock>(
    _document: RteDocument<TBlock>,
    _options: MarkdownOptions,
): SerializeToMarkdownResult => {
    throw new Error('not implemented');
};
