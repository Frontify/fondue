/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { type Token, type TokenUtility } from '../types/tokens';

import { buildTokensApi } from './tokens';

const makeToken = (overrides: Partial<Token> = {}): Token => ({
    id: 'color-charts-primary-default',
    category: 'colors',
    type: 'color',
    keyPath: ['colors', 'charts', 'primary', 'default'],
    value: 'var(--color-charts-primary-default)',
    cssVariable: 'var(--color-charts-primary-default)',
    tailwindClass: 'bg-charts-primary',
    themeable: true,
    ...overrides,
});

const makeUtility = (overrides: Partial<TokenUtility> = {}): TokenUtility => ({
    id: 'typography-heading-1',
    keyPath: ['typography', 'heading', '1'],
    properties: [],
    tailwindClass: 'text-heading-1',
    themeable: false,
    ...overrides,
});

const tokens: readonly Token[] = [
    makeToken({
        id: 'color-charts-primary-default',
        category: 'colors',
        type: 'color',
        keyPath: ['colors', 'charts', 'primary', 'default'],
        tailwindClass: 'bg-charts-primary',
        themeable: true,
    }),
    makeToken({
        id: 'color-text-default',
        category: 'colors',
        type: 'color',
        keyPath: ['colors', 'text', 'default'],
        tailwindClass: 'text-default',
        themeable: true,
    }),
    makeToken({
        id: 'spacing-md',
        category: 'spacing',
        type: 'float',
        keyPath: ['spacing', 'md'],
        tailwindClass: 'p-md',
        themeable: false,
    }),
    makeToken({
        id: 'shadow-elevation-1',
        category: 'shadows',
        type: 'shadow',
        keyPath: ['shadows', 'elevation', '1'],
        tailwindClass: 'shadow-1',
        themeable: false,
    }),
];

const utilities: readonly TokenUtility[] = [
    makeUtility({
        id: 'typography-heading-1',
        keyPath: ['typography', 'heading', '1'],
        tailwindClass: 'text-heading-1',
        themeable: false,
    }),
    makeUtility({
        id: 'typography-body',
        keyPath: ['typography', 'body'],
        tailwindClass: 'text-body',
        themeable: true,
    }),
    makeUtility({
        id: 'typography-body-duplicate',
        keyPath: ['typography', 'body', 'duplicate'],
        tailwindClass: 'text-body',
        themeable: true,
    }),
];

