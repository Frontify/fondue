/* (c) Copyright Frontify Ltd., all rights reserved. */

// The names the document's markup and its stylesheets agree on. Stylesheets cannot import them, so
// `__tests__/documentContract.spec.ts` fails when a stylesheet spells one differently.

/**
 * The custom properties through which the document hands out the space between blocks.
 * The document sets them on each block; a block's look reads them for its margins.
 * A plugin that wants a gap of its own names that variable itself.
 */
export const DOCUMENT_GAP_VARIABLES = {
    /** The gap below a block. */
    block: '--rte-block-gap',
} as const;

/**
 * Set on the outermost element of a block that declares `ownsMargins`: the block's own stylesheet
 * writes its margins, so the document's rule for blocks without a look leaves it alone.
 */
export const OWN_MARGINS_ATTRIBUTE = 'data-rte-own-margins';
