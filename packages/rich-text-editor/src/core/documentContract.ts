/* (c) Copyright Frontify Ltd., all rights reserved. */

// The names the document's markup and its stylesheets agree on. Stylesheets cannot import them, so
// `__tests__/documentContract.spec.ts` fails when a stylesheet spells one differently.

/**
 * The custom properties through which the document hands out the space between blocks.
 * The stack holding a block sets them on it, and the block's look reads them.
 * A plugin that wants a gap of its own names that variable itself.
 */
export const DOCUMENT_GAP_VARIABLES = {
    /** The gap below a block. */
    block: '--rte-block-gap',
} as const;

/**
 * The custom properties through which a block's look hands its margins to the stack holding it.
 * They are registered as not inherited, so a block's value never reaches the blocks inside it.
 */
export const OWN_MARGIN_VARIABLES = {
    /** The margin above a block. */
    top: '--rte-own-margin-top',
    /** The margin below a block. */
    bottom: '--rte-own-margin-bottom',
} as const;
