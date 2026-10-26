/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createElementBeside } from './dom';

/** The `id` that Google Docs writes on the element around its copied content, or on the first block without one. */
const MARKED = '[id^="docs-internal-guid-"]';

/** Elements the parse reads as blocks, between which a run of breaks stands for empty lines. */
const PARSED_BLOCKS = new Set([
    'address',
    'article',
    'aside',
    'blockquote',
    'dd',
    'div',
    'dl',
    'dt',
    'figure',
    'footer',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'header',
    'hr',
    'li',
    'ol',
    'p',
    'pre',
    'section',
    'table',
    'tbody',
    'td',
    'tfoot',
    'th',
    'thead',
    'tr',
    'ul',
]);

const isBlock = (node: Node | null) => node !== null && PARSED_BLOCKS.has(node.nodeName.toLowerCase());

/**
 * Turns each `br` of a run of breaks between two blocks of `root` into one empty paragraph, which is the empty line
 * it stands for. One pass over the children.
 */
const breaksAsParagraphs = (root: Element) => {
    const breaks: ChildNode[] = [];
    let pending: ChildNode[] = [];
    let before: ChildNode | null = null;
    for (let child = root.firstChild; child !== null; child = child.nextSibling) {
        if (child.nodeName === 'BR') {
            pending.push(child);
            continue;
        }

        if (child.nodeType === child.TEXT_NODE && (child.textContent ?? '').trim() === '') {
            continue;
        }

        if (isBlock(before) && isBlock(child)) {
            for (const br of pending) {
                breaks.push(br);
            }
        }

        pending = [];
        before = child;
    }

    for (const br of breaks) {
        br.replaceWith(createElementBeside(br, 'p'));
    }
};

/**
 * Cleans a Google Docs capture, found by its `docs-internal-guid-` id: its `br`s between blocks become empty
 * paragraphs. Its `b` wrapper and the styles of its runs stay for the mark features' rules to read. Without that
 * wrapper, as in Firefox, the id is on the first block.
 */
export const cleanGoogleDocs = (body: HTMLElement) => {
    const marked = body.querySelector(MARKED);
    if (marked === null) {
        return;
    }

    marked.removeAttribute('id');
    let root: Element = body;
    if (marked.localName === 'b') {
        root = marked;
    } else if (marked !== body.firstElementChild) {
        // The id marks a capture only on the wrapper or, in Firefox, on the first block; anywhere else it is not one.
        return;
    }

    breaksAsParagraphs(root);
};
