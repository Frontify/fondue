/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type TagParseRule } from 'prosemirror-model';

import { type AttributeSpec, type BlockAttributeSpec, type ParseRule } from '../types';

/**
 * Declared attributes → the engine's attribute and paste-parsing configuration.
 */

/** Attributes are always optional in the engine; an absent value round-trips as missing. */
export const pmAttrs = (attributes: Record<string, AttributeSpec> = {}): Record<string, { default: unknown }> =>
    Object.fromEntries(
        Object.entries(attributes).map(([name, attribute]) => [name, { default: attribute.default ?? null }]),
    );

export const pmInjectedAttrs = (injected: readonly BlockAttributeSpec[]): Record<string, { default: unknown }> =>
    Object.fromEntries(injected.map((attribute) => [attribute.name, { default: attribute.default ?? null }]));

/**
 * Which rule claims an element when more than one matches it. A qualified
 * selector (`p[data-text-style=imageCaption]`, `ul[data-check-list]`) describes
 * exactly what one plugin wrote; a bare tag is a fallback for anything of that
 * shape. So the qualified one has to win — the engine's default is to keep rules
 * of equal priority in schema order, which made the paragraph baseline claim
 * every pasted `p` and the bullet list claim every pasted `ul`, losing the text
 * style and the check marks on the way in.
 */
const qualifiedPriority = (tag: string): number | undefined => (/[[.#:]/.test(tag) ? 60 : undefined);

/** Rules for recognizing pasted HTML: the tag, the attributes it implies, and any read off the element or its style. */
export const pmParseDom = (
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
        priority: qualifiedPriority(tag),
        getAttrs: (element: HTMLElement) => ({
            ...Object.fromEntries(domAttributeNames.map(([name, domName]) => [name, element.getAttribute(domName)])),
            ...Object.fromEntries(
                styleNames.map(([name, property]) => [name, element.style.getPropertyValue(property) || null]),
            ),
            ...implied,
        }),
    }));
};
