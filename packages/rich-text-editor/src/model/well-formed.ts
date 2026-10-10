/* (c) Copyright Frontify Ltd., all rights reserved. */

const LONE_SURROGATE = /[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/;

type MaybeWellFormed = { readonly isWellFormed?: (this: string) => boolean };

/** False when `text` holds a lone surrogate; Chrome 109 and 110 lack `isWellFormed` (PLATFORM.md). */
export const isWellFormed = (text: string): boolean => {
    const native = (String.prototype as MaybeWellFormed).isWellFormed;
    if (typeof native === 'function') {
        return native.call(text);
    }
    return !LONE_SURROGATE.test(text);
};
