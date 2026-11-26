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

/**
 * The text an inline element's markup holds — a mention's `@jane`. A `<br>`
 * is a line break and an image its `alt`, as plain text spells them.
 */
const specText = (spec: HtmlSpec): string => {
    if (spec.tag === 'br') {
        return '\n';
    }
    if (spec.tag === 'img') {
        return spec.attrs?.alt ?? '';
    }
    if (typeof spec.children === 'string') {
        return spec.children;
    }
    return typeof spec.children === 'object'
        ? spec.children.map((child) => (typeof child === 'string' ? child : specText(child))).join('')
        : '';
};

/** A text block's runs as one line; an inline no plugin defines gives its children's text. */
const inlineText = (inlines: readonly RteInlineNode[], registry: ContentRegistry): string =>
    inlines.map((inline) => inlineNodeText(inline, registry)).join('');

/** A stored node is not validated, so a child that is not an object has nothing to read. */
const isStoredNode = (child: unknown): boolean => typeof child === 'object' && child !== null;

/**
 * The text one stored inline holds: a run's text, a known element's markup text,
 * or for an element no plugin defines its children's text.
 */
export const inlineNodeText = (inline: RteInlineNode, registry: ContentRegistry): string => {
    if (typeof inline.text === 'string') {
        return inline.text;
    }

    const definition = registry.inlines.get(inline.type);
    if (definition) {
        const { type: _type, text: _text, ...value } = inline;
        return specText(definition.toHtml(value));
    }

    const { children } = inline;
    if (!Array.isArray(children)) {
        return '';
    }
    return inlineText(children.filter(isStoredNode), registry);
};

/** A child stored as a block (it has a type the plugins know, or children of its own) rather than an inline. */
export const isBlockLike = (node: unknown, registry: ContentRegistry): boolean => {
    const { type, children } = node as { type?: unknown; children?: unknown };
    return Array.isArray(children) || (typeof type === 'string' && registry.blocks.has(type));
};

/**
 * Whether a block holds other blocks, by its declared `content`; for a block
 * no plugin defines, by whether it has children and all of them are blocks.
 */
const holdsBlocks = (block: RteBlockNode, registry: ContentRegistry): boolean => {
    const definition = registry.blocks.get(block.type);
    if (definition) {
        return typeof definition.content === 'object';
    }

    const children = block.children ?? [];
    return children.length > 0 && children.every((child) => isBlockLike(child, registry));
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

/** The text one stored block holds, one line per text block, as `toPlainText` reads it. */
export const blockText = (block: RteBlockNode, registry: ContentRegistry): string =>
    blockLines([block], registry).join('\n');

export type ToPlainTextOptions = {
    /**
     * The plugins, or only their content, whose inlines to read. An inline
     * whose plugin is missing contributes nothing.
     */
    plugins: readonly (RtePlugin | RteContent)[];
};

/**
 * The document's text without formatting: each text block one line, list
 * items included, joined by `\n` — an empty paragraph stays an empty line.
 * Marks drop away. An inline element is the text of its plugin's `toHtml`
 * (a mention's `@jane`, a line break's `\n`), so no plugin declares a plain
 * form of its own.
 */
export const toPlainText = (doc: RteDocumentOf, { plugins }: ToPlainTextOptions): string =>
    blockLines(doc.blocks, buildContentRegistry(plugins)).join('\n');
