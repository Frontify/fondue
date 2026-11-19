/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DOMParser as PmDOMParser } from 'prosemirror-model';

import { type ParseHtmlDocument } from '#/editor/port';

import { toRteDocument } from './documentConversion';
import { buildSchema } from './schema';
import { keepUnreadStructureApart } from './unreadStructure';

/**
 * Elements a `<br>` may end without ending a block: prosemirror-view's own
 * `inlineParents`, which it does not export and applies to every paste.
 */
const INLINE_PARENTS = new Set([
    'a',
    'abbr',
    'acronym',
    'b',
    'cite',
    'code',
    'del',
    'em',
    'i',
    'ins',
    'kbd',
    'label',
    'output',
    'q',
    'ruby',
    's',
    'samp',
    'span',
    'strong',
    'sub',
    'sup',
    'time',
    'u',
    'tt',
    'var',
]);

/**
 * The last `<br>` of a block draws nothing in HTML, so the export writes an
 * extra one to keep a trailing break or an empty block. A paste drops it, and
 * so does this.
 */
const dropBlockEndBreaks = (root: HTMLElement): void => {
    for (const lineBreak of root.querySelectorAll('br')) {
        const parent = lineBreak.parentNode;
        if (lineBreak.nextSibling === null && parent !== null && !INLINE_PARENTS.has(parent.nodeName.toLowerCase())) {
            lineBreak.remove();
        }
    }
};

/**
 * HTML as a document, read the way a paste is but without the clean-up only a
 * clipboard needs (Word, Outlook, Google Docs). The elements are built in a
 * new HTML document, which runs no script and loads no image.
 */
export const parseHtmlDocument: ParseHtmlDocument = ({ html, registry, document }) => {
    const { body } = document.implementation.createHTMLDocument('');
    body.innerHTML = html;
    const schema = buildSchema(registry);
    keepUnreadStructureApart(body, schema);
    dropBlockEndBreaks(body);
    return toRteDocument(PmDOMParser.fromSchema(schema).parse(body));
};
