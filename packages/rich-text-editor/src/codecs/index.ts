/* (c) Copyright Frontify Ltd., all rights reserved. */

// The `@frontify/fondue-rich-text-editor/codecs` package entry: every export here is public API.
// It imports no ProseMirror, React or editor code, so it runs in Node with no DOM.

import { buildContentRegistry, type RteBlockNode, type RteContent, type RtePlugin } from '#/core';
import { type RteBlock, type RteDocument } from '#/documentFormat';

import { buildForms, type MarkdownOverrides } from './markdown/forms';
import { tokenize } from './markdown/markdownIt';
import { readDocument } from './markdown/read';
import { type MarkdownLoss, writeDocument } from './markdown/write';

export type { MarkdownLoss, MarkdownOverrides };

export type MarkdownOptions = {
    /** The plugins, or only their content, whose Markdown forms to read and write with. */
    plugins: readonly (RtePlugin | RteContent)[];
    /**
     * A single newline reads as a line break, and a line break writes as a bare newline.
     * @default false
     */
    breaks?: boolean;
    /** Replaces a node's Markdown form, by node name. */
    overrides?: MarkdownOverrides;
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
export const parseMarkdown = (
    markdown: string,
    { plugins, breaks = false, overrides }: MarkdownOptions,
): RteDocument<RteBlockNode> => {
    const registry = buildContentRegistry(plugins);

    return readDocument(markdown, { registry, forms: buildForms(registry, overrides), breaks });
};

/**
 * The document as Markdown. A node with no Markdown form is written as its text and
 * listed in `losses`; nothing throws on a document a host can send.
 *
 * @example
 * const { markdown, losses } = serializeToMarkdown(value, { plugins: defaultContent });
 */
export const serializeToMarkdown = <TBlock extends RteBlockNode = RteBlock>(
    document: RteDocument<TBlock>,
    { plugins, breaks = false, overrides }: MarkdownOptions,
): SerializeToMarkdownResult => {
    const registry = buildContentRegistry(plugins);

    return writeDocument(document, { registry, forms: buildForms(registry, overrides), breaks, tokenize });
};
