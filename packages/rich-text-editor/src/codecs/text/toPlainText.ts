/* (c) Copyright Frontify Ltd., all rights reserved. */

// The document's words without formatting, read off its JSON alone. No DOM, no
// engine, so it runs on a server beside the stored value.

import {
    buildContentRegistry,
    type ContentRegistry,
    type HtmlSpec,
    type RteBlockNode,
    type RteContent,
    type RteInlineNode,
    type RtePlugin,
} from '#/core';
import { type RteBlock, type RteDocument } from '#/documentFormat';

const childText = (child: HtmlSpec | string): string => {
    if (typeof child === 'string') {
        return child;
    }

    return specText(child);
};

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

    if (typeof spec.children !== 'object') {
        return '';
    }

    return spec.children.map(childText).join('');
};

/** A text block's runs as one line; an inline no plugin defines has no text to give. */
const inlineText = (inlines: readonly RteInlineNode[], registry: ContentRegistry): string =>
    inlines
        .map((inline) => {
            if (inline.text !== undefined) {
                return inline.text;
            }

            const definition = registry.inlines.get(inline.type);
            if (definition === undefined) {
                return '';
            }

            const { type: _type, text: _text, ...value } = inline;

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

    if (block.children === undefined) {
        return false;
    }

    return block.children.some((child) => Array.isArray(child.children));
};

/** One line per text block, lists flattened; a void block (a column break) adds none. */
const blockLines = (blocks: readonly RteBlockNode[], registry: ContentRegistry): string[] =>
    blocks.flatMap((block) => {
        if (block.children === undefined) {
            return [];
        }

        // `children` is inlines or blocks; the block's plugin definition decides which, not the type.
        if (holdsBlocks(block, registry)) {
            return blockLines(block.children as RteBlockNode[], registry);
        }

        return [inlineText(block.children as RteInlineNode[], registry)];
    });

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
 * form of its own. The host passes the plugins whose content the document uses.
 */
export const toPlainText = <TBlock extends RteBlockNode = RteBlock>(
    doc: RteDocument<TBlock>,
    { plugins }: ToPlainTextOptions,
): string => blockLines(doc.blocks, buildContentRegistry(plugins)).join('\n');
