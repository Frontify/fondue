/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type TokenLeaf } from './types';

/**
 * Maps a token name prefix to its tailwind utility name.
 * `'*'` means the token is used across multiple utilities (e.g. colors -> bg/text/border, spacing -> m/p/h/w/gap).
 * `':'` means the token is a screen variant prefix (e.g. breakpoints -> `md:`), not a utility class.
 * Ordered longest-prefix-first for correct matching.
 */
const TAILWIND_PREFIX_MAP: [string, string][] = [
    ['typography-font-size-', 'text'],
    ['typography-font-weight-', 'font'],
    ['typography-font-family-', 'font'],
    ['typography-letter-spacing-', 'tracking'],
    ['typography-line-height-', 'leading'],
    ['border-radius-', 'rounded'],
    ['border-width-', 'border'],
    ['breakpoint-', ':'],
    ['shadow-', 'shadow'],
    ['spacing-', '*'],
    ['color-', '*'],
];

export const getTokenTailwindClass = (leaf: TokenLeaf): string => {
    for (const [prefix, utility] of TAILWIND_PREFIX_MAP) {
        if (leaf.name.startsWith(prefix)) {
            const suffix = leaf.name
                .slice(prefix.length)
                .replace(/^default$/, '')
                .replace(/-default$/, '');
            if (utility === ':') {
                return `${suffix}:`;
            }
            return suffix ? `${utility}-${suffix}` : utility;
        }
    }
    return leaf.name;
};

export const getUtilityTailwindClass = (keyPath: string[]): string => {
    // Skip category and first group key (e.g. "utilities", "text")
    return keyPath.slice(2).join('-').replace('-default', '');
};
