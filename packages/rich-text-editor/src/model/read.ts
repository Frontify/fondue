/* (c) Copyright Frontify Ltd., all rights reserved. */

import { pointer } from './errors';
import { type Diagnostic, diagnostic, type ResourceLimits } from './format';

export type ReadFailure = { readonly reason: 'invalid' | 'limit-exceeded'; readonly diagnostic: Diagnostic };
export type ReadResult = { readonly ok: true; readonly value: unknown } | ({ readonly ok: false } & ReadFailure);

type Role = 'input' | 'node' | 'content' | 'marks' | 'mark' | 'attrs' | 'attribute' | 'text' | 'other';
interface Counter {
    count: number;
}
interface Place {
    role: Role;
    /** Nesting below the node that holds the value, or below the input outside the root. */
    level: number;
    /** Depth of the node in a node position, else of the node that holds the value. */
    depth: number;
    /** On a child of a `table`, and on the `content` of a table: the table's cell count. */
    row?: Counter;
    /** On a cell, and on the `content` of a row. */
    cell?: Counter;
}

const notJson = (path?: string): ReadFailure => ({
    reason: 'invalid',
    diagnostic: diagnostic('format.not-json', path, undefined, 'error'),
});
const exceeded = (limit: keyof ResourceLimits, path?: string): ReadFailure => ({
    reason: 'limit-exceeded',
    diagnostic: diagnostic('format.limit-exceeded', path, { limit }, 'error'),
});

const isHighSurrogate = (code: number) => code >= 0xd800 && code < 0xdc00;
const isLowSurrogate = (code: number) => code >= 0xdc00 && code < 0xe000;

/** Whether the UTF-8 encoding of `text` (a lone surrogate as U+FFFD) passes `max` bytes; reads no further than it must. */
export const exceedsBytes = (text: string, max: number): boolean => {
    if (text.length > max) {
        return true;
    }
    if (text.length * 3 <= max) {
        return false;
    }
    let bytes = 0;
    for (let index = 0; index < text.length && bytes <= max; index += 1) {
        const code = text.charCodeAt(index);
        if (code < 0x80) {
            bytes += 1;
        } else if (code < 0x800) {
            bytes += 2;
        } else if (isHighSurrogate(code) && isLowSurrogate(text.charCodeAt(index + 1))) {
            bytes += 4;
            index += 1;
        } else {
            bytes += 3;
        }
    }
    return bytes > max;
};

const SHORT_ESCAPES = new Set([0x08, 0x09, 0x0a, 0x0c, 0x0d]);

const NEEDS_SCAN = /[^\u0020\u0021\u0023-\u005B\u005D-\u007E]/;

/** UTF-8 bytes of the JSON string token that `JSON.stringify` writes for `text`. */
const stringTokenBytes = (text: string): number => {
    if (!NEEDS_SCAN.test(text)) {
        return text.length + 2;
    }
    let bytes = 2;
    for (let index = 0; index < text.length; index += 1) {
        const code = text.charCodeAt(index);
        if (code === 0x22 || code === 0x5c) {
            bytes += 2;
        } else if (code < 0x20) {
            bytes += SHORT_ESCAPES.has(code) ? 2 : 6;
        } else if (code < 0x80) {
            bytes += 1;
        } else if (code < 0x800) {
            bytes += 2;
        } else if (isHighSurrogate(code) && isLowSurrogate(text.charCodeAt(index + 1))) {
            bytes += 4;
            index += 1;
        } else if (isHighSurrogate(code) || isLowSurrogate(code)) {
            bytes += 6;
        } else {
            bytes += 3;
        }
    }
    return bytes;
};

