/* (c) Copyright Frontify Ltd., all rights reserved. */

// What a stored document says, read off its JSON alone: whether it says
// anything at all, and its words without formatting. No DOM, no engine, so
// both run on a server beside the stored value.

import { type RteBlockNode, type RteDocumentOf, type RteInlineNode } from './document';
import { type HtmlSpec } from './htmlSpec';
import { type RtePlugin } from './plugin';
import { buildPluginRegistry, type PluginRegistry } from './registry';

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

/** A text block's runs as one line; an inline no plugin defines has no text to give. */
const inlineText = (inlines: readonly RteInlineNode[], registry: PluginRegistry): string =>
    inlines
        .map((inline) => {
            if (inline.text !== undefined) {
                return inline.text;
            }
            const definition = registry.inlines.get(inline.type);
            const { type: _type, text: _text, ...value } = inline;
            return definition ? specText(definition.toHtml(value)) : '';
        })
        .join('');

/**
 * Whether a block holds other blocks, by its declared `content`; for a block
 * no plugin defines, by whether any child has children of its own.
 */
const holdsBlocks = (block: RteBlockNode, registry: PluginRegistry): boolean => {
    const definition = registry.blocks.get(block.type);
    if (definition) {
        return typeof definition.content === 'object';
    }
    return (block.children ?? []).some((child) => Array.isArray((child as AnyNode).children));
};

/** One line per text block, lists flattened; a void block (a column break) adds none. */
const blockLines = (blocks: readonly RteBlockNode[], registry: PluginRegistry): string[] =>
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
     * The plugins whose inlines to read — the editor's list. An inline whose
     * plugin is missing contributes nothing. The package root defaults it to
     * `defaultPlugins`.
     */
    plugins?: readonly RtePlugin[];
};

/**
 * The document's text without formatting: each text block one line, list
 * items included, joined by `\n` — an empty paragraph stays an empty line.
 * Marks drop away. An inline element is the text of its plugin's `toHtml`
 * (a mention's `@jane`, a line break's `\n`), so no plugin declares a plain
 * form of its own.
 */
export const toPlainText = (doc: RteDocumentOf, { plugins = [] }: ToPlainTextOptions = {}): string =>
    blockLines(doc.blocks, buildPluginRegistry(plugins)).join('\n');
