/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, test } from 'vitest';

import {
    getDataPointsToBeGrouped,
    getFirstLevelGroups,
    getSecondLevelGroups,
} from '@components/Treemap/hooks/helpers/dataGroupingHelper';
import { type TreemapDataPoint } from '@components/Treemap/types';

const MOCK_DATA: TreemapDataPoint[] = [
    {
        id: '0',
        label: 'root',
        value: 0,
        parentId: null,
    },
    {
        id: '1',
        label: '1',
        value: 0,
        parentId: '0',
        color: 'transparent',
    },
    {
        id: '2',
        label: '2',
        value: 0,
        parentId: '0',
        color: 'transparent',
    },
    {
        id: '4',
        label: '4',
        value: 2,
        parentId: '1',
        color: 'PRIMARY',
    },
    {
        id: '5',
        label: '5',
        value: 2,
        parentId: '1',
        color: 'PRIMARY',
    },
    {
        id: '6',
        label: '6',
        value: 2,
        parentId: '1',
        color: 'SECONDARY',
    },
    {
        id: '7',
        label: '7',
        value: 2,
        parentId: '1',
        color: 'SECONDARY',
    },
    {
        id: '8',
        label: '8',
        value: 4,
        parentId: '2',
        color: 'PRIMARY',
    },
    {
        id: '9',
        label: '9',
        value: 4,
        parentId: '2',
        color: 'PRIMARY',
    },
];

const colorLabelMap = {
    PRIMARY: { singular: '', plural: '', group: (libraries: number) => `Others (${libraries} Libraries)` },
    SECONDARY: { singular: '', plural: '', group: (projects: number) => `Others (${projects} Projects)` },
    TERTIARY: {
        singular: '',
        plural: '',
        group: (guidelines: number) => `Others (${guidelines} Guidelines)`,
    },
};

describe('getDataPointsToBeGrouped', () => {
    test('should not group if threshold is 0', () => {
        const result = getDataPointsToBeGrouped(MOCK_DATA, 0);

        expect(result).toEqual({
            unchanged: [...MOCK_DATA],
            toBeGroupedFirstLevel: [],
            toBeGroupedSecondLevel: [],
        });
    });

    test('should group data points whose value is smaller than threshold', () => {
        const result = getDataPointsToBeGrouped(MOCK_DATA, 3);

        expect(result).toEqual({
            unchanged: [MOCK_DATA[0], MOCK_DATA[1], MOCK_DATA[2], MOCK_DATA[7], MOCK_DATA[8]],
            toBeGroupedFirstLevel: [],
            toBeGroupedSecondLevel: [MOCK_DATA[3], MOCK_DATA[4], MOCK_DATA[5], MOCK_DATA[6]],
        });
    });

    test('should group all data points except root if threshold is larger than the largest data point', () => {
        const result = getDataPointsToBeGrouped(MOCK_DATA, 10);

        expect(result).toEqual({
            unchanged: [MOCK_DATA[0]],
            toBeGroupedFirstLevel: [MOCK_DATA[1], MOCK_DATA[2]],
            toBeGroupedSecondLevel: [
                MOCK_DATA[3],
                MOCK_DATA[4],
                MOCK_DATA[5],
                MOCK_DATA[6],
                MOCK_DATA[7],
                MOCK_DATA[8],
            ],
        });
    });

    test('should never group root, even if threshold is larger than the sum of all data points', () => {
        const result = getDataPointsToBeGrouped(MOCK_DATA, Infinity);

        expect(result).toEqual({
            unchanged: [MOCK_DATA[0]],
            toBeGroupedFirstLevel: [MOCK_DATA[1], MOCK_DATA[2]],
            toBeGroupedSecondLevel: [
                MOCK_DATA[3],
                MOCK_DATA[4],
                MOCK_DATA[5],
                MOCK_DATA[6],
                MOCK_DATA[7],
                MOCK_DATA[8],
            ],
        });
    });
});

describe('getFirstLevelGroups', () => {
    test('should group data points by color', () => {
        const result = getFirstLevelGroups([MOCK_DATA[1]!, MOCK_DATA[2]!]);

        expect(result).toEqual([
            {
                id: 'group-transparent',
                description: '',
                label: 'group-transparent',
                value: 0,
                parentId: '0',
                color: 'transparent',
                groupIds: ['1', '2'],
            },
        ]);
    });
});

describe('getSecondLevelGroups', () => {
    test('should group data points by color and parent group', () => {
        const result = getSecondLevelGroups(
            [MOCK_DATA[3]!, MOCK_DATA[4]!, MOCK_DATA[5]!, MOCK_DATA[6]!, MOCK_DATA[7]!, MOCK_DATA[8]!],
            [
                {
                    id: 'group-transparent',
                    description: '',
                    label: 'brand-group',
                    value: 0,
                    parentId: '0',
                    color: 'transparent',
                    groupIds: ['1', '2'],
                },
            ],
            colorLabelMap,
        );

        expect(result).toEqual([
            {
                id: 'group-transparent-PRIMARY',
                description: '',
                label: 'Others (4 Libraries)',
                value: 12,
                parentId: 'group-transparent',
                color: 'PRIMARY',
                groupIds: ['4', '5', '8', '9'],
            },
            {
                id: 'group-transparent-SECONDARY',
                description: '',
                label: 'Others (2 Projects)',
                value: 4,
                parentId: 'group-transparent',
                color: 'SECONDARY',
                groupIds: ['6', '7'],
            },
        ]);
    });

    test('should group data points by color when no first-level group exists', () => {
        const result = getSecondLevelGroups(
            [MOCK_DATA[3]!, MOCK_DATA[4]!, MOCK_DATA[5]!, MOCK_DATA[6]!, MOCK_DATA[7]!, MOCK_DATA[8]!],
            [],
            colorLabelMap,
        );

        expect(result).toEqual([
            {
                id: 'group-1-PRIMARY',
                description: '',
                label: 'Others (2 Libraries)',
                value: 4,
                parentId: '1',
                color: 'PRIMARY',
                groupIds: ['4', '5'],
            },
            {
                id: 'group-1-SECONDARY',
                description: '',
                label: 'Others (2 Projects)',
                value: 4,
                parentId: '1',
                color: 'SECONDARY',
                groupIds: ['6', '7'],
            },
            {
                id: 'group-2-PRIMARY',
                description: '',
                label: 'Others (2 Libraries)',
                value: 8,
                parentId: '2',
                color: 'PRIMARY',
                groupIds: ['8', '9'],
            },
        ]);
    });
});
