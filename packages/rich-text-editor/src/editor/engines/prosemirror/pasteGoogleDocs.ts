/* (c) Copyright Frontify Ltd., all rights reserved. */

// Google Docs wraps what it copies in a `<b>` that is bold in name only, and
// writes an empty line as a lone `<br>` between blocks.

/** The id Docs writes on the wrapper, or in Firefox on the first block. */
const MARKED = '[id^="docs-internal-guid-"]';

/** Elements that are blocks to the parse, between which a `<br>` stands for an empty line. */
const BLOCKS = [
    'address, article, aside, blockquote, dd, div, dl, dt, figure, footer, header, hr, li, ol, p, pre, section, ul',
    'h1, h2, h3, h4, h5, h6, table',
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
    for (const child of [...root.children]) {
        if (child.localName === 'br') {
            breaks.push(child);
            continue;
        }
        replaceBreaks(child);
        before = child;
    }
    replaceBreaks(undefined);
};

/**
 * Cleans a Google Docs copy, found by its id: breaks between blocks become
 * empty paragraphs, the wrapper goes, and so does the break WebKit adds after
 * the copy. Does nothing to a paste from elsewhere.
 */
export const tidyGoogleDocs = (dom: HTMLElement): void => {
    const marked = dom.querySelector(MARKED);
    if (marked === null) {
        return;
    }
    // Docs' wrapper is a `<b>` that says it is not bold; a bold `<b>` with the id is formatting.
    const wrapped = marked.localName === 'b' && (marked as HTMLElement).style.fontWeight === 'normal';
    // Anywhere but the wrapper or the first block, the id says nothing about the paste.
    if (!wrapped && marked !== dom.firstElementChild) {
        return;
    }
    for (const lineBreak of dom.querySelectorAll('br.Apple-interchange-newline')) {
        lineBreak.remove();
    }
    if (!wrapped) {
        breaksAsParagraphs(dom);
        return;
    }
    breaksAsParagraphs(marked);
    marked.replaceWith(...marked.childNodes);
};
