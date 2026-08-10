/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * The canonical Frontify document: what gets stored and sent over the wire.
 * It is NOT the editor's internal representation — the adapter converts
 * to/from the engine's native format at the boundary.
 *
 * Core only defines the structural skeleton plus the paragraph baseline.
 * Concrete block and mark types are declared by the plugins that implement
 * them, and the package root assembles the official union of everything
 * that ships.
 */
export type FrontifyDocument = {
    version: 1;
    blocks: FrontifyBlockNode[];
};

/**
 * Structural shape of any block. Plugin-declared attrs (e.g. a heading's
 * `level`) live flat on the node; the adapter reads them generically by the
 * attr names the plugin registered.
 */
export type FrontifyBlockNode = {
    type: string;
    /** Absent on void blocks (e.g. images), which carry data in attrs only. */
    children?: FrontifyInlineNode[];
};

/** The baseline block every editor has; the default for empty documents and Enter-key splits. */
export type ParagraphBlock = {
    type: 'paragraph';
    children: FrontifyInlineNode[];
};

/** What can sit inside a block: text runs, or void inline elements (mentions). */
export type FrontifyInlineNode = FrontifyTextNode | FrontifyInlineElementNode;

/**
 * A void inline element (e.g. a mention): no text content of its own, data
 * lives flat in attributes. Discriminated from text nodes by having `type`
 * instead of `text`. Open like text marks — a stored document may carry
 * inline types from plugins this build doesn't know.
 */
export type FrontifyInlineElementNode = {
    type: string;
    [attribute: string]: unknown;
};

/**
 * A text leaf. Marks live flat on the node, keyed by the mark key a plugin
 * registered: plain marks as booleans (`bold: true`), value-carrying marks
 * as objects (`link: { href }`). The index signature makes the format open —
 * a stored document may carry marks from plugins this build doesn't know.
 * The named mark types (BoldMark, …) layer typed access on top.
 */
export type FrontifyTextNode = {
    text: string;
    [mark: string]: unknown;
};

/** A selection in document terms, engine-independent. */
export type FrontifySelection = {
    anchor: FrontifyPoint;
    focus: FrontifyPoint;
};

/**
 * A position in the document: `path` is `[blockIndex, childIndex]` into
 * `blocks` and the block's `children`, `offset` is the character offset in
 * that text node. A void block (image) is addressed by `[blockIndex]` alone.
 */
export type FrontifyPoint = {
    path: number[];
    offset: number;
};
