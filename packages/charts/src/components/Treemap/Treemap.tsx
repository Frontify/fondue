/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Treemap as VisxTreemap, treemapBinary } from '@visx/hierarchy';
import { useTooltipInPortal } from '@visx/tooltip';
import { type HierarchyNode } from 'd3-hierarchy';
import { useRef, useState } from 'react';

import { Nodes, TreemapTooltip } from '@components/Treemap/components';
import { colorAccessor, transformToHierarchyData } from '@components/Treemap/helpers';
import { useDataGroupedBySize } from '@components/Treemap/hooks';
import {
    type TreemapDataPoint,
    type TreemapDataPointGroup,
    type TreemapProps,
    type TreemapTooltipState,
} from '@components/Treemap/types';
import { Legend } from '@components/common/components';

export const Treemap = ({
    data,
    childSumLabel,
    missingValueLabel = '',
    colorLabelMap,
    valueFormatter,
    width,
    height,
    legendItems,
    sizeThresholds = {
        mobile: 20,
        desktop: 15,
    },
}: TreemapProps) => {
    const { containerRef, TooltipInPortal } = useTooltipInPortal({
        scroll: true,
    });
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [tooltipState, setTooltipState] = useState<TreemapTooltipState | null>(null);
    const [sizeThreshold, setSizeThreshold] = useState<number | null>(null);

    const { groupedData, wasGrouped } = useDataGroupedBySize(data, sizeThreshold, colorLabelMap);
    const hierarchyData = transformToHierarchyData(groupedData);

    const isGroupingDone = wasGrouped && sizeThreshold === 0;
    const didNotGroup = sizeThreshold !== null && !wasGrouped;

    const isReadyToBeRendered = isGroupingDone || didNotGroup;

    const legendNames = legendItems?.map((item) => item.label);

    return (
        <div className="tw-w-full tw-h-full tw-flex tw-flex-col tw-gap-6 tw-select-none tw-touch-none">
            {legendNames && legendNames.length > 0 && (
                <Legend
                    names={legendNames}
                    style="square"
                    colorAccessor={(index: number) => colorAccessor(legendItems?.[index]?.color)}
                />
            )}
            <div ref={wrapperRef} className="tw-w-full tw-h-full">
                <svg width={width} height={height} ref={containerRef}>
                    <VisxTreemap<HierarchyNode<TreemapDataPoint | TreemapDataPointGroup>>
                        top={0}
                        // @ts-expect-error Wrong typing in the original code
                        root={hierarchyData}
                        size={[width - 1, height - 1]}
                        tile={treemapBinary}
                        round
                        paddingOuter={3}
                        paddingInner={1}
                    >
                        {(treemap) => {
                            return (
                                <Nodes
                                    // @ts-expect-error Wrong typing in the original code
                                    treemap={treemap}
                                    setTooltipState={setTooltipState}
                                    setSizeThreshold={setSizeThreshold}
                                    isReadyToBeRendered={isReadyToBeRendered}
                                    sizeThresholds={sizeThresholds}
                                />
                            );
                        }}
                    </VisxTreemap>
                    {tooltipState !== null && (
                        <TreemapTooltip
                            TooltipInPortal={TooltipInPortal}
                            childSumLabel={childSumLabel}
                            missingValueLabel={missingValueLabel}
                            valueFormatter={valueFormatter}
                            groupformatter={colorLabelMap?.[tooltipState.activeNode.parent?.data.color || '']?.group}
                            colorLabelMap={colorLabelMap}
                            {...tooltipState}
                        />
                    )}
                </svg>
            </div>
        </div>
    );
};
