/* (c) Copyright Frontify Ltd., all rights reserved. */

// Export without the stylesheet: each node's looks written into its own `style`,
// from what the plugins declared for the classes it carries.

import { fondueToken, type HtmlSpec, type StyleMap } from '#/core';

import { type DrawnNode } from './documentTree';

const CLASS_SEPARATOR = /\s+/;

/** How the document spaces a block: a gap below it, and a heading also one above. */
type BlockSpacing = 'block' | 'heading';

// The document's spacing, as `$blocks`, `$headings` and the two gaps in `renderer/document.module.scss`.
const BLOCK_SPACING: Partial<Record<HtmlSpec['tag'], BlockSpacing>> = {
    p: 'block',
    h1: 'heading',
    h2: 'heading',
    h3: 'heading',
    h4: 'heading',
    ul: 'block',
    ol: 'block',
    blockquote: 'block',
};
const BLOCK_GAP = fondueToken('spacing-x-small');
const HEADING_GAP = fondueToken('spacing-medium');
const NO_GAP = '0';

const LIST_ITEM_TAG = 'li';

/** Where a node sits among its siblings and ancestors, which decides the document's gaps around it. */
type Placement = {
    isFirstChild: boolean;
    isLastChild: boolean;
    inListItem: boolean;
};

/** The gap below a block: none under the last one, or inside a list item. */
const gapBelow = ({ isLastChild, inListItem }: Placement): string => {
    if (isLastChild || inListItem) {
        return NO_GAP;
    }
    return BLOCK_GAP;
};

/** The gap above a block: a heading's alone, none on the first one, or inside a list item. */
const gapAbove = (spacing: BlockSpacing, { isFirstChild, inListItem }: Placement): string => {
    switch (spacing) {
        case 'block':
            return NO_GAP;
        case 'heading':
            if (isFirstChild || inListItem) {
                return NO_GAP;
            }
            return HEADING_GAP;
    }
};

/** The margins the document gives an element where no look sets them; none for an element it does not space. */
const documentGaps = (tag: HtmlSpec['tag'], placement: Placement): StyleMap => {
    const spacing = BLOCK_SPACING[tag];
    if (spacing === undefined) {
        return {};
    }
    return { 'margin-top': gapAbove(spacing, placement), 'margin-bottom': gapBelow(placement) };
};

const PARAGRAPH_TAG = 'p';
// A text style's paragraph carries it; `textStyle.module.scss` gives the body look to `p:not([data-text-style])`.
const TEXT_STYLE_ATTRIBUTE = 'data-text-style';

/** What the export writes into the elements, from what the stylesheets would set. */
export type InlineLooksOptions = {
    /** The style of each class, by class name (`registry.contentStyles()`). */
    classes: Readonly<Record<string, StyleMap>>;
    /** The body look of a plain paragraph, one with no text style, as `textStyle.module.scss` gives it. */
    plainParagraph: StyleMap;
};

/** The body look for a plain paragraph; nothing for any other element. */
const plainParagraphStyle = (spec: HtmlSpec, plainParagraph: StyleMap): StyleMap | undefined => {
    if (spec.tag !== PARAGRAPH_TAG || spec.attrs?.[TEXT_STYLE_ATTRIBUTE] !== undefined) {
        return undefined;
    }
    return plainParagraph;
};

/** The style of every class the element carries that has one, later classes over earlier. */
const classStyle = (className: string, classes: InlineLooksOptions['classes']): StyleMap | undefined => {
    let merged: StyleMap | undefined;
    for (const name of className.split(CLASS_SEPARATOR)) {
        // Own keys only: a class named `constructor` is not a style.
        if (Object.prototype.hasOwnProperty.call(classes, name)) {
            merged = { ...merged, ...classes[name] };
        }
    }
    return merged;
};

/**
 * The spec with the document's gaps, then the body look of a plain paragraph and its classes' styles, under its own
 * `style`, so a host margin replaces a gap untrimmed, and alignment and a font colour still win.
 */
const inlineSpec = (spec: HtmlSpec, placement: Placement, looks: InlineLooksOptions): HtmlSpec => {
    let looked = { ...documentGaps(spec.tag, placement), ...plainParagraphStyle(spec, looks.plainParagraph) };
    const className = spec.attrs?.class;
    if (className !== undefined) {
        looked = { ...looked, ...classStyle(className, looks.classes) };
    }
    if (Object.keys(looked).length === 0) {
        return spec;
    }
    return { ...spec, attrs: { ...spec.attrs, style: { ...looked, ...spec.attrs?.style } } };
};

const inlineNode = (node: Exclude<DrawnNode, string>, placement: Placement, looks: InlineLooksOptions): DrawnNode => {
    switch (node.kind) {
        case 'html': {
            const inListItem = placement.inListItem || node.spec.tag === LIST_ITEM_TAG;
            return {
                kind: 'html',
                spec: inlineSpec(node.spec, placement, looks),
                content: inlineSiblings(node.content, inListItem, looks),
            };
        }
        case 'component':
            return { ...node, content: inlineSiblings(node.content, placement.inListItem, looks) };
    }
};

/** The nodes of one parent, each placed among the others as `:first-child` and `:last-child` count: text aside. */
const inlineSiblings = (nodes: readonly DrawnNode[], inListItem: boolean, looks: InlineLooksOptions): DrawnNode[] => {
    const elementIndexes: number[] = [];
    for (const [index, node] of nodes.entries()) {
        if (typeof node !== 'string') {
            elementIndexes.push(index);
        }
    }
    const firstIndex = elementIndexes[0];
    const lastIndex = elementIndexes[elementIndexes.length - 1];
    return nodes.map((node, index) => {
        if (typeof node === 'string') {
            return node;
        }
        const placement: Placement = {
            isFirstChild: index === firstIndex,
            isLastChild: index === lastIndex,
            inListItem,
        };
        return inlineNode(node, placement, looks);
    });
};

/**
 * The nodes with each element's looks written into its `style`, the classes left in place:
 * the document's gaps between blocks, by where each sits, and each class's style over them.
 *
 * @param nodes - The document's blocks, the children of its root.
 * @param looks - What the stylesheets would set, by class and for a plain paragraph.
 */
export const inlineLooks = (nodes: readonly DrawnNode[], looks: InlineLooksOptions): DrawnNode[] =>
    inlineSiblings(nodes, false, looks);
