/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Group } from '@visx/group';
import { type HierarchyNode, type HierarchyRectangularNode } from 'd3-hierarchy';
import { useState } from 'react';

import { useSetSizeThreshold } from '@components/Treemap/components/Nodes/hooks';
import { colorAccessor } from '@components/Treemap/helpers';
import {
    type SizeThresholds,
    type TreemapDataPoint,
    type TreemapDataPointGroup,
    type TreemapTooltipState,
} from '@components/Treemap/types';

import { ChildNodes } from './ChildNodes';

type NodesProps = {
    treemap: HierarchyRectangularNode<HierarchyNode<TreemapDataPoint | TreemapDataPointGroup>>;
    setTooltipState: (state: TreemapTooltipState | null) => void;
    setSizeThreshold: (threshold: number) => void;
    isReadyToBeRendered: boolean;
    sizeThresholds: SizeThresholds;
};

export const Nodes = ({
    treemap,
    setTooltipState,
    setSizeThreshold,
    isReadyToBeRendered,
    sizeThresholds,
}: NodesProps) => {
    const [hoveredGroup, setHoveredGroup] = useState('');
    useSetSizeThreshold(treemap, setSizeThreshold, sizeThresholds);

    return (
        <Group>
            {treemap.children?.map((node, i) => {
                const nodeWidth = node.x1 - node.x0;
                const nodeHeight = node.y1 - node.y0;
                return (
                    isReadyToBeRendered &&
                    nodeHeight &&
                    nodeWidth && (
                        <Group
                            key={`node-${i}`}
                            top={node.y0}
                            left={node.x0}
                            onPointerEnter={() => setHoveredGroup(node.data.id || '')}
                            onPointerLeave={() => setHoveredGroup('')}
                        >
                            <rect
                                rx={3}
                                width={nodeWidth}
                                height={nodeHeight}
                                x={3}
                                y={3}
                                stroke={
                                    hoveredGroup === node.data.id
                                        ? 'var(--color-line-strong)'
                                        : 'var(--fc-axis-y-color)'
                                }
                                strokeWidth={1.5}
                                fill={colorAccessor(node.data.data.color)}
                            />

                            {node.children && node.children.length > 0 && (
                                <ChildNodes childNodes={node.children} setTooltipState={setTooltipState} />
                            )}
                        </Group>
                    )
                );
            })}
        </Group>
    );
};
