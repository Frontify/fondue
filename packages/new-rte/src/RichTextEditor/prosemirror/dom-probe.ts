/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { type BlockSpec, type InlineSpec, type MarkSpec } from '../core/plugin';

/**
 * Plugins declare rendering as React functions; the engine needs a tag +
 * DOM attributes. Bridge: render the function statically with a sentinel
 * child and extract the outermost element. Limitation (accepted): only a
 * single root element survives — no nested wrappers.
 */

const SENTINEL = ' FONDUE_HOLE ';

export type ProbedDom = {
    tag: string;
    attrs: Record<string, string>;
};

const extract = (markup: string): ProbedDom => {
    const doc = new DOMParser().parseFromString(`<root>${markup}</root>`, 'text/html');
    const el = doc.body.firstElementChild?.firstElementChild;
    if (!el) {
        throw new Error(`A plugin render function produced no element. Output was: ${markup}`);
    }
    const attrs: Record<string, string> = {};
    for (const attr of Array.from(el.attributes)) {
        attrs[attr.name] = attr.value;
    }
    return { tag: el.tagName.toLowerCase(), attrs };
};

export const probeBlockDom = (spec: BlockSpec, attrs: Record<string, unknown>): ProbedDom =>
    extract(
        renderToStaticMarkup(
            createElement(() =>
                spec.render({ node: { type: spec.type, ...attrs }, children: SENTINEL, attributes: {} }),
            ),
        ),
    );

export const probeMarkDom = (spec: MarkSpec, value: Record<string, unknown>): ProbedDom =>
    extract(renderToStaticMarkup(createElement(() => spec.render({ children: SENTINEL, value }))));

export type ProbedInlineDom = ProbedDom & {
    /** Visible content of the void inline (e.g. `@jane`), rendered from its attributes. */
    text: string;
};

export const probeInlineDom = (spec: InlineSpec, attrs: Record<string, unknown>): ProbedInlineDom => {
    const markup = renderToStaticMarkup(
        createElement(() => spec.render({ node: { type: spec.type, ...attrs }, attributes: {} })),
    );
    const doc = new DOMParser().parseFromString(`<root>${markup}</root>`, 'text/html');
    const el = doc.body.firstElementChild?.firstElementChild;
    if (!el) {
        throw new Error(`A plugin render function produced no element. Output was: ${markup}`);
    }
    const attrsOut: Record<string, string> = {};
    for (const attr of Array.from(el.attributes)) {
        attrsOut[attr.name] = attr.value;
    }
    return { tag: el.tagName.toLowerCase(), attrs: attrsOut, text: el.textContent ?? '' };
};
