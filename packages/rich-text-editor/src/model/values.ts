/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PayloadDeclaration, type ValueDeclaration } from './declarations';
import { pointer } from './errors';
import { checkHref } from './href';

const STORED_ID = /^[a-z0-9][a-z0-9._:-]{0,127}$/;
const COLOR = /^#[0-9a-f]{6}([0-9a-f]{2})?$/;
export const PROTOTYPE_KEYS = new Set(['__proto__', 'constructor', 'prototype']);

/** How deep a manifest, an option value or an `html` spec may nest. */
export const MAX_DEPTH = 64;

export const isRecord = (value: unknown): value is Readonly<Record<string, unknown>> =>
    typeof value === 'object' && value !== null && !Array.isArray(value);

/** A value that cannot end its declaration or reach a URL, comment or markup. */
export const isPlainCss = (value: string) => !/[;:()'"\\{}<]|\/\*/.test(value);

/** By local name, so `srcdoc`, `SRCDOC`, `srcDoc` and `xlink:srcdoc` all match (SPEC-rich-text/AC-071). */
export const isSrcdocAttribute = (name: string) => (name.toLowerCase().split(/[\s:]/).at(-1) ?? '') === 'srcdoc';

/** `style` in any case: the HTML attribute that styles never reach as a stored value (SPEC-rich-text-format/AC-027). */
export const isStyleAttribute = (name: string) => name.toLowerCase() === 'style';

/** `existing` plus one CSS declaration, with a `;` between them whether or not `existing` ends in one. */
export const addDeclaration = (existing: string | undefined, property: string, value: string): string => {
    let before = existing ?? '';
    if (before !== '' && !before.endsWith(';')) {
        before += ';';
    }
    return `${before}${property}: ${value};`;
};

/** `record[name]` for an own member only, so `constructor` or `toString` never reads the prototype. */
export const ownValue = <V>(record: Readonly<Record<string, V>>, name: string): V | undefined =>
    Object.hasOwn(record, name) ? record[name] : undefined;

/**
 * The JSON Pointer of the first value under `path` that is not plain JSON, such as a function, a regular
 * expression, a component or a cycle, that nests deeper than `MAX_DEPTH`, or that sits under a `__proto__`,
 * `constructor` or `prototype` key. An `undefined` object member counts as absent.
 */
export const findUnsafeJson = (value: unknown, path: string, ancestors: readonly object[] = []): string | undefined => {
    if (value === null || typeof value === 'string' || typeof value === 'boolean') {
        return undefined;
    }
    if (typeof value === 'number') {
        return Number.isFinite(value) ? undefined : path;
    }
    if (typeof value !== 'object' || Object.getOwnPropertySymbols(value).length > 0) {
        return path;
    }
    const prototype: unknown = Object.getPrototypeOf(value);
    const plain = prototype === Object.prototype || prototype === Array.prototype || prototype === null;
    if (!plain || ancestors.length > MAX_DEPTH || ancestors.includes(value)) {
        return path;
    }
    for (const [key, item] of Object.entries(value)) {
        const itemPath = `${path}${pointer(key)}`;
        if (PROTOTYPE_KEYS.has(key)) {
            return itemPath;
        }
        const found =
            item === undefined && !Array.isArray(value)
                ? undefined
                : findUnsafeJson(item, itemPath, [...ancestors, value]);
        if (found !== undefined) {
            return found;
        }
    }
    return undefined;
};

const deepFreeze = <T>(value: T): T => {
    if (typeof value === 'object' && value !== null) {
        for (const item of Object.values(value)) {
            deepFreeze(item);
        }
        Object.freeze(value);
    }
    return value;
};

/** A frozen deep copy of plain JSON without its `undefined` members; any other value stays as given, for compilation to reject. */
export const snapshot = <T>(value: T): T =>
    findUnsafeJson(value, '') === undefined ? deepFreeze(JSON.parse(JSON.stringify(value)) as T) : value;

const within = (value: number, min: number | undefined, max: number | undefined) => {
    if (min !== undefined && value < min) {
        return false;
    }
    return max === undefined || value <= max;
};

const isLanguageTag = (value: string) => {
    try {
        return Intl.getCanonicalLocales(value).length === 1;
    } catch {
        return false;
    }
};

/** Whether `value` meets its declaration; a `url` value must pass `checkHref`. */
export const isValidValue = (declaration: ValueDeclaration, value: unknown): boolean => {
    if (value === null) {
        return declaration.nullable === true;
    }
    switch (declaration.type) {
        case 'string':
            return typeof value === 'string' && within(value.length, declaration.minLength, declaration.maxLength);
        case 'url':
            return typeof value === 'string' && checkHref(value).ok;
        case 'id':
            return typeof value === 'string' && STORED_ID.test(value);
        case 'color':
            return typeof value === 'string' && COLOR.test(value);
        case 'language':
            return typeof value === 'string' && isLanguageTag(value);
        case 'integer':
        case 'number': {
            const integral = declaration.type === 'number' || Number.isInteger(value);
            return (
                typeof value === 'number' &&
                Number.isFinite(value) &&
                integral &&
                within(value, declaration.min, declaration.max)
            );
        }
        case 'boolean':
            return typeof value === 'boolean';
        case 'enum':
            return typeof value === 'string' && declaration.values.includes(value);
        case 'list':
            return (
                Array.isArray(value) &&
                within(value.length, 0, declaration.maxItems) &&
                value.every((item) => isValidValue(declaration.items, item))
            );
        case 'json':
            return findUnsafeJson(value, '') === undefined;
    }
};

/** The path, relative to the payload, of the first part that breaks the declaration; `''` for the payload itself. */
export const findInvalidPayload = (
    declaration: PayloadDeclaration | undefined,
    payload: unknown,
): string | undefined => {
    if (declaration === undefined) {
        return payload === undefined ? undefined : '';
    }
    if (payload === null) {
        return declaration.nullable === true ? undefined : '';
    }
    const record = payload === undefined ? {} : payload;
    if (!isRecord(record)) {
        return '';
    }
    for (const [key, value] of Object.entries(record)) {
        if (value !== undefined && !Object.hasOwn(declaration.fields, key)) {
            return pointer(key);
        }
    }
    const oneOf = declaration.exactlyOne;
    for (const [name, field] of Object.entries(declaration.fields)) {
        const value = ownValue(record, name);
        const optional = field.optional === true || (oneOf !== undefined && oneOf.includes(name));
        if (value === undefined ? !optional : !isValidValue(field, value)) {
            return pointer(name);
        }
    }
    if (oneOf !== undefined && oneOf.filter((name) => ownValue(record, name) !== undefined).length !== 1) {
        return '';
    }
    return undefined;
};

/** The character that stands for an inline node other than text in a block's text, U+FFFC. */
export const OBJECT_REPLACEMENT = '\uFFFC';
