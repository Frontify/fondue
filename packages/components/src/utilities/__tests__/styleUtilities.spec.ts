/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * @deprecated These tests verify the behavior of deprecated utilities (cn and sv).
 * The utilities are kept for backwards compatibility but should not be used in new code.
 * All components have been migrated to SCSS modules.
 */

import { describe, expect, it } from 'vitest';

import { cn, sv } from '#/utilities/styleUtilities';

describe('class merging utility', () => {
    it('concatinates strings from list', () => {
        const className = cn('tw-flex', 'tw-p-8 tw-justiify-center', 'tw-items-start');
        expect(className).toBe('tw-flex tw-p-8 tw-justiify-center tw-items-start');
    });

    it('allows for dynamic inputs', () => {
        // eslint-disable-next-line no-constant-condition
        const className = cn('tw-flex', 'tw-p-8 tw-justiify-center', true ? 'tw-items-start' : 'kiwi');
        expect(className).toBe('tw-flex tw-p-8 tw-justiify-center tw-items-start');
    });

    it('removes whitespaces', () => {
        const className = cn('tw-flex', 'tw-p-8     tw-justiify-center', '    tw-items-start');
        expect(className).toBe('tw-flex tw-p-8 tw-justiify-center tw-items-start');
    });

    it('supports arrays', () => {
        const className = cn('tw-flex', ['tw-p-8', ' tw-justiify-center'], 'tw-items-start');
        expect(className).toBe('tw-flex tw-p-8 tw-justiify-center tw-items-start');
    });

    it('removes empty strings', () => {
        const className = cn('tw-flex', 'tw-p-8', ' ', 'tw-justiify-center', 'tw-items-start');
        expect(className).toBe('tw-flex tw-p-8 tw-justiify-center tw-items-start');
    });

    it('removes null values', () => {
        const className = cn('tw-flex', 'tw-p-8', null, 'tw-justiify-center', 'tw-items-start');
        expect(className).toBe('tw-flex tw-p-8 tw-justiify-center tw-items-start');
    });

    it('removes undefined values', () => {
        const className = cn('tw-flex', 'tw-p-8', undefined, 'tw-justiify-center', 'tw-items-start');
        expect(className).toBe('tw-flex tw-p-8 tw-justiify-center tw-items-start');
    });

    it('removes false values', () => {
        const className = cn('tw-flex', 'tw-p-8', false, 'tw-justiify-center', 'tw-items-start');
        expect(className).toBe('tw-flex tw-p-8 tw-justiify-center tw-items-start');
    });

    it('removes 0 values', () => {
        const className = cn('tw-flex', 'tw-p-8', 0, 'tw-justiify-center', 'tw-items-start');
        expect(className).toBe('tw-flex tw-p-8 tw-justiify-center tw-items-start');
    });

    it('removes empty arrays', () => {
        const className = cn('tw-flex', 'tw-p-8', [], 'tw-justiify-center', 'tw-items-start');
        expect(className).toBe('tw-flex tw-p-8 tw-justiify-center tw-items-start');
    });

    it('removes overridden classes', () => {
        const className = cn('tw-flex', 'tw-p-8', 'tw-justiify-center', 'tw-items-start', 'tw-flex', 'tw-p-2');
        expect(className).toBe('tw-justiify-center tw-items-start tw-flex tw-p-2');
    });
});

describe('tailwind variants utility', () => {
    const styledDiv = sv({
        base: 'tw-flex tw-flex-col',
        variants: {
            size: {
                small: 'tw-px-2 tw-h-6',
                medium: 'tw-px-4 tw-h-9',
                large: 'tw-px-6 tw-h-12',
            },
            emphasis: {
                default: '',
                weak: '',
                strong: '',
            },
            alignment: {
                start: 'tw-items-start',
                center: 'tw-items-center',
                end: 'tw-items-end',
            },
        },
        compoundVariants: [
            {
                size: 'large',
                alignment: 'end',
                class: 'tw-border-2 tw-border-black',
            },
        ],
    });

    it('returns base styles', () => {
        const className = styledDiv();
        expect(className).toBe('tw-flex tw-flex-col');
    });

    it('applies variants', () => {
        const className = styledDiv({ alignment: 'start', size: 'medium' });
        expect(className).toBe('tw-flex tw-flex-col tw-px-4 tw-h-9 tw-items-start');
    });

    it('ignores invalid variants', () => {
        // @ts-expect-error Wrong value on purpose for the test
        const className = styledDiv({ alignment: 'weird', size: 'medium' });
        expect(className).toBe('tw-flex tw-flex-col tw-px-4 tw-h-9');
    });

    it('applies compound variants', () => {
        const className = styledDiv({ alignment: 'end', size: 'large' });
        expect(className).toBe('tw-flex tw-flex-col tw-px-6 tw-h-12 tw-items-end tw-border-2 tw-border-black');
    });
});
