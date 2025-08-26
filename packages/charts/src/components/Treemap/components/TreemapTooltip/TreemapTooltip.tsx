/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type TooltipInPortalProps } from '@visx/tooltip/lib/hooks/useTooltipInPortal';
import { type FC } from 'react';

import { TOOLTIP_OFFSET } from '@components/Treemap/components/TreemapTooltip/constants';
import { getTooltipEntries, getTopLevelNodeWithValue } from '@components/Treemap/components/TreemapTooltip/helpers';
import { type ColorLabelMap, type TreemapTooltipState } from '@components/Treemap/types';
import { TooltipContent } from '@components/common/components/Tooltip/TooltipContent';
import { MISSING_VALUE_LABEL } from '@components/common/components/consts';

type TreemapTooltipProps = {
    TooltipInPortal: FC<TooltipInPortalProps>;
    childSumLabel: string;
    missingValueLabel?: string;
    valueFormatter?: (value: number) => string;
    groupformatter?: (value: number) => string;
    colorLabelMap?: ColorLabelMap;
} & TreemapTooltipState;

export const TreemapTooltip = ({
    TooltipInPortal,
    activeNode,
    x,
    y,
    childSumLabel,
    missingValueLabel = MISSING_VALUE_LABEL,
    valueFormatter,
    groupformatter,
    colorLabelMap,
}: TreemapTooltipProps) => {
    const topLevelNode = getTopLevelNodeWithValue(activeNode);

    let parentGroupLength = 0;
    const parentData = activeNode.parent?.data;
    if (parentData && 'groupIds' in parentData) {
        parentGroupLength = parentData.groupIds.length;
    }

    const hasGrouping = parentGroupLength > 1;

    const entries = getTooltipEntries(
        activeNode,
        topLevelNode,
        missingValueLabel,
        childSumLabel,
        valueFormatter,
        colorLabelMap,
    );

    return (
        <TooltipInPortal
            left={x}
            top={y}
            offsetLeft={TOOLTIP_OFFSET}
            offsetTop={TOOLTIP_OFFSET}
            applyPositionStyle
            detectBounds
            unstyled
        >
            <TooltipContent
                title={hasGrouping ? groupformatter?.(parentGroupLength) : topLevelNode.label}
                entries={entries}
            />
        </TooltipInPortal>
    );
};
