/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * @deprecated This file is deprecated as part of the migration from Tailwind CSS to SCSS modules.
 * All components have been migrated to use SCSS modules with data attributes for styling.
 * This file will be removed in a future version.
 *
 * For new components:
 * - Use SCSS modules for styling (e.g., `component.module.scss`)
 * - Use data attributes for variants (e.g., `data-size="large"`)
 * - Use direct className concatenation or array.filter(Boolean).join(' ') for conditional classes
 */

import { extendTailwindMerge } from 'tailwind-merge';
import { tv, type TV } from 'tailwind-variants';

type ClassNameValue = ClassNameArray | string | null | undefined | 0 | false;
type ClassNameArray = ClassNameValue[];

const customTwMerge = extendTailwindMerge({
    prefix: 'tw-',
    extend: {
        classGroups: {
            'font-size': [
                'text-xx-small',
                'text-x-small',
                'text-small',
                'text-medium',
                'text-large',
                'text-x-large',
                'text-xx-large',
            ],
        },
    },
});

/**
 * @deprecated Use SCSS modules and direct className concatenation instead.
 * This utility was used for merging Tailwind classes with the `tw-` prefix.
 * All components have been migrated to SCSS modules.
 *
 * Example migration:
 * ```tsx
 * // Before:
 * const className = cn('tw-flex', 'tw-p-4', someCondition && 'tw-bg-red');
 *
 * // After (with SCSS modules):
 * const className = [styles.container, someCondition && styles.error].filter(Boolean).join(' ');
 * ```
 */
export const cn = (...classLists: ClassNameValue[]): string => {
    if (process.env.NODE_ENV === 'development') {
        console.warn(
            '[Fondue] cn() is deprecated. Use SCSS modules and direct className concatenation instead. ' +
                'This function will be removed in the next major version.',
        );
    }
    return customTwMerge(...classLists);
};

/**
 * @deprecated Use SCSS modules with data attributes for variants instead.
 * This utility was a wrapper around tailwind-variants for variant-based styling.
 * All components have been migrated to SCSS modules with data attributes.
 *
 * Example migration:
 * ```tsx
 * // Before:
 * const styles = sv({
 *   base: 'tw-button',
 *   variants: { size: { small: 'tw-text-sm', large: 'tw-text-lg' } }
 * });
 *
 * // After (with SCSS modules):
 * // In component.module.scss:
 * // .button { ... }
 * // .button[data-size="small"] { font-size: 0.875rem; }
 * // .button[data-size="large"] { font-size: 1.125rem; }
 *
 * // In component.tsx:
 * <button className={styles.button} data-size={size}>...</button>
 * ```
 */
export const sv: TV = (variants) => {
    if (process.env.NODE_ENV === 'development') {
        console.warn(
            '[Fondue] sv() is deprecated. Use SCSS modules with data attributes for variants instead. ' +
                'This function will be removed in the next major version.',
        );
    }
    return tv(variants);
};
