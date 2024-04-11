/* (c) Copyright Frontify Ltd., all rights reserved. */

import { cn } from '@utilities/styleUtilities';
import { describe, expect, it } from 'vitest';

describe('class merging utility', () => {
    it(`concatinates strings from list`, () => {
        const className = cn('tw-flex', 'tw-p-8 tw-justiify-center', 'tw-items-start');
        expect(className).toBe('tw-flex tw-p-8 tw-justiify-center tw-items-start');
    });
    it(`allows for dynamic inputs`, () => {
        const className = cn('tw-flex', 'tw-p-8 tw-justiify-center', true ? 'tw-items-start' : 'kiwi');
        expect(className).toBe('tw-flex tw-p-8 tw-justiify-center tw-items-start');
    });
    it(`removes whitespaces`, () => {
        const className = cn('tw-flex', 'tw-p-8     tw-justiify-center', '    tw-items-start');
        expect(className).toBe('tw-flex tw-p-8 tw-justiify-center tw-items-start');
    });
    it(`supports arrays`, () => {
        const className = cn('tw-flex', ['tw-p-8', ' tw-justiify-center'], 'tw-items-start');
        expect(className).toBe('tw-flex tw-p-8 tw-justiify-center tw-items-start');
    });
    it(`removes empty strings`, () => {
        const className = cn('tw-flex', 'tw-p-8', ' ', 'tw-justiify-center', 'tw-items-start');
        expect(className).toBe('tw-flex tw-p-8 tw-justiify-center tw-items-start');
    });
    it(`removes null values`, () => {
        const className = cn('tw-flex', 'tw-p-8', null, 'tw-justiify-center', 'tw-items-start');
        expect(className).toBe('tw-flex tw-p-8 tw-justiify-center tw-items-start');
    });
    it(`removes undefined values`, () => {
        const className = cn('tw-flex', 'tw-p-8', undefined, 'tw-justiify-center', 'tw-items-start');
        expect(className).toBe('tw-flex tw-p-8 tw-justiify-center tw-items-start');
    });
    it(`removes false values`, () => {
        const className = cn('tw-flex', 'tw-p-8', false, 'tw-justiify-center', 'tw-items-start');
        expect(className).toBe('tw-flex tw-p-8 tw-justiify-center tw-items-start');
    });
    it(`removes 0 values`, () => {
        const className = cn('tw-flex', 'tw-p-8', 0, 'tw-justiify-center', 'tw-items-start');
        expect(className).toBe('tw-flex tw-p-8 tw-justiify-center tw-items-start');
    });
    it(`removes empty arrays`, () => {
        const className = cn('tw-flex', 'tw-p-8', [], 'tw-justiify-center', 'tw-items-start');
        expect(className).toBe('tw-flex tw-p-8 tw-justiify-center tw-items-start');
    });
    it(`removes overridden classes`, () => {
        const className = cn('tw-flex', 'tw-p-8', 'tw-justiify-center', 'tw-items-start', 'tw-flex', 'tw-p-2');
        expect(className).toBe('tw-justiify-center tw-items-start tw-flex tw-p-2');
    });
});
