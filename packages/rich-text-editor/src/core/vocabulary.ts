/* (c) Copyright Frontify Ltd., all rights reserved. */

// The handful of names the editor itself depends on. Deliberately short: a
// plugin's block types and mark keys stay with the plugin declaring them.

import { type RteDocumentOf } from './document';
import { type BlockDefinition, defineBlock } from './plugin';

/** The baseline block every editor has; the default for empty documents and Enter-key splits. */
export const PARAGRAPH = 'paragraph';

/** The paragraph, registered ahead of every plugin's blocks so it is treated like any other block. */
export const paragraphBlock: BlockDefinition = defineBlock({
    content: 'text',
    toHtml: () => ({ tag: 'p', children: true }),
    parse: [{ tag: 'p' }],
});

/**
 * The document format's version, carried on every document. An editor shows a
 * newer document read-only, so raise it only for a change an older editor would
 * lose or misread: today that includes a new block attribute, which it drops on save.
 */
export const DOCUMENT_VERSION = 1;

/** The document's version when it is newer than this editor writes; a missing or non-numeric one is not. */
export const newerVersionOf = (document: RteDocumentOf): number | null => {
    const { version } = document;
    if (typeof version === 'number' && version > DOCUMENT_VERSION) {
        return version;
    }
    return null;
};

/**
 * Inside a block's `content.blocks`, stands for every mounted list (a block with
 * `content: { items }`), so a list item can allow nesting without naming lists.
 */
export const ANY_LIST = '@anyList';

/** The document the editor starts from when it is given none: one empty paragraph. */
export const emptyDocument = (): RteDocumentOf => ({
    version: DOCUMENT_VERSION,
    blocks: [{ type: PARAGRAPH, children: [{ text: '' }] }],
});
