/* (c) Copyright Frontify Ltd., all rights reserved. */

import { hierarchy, stratify } from '@visx/hierarchy';

import { type TreemapDataPoint, type TreemapDataPointGroup } from '@components/Treemap/types';

export const transformToHierarchyData = (dataPoints: (TreemapDataPoint | TreemapDataPointGroup)[]) => {
    return hierarchy(
        stratify<TreemapDataPoint | TreemapDataPointGroup>()
            .id((d) => d.id)
            .parentId((d) => d.parentId)(dataPoints)
            .sum((d) => d.value ?? 0),
    ).sort((a, b) => {
        const isSameColor = a.data.data.color === b.data.data.color;
        if (!isSameColor) {
            switch (a.data.data.color) {
                case 'PRIMARY':
                    return -1;
                case 'SECONDARY':
                    return 1;
                case 'TERTIARY':
                    return 1;
                default:
                    return 2;
            }
        } else {
            return (b.value ?? 0) - (a.value ?? 0);
        }
    });
};
