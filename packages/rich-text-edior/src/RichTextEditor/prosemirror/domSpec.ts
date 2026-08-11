/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

import { type BlockAttributeSpec } from '#/domain';
import { type DomElement, type ProbedDom, type RenderProbe } from '#/ports';

/**
 * A probed render, turned into what this engine wants. The `DomElement` the probe
 * produces is already the shape ProseMirror's `toDOM` returns, so there is
 * nothing to translate — what is left is caching (the engine calls `toDOM` far
 * more often than a render changes) and the CSS that injected block attributes
 * (alignment) contribute.
 */

/** `toDOM` runs on every render and probing renders React — so cache per attribute set. */
export const probeCachedBy = (probe: RenderProbe, render: (attrs: Record<string, unknown>) => ReactNode) => {
    const cache = new Map<string, ProbedDom>();
    return (attrs: Record<string, unknown>): ProbedDom => {
        const key = JSON.stringify(attrs);
        let probed = cache.get(key);
        if (!probed) {
            probed = probe(() => render(attrs));
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
