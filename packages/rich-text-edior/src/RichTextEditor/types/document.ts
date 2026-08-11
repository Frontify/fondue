/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * The document format: what gets stored and sent over the wire, engine-agnostic
 * and open over the blocks, marks and inlines plugins contribute.
 */

/**
 * The canonical RTE document: what gets stored and sent over the wire. It is
 * NOT the editor's internal representation — the adapter converts to and from
 * the engine's native format at the boundary.
 *
 * This is the *open* form, parameterized over the blocks it may contain: the
 * editor knows only the structural skeleton plus the paragraph baseline.
 * Concrete blocks and marks are declared by the plugins implementing them,
 * and the package root closes the parameter over the official union —
 * `RteDocument` (no `Of`) is the type consumers use.
 */
export type RteDocumentOf<TBlock extends RteBlockNode = RteBlockNode> = {
    version: 1;
    blocks: TBlock[];
};

/**
 * Structural shape of any block. Plugin-declared attributes (a heading's
 * `level`) live flat on the node; the adapter reads them generically by the
 * names the plugin registered.
 *
 * `children` holds text runs for a text block, or other blocks for a container
 * block (a list holds its items). Which one applies follows from the block's
 * declared `content`, so the adapter never has to guess. Void blocks (images)
 * have no `children` at all.
 */
export type RteBlockNode = {
    type: string;
    children?: RteInlineNode[] | RteBlockNode[];
};

/** The baseline block every editor has; the default for empty documents and Enter-key splits. */
export type ParagraphBlock = {
    type: 'paragraph';
    children: RteInlineNode[];
};

/** What can sit inside a text block: text runs, or void inline elements (mentions, line breaks). */
export type RteInlineNode = RteTextNode | RteInlineElementNode;

/**
 * A text leaf. Marks live flat on the node, keyed by the mark key a plugin
 * registered: plain marks as booleans (`bold: true`), value-carrying marks as
 * objects (`link: { href }`). The index signature makes the format open — a
 * stored document may carry marks from plugins this build doesn't know.
 * Authoring goes through the package root's closed `RteText`, which lists the
 * marks that actually ship, so typos in mark keys are caught.
 */
export type RteTextNode = {
    text: string;
    [mark: string]: unknown;
};

/**
 * A void inline element (e.g. a mention): no text content of its own, data
 * lives flat in attributes. Discriminated from text nodes by having `type`
 * instead of `text`, and open for the same reason.
 */
export type RteInlineElementNode = {
    type: string;
    [attribute: string]: unknown;
};
