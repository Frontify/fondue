/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type HierarchyNode } from 'd3-hierarchy';
import { describe, expect, it } from 'vitest';

import { getTopLevelNodeWithValue } from '@components/Treemap/components/TreemapTooltip/helpers/getTopLevelNodeWithValue';
import { type TreemapDataPoint } from '@components/Treemap/types';

describe('getTopLevelNodeWithValue', () => {
    it('returns top level node with value as sum of children if active node is top level node', () => {
        const hierarchyNode = {
            depth: 1,
            data: {
                label: 'Top Level Node',
                value: null,
                color: 'blue',
            },
            children: [
                {
                    label: 'Child 1',
                    value: 50,
                },
                {
                    label: 'Child 2',
                    value: 75,
                },
            ],
        } as unknown as HierarchyNode<TreemapDataPoint>;
        const result = getTopLevelNodeWithValue(hierarchyNode);
        expect(result).toEqual({
            label: 'Top Level Node',
            value: 125,
            color: 'blue',
        });
    });

    it('returns top level node with value as sum of children if active node is not top level node', () => {
        const hierarchyNode = {
            depth: 2,
            data: {
                label: 'Child 2',
                value: 75,
            },
            parent: {
                data: {
                    label: 'Top Level Node',
                    value: null,
                },
                children: [
                    {
                        label: 'Child 1',
                        value: 50,
                    },
                    {
                        label: 'Child 2',
                        value: 75,
                    },
                ],
            },
        } as unknown as HierarchyNode<TreemapDataPoint>;
        const result = getTopLevelNodeWithValue(hierarchyNode);
        expect(result).toEqual({
            label: 'Top Level Node',
            value: 125,
        });
    });
});
