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
    /**
     * The gap above a block: `0` where nothing above it sits apart from it, unset elsewhere.
     * A block that wants space above reads `var(--rte-leading-gap, <its own gap>)`.
     */
    leading: '--rte-leading-gap',
} as const;

/**
 * Set on the outermost element of a block that declares `ownsMargins`: the block's own stylesheet
 * writes its margins, so the document's rule for blocks without a look leaves it alone.
 */
export const OWN_MARGINS_ATTRIBUTE = 'data-rte-own-margins';

/**
 * Set on the element whose children are the content of a block that holds blocks, to its `childSpacing`:
 * the document spaces those children apart, or tight.
 */
export const CHILD_SPACING_ATTRIBUTE = 'data-rte-child-spacing';
