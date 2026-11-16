/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RteMarkPatternTrim } from '#/core';

/**
 * The sentence punctuation and unbalanced closing brackets a typed address may end in.
 */
export const LINKABLE_ADDRESS_TRIM: RteMarkPatternTrim = {
    punctuation: /[.,;:!?"'”’]+/,
    pairs: { ')': '(', ']': '[', '}': '{', '>': '<' },
};
