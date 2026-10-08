/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type SharedAttribute, URL_ATTRIBUTES } from './compile';
import { type HtmlAttributeValue, type HtmlSpec, type JsonObject } from './declarations';
import { checkHref } from './href';
import { isRecord, ownValue } from './values';

type Values = Readonly<Record<string, unknown>>;

/** One element of a resolved spec: its tag and its attributes as text, URL values already checked. */
export interface HtmlLayer {
    readonly tag: string;
    readonly attrs: Readonly<Record<string, string>>;
}
/** An `HtmlSpec` read for one node or mark: its elements from the outside in, and whether the innermost holds the content. */
export interface HtmlTemplate {
    readonly layers: readonly HtmlLayer[];
    readonly content: boolean;
}

/** A value that cannot end its declaration or reach a URL, comment or markup. */
const isPlainCss = (value: string) => !/[;:()'"\\{}<]|\/\*/.test(value);

/** By local name, as the compiler checks it: `xlink:href` is `href`. */
const isUrlAttribute = (name: string) => URL_ATTRIBUTES.has(name.toLowerCase().split(/[\s:]/).at(-1) ?? '');

/** An attribute value as HTML attribute text; `undefined` for null, which writes no HTML attribute. */
const textOf = (value: unknown): string | undefined => {
    if (typeof value === 'string') {
        return value;
    }
    if (typeof value === 'number' || typeof value === 'boolean') {
        return String(value);
    }
    if (value === null || value === undefined) {
        return undefined;
    }
    return JSON.stringify(value);
};

const readValue = (value: HtmlAttributeValue, values: Values, options: JsonObject) => {
    if (typeof value === 'string') {
        return value;
    }
    if ('attr' in value) {
        return textOf(values[value.attr]);
    }
    return textOf(options[value.option]);
};

const resolveLayers = (
    spec: HtmlSpec,
    values: Values,
    options: JsonObject,
    shared: readonly SharedAttribute[],
    layers: HtmlLayer[],
): boolean => {
    const [tag, second, third] = spec;
    let tagName: string | undefined;
    if (typeof tag === 'string') {
        tagName = tag;
    } else {
        tagName = ownValue(tag.tags, textOf(values[tag.attr]) ?? '');
    }
    let attributes: Readonly<Record<string, HtmlAttributeValue>> | undefined;
    let bindings: [string, HtmlAttributeValue][] = [];
    if (typeof second === 'object' && second !== null && !Array.isArray(second)) {
        attributes = second as Readonly<Record<string, HtmlAttributeValue>>;
        bindings = Object.entries(attributes);
    }
    const written: Record<string, string> = {};
    for (const [name, binding] of bindings) {
        const value = readValue(binding, values, options);
        if (value === undefined) {
            continue;
        }
        if (!isUrlAttribute(name)) {
            written[name] = value;
            continue;
        }
        const checked = checkHref(value);
        if (checked.ok) {
            written[name] = checked.href;
        }
    }
    for (const { name, declaration } of shared) {
        const value = textOf(values[name]);
        if (value === undefined || declaration.html === undefined) {
            continue;
        }
        if ('attr' in declaration.html) {
            written[declaration.html.attr] = value;
        } else if (isPlainCss(value)) {
            written.style = `${written.style ?? ''}${declaration.html.style}: ${value};`;
        }
    }
    layers.push({ tag: tagName ?? 'span', attrs: written });
    let content = third;
    if (attributes === undefined) {
        content = second as typeof third;
    }
    if (Array.isArray(content)) {
        return resolveLayers(content as HtmlSpec, values, options, [], layers);
    }
    return content === 0;
};

/** Reads `spec` for one node or mark; a URL attribute that fails `checkHref` is dropped (SPEC-rich-text/AC-073). */
export const resolveHtmlSpec = (
    spec: HtmlSpec,
    values: Values,
    options: JsonObject,
    shared: readonly SharedAttribute[] = [],
): HtmlTemplate => {
    const layers: HtmlLayer[] = [];
    const content = resolveLayers(spec, values, options, shared, layers);
    return { layers, content };
};

/** A run of spaces alternates U+0020 and U+00A0 from a space, so a long line still wraps (SPEC-rich-text-output/AC-046). */
export const renderSpaces = (text: string): string =>
    text.replaceAll(/ {2,}/g, (run) => {
        const pairs = ' \u00A0'.repeat(Math.floor(run.length / 2));
        if (run.length % 2 === 1) {
            return `${pairs} `;
        }
        return pairs;
    });

/** The `text` of each `text` object at a node position of an island's `original`, in document order. */
export const islandText = (original: unknown): string => {
    let text = '';
    const pending: unknown[] = [original];
    while (pending.length > 0) {
        const value = pending.pop();
        if (!isRecord(value)) {
            continue;
        }
        if (value.type === 'text' && typeof value.text === 'string') {
            text += value.text;
        }
        if (Array.isArray(value.content)) {
            const children = value.content as readonly unknown[];
            for (let index = children.length - 1; index >= 0; index -= 1) {
                pending.push(children[index]);
            }
        }
    }
    return text;
};
