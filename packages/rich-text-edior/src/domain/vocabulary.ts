/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RteDocumentOf } from './document';

/**
 * The handful of names the editor itself depends on. Deliberately short: a
 * plugin's block types and mark keys stay with the plugin that declares them, so
 * that a name the core has never heard of works exactly as well as a shipped one.
 * What lands here is only what the core cannot function without.
 */

/** The baseline block every editor has; the default for empty documents and Enter-key splits. */
export const PARAGRAPH = 'paragraph';

/** The document format's version, carried on every document. */
export const DOCUMENT_VERSION = 1;

/**
 * Stands in for "every list that is mounted" inside a `BlockSpec.contains`. A
 * list item has to say what may nest inside it, but it cannot know which lists
 * exist — including lists from plugins written after it. The schema assembler
 * expands this to every mounted block declared `isList`.
 */
export const ANY_LIST = '@anyList';

/** The document the editor starts from when it is given none: one empty paragraph. */
export const emptyDocument = (): RteDocumentOf => ({
    version: DOCUMENT_VERSION,
    blocks: [{ type: PARAGRAPH, children: [{ text: '' }] }],
});
