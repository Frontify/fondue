/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type HierarchyNode, type HierarchyRectangularNode } from 'd3-hierarchy';
import { useEffect } from 'react';

import { type SizeThresholds, type TreemapDataPoint } from '@components/Treemap/types';

const MOBILE_VIEWPORT_WIDTH = 768;

export const useSetSizeThreshold = (
    treemap: HierarchyRectangularNode<HierarchyNode<TreemapDataPoint>>,
    setSizeThreshold: (threshold: number) => void,
    sizeThresholds: SizeThresholds,
) => {
    const treemapWidth = treemap.x1 - treemap.x0;
    const minSize = treemapWidth < MOBILE_VIEWPORT_WIDTH ? sizeThresholds.mobile : sizeThresholds.desktop;

    useEffect(() => {
        const smallEnough = treemap.descendants().filter((node) => {
            const nodeWidth = node.x1 - node.x0;
            const nodeHeight = node.y1 - node.y0;

            return (
                (nodeWidth <= minSize || nodeHeight <= minSize) &&
                nodeWidth !== 0 &&
                nodeHeight !== 0 &&
                !node.data.id?.includes('group')
            );
        });

        if (smallEnough?.length && smallEnough.length > 0) {
            const values = smallEnough.map((node) => node.value ?? 0);
            const thresholdValue = Math.max(...values);
            setSizeThreshold(thresholdValue);
        } else {
            setSizeThreshold(0);
        }
    }, [setSizeThreshold, minSize, treemap]);
};
