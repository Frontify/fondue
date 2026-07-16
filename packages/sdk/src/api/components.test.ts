/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { type ComponentDetails, type ComponentNode } from '../types/components';

import { buildComponentsApi } from './components';

const makeComponent = (overrides: Partial<ComponentDetails> = {}): ComponentDetails => ({
    id: overrides.name ?? 'Sample',
    name: 'Sample',
    description: 'A sample component.',
    status: 'released',
    category: 'input',
    tags: ['form'],
    relatedComponents: [],
    importStatement: "import { Sample } from '@frontify/fondue/components';",
    instructions: null,
    props: [],
    subComponents: [],
    examples: [],
    typeDefinitions: {},
    ...overrides,
});

const fixtures: readonly ComponentDetails[] = [
    makeComponent({
        name: 'Button',
        description: 'Primary action trigger.',
        category: 'input',
        status: 'released',
        tags: ['form', 'action'],
        relatedComponents: ['SplitButton', 'Link'],
    }),
    makeComponent({
        name: 'SplitButton',
        description: 'Button with a dropdown action.',
        category: 'input',
        status: 'released',
        tags: ['form'],
        relatedComponents: ['Button'],
    }),
    makeComponent({
        name: 'Link',
        description: 'Navigates to another page.',
        category: 'navigation',
        status: 'released',
        tags: ['anchor'],
        relatedComponents: ['Button', 'NonExistent'],
    }),
    makeComponent({
        name: 'CalendarIcon',
        description: 'A calendar glyph.',
        category: 'icon',
        status: 'beta',
        tags: ['icon', 'date'],
        relatedComponents: [],
    }),
];

