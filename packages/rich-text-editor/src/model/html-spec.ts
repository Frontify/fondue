/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type SharedAttribute, URL_ATTRIBUTES } from './compile';
import { type TreeNode } from './content';
import { type HtmlAttributeValue, type HtmlSpec, type JsonObject } from './declarations';
import { checkHref } from './href';
import { addDeclaration, isPlainCss, isRecord, isSrcdocAttribute, isStyleAttribute, ownValue } from './values';

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
        if (isSrcdocAttribute(name)) {
            continue;
        }
        if (isStyleAttribute(name)) {
            written.style = value;
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
            if (!isSrcdocAttribute(declaration.html.attr)) {
                written[declaration.html.attr] = value;
            }
        } else if (isPlainCss(value)) {
            written.style = addDeclaration(written.style, declaration.html.style, value);
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

/** Reads `spec` for one node or mark; a URL attribute that fails `checkHref` is dropped. */
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

/**
 * `template` with `dir` on its outer element when it writes none: `direction`, else `auto`, so a block takes its
 * direction from its own text.
 */
export const withAutoDirection = (
    template: HtmlTemplate,
    direction: 'ltr' | 'rtl' | undefined = undefined,
): HtmlTemplate => {
    const [outer, ...inner] = template.layers;
    if (outer === undefined || Object.hasOwn(outer.attrs, 'dir')) {
        return template;
    }
    return { ...template, layers: [{ ...outer, attrs: { ...outer.attrs, dir: direction ?? 'auto' } }, ...inner] };
};

// Digits, punctuation and spaces take their direction from the text around them; letters set it.
const LETTER = /\p{L}/u;

/** One text run of a textblock: its text and the `dir` of the `language` mark over it, if any. */
export interface DirectedRun {
    readonly text: string;
    readonly dir: unknown;
}

/**
 * The `dir` of the `language` mark over a textblock's first letter, when that is `ltr` or `rtl`. `dir="auto"` skips
 * text inside an element with its own `dir`, so such a block would otherwise take its direction from the text around
 * the passage, or the left-to-right default.
 */
export const passageDirection = (runs: readonly DirectedRun[]): 'ltr' | 'rtl' | undefined => {
    const first = runs.find(({ text }) => LETTER.test(text));
    if (first !== undefined && (first.dir === 'ltr' || first.dir === 'rtl')) {
        return first.dir;
    }
    return undefined;
};

/** The text runs of a stored node's children, which `passageDirection` reads. */
export const treeRuns = (content: readonly TreeNode[] | undefined): DirectedRun[] =>
    (content ?? []).flatMap((child) => {
        if (child.type !== 'text' || child.text === undefined) {
            return [];
        }
        const language = child.marks?.find((mark) => mark.type === 'language');
        return [{ text: child.text, dir: language?.attrs.dir }];
    });

/** A run of spaces alternates U+0020 and U+00A0 from a space, so a long line still wraps; `carried` spaces from the text before count as the run's start. */
export const renderSpaces = (text: string, carried = 0): string =>
    text.replaceAll(/ +/g, (run, at: number) => {
        let start = 0;
        if (at === 0) {
            start = carried;
        }
        let spaces = '';
        for (let index = 0; index < run.length; index += 1) {
            if ((start + index) % 2 === 0) {
                spaces += ' ';
            } else {
                spaces += '\u00A0';
            }
        }
        return spaces;
    });

const BLOCK_BREAK = Symbol('blockBreak');

/** The `text` of each `text` object at a node position of an island's `original`, in document order, one block per line. */
export const islandText = (original: unknown): string => {
    let text = '';
    const pending: unknown[] = [original];
    while (pending.length > 0) {
        const value = pending.pop();
        if (value === BLOCK_BREAK) {
            text += '\n';
            continue;
        }
        if (!isRecord(value)) {
            continue;
        }
        if (value.type === 'text' && typeof value.text === 'string') {
            text += value.text;
        }
        if (Array.isArray(value.content)) {
            const children = value.content as readonly unknown[];
            // The original has no schema, so children are blocks when none is text and one has a content array.
            const blocks =
                !children.some((child) => isRecord(child) && child.type === 'text') &&
                children.some((child) => isRecord(child) && Array.isArray(child.content));
            for (let index = children.length - 1; index >= 0; index -= 1) {
                pending.push(children[index]);
                if (blocks && index > 0) {
                    pending.push(BLOCK_BREAK);
                }
            }
        }
    }
    return text;
};
