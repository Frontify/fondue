/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type TooltipInPortalProps } from '@visx/tooltip';
import { type FC } from 'react';

import { TooltipContent } from '@components/common/components';
import { TOOLTIP_OFFSET } from '@components/Treemap/components/TreemapTooltip/constants';

type LinearGaugeTooltipProps = {
    TooltipInPortal: FC<TooltipInPortalProps>;
    x: number;
    y: number;
    entries: { color: string; title: string; value: string; description?: string }[];
};

export const LinearGaugeTooltip = ({ TooltipInPortal, x, y, entries }: LinearGaugeTooltipProps) => {
    return (
        <TooltipInPortal
            left={x}
            top={y}
            offsetLeft={TOOLTIP_OFFSET}
            offsetTop={TOOLTIP_OFFSET}
            applyPositionStyle
            unstyled
        >
            <TooltipContent entries={entries} />
        </TooltipInPortal>
    );
};
