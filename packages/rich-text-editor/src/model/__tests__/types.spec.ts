/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { describe, expect, expectTypeOf, it } from 'vitest';

import { type LanguageTag, type StoredId } from '#/runtime/types';

import { type AttrsOf, defaultLimits, type ResourceLimits } from '..';
import { limitsOf } from '../decode';

const declarations = {
    level: { type: 'integer', min: 1, max: 6, required: true },
    twelve: { type: 'integer', min: 2, max: 13, default: 2 },
    span: { type: 'integer', min: 2, max: 14, default: 2 },
    wide: { type: 'integer', min: 0, max: 100, default: 0 },
    open: { type: 'integer', max: 3, default: 0 },
    maybe: { type: 'integer', min: 0, max: 2, nullable: true, default: null },
    plural: { type: 'number', min: 0, max: 2, default: 0 },
    title: { type: 'string', required: true },
    note: { type: 'string', nullable: true, default: null },
} as const;
type Attrs = AttrsOf<typeof declarations>;

describe('attribute types', () => {
    it('requires an attribute that is declared required and leaves the others optional', () => {
        expectTypeOf<Attrs>().toHaveProperty('level');
        expectTypeOf<{ level: 1; title: 'a' }>().toExtend<Attrs>();
        expectTypeOf<{ title: 'a' }>().not.toExtend<Attrs>();
        expectTypeOf<{ level: 1 }>().not.toExtend<Attrs>();
        expectTypeOf<Attrs['note']>().toEqualTypeOf<string | null | undefined>();
    });

    it('types an integer attribute with a small range as a literal union', () => {
        expectTypeOf<Attrs['level']>().toEqualTypeOf<1 | 2 | 3 | 4 | 5 | 6>();
        expectTypeOf<Attrs['maybe']>().toEqualTypeOf<0 | 1 | 2 | null | undefined>();
        expectTypeOf<Attrs['twelve']>().toEqualTypeOf<2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | undefined>();
        expectTypeOf<{ level: 7; title: 'a' }>().not.toExtend<Attrs>();
    });

    it('keeps number for a wide, half-open or non-integer range', () => {
        expectTypeOf<Attrs['span']>().toEqualTypeOf<number | undefined>();
        expectTypeOf<Attrs['wide']>().toEqualTypeOf<number | undefined>();
        expectTypeOf<Attrs['open']>().toEqualTypeOf<number | undefined>();
        expectTypeOf<Attrs['plural']>().toEqualTypeOf<number | undefined>();
    });
});

describe('stored ID and language tag types', () => {
    it('accept the first character the grammar allows and refuse the rest', () => {
        expectTypeOf<'guideline-page'>().toExtend<StoredId>();
        expectTypeOf<'9lives'>().toExtend<StoredId>();
        expectTypeOf<'Upper'>().not.toExtend<StoredId>();
        expectTypeOf<'-dash'>().not.toExtend<StoredId>();
        expectTypeOf<string>().not.toExtend<StoredId>();
        expectTypeOf<'en-US'>().toExtend<LanguageTag>();
        expectTypeOf<'de'>().toExtend<LanguageTag>();
        expectTypeOf<'e'>().not.toExtend<LanguageTag>();
        expectTypeOf<'1en'>().not.toExtend<LanguageTag>();
        expectTypeOf<string>().not.toExtend<LanguageTag>();
    });
});

describe('limitsOf', () => {
    it('takes known limit names only', () => {
        expectTypeOf(limitsOf).returns.toEqualTypeOf<ResourceLimits>();
        // @ts-expect-error `maxDepht` is no limit
        limitsOf({ maxDepth: 3, maxDepht: 4 });
        const given = { maxDepth: 3, other: 1 };
        // @ts-expect-error a variable with an extra name is refused too
        limitsOf(given);
    });

    it('applies a known limit and ignores an unknown name', () => {
        const given = { maxDepth: 3, other: 1 } as Partial<ResourceLimits>;

        expect(limitsOf(given)).toEqual({ ...defaultLimits, maxDepth: 3 });
        expect(Object.keys(limitsOf(given))).toEqual(Object.keys(defaultLimits));
    });
});
