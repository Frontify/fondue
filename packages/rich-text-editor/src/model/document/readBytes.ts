/* (c) Copyright Frontify Ltd., all rights reserved. */

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
export const stringTokenBytes = (text: string): number => {
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
export const repeatsKey = (text: string): boolean => {
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
