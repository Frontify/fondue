/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RteDocumentOf } from './document';

/**
 * The handful of names the editor itself depends on. Deliberately short: a
 * plugin's block types and mark keys stay with the plugin declaring them, so a
 * name the core has never heard of works exactly as well as a shipped one.
 */

/** The baseline block every editor has; the default for empty documents and Enter-key splits. */
export const PARAGRAPH = 'paragraph';

/** The document format's version, carried on every document. */
export const DOCUMENT_VERSION = 1;

/**
 * Stands in for "every list that is mounted" inside a block's `children.blocks`,
 * so a list item can allow nesting without naming lists that may not exist yet.
 * The schema assembler expands it to every mounted block declared as a list
 * (`children: { items }`).
 */
export const ANY_LIST = '@anyList';

/** The document the editor starts from when it is given none: one empty paragraph. */
export const emptyDocument = (): RteDocumentOf => ({
    version: DOCUMENT_VERSION,
    blocks: [{ type: PARAGRAPH, children: [{ text: '' }] }],
});
