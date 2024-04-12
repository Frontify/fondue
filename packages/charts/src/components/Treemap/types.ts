/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type HierarchyNode } from 'd3-hierarchy';

import { type ValueFormatter } from '@components/common/types';

type TreemapLegendItem = {
    color: string;
    label: string;
};

export type TreemapDataPoint = {
    id: string;
    label: string;
    value: number | null;
    parentId: string | null;
    description?: string;
    color?: string;
};

export type TreemapDataPointGroup = {
    groupIds: string[];
} & TreemapDataPoint;

export type ColorLabelMap = Record<
    string,
    { singular: string; plural: string; group: (groupLength: number) => string }
>;

export type TreemapProps = {
    data: TreemapDataPoint[];
    childSumLabel: string;
    missingValueLabel?: string;
    colorLabelMap?: ColorLabelMap;
    valueFormatter?: ValueFormatter;
    width: number;
    height: number;
    legendItems?: TreemapLegendItem[];
    sizeThresholds?: SizeThresholds;
};

export type SizeThresholds = {
    mobile: number;
    desktop: number;
};

export type TreemapTooltipState = {
    activeNode: HierarchyNode<TreemapDataPoint | TreemapDataPointGroup>;
    x: number;
    y: number;
};