/** Whether valid JSON text repeats a key within one object, which `JSON.parse` would silently collapse. */
const repeatsKey = (text: string): boolean => {
    const objects: (Set<string> | null)[] = [];
    let keyNext = false;
    for (let index = 0; index < text.length; index += 1) {
        const code = text.charCodeAt(index);
        if (code === 0x22) {
            let end = index + 1;
            let escaped = false;
            while (text.charCodeAt(end) !== 0x22) {
                const backslash = text.charCodeAt(end) === 0x5c;
                escaped ||= backslash;
                end += backslash ? 2 : 1;
            }
            const keys = objects.at(-1);
            if (keyNext && keys) {
                const key = escaped ? (JSON.parse(text.slice(index, end + 1)) as string) : text.slice(index + 1, end);
                if (keys.has(key)) {
                    return true;
                }
                keys.add(key);
            }
            index = end;
        } else if (code === 0x7b) {
            objects.push(new Set());
            keyNext = true;
        } else if (code === 0x5b) {
            objects.push(null);
        } else if (code === 0x7d || code === 0x5d) {
            objects.pop();
        } else if (code === 0x2c) {
            keyNext = objects.at(-1) instanceof Set;
        } else if (code === 0x3a) {
            keyNext = false;
        }
    }
    return false;
};

const isDataProperty = (descriptor: PropertyDescriptor | undefined): descriptor is PropertyDescriptor =>
    descriptor !== undefined && descriptor.enumerable === true && 'value' in descriptor;

/** Arrays and plain objects, whose prototype is `Object.prototype` or `null`; their members are checked as the walk reaches them. */
const isPlainContainer = (value: object): boolean => {
    const prototype: unknown = Object.getPrototypeOf(value);
    return Array.isArray(value) ? prototype === Array.prototype : prototype === Object.prototype || prototype === null;
};

const scalarBytes = (value: unknown): number | undefined => {
    if (value === null || value === true) {
        return 4;
    }
    if (value === false) {
        return 5;
    }
    if (typeof value === 'number') {
        return Number.isFinite(value) ? JSON.stringify(value).length : undefined;
    }
    return typeof value === 'string' ? stringTokenBytes(value) : undefined;
};

const isObject = (value: unknown) => typeof value === 'object' && value !== null && !Array.isArray(value);
const placeOf = (role: Role, level: number, depth: number, row?: Counter, cell?: Counter): Place => {
    const place: Place = { role, level, depth };
    if (row !== undefined) {
        place.row = row;
    }
    if (cell !== undefined) {
        place.cell = cell;
    }
    return place;
};

/** The place of the member `key`, holding `value`, of a container at `place`. */
const memberPlace = (place: Place, type: unknown, key: string, value: unknown): Place => {
    const { level, depth, row, cell } = place;
    switch (place.role) {
        case 'input':
            if (key !== 'content') {
                return { role: 'other', level: level + 1, depth };
            }
            return { role: 'node', level: 0, depth: 1 };
        case 'node':
            if (key === 'content' && Array.isArray(value)) {
                return placeOf('content', 1, depth, type === 'table' ? { count: 0 } : undefined, row);
            }
            if (key === 'marks' && Array.isArray(value)) {
                return { role: 'marks', level: 1, depth };
            }
            if (key === 'attrs' && isObject(value)) {
                return { role: 'attrs', level: 1, depth };
            }
            return { role: key === 'text' && typeof value === 'string' ? 'text' : 'other', level: 1, depth };
        case 'content':
            return placeOf('node', 0, depth + 1, row, cell);
        case 'marks':
            return { role: 'mark', level: level + 1, depth };
        case 'mark':
            return { role: key === 'attrs' && isObject(value) ? 'attrs' : 'other', level: level + 1, depth };
        case 'attrs':
            return { role: key === 'href' ? 'other' : 'attribute', level: level + 1, depth };
        default:
            return { role: place.role === 'attribute' ? 'attribute' : 'other', level: level + 1, depth };
    }
};

interface Walk {
    readonly limits: ResourceLimits;
    readonly countBytes: boolean;
    /** Whether the walk builds a plain-data copy from the descriptor values it reads. */
    readonly copy: boolean;
    readonly ancestors: Set<object>;
    /** Keys from the input to the value the walk is at; the JSON Pointer is built only for a failure. */
    readonly keys: string[];
    bytes: number;
    nodes: number;
    /** The copy of the value the last `visit` read. */
    result: unknown;
}

