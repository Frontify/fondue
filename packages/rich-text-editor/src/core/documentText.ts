/* (c) Copyright Frontify Ltd., all rights reserved. */

// What a stored document says, read off its JSON alone: whether it says
// anything at all, and its words without formatting. No DOM, no engine, so
// both run on a server beside the stored value.

import { buildContentRegistry, type ContentRegistry } from './contentRegistry';
import { type RteBlockNode, type RteDocumentOf, type RteInlineNode } from './document';
import { type HtmlSpec } from './htmlSpec';
import { type RteContent, type RtePlugin } from './plugin';

type AnyNode = RteBlockNode | RteInlineNode;

/** Whitespace-only text, an empty block, a block of those. A node without `children` (a mention, a column break) is content. */
const isBlank = (node: AnyNode): boolean => {
    if ('text' in node && typeof node.text === 'string') {
        return !/\S/.test(node.text);
    }
    return Array.isArray(node.children) && (node.children as AnyNode[]).every(isBlank);
};

/**
 * Whether the document holds nothing a reader would see: no blocks, or only
 * text blocks (and lists of them) whose text is empty or whitespace — what an
 * untouched editor emits, or one cleared again. Any inline element (a mention,
 * a line break) or void block (a column break) makes it non-empty. A missing
 * document is empty, for a value not stored yet.
 */
export const isEmpty = (doc: RteDocumentOf | null | undefined): boolean => !doc || doc.blocks.every(isBlank);

/** The fixed text an inline element's markup holds — a mention's `@jane`. */
const specText = (spec: HtmlSpec): string => {
    if (typeof spec.children === 'string') {
        return spec.children;
    }
    return typeof spec.children === 'object'
        ? spec.children.map((child) => (typeof child === 'string' ? child : specText(child))).join('')
        : '';
};

/** A text block's runs as one line; an inline no plugin defines has no text to give. */
const inlineText = (inlines: readonly RteInlineNode[], registry: ContentRegistry): string =>
    inlines
        .map((inline) => {
            if (inline.text !== undefined) {
                return inline.text;
            }
            const definition = registry.inlines.get(inline.type);
            const { type: _type, text: _text, ...value } = inline;
            if (definition === undefined) {
                return '';
            }
            if (definition.toText !== undefined) {
                return definition.toText(value);
            }
            return specText(definition.toHtml(value));
        })
        .join('');

/**
 * Whether a block holds other blocks, by its declared `content`; for a block
 * no plugin defines, by whether any child has children of its own.
 */
const holdsBlocks = (block: RteBlockNode, registry: ContentRegistry): boolean => {
    const definition = registry.blocks.get(block.type);
    if (definition) {
        return typeof definition.content === 'object';
    }
    return (block.children ?? []).some((child) => Array.isArray((child as AnyNode).children));
};

/** One line per text block, lists flattened; a void block (a column break) adds none. */
const blockLines = (blocks: readonly RteBlockNode[], registry: ContentRegistry): string[] =>
    blocks.flatMap((block) => {
        if (block.children === undefined) {
            return [];
        }
        return holdsBlocks(block, registry)
            ? blockLines(block.children as RteBlockNode[], registry)
            : [inlineText(block.children as RteInlineNode[], registry)];
    });

export type ToPlainTextOptions = {
    /**
     * The plugins, or only their content, whose inlines to read. An inline
     * whose plugin is missing contributes nothing.
     * @default defaultContent
     */
    plugins?: readonly (RtePlugin | RteContent)[];
};

/**
 * The document's text without formatting: each text block one line, list
 * items included, joined by `\n` — an empty paragraph stays an empty line.
 * Marks drop away. An inline element is its plugin's `toText` when it
 * declares one (a line break's `\n`), else the fixed text of its `toHtml` (a
 * mention's `@jane`).
 */
export const toPlainText = (doc: RteDocumentOf, { plugins = [] }: ToPlainTextOptions = {}): string =>
    blockLines(doc.blocks, buildContentRegistry(plugins)).join('\n');