describe('buildTokensApi', () => {
    describe('basic queries', () => {
        const api = buildTokensApi(tokens, utilities);

        it('lists all tokens', () => {
            expect(api.list().map((t) => t.id)).toEqual([
                'color-charts-primary-default',
                'color-text-default',
                'spacing-md',
                'shadow-elevation-1',
            ]);
        });

        it('exposes size', () => {
            expect(api.size).toBe(4);
        });

        it('gets a token by id', () => {
            expect(api.get('spacing-md')?.id).toBe('spacing-md');
        });

        it('returns undefined for unknown ids', () => {
            expect(api.get('unknown')).toBeUndefined();
        });

        it('checks membership with has()', () => {
            expect(api.has('spacing-md')).toBe(true);
            expect(api.has('unknown')).toBe(false);
        });
    });

    describe('where()', () => {
        const api = buildTokensApi(tokens, utilities);

        it('filters by category', () => {
            expect(api.where({ category: 'colors' }).map((t) => t.id)).toEqual([
                'color-charts-primary-default',
                'color-text-default',
            ]);
        });

        it('filters by multiple categories', () => {
            expect(api.where({ category: ['spacing', 'shadows'] }).map((t) => t.id)).toEqual([
                'spacing-md',
                'shadow-elevation-1',
            ]);
        });

        it('filters by type', () => {
            expect(api.where({ type: 'color' }).map((t) => t.id)).toEqual([
                'color-charts-primary-default',
                'color-text-default',
            ]);
            expect(api.where({ type: ['float', 'shadow'] }).map((t) => t.id)).toEqual([
                'spacing-md',
                'shadow-elevation-1',
            ]);
        });

        it('filters by themeable boolean', () => {
            expect(api.where({ themeable: true }).map((t) => t.id)).toEqual([
                'color-charts-primary-default',
                'color-text-default',
            ]);
            expect(api.where({ themeable: false }).map((t) => t.id)).toEqual(['spacing-md', 'shadow-elevation-1']);
        });

        it('filters by keyPath prefix', () => {
            expect(api.where({ keyPathStartsWith: 'colors.charts' }).map((t) => t.id)).toEqual([
                'color-charts-primary-default',
            ]);
            expect(api.where({ keyPathStartsWith: 'colors' }).map((t) => t.id)).toEqual([
                'color-charts-primary-default',
                'color-text-default',
            ]);
        });

        it('filters by free text (id / tailwindClass / dot-joined keyPath)', () => {
            expect(api.where({ text: 'charts' }).map((t) => t.id)).toEqual(['color-charts-primary-default']);
            expect(api.where({ text: 'p-md' }).map((t) => t.id)).toEqual(['spacing-md']);
        });

        it('AND-combines multiple clauses', () => {
            expect(api.where({ category: 'colors', themeable: true, text: 'text' }).map((t) => t.id)).toEqual([
                'color-text-default',
            ]);
        });

        it('returns all tokens for an empty filter', () => {
            expect(api.where({}).map((t) => t.id)).toEqual([
                'color-charts-primary-default',
                'color-text-default',
                'spacing-md',
                'shadow-elevation-1',
            ]);
        });
    });

    describe('node graph', () => {
        const api = buildTokensApi(tokens, utilities);

        it('resolves category() to a facet listing siblings', () => {
            const node = api.get('color-charts-primary-default');
            const category = node?.category();
            expect(category?.name).toBe('colors');
            expect(category?.list().map((t) => t.id)).toEqual(['color-charts-primary-default', 'color-text-default']);
        });

        it('resolves type() to a facet', () => {
            expect(api.get('spacing-md')?.type().name).toBe('float');
            expect(api.get('shadow-elevation-1')?.type().name).toBe('shadow');
        });

        it('toJSON() returns the underlying raw record', () => {
            const node = api.get('spacing-md');
            expect(node?.toJSON()).toEqual(
                expect.objectContaining({
                    id: 'spacing-md',
                    category: 'spacing',
                    type: 'float',
                }),
            );
        });
    });

    describe('facet collections', () => {
        const api = buildTokensApi(tokens, utilities);

        it('categories() returns facets sorted by name', () => {
            expect(api.categories().map((c) => c.name)).toEqual(['colors', 'shadows', 'spacing']);
        });

        it('category() returns a single facet by name', () => {
            expect(api.category('colors')?.size).toBe(2);
            expect(api.category('unknown')).toBeUndefined();
        });

        it('types() returns facets sorted by name', () => {
            expect(api.types().map((t) => t.name)).toEqual(['color', 'float', 'shadow']);
        });

        it('type() returns a single facet by value type', () => {
            expect(api.type('color')?.size).toBe(2);
            expect(api.type('shadow')?.size).toBe(1);
        });

        it('facet.where() scopes filters to facet members', () => {
            const colors = api.category('colors');
            expect(colors?.where({ keyPathStartsWith: 'colors.charts' }).map((t) => t.id)).toEqual([
                'color-charts-primary-default',
            ]);
        });
    });

    describe('utilities sub-API', () => {
        const api = buildTokensApi(tokens, utilities);

        it('lists all utilities', () => {
            expect(api.utilities.list().map((u) => u.id)).toEqual([
                'typography-heading-1',
                'typography-body',
                'typography-body-duplicate',
            ]);
        });

        it('exposes size', () => {
            expect(api.utilities.size).toBe(3);
        });

        it('gets / has utility by id', () => {
            expect(api.utilities.get('typography-body')?.id).toBe('typography-body');
            expect(api.utilities.has('typography-body')).toBe(true);
            expect(api.utilities.has('unknown')).toBe(false);
        });

        it('filters utilities by themeable', () => {
            expect(api.utilities.where({ themeable: true }).map((u) => u.id)).toEqual([
                'typography-body',
                'typography-body-duplicate',
            ]);
        });

        it('filters utilities by keyPath prefix', () => {
            expect(api.utilities.where({ keyPathStartsWith: 'typography.body' }).map((u) => u.id)).toEqual([
                'typography-body',
                'typography-body-duplicate',
            ]);
        });

        it('filters utilities by free text', () => {
            expect(api.utilities.where({ text: 'heading-1' }).map((u) => u.id)).toEqual(['typography-heading-1']);
        });

        it('classes() returns the unique, sorted set of tailwind classes', () => {
            // text-body appears on two utilities — should be de-duplicated.
            expect(api.utilities.classes()).toEqual(['text-body', 'text-heading-1']);
        });

        it('toJSON() on a utility node returns the raw record', () => {
            expect(api.utilities.get('typography-body')?.toJSON()).toEqual(
                expect.objectContaining({ id: 'typography-body', tailwindClass: 'text-body' }),
            );
        });
    });

    describe('edge cases', () => {
        it('handles empty inputs', () => {
            const api = buildTokensApi([], []);
            expect(api.size).toBe(0);
            expect(api.list()).toEqual([]);
            expect(api.categories()).toEqual([]);
            expect(api.types()).toEqual([]);
            expect(api.utilities.size).toBe(0);
            expect(api.utilities.classes()).toEqual([]);
        });
    });
});
