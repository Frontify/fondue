/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DataContext } from '@visx/xychart';
import { useContext } from 'react';

import { getCrosshairBarWidth } from '@components/common/components/Tooltip/helpers';

import { type TooltipCrossHairStyle } from './Tooltip';

type CrosshairProps = {
    style: TooltipCrossHairStyle;
    horizontal: boolean;
    scalePadding: number;
    tooltipPosition: { tooltipLeft?: number; tooltipTop?: number };
};
export const Crosshair = ({ horizontal, style, scalePadding, tooltipPosition }: CrosshairProps) => {
    const { innerHeight, innerWidth, xScale, yScale } = useContext(DataContext) || {};

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
                <line
                    x1={tooltipLeft}
                    x2={tooltipLeft}
                    y1={0}
                    y2={Number(yScale?.range()[0] ?? innerHeight)}
                    strokeWidth={lineStyle.strokeWidth}
                    stroke={lineStyle.stroke}
                />
            )}
            {horizontal && (
                <line
                    x1={0}
                    x2={Number(xScale?.range()[1] || innerWidth)}
                    y1={tooltipTop}
                    y2={tooltipTop}
                    strokeWidth={lineStyle.strokeWidth}
                    stroke={lineStyle.stroke}
                />
            )}
        </>
    );
};
