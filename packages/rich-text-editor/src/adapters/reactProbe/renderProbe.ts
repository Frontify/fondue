/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createElement, type ReactNode } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { CONTENT_SLOT, type DomChild, type DomElement, type ProbedDom, type RenderProbe } from '#/ports';

/**
 * The `RenderProbe` implemented by rendering React to markup and reading the
 * result back. This is the only module that renders React outside the component
 * tree, which is why it is an adapter of its own rather than a helper inside the
 * engine: hosting a document and rendering React are separate jobs, and a
 * different way of doing this one (a DOM-free renderer, say) is a new file here.
 */

/**
 * Turn one rendered node into a static description of it. The text holding the
 * sentinel becomes the content slot; anything beside that slot is a mistake the
 * caller has to see, since the content would have nowhere to go.
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

export const reactRenderProbe: RenderProbe = (render: () => ReactNode): ProbedDom => {
    const markup = renderToStaticMarkup(createElement(render));
    const root = new DOMParser().parseFromString(markup, 'text/html').body.firstElementChild;
    if (!root) {
        throw new Error(`A plugin render function produced no element. Output was: ${markup}`);
    }
    const element = toDomChild(root) as DomElement;
    return { tag: element[0], element };
};
