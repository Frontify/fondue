/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { pushToMultiMap, sortedByName } from './collections';

describe('sortedByName', () => {
    it('sorts by name alphabetically', () => {
        const result = sortedByName([{ name: 'Charlie' }, { name: 'Alice' }, { name: 'Bob' }]);
        expect(result.map((r) => r.name)).toEqual(['Alice', 'Bob', 'Charlie']);
    });

    it('orders case-insensitively (locale-aware)', () => {
        const result = sortedByName([{ name: 'banana' }, { name: 'Apple' }, { name: 'cherry' }]);
        // localeCompare puts 'Apple' before 'banana' despite the lowercase b sorting after uppercase A in code-point order.
        expect(result.map((r) => r.name)).toEqual(['Apple', 'banana', 'cherry']);
    });

    it('accepts an iterable, not just an array', () => {
        const map = new Map([
            ['z', { name: 'zeta' }],
            ['a', { name: 'alpha' }],
        ]);
        const result = sortedByName(map.values());
        expect(result.map((r) => r.name)).toEqual(['alpha', 'zeta']);
    });

    it('returns an empty array when input is empty', () => {
        expect(sortedByName([])).toEqual([]);
    });
});

describe('pushToMultiMap', () => {
    it('creates a new bucket on first insert', () => {
        const map = new Map<string, number[]>();
        pushToMultiMap(map, 'a', 1);
        expect(map.get('a')).toEqual([1]);
    });

    it('appends to an existing bucket', () => {
        const map = new Map<string, number[]>();
        pushToMultiMap(map, 'a', 1);
        pushToMultiMap(map, 'a', 2);
        pushToMultiMap(map, 'a', 3);
        expect(map.get('a')).toEqual([1, 2, 3]);
    });

    it('keeps buckets isolated per key', () => {
        const map = new Map<string, string[]>();
        pushToMultiMap(map, 'a', 'x');
        pushToMultiMap(map, 'b', 'y');
        expect(map.get('a')).toEqual(['x']);
        expect(map.get('b')).toEqual(['y']);
    });
});
