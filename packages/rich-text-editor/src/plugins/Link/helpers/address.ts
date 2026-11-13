/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RteMarkPatternTrim } from '#/core';

/**
 * What a typed address may end in that is not part of it: the punctuation of the sentence around it, and a closing bracket with no opening one in the address
 */
export const LINKABLE_ADDRESS_TRIM: RteMarkPatternTrim = {
    punctuation: /[.,;:!?"'”’]+/,
    pairs: { ')': '(', ']': '[', '}': '{', '>': '<' },
};
