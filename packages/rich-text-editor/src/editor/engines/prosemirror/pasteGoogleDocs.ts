/* (c) Copyright Frontify Ltd., all rights reserved. */

// Google Docs wraps what it copies in a `<b>` that is bold in name only, and
// writes an empty line as a lone `<br>` between blocks.

/** The id Docs writes on the wrapper, or in Firefox on the first block. */
const MARKED = '[id^="docs-internal-guid-"]';
/** Docs' wrapper is a `<b>` with this weight; a bold `<b>` with the id is formatting. */
const WRAPPER_TAG = 'b';
const WRAPPER_WEIGHT = 'normal';
/** The break WebKit adds after a copy. */
const INTERCHANGE_NEWLINE = 'br.Apple-interchange-newline';

/**
 * Elements that are blocks to the parse, between which a `<br>` stands for an
 * empty line: prosemirror-model's own `blockTags`, which it does not export.
 */
const BLOCKS = [
    'address, article, aside, blockquote, body, canvas, dd, div, dl, fieldset, figcaption, figure, footer, form',
    'h1, h2, h3, h4, h5, h6, header, hgroup, hr, li, noscript, ol, output, p, pre, section, table, tfoot, ul',
].join(', ');

/** Whether `element` is a block, or the start or end of `root` when there is none. */
const isBlockEdge = (element: Element | undefined): boolean => element === undefined || element.matches(BLOCKS);

/**
 * Each `<br>` of a run between two blocks of `root`, or between a block and
 * the start or end of `root`, becomes one empty paragraph, the line it stands for.
 */
const breaksAsParagraphs = (root: Element): void => {
    let before: Element | undefined;
    let breaks: Element[] = [];
    const replaceBreaks = (after: Element | undefined): void => {
        if (isBlockEdge(before) && isBlockEdge(after) && (before !== undefined || after !== undefined)) {
            for (const lineBreak of breaks) {
                lineBreak.replaceWith(root.ownerDocument.createElement('p'));
            }
        }
        breaks = [];
    };
    // Live, but safe: a break turns into a paragraph in its own place, so no later child moves.
    for (const child of root.children) {
        if (child.localName === 'br') {
            breaks.push(child);
            continue;
        }
        replaceBreaks(child);
        before = child;
    }
    replaceBreaks(undefined);
};

/** The element whose children are a Docs copy's blocks: the wrapper, or the paste when Firefox marks its first block. */
const docsCopyRoot = (dom: HTMLElement): Element | undefined => {
    const marked = dom.querySelector(MARKED);
    if (marked === null) {
        return undefined;
    }
    if (
        marked instanceof HTMLElement &&
        marked.localName === WRAPPER_TAG &&
        marked.style.fontWeight === WRAPPER_WEIGHT
    ) {
        return marked;
    }
    // The engine drops a `<meta>` only at the very start, so one after the clipboard's Windows preamble stays.
    let first = dom.firstElementChild;
    while (first?.localName === 'meta') {
        first = first.nextElementSibling;
    }
    // Anywhere but the wrapper or a first block, the id says nothing about the paste.
    if (marked === first && marked.matches(BLOCKS)) {
        return dom;
    }
    return undefined;
};

/**
 * Cleans a Google Docs copy, found by its id: breaks between blocks become
 * empty paragraphs, and the break WebKit adds after the copy goes. The bold
 * mark's own rule reads the wrapper as not bold. Does nothing to a paste from elsewhere.
 */
export const tidyGoogleDocs = (dom: HTMLElement): void => {
    const root = docsCopyRoot(dom);
    if (root === undefined) {
        return;
    }
    for (const lineBreak of dom.querySelectorAll(INTERCHANGE_NEWLINE)) {
        lineBreak.remove();
    }
    breaksAsParagraphs(root);
};
