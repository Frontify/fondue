/* (c) Copyright Frontify Ltd., all rights reserved. */

// Export without the stylesheet: each node's looks written into its own `style`,
// from what the plugins declared for the classes it carries.

import {
    type ChildSpacing,
    childSpacingOf,
    contentElementOf,
    DOCUMENT_GAP_VARIABLES,
    fondueToken,
    type HtmlSpec,
    type StyleMap,
} from '#/core';

import { type DrawnNode } from './documentTree';

const CLASS_SEPARATOR = /\s+/;

// The document's spacing, as `document.module.scss` hands it out.
const BLOCK_GAP = fondueToken('spacing-x-small');
const NO_GAP = '0';
/** The custom properties the plugins' looks read from the document and from their host, which the export writes none of. */
const DOCUMENT_VARIABLE_PREFIX = '--rte-';
const VARIABLE_READ = 'var(';
const VARIABLE_END = ')';
const FALLBACK_SEPARATOR = ',';
/** The root spaces the document's blocks as a block holding blocks does by default. */
const ROOT_SPACING: ChildSpacing = 'apart';

/** Where a spaced element sits among its siblings, and how the element holding them spaces them. */
type Placement = {
    spacing: ChildSpacing;
    isFirstChild: boolean;
    isLastChild: boolean;
};

/** The gap below an element: none under the last one, or in a tight container. */
const gapBelow = ({ spacing, isLastChild }: Placement): string => {
    switch (spacing) {
        case 'tight':
            return NO_GAP;
        case 'apart':
            if (isLastChild) {
                return NO_GAP;
            }
            return BLOCK_GAP;
    }
};

/** The gap above an element where the document sets it: none on the first one or in a tight container; elsewhere the block's own look sets it. */
const gapAbove = ({ spacing, isFirstChild }: Placement): string | undefined => {
    switch (spacing) {
        case 'tight':
            return NO_GAP;
        case 'apart':
            if (isFirstChild) {
                return NO_GAP;
            }
            return undefined;
    }
};

/**
 * The margins the document hands a spaced element where its look sets none, as its stylesheet computes them:
 * none above, the gap below; nothing for an element the document does not space.
 */
const documentMargins = (placement: Placement | undefined): StyleMap => {
    if (placement === undefined) {
        return {};
    }
    return { 'margin-top': NO_GAP, 'margin-bottom': gapBelow(placement) };
};

/** What the document knows of its custom properties for an element: its gaps, from where it sits. */
const documentVariables = (placement: Placement | undefined): StyleMap => {
    if (placement === undefined) {
        return {};
    }
    const known: StyleMap = { [DOCUMENT_GAP_VARIABLES.block]: gapBelow(placement) };
    const above = gapAbove(placement);
    if (above !== undefined) {
        known[DOCUMENT_GAP_VARIABLES.leading] = above;
    }
    return known;
};

/** The index of the parenthesis closing the one opened just before `from`. */
const closingParenthesis = (value: string, from: number): number => {
    let depth = 1;
    for (let index = from; index < value.length; index++) {
        if (value[index] === '(') {
            depth++;
        } else if (value[index] === VARIABLE_END) {
            depth--;
        }
        if (depth === 0) {
            return index;
        }
    }
    throw new Error(`Unclosed ${VARIABLE_READ} in "${value}".`);
};

/** One `var(...)`, given what is inside its parentheses. */
const resolveRead = (inside: string, known: StyleMap): string => {
    const separator = inside.indexOf(FALLBACK_SEPARATOR);
    let name = inside.trim();
    let fallback: string | undefined;
    if (separator !== -1) {
        name = inside.slice(0, separator).trim();
        fallback = resolveVariables(inside.slice(separator + 1).trim(), known);
    }
    if (!name.startsWith(DOCUMENT_VARIABLE_PREFIX)) {
        // A host's own variable stays a read, with whatever the document variables in its fallback resolved.
        if (fallback === undefined) {
            return `${VARIABLE_READ}${name}${VARIABLE_END}`;
        }
        return `${VARIABLE_READ}${name}${FALLBACK_SEPARATOR} ${fallback}${VARIABLE_END}`;
    }
    const value = known[name];
    if (value !== undefined) {
        return value;
    }
    if (fallback === undefined) {
        throw new Error(`${name} is read without a fallback, and the document does not set it for this element.`);
    }
    return fallback;
};

