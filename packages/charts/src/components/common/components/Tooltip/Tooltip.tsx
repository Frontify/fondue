/* (c) Copyright Frontify Ltd., all rights reserved. */

import { GlyphDot } from '@visx/glyph';
import { useTooltipInPortal } from '@visx/tooltip';
import { DataContext, TooltipContext, type TooltipContextType } from '@visx/xychart';
import { type CSSProperties, useContext } from 'react';

import { type BarChartDataPoint } from '@components/BarChart';
import { type LineChartDataPoint } from '@components/LineChart';
import { MISSING_VALUE_LABEL } from '@components/common/components/consts';
import { type LabelFormatter, type ValueFormatter } from '@components/common/types';

import { Crosshair } from './Crosshair';
import { TooltipContent } from './TooltipContent';
import { getHeadingFromDatum, getTooltipEntries, isNoDataKey } from './helpers';
import { useKeyToForceRepaint, usePositions } from './hooks/';

const INVISIBLE_STYLES: CSSProperties = {
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0,
    width: 0,
    height: 0,
    pointerEvents: 'none',
};

const GLYPH_RADIUS = 3;

export type TooltipCrossHairStyle = 'line' | 'bar';

type TooltipPropsBase = {
    colorAccessor?: (key: string) => string | undefined;
    missingValueLabel?: string;
    childSumLabel?: string;
    valueFormatter?: ValueFormatter;
    labelFormatter?: LabelFormatter;
    locale?: string;
};

type TooltipBarProps = {
    crossHairStyle: Extract<TooltipCrossHairStyle, 'bar'>;
    hideGlyphs: true;
    scalePadding: number;
    horizontal: boolean;
    stackingGlyphs?: false;
} & TooltipPropsBase;

type TooltipLineProps = {
    crossHairStyle: Extract<TooltipCrossHairStyle, 'line'>;
    hideGlyphs?: false;
    horizontal?: undefined;
    scalePadding?: undefined;
    stackingGlyphs?: boolean;
} & TooltipPropsBase;

type TooltipProps = TooltipBarProps | TooltipLineProps;

export const Tooltip = ({
    crossHairStyle,
    horizontal = false,
    hideGlyphs = false,
    missingValueLabel = MISSING_VALUE_LABEL,
    childSumLabel,
    scalePadding = 0,
    colorAccessor = () => '',
    valueFormatter,
    labelFormatter,
    locale,
    stackingGlyphs = false,
}: TooltipProps) => {
    const tooltipContext = useContext(TooltipContext) as TooltipContextType<LineChartDataPoint | BarChartDataPoint>;
    const { containerRef, TooltipInPortal } = useTooltipInPortal({
        scroll: true,
    });
    const { glyphProps, tooltipPosition } = usePositions(hideGlyphs, horizontal, stackingGlyphs);
    const wrapperKey = useKeyToForceRepaint();

    const { tooltipLeft, tooltipTop } = tooltipPosition;

    const entries = getTooltipEntries(
        missingValueLabel,
        colorAccessor,
        valueFormatter,
        tooltipContext.tooltipData?.datumByKey,
        childSumLabel,
    );
    const shouldReverseEntries = stackingGlyphs;
    const sortedEntries = shouldReverseEntries ? [...entries].reverse() : entries;
    const imageUrl = (tooltipContext.tooltipData?.nearestDatum?.datum as BarChartDataPoint)?.imageUrl;

    const { innerHeight, innerWidth, margin } = useContext(DataContext) || {};

    return (
        <>
            <svg ref={containerRef} style={INVISIBLE_STYLES} key={wrapperKey} />

            {tooltipContext?.tooltipOpen && tooltipContext?.tooltipData && (
                <svg
                    width="100%"
                    height="100%"
                    style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
                >
                    <defs>
                        <clipPath id="chart-clip">
                            <rect
                                // adjust the clip to glyphs on the edges
                                x={margin?.left ? margin.left - GLYPH_RADIUS : 0}
                                y={margin?.top ? margin?.top - GLYPH_RADIUS : 0}
                                width={innerWidth ? innerWidth + GLYPH_RADIUS * 2 : '100%'}
                                height={innerHeight ? innerHeight + GLYPH_RADIUS * 2 : '100%'}
                            />
                        </clipPath>
                    </defs>

                    <g clipPath="url(#chart-clip)">
                        <Crosshair
                            horizontal={horizontal}
                            style={crossHairStyle}
                            scalePadding={scalePadding}
                            tooltipPosition={tooltipPosition}
                        />
                        {glyphProps.map((glyph) =>
                            !isNoDataKey(glyph.key) ? (
                                <GlyphDot
                                    key={glyph.key}
                                    cx={glyph.x}
                                    cy={glyph.y}
                                    r={GLYPH_RADIUS}
                                    fill={colorAccessor(glyph.key)}
                                    stroke={colorAccessor(glyph.key)}
                                />
                            ) : null,
                        )}
                    </g>
                </svg>
            )}

            {tooltipContext?.tooltipOpen && tooltipContext?.tooltipData && (
                <TooltipInPortal left={tooltipLeft} top={tooltipTop} applyPositionStyle unstyled>
                    <TooltipContent
                        title={getHeadingFromDatum(
                            tooltipContext.tooltipData.nearestDatum?.datum,
                            locale,
                            labelFormatter,
                        )}
                        description={tooltipContext.tooltipData.nearestDatum?.datum?.description}
                        imageUrl={imageUrl}
                        entries={sortedEntries}
                    />
                </TooltipInPortal>
            )}
        </>
    );
};
