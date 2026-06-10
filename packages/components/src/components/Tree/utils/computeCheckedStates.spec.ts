/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { ROOT_ID } from '../constants';
import { type TreeItemData } from '../types';

import { computeCheckedStates, getCheckedUnitIds, isCheckableUnit } from './computeCheckedStates';

const leaf = (id: string, parentId: string, extra: Partial<TreeItemData> = {}): TreeItemData => ({
    id,
    name: id,
    isFolder: false,
    parentId,
    ...extra,
});

const folder = (id: string, parentId: string, children: string[], extra: Partial<TreeItemData> = {}): TreeItemData => ({
    id,
    name: id,
    isFolder: true,
    parentId,
    children,
    ...extra,
});

describe('isCheckableUnit', () => {
    it('treats leaves as units', () => {
        expect(isCheckableUnit(leaf('a', ROOT_ID))).toBe(true);
    });

    it('treats folders without loaded children as units', () => {
        expect(isCheckableUnit(folder('f', ROOT_ID, []))).toBe(true);
        expect(isCheckableUnit({ id: 'f', name: 'f', isFolder: true })).toBe(true);
    });

    it('does not treat folders with children as units', () => {
        expect(isCheckableUnit(folder('f', ROOT_ID, ['a']))).toBe(false);
    });
});

describe('getCheckedUnitIds', () => {
    it('collects leaves and leafless folders with isSelected true', () => {
        const items = [
            leaf('a', ROOT_ID, { isSelected: true }),
            folder('empty', ROOT_ID, [], { isSelected: true }),
            folder('full', ROOT_ID, ['b'], { isSelected: true }),
            leaf('b', 'full'),
        ];
        expect(getCheckedUnitIds(items)).toEqual(['a', 'empty']);
    });

    it("ignores 'indeterminate' as an input", () => {
        const items = [folder('empty', ROOT_ID, [], { isSelected: 'indeterminate' as const })];
        expect(getCheckedUnitIds(items)).toEqual([]);
    });
});

describe('computeCheckedStates', () => {
    it('reports unit membership for leaves', () => {
        const items = [leaf('a', ROOT_ID), leaf('b', ROOT_ID)];
        const states = computeCheckedStates(items, new Set(['a']));
        expect(states.get('a')).toBe(true);
        expect(states.get('b')).toBe(false);
    });

    it('reports a checked leafless folder as checked', () => {
        const items = [folder('empty', ROOT_ID, [])];
        expect(computeCheckedStates(items, new Set(['empty'])).get('empty')).toBe(true);
        expect(computeCheckedStates(items, new Set()).get('empty')).toBe(false);
    });

    it('derives folder state from leaf units', () => {
        const items = [folder('f', ROOT_ID, ['a', 'b']), leaf('a', 'f'), leaf('b', 'f')];
        expect(computeCheckedStates(items, new Set(['a', 'b'])).get('f')).toBe(true);
        expect(computeCheckedStates(items, new Set(['a'])).get('f')).toBe('indeterminate');
        expect(computeCheckedStates(items, new Set()).get('f')).toBe(false);
    });

    it('counts checked leafless folders as units toward ancestors', () => {
        const items = [
            folder('group', ROOT_ID, ['doc1', 'doc2']),
            folder('doc1', 'group', []),
            folder('doc2', 'group', []),
        ];
        expect(computeCheckedStates(items, new Set(['doc1'])).get('group')).toBe('indeterminate');
        expect(computeCheckedStates(items, new Set(['doc1', 'doc2'])).get('group')).toBe(true);
    });

    it('lets an unchecked leafless folder block an ancestor "all checked"', () => {
        const items = [folder('f', ROOT_ID, ['empty', 'a']), folder('empty', 'f', []), leaf('a', 'f')];
        expect(computeCheckedStates(items, new Set(['a'])).get('f')).toBe('indeterminate');
    });

    it('marks a folder with only orphan children as unchecked', () => {
        const items = [folder('f', ROOT_ID, ['missing'])];
        expect(computeCheckedStates(items, new Set()).get('f')).toBe(false);
    });
});