const failAt = (walk: Walk, fail: (path: string) => ReadFailure) => fail(pointer(...walk.keys));
const overAt = (walk: Walk, limit: keyof ResourceLimits) => exceeded(limit, pointer(...walk.keys));

const countNode = (walk: Walk, place: Place): keyof ResourceLimits | undefined => {
    const { limits } = walk;
    walk.nodes += 1;
    if (walk.nodes > limits.maxDocumentNodes) {
        return 'maxDocumentNodes';
    }
    if (place.depth > limits.maxDepth) {
        return 'maxDepth';
    }
    if (place.cell !== undefined) {
        place.cell.count += 1;
        if (place.cell.count > limits.maxTableCells) {
            return 'maxTableCells';
        }
    }
    return undefined;
};

/** Adds the value's own tokens; an object's keys are its own members' names. */
const countBytes = (
    walk: Walk,
    scalar: number | undefined,
    length: number | undefined,
    keys: readonly (string | symbol)[],
) => {
    if (scalar !== undefined) {
        walk.bytes += scalar;
        return;
    }
    if (length !== undefined) {
        walk.bytes += 1 + Math.max(length, 1);
        return;
    }
    walk.bytes += 1 + Math.max(keys.length, 1);
    for (let index = 0; index < keys.length && walk.bytes <= walk.limits.maxDocumentBytes; index += 1) {
        const key = keys[index];
        walk.bytes += (typeof key === 'string' ? stringTokenBytes(key) : 0) + 1;
    }
};

/** A limit that a string at `place` passes, if any. */
const stringLimit = (walk: Walk, value: string, place: Place): keyof ResourceLimits | undefined => {
    if (place.role === 'text' && value.length > walk.limits.maxTextLength) {
        return 'maxTextLength';
    }
    return place.role === 'attribute' && value.length > walk.limits.maxAttributeLength
        ? 'maxAttributeLength'
        : undefined;
};

const dataOf = (descriptor: PropertyDescriptor | undefined): unknown =>
    descriptor !== undefined && 'value' in descriptor ? descriptor.value : undefined;

const visitMember = (
    walk: Walk,
    key: string,
    place: Place,
    type: unknown,
    descriptor: PropertyDescriptor | undefined,
): ReadFailure | undefined => {
    walk.keys.push(key);
    const failure =
        key === '__proto__' || !isDataProperty(descriptor)
            ? failAt(walk, notJson)
            : visit(walk, descriptor.value, memberPlace(place, type, key, descriptor.value));
    walk.keys.pop();
    return failure;
};

/** Each member in the order `JSON.stringify` writes them; a hole, a getter or a symbol key is not JSON where the walk reaches it. */
const visitMembers = (
    walk: Walk,
    value: object,
    place: Place,
    keys: readonly (string | symbol)[],
    descriptors: readonly (PropertyDescriptor | undefined)[],
): ReadFailure | undefined => {
    if (Array.isArray(value)) {
        const length = dataOf(Object.getOwnPropertyDescriptor(value, 'length')) as number;
        const copy: unknown[] = [];
        for (let index = 0; index < length; index += 1) {
            const failure = visitMember(
                walk,
                String(index),
                place,
                undefined,
                Object.getOwnPropertyDescriptor(value, index),
            );
            if (failure !== undefined) {
                return failure;
            }
            if (walk.copy) {
                copy.push(walk.result);
            }
        }
        walk.result = walk.copy ? copy : value;
        return Reflect.ownKeys(value).length === length + 1 ? undefined : failAt(walk, notJson);
    }
    const copy: Record<string, unknown> = {};
    const type = dataOf(descriptors[keys.indexOf('type')]);
    for (const [index, key] of keys.entries()) {
        if (typeof key !== 'string') {
            return failAt(walk, notJson);
        }
        const failure = visitMember(walk, key, place, type, descriptors[index]);
        if (failure !== undefined) {
            return failure;
        }
        copy[key] = walk.result;
    }
    walk.result = walk.copy ? copy : value;
    return undefined;
};

