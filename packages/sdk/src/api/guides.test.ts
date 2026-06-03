/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { type Guide } from '../types/guides';

import { buildGuidesApi } from './guides';

const guides: readonly Guide[] = [
    {
        id: 'getting-started',
        title: 'Getting Started',
        content: '# Getting Started\n\nWelcome to Fondue. Install the package to begin.',
    },
    {
        id: 'contributing',
        title: 'Contributing',
        content: '# Contributing\n\nPull requests are encouraged.',
    },
    {
        id: 'upgrading',
        title: 'Upgrading',
        content: '# Upgrading\n\nFollow the migration steps.',
    },
];

describe('buildGuidesApi', () => {
    const api = buildGuidesApi(guides);

    it('lists all guides', () => {
        expect(api.list().map((g) => g.id)).toEqual(['getting-started', 'contributing', 'upgrading']);
    });

    it('exposes size', () => {
        expect(api.size).toBe(3);
    });

    it('gets a guide by id', () => {
        expect(api.get('contributing')?.title).toBe('Contributing');
    });

    it('returns undefined for unknown ids', () => {
        expect(api.get('unknown')).toBeUndefined();
    });

    it('checks membership with has()', () => {
        expect(api.has('upgrading')).toBe(true);
        expect(api.has('unknown')).toBe(false);
    });

    it('filters by free text against id, title, and content (case-insensitive)', () => {
        expect(api.where({ text: 'migration' }).map((g) => g.id)).toEqual(['upgrading']);
        expect(api.where({ text: 'WELCOME' }).map((g) => g.id)).toEqual(['getting-started']);
        expect(api.where({ text: 'started' }).map((g) => g.id)).toEqual(['getting-started']);
    });

    it('returns no matches when text is absent from all guides', () => {
        expect(api.where({ text: 'nonexistent' })).toEqual([]);
    });

    it('returns all guides for an empty filter', () => {
        expect(api.where({}).map((g) => g.id)).toEqual(['getting-started', 'contributing', 'upgrading']);
    });

    it('handles an empty guide list', () => {
        const empty = buildGuidesApi([]);
        expect(empty.size).toBe(0);
        expect(empty.list()).toEqual([]);
        expect(empty.where({ text: 'foo' })).toEqual([]);
    });
});
