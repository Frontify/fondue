/* (c) Copyright Frontify Ltd., all rights reserved. */

// Export without the stylesheet: each node's looks written into its own `style`,
// from what the plugins declared for the classes it carries.

import {
    type ChildSpacing,
    childSpacingOf,
    contentElementOf,
    type ContentStyles,
    DOCUMENT_GAP_VARIABLES,
    fondueToken,
    type HtmlSpec,
    OWN_MARGINS_ATTRIBUTE,
    type StyleMap,
} from '#/core';

import { type DrawnNode } from './documentTree';

const CLASS_SEPARATOR = /\s+/;

// The document's spacing, as `document.module.scss` hands it out.
const BLOCK_GAP = fondueToken('spacing-x-small');
const NO_GAP = '0';
/** Unsets the leading gap, so a block with one above it never inherits a `0` from an ancestor. */
const UNSET_GAP = 'initial';
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

/** The gap above an element: none on the first one, or in a tight container; unset elsewhere. */
const leadingGap = ({ spacing, isFirstChild }: Placement): string => {
    switch (spacing) {
        case 'tight':
            return NO_GAP;
        case 'apart':
            if (isFirstChild) {
                return NO_GAP;
            }
            return UNSET_GAP;
    }
};

/**
 * The gaps the document hands a spaced element, and its margins unless it owns them;
 * nothing for an element the document does not space.
 */
const documentGaps = (spec: HtmlSpec, placement: Placement | undefined): StyleMap => {
    if (placement === undefined) {
        return {};
    }
    const below = gapBelow(placement);
    const gaps: StyleMap = {
        [DOCUMENT_GAP_VARIABLES.block]: below,
        [DOCUMENT_GAP_VARIABLES.leading]: leadingGap(placement),
    };
    // The gap's own value rather than the variable, so a client without custom properties still reads it.
    if (spec.attrs?.[OWN_MARGINS_ATTRIBUTE] === undefined) {
        gaps['margin-top'] = NO_GAP;
        gaps['margin-bottom'] = below;
    }
    return gaps;
};

/** What a plugin writes for a plain element of the tag, as its stylesheet rule reaches it: one without the margin marker. */
const plainTagStyle = (spec: HtmlSpec, plainTags: Record<string, StyleMap>): StyleMap | undefined => {
    if (spec.attrs?.[OWN_MARGINS_ATTRIBUTE] !== undefined) {
        return undefined;
    }
    // Own keys only: a tag is not a property of `Object`.
    if (Object.prototype.hasOwnProperty.call(plainTags, spec.tag)) {
        return plainTags[spec.tag];
    }
    return undefined;
};

/** The style of every class the element carries that has one, later classes over earlier. */
const classStyle = (className: string, classes: Record<string, StyleMap>): StyleMap | undefined => {
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
 * The spec with the document's gaps, then its tag's style and its classes' styles, under its own `style`, so a
 * host margin replaces a gap untrimmed, and alignment and a font colour still win.
 */
const inlineSpec = (
    spec: HtmlSpec,
    placement: Placement | undefined,
    contentStyles: Required<ContentStyles>,
): HtmlSpec => {
    let looked = { ...documentGaps(spec, placement), ...plainTagStyle(spec, contentStyles.plainTags) };
    const className = spec.attrs?.class;
    if (className !== undefined) {
        looked = { ...looked, ...classStyle(className, contentStyles.classes) };
    }
    if (Object.keys(looked).length === 0) {
        return spec;
    }
    return { ...spec, attrs: { ...spec.attrs, style: { ...looked, ...spec.attrs?.style } } };
};

const inlineNode = (
    node: Exclude<DrawnNode, string>,
    placement: Placement | undefined,
    contentStyles: Required<ContentStyles>,
): DrawnNode => {
    switch (node.kind) {
        case 'html': {
            const childSpacing = childSpacingOf(contentElementOf(node.spec)?.attrs);
            return {
                kind: 'html',
                spec: inlineSpec(node.spec, placement, contentStyles),
                content: inlineSiblings(node.content, childSpacing, contentStyles),
            };
        }
        // A component's content carries its own mark, on the element the renderer wraps it in.
        case 'component':
            return { ...node, content: inlineSiblings(node.content, undefined, contentStyles) };
    }
};

/**
 * The nodes of one parent, spaced as its mark says, each placed among the others as `:first-child` and
 * `:last-child` count: text aside. Undefined spacing leaves them unspaced, as an element without the mark does.
 */
const inlineSiblings = (
    nodes: readonly DrawnNode[],
    spacing: ChildSpacing | undefined,
    contentStyles: Required<ContentStyles>,
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
        return inlineNode(node, placement, contentStyles);
    });
};

/**
 * The nodes with each element's looks written into its `style`, the classes left in place:
 * the document's gaps between blocks, by where each sits and how its container spaces it, and each class's style over them.
 *
 * @param nodes - The document's blocks, the children of its root.
 * @param contentStyles - What the plugins write, by class and by tag (`registry.contentStyles()`).
 */
export const inlineLooks = (nodes: readonly DrawnNode[], contentStyles: Required<ContentStyles>): DrawnNode[] =>
    inlineSiblings(nodes, ROOT_SPACING, contentStyles);