describe('buildComponentsApi', () => {
    describe('basic queries', () => {
        const api = buildComponentsApi(fixtures);

        it('lists all components in input order', () => {
            expect(api.list().map((n) => n.name)).toEqual(['Button', 'SplitButton', 'Link', 'CalendarIcon']);
        });

        it('exposes size', () => {
            expect(api.size).toBe(4);
        });

        it('gets a component by name', () => {
            expect(api.get('Button')?.name).toBe('Button');
        });

        it('exposes id, identical to name', () => {
            expect(api.get('Button')?.id).toBe('Button');
        });

        it('returns undefined for unknown names', () => {
            expect(api.get('Unknown')).toBeUndefined();
        });

        it('checks membership with has()', () => {
            expect(api.has('Button')).toBe(true);
            expect(api.has('Unknown')).toBe(false);
        });
    });

    describe('where()', () => {
        const api = buildComponentsApi(fixtures);

        it('filters by single category', () => {
            expect(api.where({ category: 'input' }).map((n) => n.name)).toEqual(['Button', 'SplitButton']);
        });

        it('filters by multiple categories (OR within clause)', () => {
            expect(api.where({ category: ['input', 'navigation'] }).map((n) => n.name)).toEqual([
                'Button',
                'SplitButton',
                'Link',
            ]);
        });

        it('filters by status', () => {
            expect(api.where({ status: 'beta' }).map((n) => n.name)).toEqual(['CalendarIcon']);
        });

        it('filters by tag — matches when any tag overlaps', () => {
            expect(api.where({ tag: 'form' }).map((n) => n.name)).toEqual(['Button', 'SplitButton']);
            expect(api.where({ tag: ['anchor', 'date'] }).map((n) => n.name)).toEqual(['Link', 'CalendarIcon']);
        });

        it('filters by free text (case-insensitive across name/description/tags/category)', () => {
            expect(api.where({ text: 'dropdown' }).map((n) => n.name)).toEqual(['SplitButton']);
            expect(api.where({ text: 'NAVIGATION' }).map((n) => n.name)).toEqual(['Link']);
        });

        it('AND-combines multiple clauses', () => {
            expect(api.where({ category: 'input', tag: 'action' }).map((n) => n.name)).toEqual(['Button']);
        });

        it('returns no matches when clauses cannot be satisfied together', () => {
            expect(api.where({ category: 'input', status: 'beta' })).toEqual([]);
        });

        it('returns all components for an empty filter', () => {
            expect(api.where({}).map((n) => n.name)).toEqual(['Button', 'SplitButton', 'Link', 'CalendarIcon']);
        });
    });

    describe('node graph', () => {
        const api = buildComponentsApi(fixtures);

        it('resolves category() to a facet that lists siblings', () => {
            const button = api.get('Button');
            const category = button?.category();
            expect(category?.name).toBe('input');
            expect(category?.list().map((n) => n.name)).toEqual(['Button', 'SplitButton']);
        });

        it('exposes status as a string property', () => {
            expect(api.get('Button')?.status).toBe('released');
            expect(api.get('CalendarIcon')?.status).toBe('beta');
        });

        it('resolves tags() to facet nodes, in raw order', () => {
            const tags = api.get('Button')?.tags();
            expect(tags?.map((t) => t.name)).toEqual(['form', 'action']);
        });

        it('resolves related() to component nodes and skips unknown names', () => {
            const related = api.get('Link')?.related();
            expect(related?.map((n) => n.name)).toEqual(['Button']);
        });

        it('toJSON() returns the underlying raw record', () => {
            const button = api.get('Button');
            expect(button?.toJSON().name).toBe('Button');
            expect(button?.toJSON().relatedComponents).toEqual(['SplitButton', 'Link']);
        });
    });

    describe('facet collections', () => {
        const api = buildComponentsApi(fixtures);

        it('categories() returns all categories sorted by name', () => {
            expect(api.categories().map((c) => c.name)).toEqual(['icon', 'input', 'navigation']);
        });

        it('category() returns a single facet by name', () => {
            expect(api.category('input')?.size).toBe(2);
            expect(api.category('overlay')).toBeUndefined();
        });

        it('statuses() returns all statuses sorted by name', () => {
            expect(api.statuses().map((s) => s.name)).toEqual(['beta', 'released']);
        });

        it('status() returns a single facet scoped to its members', () => {
            expect(
                api
                    .status('released')
                    ?.list()
                    .map((n) => n.name),
            ).toEqual(['Button', 'SplitButton', 'Link']);
            expect(api.status('beta')?.size).toBe(1);
        });

        it('tags() returns all tags sorted by name', () => {
            expect(api.tags().map((t) => t.name)).toEqual(['action', 'anchor', 'date', 'form', 'icon']);
        });

        it('tag() facet membership reflects components carrying that tag', () => {
            const formTag = api.tag('form');
            expect(formTag?.list().map((n) => n.name)).toEqual(['Button', 'SplitButton']);
        });

        it('facet.where() scopes filters to the facet members', () => {
            const inputCategory = api.category('input');
            expect(inputCategory?.where({ tag: 'action' }).map((n) => n.name)).toEqual(['Button']);
            // Link is in 'navigation', so the inputs facet should not see it.
            expect(inputCategory?.has('Link')).toBe(false);
        });
    });

    describe('immutability', () => {
        const api = buildComponentsApi(fixtures);

        it('freezes the collections returned by list()', () => {
            expect(Object.isFrozen(api.list())).toBe(true);
            expect(() => (api.list() as ComponentNode[]).push({} as ComponentNode)).toThrow();
        });

        it('freezes nodes and their raw data', () => {
            const button = api.get('Button');
            expect(Object.isFrozen(button)).toBe(true);
            expect(Object.isFrozen(button?.toJSON())).toBe(true);
            expect(Object.isFrozen(button?.toJSON().tags)).toBe(true);
        });
    });

    describe('edge cases', () => {
        it('handles an empty component list', () => {
            const api = buildComponentsApi([]);
            expect(api.size).toBe(0);
            expect(api.list()).toEqual([]);
            expect(api.categories()).toEqual([]);
            expect(api.tags()).toEqual([]);
            expect(api.where({ text: 'foo' })).toEqual([]);
        });
    });
});
