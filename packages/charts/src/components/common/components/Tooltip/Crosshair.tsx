/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type TooltipInPortalProps } from '@visx/tooltip/lib/hooks/useTooltipInPortal';
import { DataContext } from '@visx/xychart';
import { type CSSProperties, type FC, useContext } from 'react';

import { getCrosshairBarWidth } from '@components/common/components/Tooltip/helpers';

import { type TooltipCrossHairStyle } from './Tooltip';

/** fontSize + lineHeight from default styles break precise location of crosshair, etc. */
const TOOLTIP_NO_STYLE: CSSProperties = {
    position: 'absolute',
    pointerEvents: 'none',
    fontSize: 0,
    lineHeight: 0,
};

type CrosshairProps = {
    style: TooltipCrossHairStyle;
    horizontal: boolean;
    scalePadding: number;
    TooltipInPortal: FC<TooltipInPortalProps>;
    tooltipPosition: { tooltipLeft?: number; tooltipTop?: number };
};
export const Crosshair = ({ horizontal, TooltipInPortal, style, scalePadding, tooltipPosition }: CrosshairProps) => {
    const { innerHeight, innerWidth, margin, xScale, yScale } = useContext(DataContext) || {};

    const lineStyle = {
        strokeWidth: style === 'bar' ? getCrosshairBarWidth(horizontal, scalePadding, xScale, yScale) : 1,
        stroke:
            style === 'bar'
                ? 'var(--fc-tooltip-crosshair-stroke-color-weak)'
                : 'var(--fc-tooltip-crosshair-stroke-color)',
    };

    const { tooltipLeft, tooltipTop } = tooltipPosition;

    return (
        <>
            {!horizontal && (
                <TooltipInPortal
                    left={style === 'bar' && tooltipLeft ? tooltipLeft - lineStyle.strokeWidth / 2 : tooltipLeft}
                    top={margin?.top}
                    offsetLeft={0}
                    offsetTop={0}
                    detectBounds={false}
                    style={TOOLTIP_NO_STYLE}
                >
                    <svg width={lineStyle.strokeWidth} height={innerHeight} overflow="hidden">
                        <line
                            x1={style === 'bar' ? lineStyle.strokeWidth / 2 : 0}
                            x2={style === 'bar' ? lineStyle.strokeWidth / 2 : 0}
                            y1={0}
                            y2={innerHeight}
                            strokeWidth={lineStyle.strokeWidth}
                            stroke={lineStyle.stroke}
                        />
                    </svg>
                </TooltipInPortal>
            )}
            {horizontal && (
                <TooltipInPortal
                    left={margin?.left}
                    top={style === 'bar' && tooltipTop ? tooltipTop - lineStyle.strokeWidth / 2 : tooltipTop}
                    offsetLeft={0}
                    offsetTop={0}
                    detectBounds={false}
                    style={TOOLTIP_NO_STYLE}
                >
                    <svg width={innerWidth} height={lineStyle.strokeWidth} overflow="hidden">
                        <line
                            x1={0}
                            x2={innerWidth}
                            y1={style === 'bar' ? lineStyle.strokeWidth / 2 : 0}
                            y2={style === 'bar' ? lineStyle.strokeWidth / 2 : 0}
                            strokeWidth={lineStyle.strokeWidth}
                            stroke={lineStyle.stroke}
                        />
                    </svg>
                </TooltipInPortal>
            )}
        </>
    );
};
