/* (c) Copyright Frontify Ltd., all rights reserved. */

// The `@frontify/fondue-rich-text-editor/codecs` package entry: every export here is public API.
// It imports no ProseMirror, React or editor code, so it runs in Node with no DOM.

import { buildContentRegistry, emptyDocument, type RteBlockNode, type RteContent, type RtePlugin } from '#/core';
import { type RteBlock, type RteDocument } from '#/documentFormat';

import { buildForms, type MarkdownOverrides } from './markdown/forms';
import { tokenize } from './markdown/markdownIt';
import { type MarkdownReadLoss, type ReadContext, readDocument } from './markdown/read';
import { type MarkdownLoss, writeDocument } from './markdown/write';

export type { MarkdownLoss, MarkdownOverrides, MarkdownReadLoss };

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

export type ParseMarkdownResult = {
    document: RteDocument<RteBlockNode>;
    losses: MarkdownReadLoss[];
};

export type SerializeToMarkdownResult = {
    markdown: string;
    losses: MarkdownLoss[];
};

const readMarkdown = (
    markdown: string,
    { plugins, breaks = false, overrides }: MarkdownOptions,
    reportLoss?: ReadContext['reportLoss'],
): RteDocument<RteBlockNode> => {
    // A JS host can pass any value, and the document of a value that is no Markdown is the empty one.
    if (typeof markdown !== 'string') {
        return emptyDocument();
    }

    const registry = buildContentRegistry(plugins);

    return readDocument(markdown, { registry, forms: buildForms(registry, overrides), breaks, reportLoss });
};

/**
 * Markdown as a document for display. Raw HTML reads as text.
 * Use `parseMarkdownWithLosses` before editing and saving stored Markdown.
 *
 * @example
 * const value = parseMarkdown('**Hello**', { plugins: defaultContent });
 */
export const parseMarkdown = (markdown: string, options: MarkdownOptions): RteDocument<RteBlockNode> =>
    readMarkdown(markdown, options);

/**
 * Markdown as a document, with any features it could not keep. Check `losses` before
 * saving over the original Markdown.
 *
 * @example
 * const { document, losses } = parseMarkdownWithLosses(storedMarkdown, { plugins: defaultContent });
 * if (losses.length === 0) {
 *     setEditableDocument(document);
 * }
 */
export const parseMarkdownWithLosses = (markdown: string, options: MarkdownOptions): ParseMarkdownResult => {
    const losses: MarkdownReadLoss[] = [];
    const document = readMarkdown(markdown, options, (loss) => {
        losses.push(loss);
    });

    return { document, losses };
};

const DOCUMENT_TYPE = 'document';

// A JS host can pass any value, so the type of a document is checked at runtime.
const isDocument = (document: unknown): boolean =>
    typeof document === 'object' && document !== null && 'blocks' in document && Array.isArray(document.blocks);

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
    if (!isDocument(document)) {
        return { markdown: '', losses: [{ path: [], type: DOCUMENT_TYPE }] };
    }

    const registry = buildContentRegistry(plugins);

    return writeDocument(document, { registry, forms: buildForms(registry, overrides), breaks, tokenize });
};
