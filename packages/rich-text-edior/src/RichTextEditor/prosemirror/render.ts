/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createElement, type ReactNode } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { type BlockAttributeSpec } from '../types';

/**
 * Rendering: plugins declare how things look as React functions, the engine
 * wants a DOM description. This module bridges the two, and adds the CSS that
 * injected block attributes (alignment) contribute.
 */

/** Attribute a rendered element uses to make itself a click-toggle for a boolean attribute. */
export const TOGGLE_ATTRIBUTE = 'data-rte-toggle';

/** Stands in for the editable content slot while probing. */
const SENTINEL = ' RTE_HOLE ';

/** Passed to a render function as its `children`, and recognized again in the markup. */
export const CONTENT_SLOT: ReactNode = SENTINEL;

/** The engine's DOM description: a tag, its attributes, and children — `0` marking the content slot. */
type DomChild = string | 0 | DomElement;
export type DomElement = [string, Record<string, string>, ...DomChild[]];

/** The root element's tag and attributes, plus the whole tree the render produced. */
export type ProbedDom = {
    tag: string;
    attrs: Record<string, string>;
    element: DomElement;
};

/**
 * Turn one rendered node into the engine's description of it. The text holding
 * the sentinel becomes the content slot; the engine requires that slot to be
 * the only thing inside its element, so text rendered beside it is dropped.
 */
const toDomChild = (node: ChildNode): DomChild | null => {
    if (node.nodeType === node.TEXT_NODE) {
        const text = node.textContent ?? '';
        if (text.includes(SENTINEL)) {
            return 0;
        }
        return text === '' ? null : text;
    }
    if (node.nodeType !== node.ELEMENT_NODE) {
        return null;
    }
    const element = node as Element;
    return [
        element.tagName.toLowerCase(),
        Object.fromEntries(Array.from(element.attributes, (attr) => [attr.name, attr.value])),
        ...Array.from(element.childNodes, toDomChild).filter((child): child is DomChild => child !== null),
    ];
};

/**
 * Plugins declare rendering as React functions; the engine needs a DOM
 * description. Bridge: render the function statically and walk the result.
 * Nested elements survive (a check item's checkbox beside its text), the one
 * rule being that the children slot is alone inside its element.
 */
const probeDom = (render: () => ReactNode): ProbedDom => {
    const markup = renderToStaticMarkup(createElement(render));
    const root = new DOMParser().parseFromString(markup, 'text/html').body.firstElementChild;
    if (!root) {
        throw new Error(`A plugin render function produced no element. Output was: ${markup}`);
    }
    const element = toDomChild(root) as DomElement;
    return { tag: element[0], attrs: element[1], element };
};

/** `toDOM` runs on every render, probing renders React — so cache per attribute set. */
export const probeCachedBy = (render: (attrs: Record<string, unknown>) => ReactNode) => {
    const cache = new Map<string, ProbedDom>();
    return (attrs: Record<string, unknown>): ProbedDom => {
        const key = JSON.stringify(attrs);
        let probed = cache.get(key);
        if (!probed) {
            probed = probeDom(() => render(attrs));
            cache.set(key, probed);
        }
        return probed;
    };
};

/** Injected block attributes contribute CSS, which has to join whatever the render function already set. */
export const withExtraStyle = (attrs: Record<string, string>, declarations: string[]): Record<string, string> => {
    if (declarations.length === 0) {
        return attrs;
    }
    const style = [attrs.style, ...declarations].filter(Boolean).join('; ');
    return { ...attrs, style };
};

/**
 * The CSS a node's injected attributes add. Their values are strings by
 * contract (`toStyle` takes one), so anything else counts as unset.
 */
export const injectedDeclarations = (
    attrs: Record<string, unknown>,
    injected: readonly BlockAttributeSpec[],
): string[] =>
    injected.flatMap((attribute) => {
        const value: unknown = attrs[attribute.name];
        return typeof value === 'string' && value !== '' ? [attribute.toStyle(value)] : [];
    });

/** Injected CSS lands on the outermost element the plugin rendered. */
export const withRootStyle = (element: DomElement, declarations: string[]): DomElement => {
    if (declarations.length === 0) {
        return element;
    }
    const [tag, attrs, ...children] = element;
    return [tag, withExtraStyle(attrs, declarations), ...children];
};
