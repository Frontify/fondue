/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { transformToHierarchyData } from '@components/Treemap/helpers/transformers';

describe('transformToSortedHierarchyData', () => {
    it('throws if dataPoints array is empty', () => {
        expect(() => transformToHierarchyData([])).toThrow('no root');
    });

    it('throws if dataPoints includes multiple roots', () => {
        const dataPoints = [
            {
                id: 'Root',
                label: 'Root',
                value: null,
                parentId: null,
            },
            {
                id: 'Root2',
                label: 'Root2',
                value: null,
                parentId: null,
            },
        ];
        expect(() => transformToHierarchyData(dataPoints)).toThrow('multiple roots');
    });

    it('throws if root is not found', () => {
        const dataPoints = [
            {
                id: 'Node1',
                label: 'Node1',
                value: 50,
                parentId: 'Top Level 1',
            },
            {
                id: 'Node2',
                label: 'Node2',
                value: 70,
                parentId: 'Top Level 1',
            },
        ];
        expect(() => transformToHierarchyData(dataPoints)).toThrow('missing: Top Level 1');
    });

    it('returns hierarchy data if structure is correct', () => {
        const dataPoints = [
            {
                id: 'Root',
                label: 'Root',
                value: null,
                parentId: null,
            },
            {
                id: 'Top Level 1',
                label: 'Top Level 1',
                value: null,
                parentId: 'Root',
            },
            {
                id: 'Top Level 2',
                label: 'Top Level 2',
                value: null,
                parentId: 'Root',
            },
            {
                id: 'ChildNode1',
                label: 'ChildNode1',
                value: 70,
                parentId: 'Top Level 1',
            },
            {
                id: 'ChildNode2',
                label: 'ChildNode2',
                value: 50,
                parentId: 'Top Level 1',
            },
            {
                id: 'ChildNode3',
                label: 'ChildNode3',
                value: 30,
                parentId: 'Top Level 2',
            },
        ];
        const result = transformToHierarchyData(dataPoints);
        expect(result.data.data.label).toEqual('Root');
        expect(result.children?.length).toEqual(2);
        expect(result.children?.[0]?.data.data.label).toEqual('Top Level 1');
        expect(result.children?.[0]?.data.data.value).toEqual(null);
        expect(result.children?.[1]?.data.data.label).toEqual('Top Level 2');
        expect(result.children?.[1]?.data.data.value).toEqual(null);
        expect(result.children?.[0]?.children?.length).toEqual(2);
        expect(result.children?.[0]?.children?.[0]?.data.data.label).toEqual('ChildNode1');
        expect(result.children?.[0]?.children?.[0]?.data.data.value).toEqual(70);
        expect(result.children?.[0]?.children?.[0]?.children).toEqual(undefined);
        expect(result.children?.[0]?.children?.[1]?.data.data.label).toEqual('ChildNode2');
        expect(result.children?.[0]?.children?.[1]?.data.data.value).toEqual(50);
        expect(result.children?.[0]?.children?.[1]?.children).toEqual(undefined);
        expect(result.children?.[1]?.children?.length).toEqual(1);
        expect(result.children?.[1]?.children?.[0]?.data.data.label).toEqual('ChildNode3');
        expect(result.children?.[1]?.children?.[0]?.data.data.value).toEqual(30);
    });
});
