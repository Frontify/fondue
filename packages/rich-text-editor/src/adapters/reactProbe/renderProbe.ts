/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createElement, type ReactNode } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { CONTENT_SLOT, type DomChild, type DomElement, type ProbedDom, type RenderProbe } from '#/ports';

/**
 * The `RenderProbe` implemented by rendering React to markup and reading the
 * result back. The only module that renders React outside the component tree,
 * and an adapter of its own rather than a helper inside the engine: hosting a
 * document and rendering React are separate jobs, and another way of doing this
 * one (a DOM-free renderer, say) would be a new file here.
 *
 * Reading the markup back needs somewhere to read it into, which is the whole
 * reason a document is taken rather than assumed: serializing a document to HTML
 * is something an app does on a server, where there is no page to borrow one
 * from and one is brought in instead (happy-dom, jsdom).
 */

/**
 * Turn one rendered node into a static description of it. The text holding the
 * sentinel becomes the content slot; anything beside that slot throws, since
 * the editable content would have nowhere to go.
 */
const toDomChild = (node: ChildNode): DomChild | null => {
    if (node.nodeType === node.TEXT_NODE) {
        const text = node.textContent ?? '';
        if (text.includes(CONTENT_SLOT)) {
            return 0;
        }
        return text === '' ? null : text;
    }
    if (node.nodeType !== node.ELEMENT_NODE) {
        return null;
    }
    const element = node as Element;
    const children = Array.from(element.childNodes, toDomChild).filter((child) => child !== null);
    if (children.length > 1 && children.includes(0)) {
        throw new Error(
            `A plugin renders <${element.tagName.toLowerCase()}> with the children slot next to other content. ` +
                'The slot has to be the only thing inside its element — wrap the rest in an element of its own.',
        );
    }
    return [
        element.tagName.toLowerCase(),
        Object.fromEntries(Array.from(element.attributes, (attr) => [attr.name, attr.value])),
        ...children,
    ];
};

/**
 * Probed renders are remembered per declaration, and the cache hangs off the
 * probe — so two probes over one document would each build their own, and the
 * editor and a serialization of the same document would do the work twice for
 * an answer that has to be identical anyway. One probe per document instead.
 */
const probes = new WeakMap<Document, RenderProbe>();

export const createReactRenderProbe = (document: Document): RenderProbe => {
    const existing = probes.get(document);
    if (existing) {
        return existing;
    }

    const probe: RenderProbe = (render: () => ReactNode): ProbedDom => {
        const markup = renderToStaticMarkup(createElement(render));
        // An element to read the markup into, rather than a parser: every
        // document has one to offer, and a `DOMParser` is a browser global that
        // a document brought in for the purpose does not carry.
        const host = document.createElement('div');
        host.innerHTML = markup;
        const root = host.firstElementChild;
        if (!root) {
            throw new Error(`A plugin render function produced no element. Output was: ${markup}`);
        }
        const element = toDomChild(root) as DomElement;
        return { tag: element[0], element };
    };

    probes.set(document, probe);
    return probe;
};

/**
 * The probe for the page this is running on. The editor's, and the default for
 * serializing — so both get the same one, and the same remembered renders.
 */
export const reactRenderProbe: RenderProbe = (render: () => ReactNode): ProbedDom =>
    createReactRenderProbe(pageDocument())(render);

/** Throws where there is no page, which is where a document has to be passed in. */
export const pageDocument = (): Document => {
    const { document } = globalThis;
    if (!document) {
        throw new Error(
            'There is no document to build the markup in. Pass one as `document` — on a server, from happy-dom or jsdom.',
        );
    }
    return document;
};
