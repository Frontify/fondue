/* (c) Copyright Frontify Ltd., all rights reserved. */

// The document format: what gets stored and sent over the wire, open over the
// blocks, marks and inlines plugins contribute.

/**
 * A stored document: plain JSON, the same whichever editor wrote it. The *open*
 * form, parameterized over its blocks; `RteDocument` closes it over the blocks
 * the shipped plugins write.
 */
export type RteDocumentOf<TBlock extends RteBlockNode = RteBlockNode> = {
    version: 1;
    blocks: TBlock[];
};

/**
 * Structural shape of any block; plugin-declared attributes live flat on it.
 * `children` is text runs for a text block, blocks for a container (a list
 * holds its items) — per the block's declared `content` — and absent for a void
 * block (a column break).
 */
export type RteBlockNode = {
    type: string;
    children?: RteInlineNode[] | RteBlockNode[];
};

/** The baseline block every editor has. */
export type ParagraphBlock = {
    type: 'paragraph';
    children: RteInlineNode[];
};

/** What can sit inside a text block: text runs, or void inline elements (mentions, line breaks). */
export type RteInlineNode = RteTextNode | RteInlineElementNode;

/**
 * A text leaf. Marks live flat on the node, keyed by mark type: `true` for a
 * plain mark (`bold: true`), the attributes for a valued one (`link: { href }`).
 * Presence turns a mark on; there is no `false`.
 *
 * The index signature keeps the format open over plugin marks. Displaying a
 * document needs the plugin behind every mark it carries: a missing one throws,
 * naming the mark. Authoring goes through the closed `RteText`, which catches
 * typos in mark keys.
 */
export type RteTextNode = {
    text: string;
    /** Never present — it is what tells this apart from an inline element. */
    type?: undefined;
    [mark: string]: unknown;
};

/** What a mark key holds on a text node: `true` for a mark carrying nothing, else its attributes. */
export type StoredMarkValue = true | Record<string, unknown>;

/**
 * A void inline element (e.g. a mention): no text, data flat in attributes.
 * Told apart from text nodes by having `type` instead of `text`.
 *
 * Both members spell the absent half out as `?: undefined`: without it the index
 * signatures make `text` and `type` "possibly present" on either, and nothing
 * narrows. The cost is that no mark may be named `type` and no attribute `text`.
 */
export type RteInlineElementNode = {
    type: string;
    /** Never present — see `RteTextNode`. */
    text?: undefined;
    [attribute: string]: unknown;
};
