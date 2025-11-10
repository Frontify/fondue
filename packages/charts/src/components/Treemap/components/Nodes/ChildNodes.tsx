/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Group } from '@visx/group';
import { type HierarchyNode, type HierarchyRectangularNode } from 'd3-hierarchy';
import { useState } from 'react';

import { handlePointerMove } from '@components/Treemap/components/Nodes/helpers';
import { colorAccessor, weakColorAccessor } from '@components/Treemap/helpers';
import { type TreemapDataPoint, type TreemapDataPointGroup, type TreemapTooltipState } from '@components/Treemap/types';

type ChildNodesProps = {
    childNodes: HierarchyRectangularNode<HierarchyNode<TreemapDataPoint | TreemapDataPointGroup>>[];
    setTooltipState: (state: TreemapTooltipState | null) => void;
};

export const ChildNodes = ({ childNodes, setTooltipState }: ChildNodesProps) => {
    const [hoveredGroup, setHoveredGroup] = useState('');
    const groupTransformFunction = 'translate(6,6)';

    // Translate child coordinates to make them relative to the parent node (<Group />)
    // @ts-expect-error Wrong typing in the original code
    const deltaX = childNodes[0].x0;
    // @ts-expect-error Wrong typing in the original code
    const deltaY = childNodes[0].y0;

    return (
        <Group transform={groupTransformFunction}>
            {childNodes.map((child) => {
                const x0RelativeToParent = child.x0 - deltaX;
                const y0RelativeToParent = child.y0 - deltaY;
                const width = child.x1 - child.x0;
                const height = child.y1 - child.y0;

                return (
                    <Group
                        key={`child-node-${child.data.id}-${child.x0}-${child.y0}`}
                        onPointerEnter={() => setHoveredGroup(child.data.id || '')}
                        onPointerMove={(event) => handlePointerMove(event, child.data, setTooltipState)}
                        onPointerDown={(event) => handlePointerMove(event, child.data, setTooltipState)}
                        onPointerLeave={() => {
                            setTooltipState(null);
                            setHoveredGroup('');
                        }}
                    >
                        <rect
                            x={x0RelativeToParent}
                            y={y0RelativeToParent}
                            width={width}
                            height={height}
                            fill={weakColorAccessor(child.data.data.color)}
                        />
                        {hoveredGroup === child.data.id && (
                            <rect
                                x={x0RelativeToParent + 1}
                                y={y0RelativeToParent + 1}
                                width={width - 2}
                                height={height - 2}
                                fill="transparent"
                                stroke={colorAccessor(child.data.data.color)}
                                strokeWidth={1.5}
                            />
                        )}
                    </Group>
                );
            })}
        </Group>
    );
};
