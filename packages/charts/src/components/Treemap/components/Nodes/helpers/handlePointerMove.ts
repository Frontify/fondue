/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type HierarchyNode } from 'd3-hierarchy';
import { type PointerEvent } from 'react';

import { type TreemapDataPoint, type TreemapDataPointGroup, type TreemapTooltipState } from '@components/Treemap/types';

export const handlePointerMove = (
    event: PointerEvent<SVGElement>,
    activeNode: HierarchyNode<TreemapDataPoint | TreemapDataPointGroup>,
    setTooltipState: (state: TreemapTooltipState | null) => void,
) => {
    const svg = event.currentTarget.closest('svg');
    const svgOffsetX = svg?.getBoundingClientRect().left ?? 0;
    const svgOffsetY = svg?.getBoundingClientRect().top ?? 0;

    setTooltipState({
        activeNode,
        x: event.clientX - svgOffsetX,
        y: event.clientY - svgOffsetY,
    });
};