const visit = (walk: Walk, value: unknown, place: Place): ReadFailure | undefined => {
    const { limits } = walk;
    walk.result = value;
    // Each UTF-16 unit takes at least one byte, so a long string stops the walk before it is scanned.
    if (walk.countBytes && typeof value === 'string' && walk.bytes + value.length + 2 > limits.maxDocumentBytes) {
        return overAt(walk, 'maxDocumentBytes');
    }
    const array = Array.isArray(value);
    const length = array ? (dataOf(Object.getOwnPropertyDescriptor(value, 'length')) as number) : 0;
    // Likewise each element of an array writes at least two bytes, so a long array stops before it is read.
    if (walk.countBytes && array && walk.bytes + length * 2 + 1 > limits.maxDocumentBytes) {
        return overAt(walk, 'maxDocumentBytes');
    }
    const container = typeof value === 'object' && value !== null;
    const scalar = container ? undefined : scalarBytes(value);
    if (container ? walk.ancestors.has(value) || !isPlainContainer(value) : scalar === undefined) {
        return failAt(walk, notJson);
    }
    const keys = container && !array ? Reflect.ownKeys(value) : [];
    const descriptors = keys.map((key) =>
        typeof key === 'string' ? Object.getOwnPropertyDescriptor(value, key) : undefined,
    );
    if (walk.countBytes) {
        countBytes(walk, scalar, array ? length : undefined, keys);
        if (walk.bytes > limits.maxDocumentBytes) {
            return overAt(walk, 'maxDocumentBytes');
        }
    }
    if (place.role === 'node') {
        const limit = countNode(walk, place);
        if (limit !== undefined) {
            return overAt(walk, limit);
        }
    } else if (container && place.level > limits.maxDepth) {
        return overAt(walk, 'maxDepth');
    }
    if (typeof value === 'string') {
        const limit = stringLimit(walk, value, place);
        return limit === undefined ? undefined : overAt(walk, limit);
    }
    if (!container) {
        return undefined;
    }
    walk.ancestors.add(value);
    const failure = visitMembers(walk, value, place, keys, descriptors);
    walk.ancestors.delete(value);
    return failure;
};

/**
 * One pre-order walk that stops at the first value that is not JSON or exceeds a
 * limit, counted by position before any shape check. A string counts its UTF-8 bytes and must parse.
 * A parsed value comes back as a plain-data copy of what the walk read, so no host object reaches a later check.
 */
export const readInput = (input: unknown, limits: ResourceLimits): ReadResult => {
    let value = input;
    if (typeof input === 'string') {
        if (exceedsBytes(input, limits.maxDocumentBytes)) {
            return { ok: false, ...exceeded('maxDocumentBytes') };
        }
        try {
            value = JSON.parse(input) as unknown;
        } catch {
            return { ok: false, ...notJson() };
        }
        if (repeatsKey(input)) {
            return { ok: false, ...notJson() };
        }
    }
    if (value === null || value === undefined) {
        return { ok: false, ...notJson() };
    }
    const parsed = typeof input === 'string';
    const walk: Walk = {
        limits,
        countBytes: !parsed,
        copy: !parsed,
        ancestors: new Set(),
        keys: [],
        bytes: 0,
        nodes: 0,
        result: undefined,
    };
    let failure: ReadFailure | undefined;
    try {
        failure = visit(walk, value, { role: 'input', level: 0, depth: 0 });
    } catch {
        // A host object, such as a Proxy whose traps throw, is not JSON.
        failure = notJson();
    }
    return failure === undefined ? { ok: true, value: walk.result } : { ok: false, ...failure };
};
