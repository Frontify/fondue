/* (c) Copyright Frontify Ltd., all rights reserved. */

// The names the document's markup and its stylesheets agree on. Stylesheets cannot import them, so
// `__tests__/documentContract.spec.ts` fails when a stylesheet spells one differently.

/**
 * The custom properties through which the document hands out the space between blocks.
 * The document sets them on each block; a block's look reads them for its margins.
 */
export const DOCUMENT_GAP_VARIABLES = {
    /** The gap below a block. */
    block: '--rte-block-gap',
    /** The gap above a heading, which is larger than a block's own gap. */
    heading: '--rte-heading-gap',
} as const;

/**
 * Set on the outermost element of a block that declares `ownsMargins`: the block's own stylesheet
 * writes its margins, so the document's rule for blocks without a look leaves it alone.
 */
export const OWN_MARGINS_ATTRIBUTE = 'data-rte-own-margins';

/** Set on the element a document is drawn in, by the editor and the renderer alike, so a test can find it. */
export const DOCUMENT_TEST_ID = 'rte-document';
