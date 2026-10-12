/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createElementBeside, unwrap } from './dom';

/** The `id` that Google Docs writes on the element around its copied content, or on the first block without one. */
const MARKED = '[id^="docs-internal-guid-"]';

/** Elements whose content the parse reads as blocks, which a run's mark element must not wrap. */
const BLOCKS = new Set([
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

const isBlock = (node: Node | null) => node !== null && BLOCKS.has(node.nodeName.toLowerCase());

const styleOf = (element: Element) => (element as HTMLElement).style as CSSStyleDeclaration | undefined;

/** The weight `element` declares, as CSS reads it: bold from 600, `undefined` when it declares none. */
const declaredBold = (element: Element): boolean | undefined => {
    const style = styleOf(element);
    let weight = '';
    if (style !== undefined) {
        weight = style.getPropertyValue('font-weight').trim().toLowerCase();
    }
    if (weight === '' || weight === 'inherit' || weight === 'unset') {
        if (element.localName === 'b' || element.localName === 'strong') {
            return true;
        }
        return undefined;
    }
    if (weight === 'bold' || weight === 'bolder') {
        return true;
    }
    const value = Number(weight);
    return Number.isFinite(value) && value >= 600;
};

/** The wrapper around a Chromium capture, a `b` that sets a normal weight, or `undefined` for any other element. */
const wrapperOf = (marked: Element) => {
    if (marked.localName !== 'b' || declaredBold(marked) !== false) {
        return undefined;
    }
    return marked;
};

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

/** Whether `text` is layout between blocks, which a mark element would turn into inline content. */
const isLayoutText = (text: Node) =>
    /^[\t\n\f\r ]*$/.test(text.textContent ?? '') && (text.parentNode === null || isBlock(text.parentNode));

/**
 * Makes the weight of each text under `root` the one CSS gives it, the nearest weight declared around it: bold text
 * goes in a `strong` of its own, and the `b`, `strong` and `font-weight` around it go, so a normal weight inside a
 * bold element stays normal. One pass without recursion.
 */
const readWeights = (root: Element) => {
    const bold: Node[] = [];
    const tags: Element[] = [];
    const weighted: CSSStyleDeclaration[] = [];
    const pending: (readonly [Node, boolean])[] = [];
    for (let child = root.firstChild; child !== null; child = child.nextSibling) {
        pending.push([child, false]);
    }
    for (let next = pending.pop(); next !== undefined; next = pending.pop()) {
        const [node, inherited] = next;
        if (node.nodeType === node.TEXT_NODE) {
            if (inherited && !isLayoutText(node)) {
                bold.push(node);
            }
            continue;
        }
        if (node.nodeType !== node.ELEMENT_NODE) {
            continue;
        }
        const element = node as Element;
        const declared = declaredBold(element);
        let effective = inherited;
        if (declared !== undefined) {
            effective = declared;
        }
        if (element.localName === 'b' || element.localName === 'strong') {
            tags.push(element);
        }
        const style = styleOf(element);
        if (style !== undefined && style.getPropertyValue('font-weight') !== '') {
            weighted.push(style);
        }
        for (let child = element.firstChild; child !== null; child = child.nextSibling) {
            pending.push([child, effective]);
        }
    }
    for (const text of bold) {
        const strong = createElementBeside(text, 'strong');
        text.parentNode?.replaceChild(strong, text);
        strong.append(text);
    }
    for (const style of weighted) {
        style.removeProperty('font-weight');
    }
    for (const tag of tags) {
        const style = tag.getAttribute('style');
        if (style === null) {
            unwrap(tag);
            continue;
        }
        // Its other styles, such as italic, still stand for marks.
        const span = createElementBeside(tag, 'span');
        span.setAttribute('style', style);
        tag.before(span);
        for (let child = tag.firstChild; child !== null; child = tag.firstChild) {
            span.append(child);
        }
        tag.remove();
    }
};

/** The mark elements that the italic, decoration and baseline styles of `element` stand for. */
const markTagsOf = (element: Element) => {
    const style = styleOf(element);
    if (style === undefined) {
        return [];
    }
    const tags: string[] = [];
    if (style.getPropertyValue('font-style').trim() === 'italic') {
        tags.push('em');
    }
    const decoration = style.getPropertyValue('text-decoration').toLowerCase().split(/\s+/);
    if (decoration.includes('underline')) {
        tags.push('u');
    }
    if (decoration.includes('line-through')) {
        tags.push('s');
    }
    const baseline = style.getPropertyValue('vertical-align').trim();
    if (baseline === 'sub' || baseline === 'super') {
        tags.push(baseline.slice(0, 3));
    }
    return tags;
};

/** Wraps the content of each inline element under `root` in the mark elements its style stands for. */
const readStyles = (root: Element) => {
    for (const element of Array.from(root.querySelectorAll('[style]'))) {
        if (isBlock(element) || element.firstChild === null) {
            continue;
        }
        const tags = markTagsOf(element);
        if (tags.length === 0) {
            continue;
        }
        const outer = createElementBeside(element, tags[0] as string);
        let inner = outer;
        for (const tag of tags.slice(1)) {
            const wrapper = createElementBeside(element, tag);
            inner.append(wrapper);
            inner = wrapper;
        }
        for (let child = element.firstChild; child !== null; child = element.firstChild) {
            inner.append(child);
        }
        element.append(outer);
    }
};

/**
 * Cleans a Google Docs capture, found by its `docs-internal-guid-` id: its `br`s between blocks become empty
 * paragraphs, its styled runs become the mark elements the parse rules read, and its `b` wrapper, which sets a normal
 * weight, goes without making the content bold. Without that wrapper, as in Firefox, the id is on the first block.
 */
export const cleanGoogleDocs = (body: HTMLElement) => {
    const marked = body.querySelector(MARKED);
    if (marked === null) {
        return;
    }
    marked.removeAttribute('id');
    const wrapper = wrapperOf(marked);
    let root: Element = body;
    if (wrapper !== undefined) {
        root = wrapper;
    } else if (marked !== body.firstElementChild) {
        // The id marks a capture only on the wrapper or, in Firefox, on the first block; anywhere else it is not one.
        return;
    }
    breaksAsParagraphs(root);
    readWeights(root);
    readStyles(root);
    if (wrapper !== undefined) {
        unwrap(wrapper);
    }
};
