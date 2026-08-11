/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

import { type RteBlockNode, type RteInlineElementNode } from './document';

/**
 * What a plugin declares *exists*: blocks, inline elements, marks, and the
 * attributes every text block carries. All declarative — the adapter turns
 * these into engine schema, and rendering is the single source of truth that
 * copy/paste derives from.
 */

/**
 * Declaration of one piece of data a block, inline, or mark carries. Stored
 * flat on the document node; rendering writes it out itself, so the only
 * parse-side concern is reading it back from HTML.
 */
export type AttributeSpec = {
    /** Value when the attribute is absent. */
    default?: unknown;
    /**
     * Read this attribute back from a DOM attribute when parsing pasted HTML
     * — e.g. an image's `src`. Pass a string when the DOM attribute is named
     * differently (`id: { parseFromDomAttribute: 'data-mention-id' }`).
     */
    parseFromDomAttribute?: boolean | string;
    /**
     * Read this attribute back from a CSS property when parsing pasted HTML —
     * e.g. `color` for a font-color mark, whose value lives in the style
     * attribute rather than in one of its own.
     */
    parseFromStyle?: string;
};

/** One rule for recognizing pasted HTML. */
export type ParseRule = {
    /** Element that is recognized, e.g. `h2` or `b`. */
    tag: string;
    /** Attribute values this element implies, e.g. `{ style: 'heading2' }` for `h2`. */
    attributes?: Record<string, unknown>;
};

export type BlockSpec = {
    /** Block type name stored on document nodes, e.g. `heading`. Word characters only — the engine's content grammar has no room for dashes. */
    type: string;
    /** The data this block carries — a heading's `level`, an image's `src`. */
    attributes?: Record<string, AttributeSpec>;
    /**
     * What sits inside the block: editable text (the default), or other blocks
     * for a container such as a list or a list item.
     */
    content?: 'text' | 'blocks';
    /**
     * With `content: 'blocks'`, the block types allowed inside. The first entry
     * is what a newly created block gets filled with, so put the text-bearing
     * one first (`[PARAGRAPH, ANY_LIST]` for a list item).
     *
     * A type named here that no mounted plugin declares simply drops out. Use
     * `ANY_LIST` for "whatever lists are mounted": a list item has to say that
     * lists may nest inside it, and it cannot know which ones exist — least of
     * all one written after it.
     */
    contains?: readonly string[];
    /**
     * True for a list: a container whose `contains` names its item type. It is
     * what makes the list commands (`lists.toggle`, `lists.indent`, …) work on
     * this block — they read the item type from here rather than being told.
     */
    isList?: boolean;
    /** True for blocks without editable text (e.g. images); void blocks have no `children`. */
    isVoid?: boolean;
    /**
     * How the block looks: a React render function whose markup becomes the
     * engine's description of the block. Nested elements are kept — a check
     * item can draw a checkbox beside its text — under one rule: `children`,
     * the editable content slot, must be the only thing inside its own element.
     * This is the single source of rendering truth; copy/paste derives from it.
     *
     * An element spreading `toggles('<attribute>')` (a checkbox) flips that
     * boolean attribute when clicked, which is how a void control inside an
     * otherwise declarative render stays interactive.
     */
    render: (props: { node: RteBlockNode; children: ReactNode }) => ReactNode;
    /** How pasted HTML becomes this block, e.g. `[{ tag: 'h2', attributes: { style: 'heading2' } }]`. */
    parseRules?: readonly ParseRule[];
};

export type InlineSpec = {
    /** Inline type name stored on inline nodes, e.g. `mention`. */
    type: string;
    /** The data this inline carries — a mention's `id` and `label`. */
    attributes?: Record<string, AttributeSpec>;
    /**
     * How the inline looks. Inline elements are void: there is no children
     * slot, visible content (`@{label}`) is rendered from the attributes, and
     * nested elements are kept as rendered.
     */
    render: (props: { node: RteInlineElementNode }) => ReactNode;
    /** How pasted HTML becomes this inline, e.g. `[{ tag: 'span[data-mention-id]' }]`. */
    parseRules?: readonly ParseRule[];
};

export type MarkSpec = {
    /** Flag name stored on text nodes, e.g. `bold` — `{ text: 'x', bold: true }`. */
    key: string;
    /**
     * The data this mark carries, stored as an object under the mark key —
     * a link's `href` gives `{ text: '…', link: { href } }`. Marks without
     * attributes are stored as plain `true`.
     */
    attributes?: Record<string, AttributeSpec>;
    /**
     * How the mark looks: a single element wrapping `children`. That element
     * is also recognized when parsing pasted HTML.
     */
    render: (props: { children: ReactNode; value: Record<string, unknown> }) => ReactNode;
    /** Additional rules for recognizing pasted HTML, e.g. `[{ tag: 'b' }]` for bold. */
    parseRules?: readonly ParseRule[];
    /**
     * Where this mark sits when marks nest on the same text: lower wraps
     * higher, and marks that tie keep the order their plugins were passed in.
     * Defaults to `0`, which is what a mark whose element is only a box for
     * its own styling wants.
     *
     * It matters when one mark's styling is read off the element another mark
     * draws: a text decoration takes the colour of the element that draws it
     * and descendants cannot change it, so the colour mark declares a lower
     * number to wrap underline and strikethrough rather than sit inside them.
     */
    nesting?: number;
};

/**
 * An attribute every text block carries, contributed by one plugin but applied
 * across block types. It affects the block's appearance through CSS rather than
 * through the owning plugin's render function, which is what lets alignment
 * work on blocks the align plugin knows nothing about.
 */
export type BlockAttributeSpec = {
    /** Attribute name stored on block nodes, e.g. `align`. */
    name: string;
    /** Value when the attribute is absent. */
    default?: unknown;
    /**
     * The CSS a value applies to the block element, e.g. `text-align: center`.
     * Values are strings — clear the attribute by setting it to null.
     */
    toStyle: (value: string) => string;
    /** Read the value back from this CSS property when parsing pasted HTML, e.g. `text-align`. */
    parseFromStyle?: string;
};
