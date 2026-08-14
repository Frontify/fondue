/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type TagParseRule } from 'prosemirror-model';

import { type AttributeSpec, type BlockAttributeSpec, type ParseRule } from '#/domain';

/**
 * How pasted HTML is recognized as one of our blocks, inlines or marks.
 *
 * A feature declares what its content looks like (`parseRules`) and where its
 * attributes can be read back from (`parseFromDomAttribute`, `parseFromStyle`);
 * this turns that into the engine's `parseDOM`. It runs once, at mount — the
 * rules are then fixed for the editor's life.
 *
 * Invariant (1): a qualified selector must outrank a bare tag. The engine keeps
 * rules of equal priority in schema order, and the paragraph baseline is
 * registered first, so without this every pasted `<p>` became a plain paragraph
 * (losing text styles) and every `<ul>` became a bullet list (losing check
 * marks). Hence `qualifiedPriority` below.
 */

/**
 * Which rule claims an element when more than one matches it. A qualified
 * selector (`p[data-text-style=imageCaption]`, `ul[data-check-list]`) describes
 * exactly what one feature wrote; a bare tag is a fallback for anything of that
 * shape. So the qualified one has to win — see invariant (1).
 */
const qualifiedPriority = (tag: string): number | undefined => (/[[.#:]/.test(tag) ? 60 : undefined);

/** Rules for recognizing pasted HTML: the tag, the attributes it implies, and any read off the element or its style. */
export const pasteRules = (
    attributes: Record<string, AttributeSpec>,
    rules: readonly ParseRule[],
    injected: readonly BlockAttributeSpec[] = [],
): TagParseRule[] => {
    const domAttributeNames = Object.entries(attributes)
        .filter(([, attribute]) => attribute.parseFromDomAttribute)
        .map(([name, attribute]): [string, string] => [
            name,
            typeof attribute.parseFromDomAttribute === 'string' ? attribute.parseFromDomAttribute : name,
        ]);
    const styleNames: [string, string][] = [
        ...Object.entries(attributes)
            .filter(([, attribute]) => attribute.parseFromStyle)
            .map(([name, attribute]): [string, string] => [name, attribute.parseFromStyle as string]),
        ...injected
            .filter((attribute) => attribute.parseFromStyle)
            .map((attribute): [string, string] => [attribute.name, attribute.parseFromStyle as string]),
    ];

    return rules.map(({ tag, attributes: implied }) => ({
        tag,
        priority: qualifiedPriority(tag), // invariant (1)
        getAttrs: (element: HTMLElement) => ({
            ...Object.fromEntries(domAttributeNames.map(([name, domName]) => [name, element.getAttribute(domName)])),
            ...Object.fromEntries(
                styleNames.map(([name, property]) => [name, element.style.getPropertyValue(property) || null]),
            ),
            ...implied,
        }),
    }));
};