/**
 * The value with every read of a document variable (`--rte-`, at any depth) replaced: by what the document knows of it
 * for the element, else by its resolved fallback, so no custom property is left for a client that ignores them.
 * Reads of any other variable stay.
 * @throws When a document variable the document does not know has no fallback, rather than inventing a value.
 */
export const resolveVariables = (value: string, known: StyleMap): string => {
    let resolved = '';
    let from = 0;
    let start = value.indexOf(VARIABLE_READ, from);
    while (start !== -1) {
        const insideStart = start + VARIABLE_READ.length;
        const end = closingParenthesis(value, insideStart);
        resolved += value.slice(from, start) + resolveRead(value.slice(insideStart, end), known);
        from = end + 1;
        start = value.indexOf(VARIABLE_READ, from);
    }
    return resolved + value.slice(from);
};

/** The style with every value's document variables resolved for the element. */
const resolveStyle = (style: StyleMap, known: StyleMap): StyleMap => {
    const resolved: StyleMap = {};
    for (const [property, value] of Object.entries(style)) {
        resolved[property] = resolveVariables(value, known);
    }
    return resolved;
};

const PARAGRAPH_TAG = 'p';
// Mirrors the attribute `textStylePlugin` writes on its paragraphs; `documentContract.spec.ts` pins the two equal.
export const TEXT_STYLE_ATTRIBUTE = 'data-text-style';

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
 * The spec with the document's margins where nothing sets them, then the body look of a plain paragraph and its
 * classes' styles with the document's variables resolved, under its own `style`, so a host margin replaces a gap
 * untrimmed, and alignment and a font colour still win.
 */
const inlineSpec = (spec: HtmlSpec, placement: Placement | undefined, looks: InlineLooksOptions): HtmlSpec => {
    let declared: StyleMap = { ...plainParagraphStyle(spec, looks.plainParagraph) };
    const className = spec.attrs?.class;
    if (className !== undefined) {
        declared = { ...declared, ...classStyle(className, looks.classes) };
    }
    const looked = {
        ...documentMargins(placement),
        ...resolveStyle(declared, documentVariables(placement)),
    };
    if (Object.keys(looked).length === 0) {
        return spec;
    }
    return { ...spec, attrs: { ...spec.attrs, style: { ...looked, ...spec.attrs?.style } } };
};

const inlineNode = (
    node: Exclude<DrawnNode, string>,
    placement: Placement | undefined,
    looks: InlineLooksOptions,
): DrawnNode => {
    switch (node.kind) {
        case 'html': {
            const childSpacing = childSpacingOf(contentElementOf(node.spec)?.attrs);
            return {
                kind: 'html',
                spec: inlineSpec(node.spec, placement, looks),
                content: inlineSiblings(node.content, childSpacing, looks),
            };
        }
        // A component has no element to place or space: its content stays among the siblings it sits with.
        case 'component': {
            let spacing: ChildSpacing | undefined;
            if (placement !== undefined) {
                spacing = placement.spacing;
            }
            return { ...node, content: inlineSiblings(node.content, spacing, looks) };
        }
    }
};

/**
 * The nodes of one parent, spaced as its mark says, each placed among the others as `:first-child` and
 * `:last-child` count: text aside. Undefined spacing leaves them unspaced, as an element without the mark does.
 */
const inlineSiblings = (
    nodes: readonly DrawnNode[],
    spacing: ChildSpacing | undefined,
    looks: InlineLooksOptions,
): DrawnNode[] => {
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
        let placement: Placement | undefined;
        if (spacing !== undefined) {
            placement = { spacing, isFirstChild: index === firstIndex, isLastChild: index === lastIndex };
        }
        return inlineNode(node, placement, looks);
    });
};

/**
 * The nodes with each element's looks written into its `style`, the classes left in place:
 * the document's margins between blocks, by where each sits and how its container spaces it, under each class's literal margins.
 *
 * @param nodes - The document's blocks, the children of its root.
 * @param looks - What the stylesheets would set, by class and for a plain paragraph.
 */
export const inlineLooks = (nodes: readonly DrawnNode[], looks: InlineLooksOptions): DrawnNode[] =>
    inlineSiblings(nodes, ROOT_SPACING, looks);
