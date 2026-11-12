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
 * What an inline element (for example, a soft break or a mention) reads as in the text a typing rule matches.
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
 * What the editor keeps of the list data Word and Outlook write on a list paragraph, as attributes on that paragraph,
 * exactly as the source app wrote it and without reading it, for a paste transform to read. The editor removes any
 * the paste itself carries before it writes them, and removes them again after the transforms have run.
 * - `list`: the id of the source app's list (Word's `l0 lfo1`).
 * - `level`: the nesting level, as the digits Word wrote.
 * - `marker`: the text of the marker the paragraph began with, such as `1.` or `·`.
 */
export const OFFICE_LIST_ATTRIBUTES = {
    list: 'data-rte-office-list',
    level: 'data-rte-office-level',
    marker: 'data-rte-office-marker',
} as const;

/** Every attribute of the Office list data. */
const OFFICE_LIST_ATTRIBUTE_NAMES = Object.values(OFFICE_LIST_ATTRIBUTES);
/** Elements carrying any attribute of the Office list data. */
const CARRYING_OFFICE_LIST_DATA = OFFICE_LIST_ATTRIBUTE_NAMES.map((name) => `[${name}]`).join(', ');

/** Removes the Office list data from every element of `root` that carries it. */
export const removeOfficeListData = (root: ParentNode): void => {
    for (const element of root.querySelectorAll(CARRYING_OFFICE_LIST_DATA)) {
        for (const name of OFFICE_LIST_ATTRIBUTE_NAMES) {
            element.removeAttribute(name);
        }
    }
};

/** The document the editor starts from when it is given none: one empty paragraph. */
export const emptyDocument = (): RteDocumentOf => ({
    version: DOCUMENT_VERSION,
    blocks: [{ type: PARAGRAPH, children: [{ text: '' }] }],
});
