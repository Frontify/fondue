/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type HierarchyNode } from 'd3-hierarchy';

import { colorAccessor } from '@components/Treemap/helpers/accessors';
import { type ColorLabelMap, type TreemapDataPoint, type TreemapDataPointGroup } from '@components/Treemap/types';
import { getDataPointValue } from '@components/common/components/Tooltip/helpers/getDataPointValue';
import { type ValueFormatter } from '@components/common/types';

export const getTooltipEntries = (
    activeNode: HierarchyNode<TreemapDataPoint | TreemapDataPointGroup>,
    topLevelNode: TreemapDataPoint,
    missingValueLabel: string,
    childSumLabel: string,
    valueFormatter?: ValueFormatter,
    colorLabelMap?: ColorLabelMap,
) => {
    const topLevelPoint = {
        title: childSumLabel,
        value: getDataPointValue(missingValueLabel, topLevelNode.value, valueFormatter),
        color: '',
    };
    const dataPoints = [topLevelPoint];
    if (activeNode.depth > 1) {
        const typeLabelsByColor = colorLabelMap?.[activeNode.data.color || ''];
        const typeLabelByGrouping =
            activeNode.data.id?.includes('group') && (activeNode.data as TreemapDataPointGroup).groupIds?.length > 1
                ? typeLabelsByColor?.plural
                : typeLabelsByColor?.singular;

        const dataPoint = {
            title: activeNode.data.label,
            value: getDataPointValue(missingValueLabel, activeNode.data.value, valueFormatter),
            color: colorAccessor(activeNode.data.color) ?? '',
            typeByGrouping: typeLabelByGrouping ?? '',
            type: typeLabelsByColor?.singular ?? '',
        };

        dataPoints.push(dataPoint);
    }

    return dataPoints;
};
