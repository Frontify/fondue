/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type TooltipInPortalProps } from '@visx/tooltip/lib/hooks/useTooltipInPortal';
import { type FC } from 'react';

import { TOOLTIP_OFFSET } from '@components/Treemap/components/TreemapTooltip/constants';
import { TooltipContent } from '@components/common/components';

type LinearGaugeTooltipProps = {
    TooltipInPortal: FC<TooltipInPortalProps>;
    x: number;
    y: number;
    entries: { color: string; title: string; value: string }[];
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
