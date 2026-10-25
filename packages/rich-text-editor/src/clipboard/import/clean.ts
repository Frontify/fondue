/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Schema, DOMParser as SchemaParser } from 'prosemirror-model';

import { descriptorOf } from './dom';

/** The host's DOM implementation, whose constructors and prototypes the import reads. */
export type DomWindow = Window & typeof globalThis;

/**
 * Turns each `form` into a `div`, through prototype accessors only, since a control named `nodeType` or `firstChild`
 * shadows that property on its form and would hide the form's text from the parse.
 */
export const replaceForms = (dom: DomWindow, inert: Document) => {
    const node = dom.Node.prototype;
    const query = descriptorOf(dom.Document.prototype, 'querySelectorAll').value as Document['querySelectorAll'];
    const create = descriptorOf(dom.Document.prototype, 'createElement').value as Document['createElement'];
    const firstChild = descriptorOf(node, 'firstChild').get as () => ChildNode | null;
    const parentNode = descriptorOf(node, 'parentNode').get as () => ParentNode | null;
    const append = descriptorOf(node, 'appendChild').value as globalThis.Node['appendChild'];
    const replace = descriptorOf(node, 'replaceChild').value as globalThis.Node['replaceChild'];
    for (const form of Array.from(query.call(inert, 'form'))) {
        const block = create.call(inert, 'div');
        for (let child = firstChild.call(form); child !== null; child = firstChild.call(form)) {
            append.call(block, child);
        }
        const parent = parentNode.call(form);
        if (parent !== null) {
            replace.call(parent, block, form);
        }
    }
};

/**
 * Cuts each class attribute to `max` characters, since jsdom parses a class attribute again on each class query, in time
 * that grows with the square of its tokens. No parse rule reads a class that far in.
 */
export const limitClasses = (body: HTMLElement, max: number) => {
    for (const element of [body, ...Array.from(body.querySelectorAll('[class]'))]) {
        const value = element.getAttribute('class');
        if (value !== null && value.length > max) {
            element.setAttribute('class', value.slice(0, max));
        }
    }
};

/** Removes the notes that the package's HTML writer adds after content, such as the islands notice, which are no content. */
export const removeNotes = (body: HTMLElement) => {
    for (const note of Array.from(body.querySelectorAll('[data-rte-message]'))) {
        note.remove();
    }
};

/** Replaces each SVG and MathML element with its text, since the engine's tag rules match their elements by name alone. */
export const replaceForeign = (body: HTMLElement) => {
    for (const foreign of Array.from(body.querySelectorAll('svg, math'))) {
        // An outer element's replacement already detached and read the ones nested in it.
        if (!foreign.isConnected) {
            continue;
        }
        for (const hidden of Array.from(foreign.querySelectorAll('script, style, title'))) {
            hidden.remove();
        }
        // The whitespace at its edges lays out markup, and would stay as a leading space between blocks.
        foreign.replaceWith((foreign.textContent ?? '').trim());
    }
};

/** The engine ignores `object` with its children; a skip rule keeps its fallback text. */
export const removeObjectChildren = (body: HTMLElement) => {
    for (const nested of Array.from(body.querySelectorAll('object object, object embed, object param'))) {
        nested.remove();
    }
};

/** Turns each cell of a table the schema cannot hold into a block, so each cell's text stays a paragraph; counts the tables. */
export const replaceTables = (body: HTMLElement, schema: Schema) => {
    const holdsCells = SchemaParser.fromSchema(schema).rules.some(
        ({ tag }) => tag !== undefined && /^t[dh]\b/.test(tag),
    );
    if (holdsCells) {
        return 0;
    }
    for (const cell of Array.from(body.querySelectorAll('td, th'))) {
        const block = cell.ownerDocument.createElement('div');
        block.append(...Array.from(cell.childNodes));
        cell.replaceWith(block);
    }
    return body.querySelectorAll('table').length;
};

/** Replaces each image with its `alt` text, so nothing fetches it, and counts them. */
export const replaceImages = (body: HTMLElement) => {
    const images = Array.from(body.querySelectorAll('img'));
    for (const image of images) {
        const alt = image.getAttribute('alt') ?? '';
        if (alt === '') {
            image.remove();
        } else {
            image.replaceWith(alt);
        }
    }
    return images.length;
};

/** WebKit and Chrome write a copied space as a span holding only U+00A0, which ProseMirror's own paste turns back. */
export const restoreSpaces = (body: HTMLElement) => {
    for (const span of Array.from(
        body.querySelectorAll('span.Apple-converted-space, span:not([class]):not([style])'),
    )) {
        // A span with any other attribute, such as a language mark's `lang`, holds a mark, not a copied space.
        const copied = span.classList.contains('Apple-converted-space') || span.attributes.length === 0;
        if (copied && span.childNodes.length === 1 && span.textContent === '\u00A0') {
            span.replaceWith(' ');
        }
    }
};
