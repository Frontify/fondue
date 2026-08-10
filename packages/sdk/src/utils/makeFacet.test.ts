/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { makeFacet } from './makeFacet';

interface FakeNode {
    readonly id: string;
    readonly tag: string;
}

const buildResolver = (nodes: readonly FakeNode[]) => {
    const byId = new Map(nodes.map((n) => [n.id, n]));
    return (id: string) => byId.get(id);
};

const matchesByTag = (node: FakeNode, filter: { tag?: string }): boolean => !filter.tag || node.tag === filter.tag;

describe('makeFacet', () => {
    const nodes: FakeNode[] = [
        { id: 'a', tag: 'x' },
        { id: 'b', tag: 'y' },
        { id: 'c', tag: 'x' },
    ];

    it('exposes its name', () => {
        const facet = makeFacet('layout', ['a', 'b'], buildResolver(nodes), matchesByTag);
        expect(facet.name).toBe('layout');
    });

    it('reports membership by id', () => {
        const facet = makeFacet('layout', ['a', 'b'], buildResolver(nodes), matchesByTag);
        expect(facet.has('a')).toBe(true);
        expect(facet.has('c')).toBe(false);
    });

    it('returns size from the original member id list', () => {
        const facet = makeFacet('layout', ['a', 'b'], buildResolver(nodes), matchesByTag);
        expect(facet.size).toBe(2);
    });

    it('list() resolves member ids to nodes via the resolver', () => {
        const facet = makeFacet('layout', ['a', 'b'], buildResolver(nodes), matchesByTag);
        expect(facet.list().map((n) => n.id)).toEqual(['a', 'b']);
    });

    it('list() skips members that the resolver returns undefined for', () => {
        const facet = makeFacet('layout', ['a', 'missing', 'b'], buildResolver(nodes), matchesByTag);
        expect(facet.list().map((n) => n.id)).toEqual(['a', 'b']);
    });

    it('get() only returns nodes that are members of the facet', () => {
        const facet = makeFacet('layout', ['a'], buildResolver(nodes), matchesByTag);
        expect(facet.get('a')?.id).toBe('a');
        // 'b' exists in the underlying store, but is not in this facet.
        expect(facet.get('b')).toBeUndefined();
    });

    it('where() filters the facet members through the supplied matcher', () => {
        const facet = makeFacet('layout', ['a', 'b', 'c'], buildResolver(nodes), matchesByTag);
        expect(facet.where({ tag: 'x' }).map((n) => n.id)).toEqual(['a', 'c']);
        expect(facet.where({}).map((n) => n.id)).toEqual(['a', 'b', 'c']);
    });

    it('resolves lazily — a resolver added after construction still works', () => {
        let store: Map<string, FakeNode> | undefined;
        const lateResolver = (id: string) => store?.get(id);
        const facet = makeFacet('layout', ['a', 'b'], lateResolver, matchesByTag);
        // Before the store is populated, list() resolves to nothing.
        expect(facet.list()).toEqual([]);
        store = new Map(nodes.map((n) => [n.id, n]));
        expect(facet.list().map((n) => n.id)).toEqual(['a', 'b']);
    });
});
