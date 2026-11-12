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
 * What an inline element (a soft break, a mention) reads as in the text a typing rule matches.
 */
export const INLINE_PLACEHOLDER = '\uFFFC';

/**
 * The characters that may come right before a word starts, besides the start of a block, as the body of a
 * character class: whitespace, an opening bracket or a quote. Whether an inline element counts is for each
 * reader to say, as `INLINE_PLACEHOLDER` is not part of it.
 */
export const WORD_START_CONTEXT = String.raw`\s([{<'"“‘`;

/**
 * Inside a block's `content.blocks`, stands for every mounted list (a block with
 * `content: { items }`), so a list item can allow nesting without naming lists.
 */
export const ANY_LIST = '@anyList';

/**
 * The pasted-list contract between the editor and list plugins: the attributes the editor writes on each pasted
 * paragraph the source app marks as a list item, for a paste transform to rebuild lists from. The editor removes any
 * the paste itself carries before it writes them.
 * - `list`: the source app's list identity (Word's `l0 lfo1`).
 * - `level`: the nesting level, 1 to 9.
 * - `marker`: the kind of marker, a `PastedListMarker`.
 * - `number`: the item's own number, when its marker has one.
 */
export const PASTED_LIST_ITEM_ATTRIBUTES = {
    list: 'data-rte-pasted-list',
    level: 'data-rte-pasted-list-level',
    marker: 'data-rte-pasted-list-marker',
    number: 'data-rte-pasted-list-number',
} as const;

/** The kind of marker a pasted list item showed in the source app. */
export type PastedListMarker = 'bullet' | 'numbered';

/** Every attribute of the pasted-list contract. */
const CONTRACT_ATTRIBUTES = Object.values(PASTED_LIST_ITEM_ATTRIBUTES);
/** Elements carrying any attribute of the pasted-list contract. */
const CARRYING_CONTRACT = CONTRACT_ATTRIBUTES.map((name) => `[${name}]`).join(', ');

/** Removes the pasted-list contract from every element of `root` that carries it. */
export const removePastedListContract = (root: ParentNode): void => {
    for (const element of root.querySelectorAll(CARRYING_CONTRACT)) {
        for (const name of CONTRACT_ATTRIBUTES) {
            element.removeAttribute(name);
        }
    }
};

/** The document the editor starts from when it is given none: one empty paragraph. */
export const emptyDocument = (): RteDocumentOf => ({
    version: DOCUMENT_VERSION,
    blocks: [{ type: PARAGRAPH, children: [{ text: '' }] }],
});
