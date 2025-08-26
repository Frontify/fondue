/* (c) Copyright Frontify Ltd., all rights reserved. */

import { GlyphDot } from '@visx/glyph';
import { useTooltipInPortal } from '@visx/tooltip';
import { TooltipContext, type TooltipContextType } from '@visx/xychart';
import { type CSSProperties, useContext } from 'react';

import { type BarChartDataPoint } from '@components/BarChart';
import { type LineChartDataPoint } from '@components/LineChart';
import { Crosshair } from '@components/common/components/Tooltip/Crosshair';
import { MISSING_VALUE_LABEL } from '@components/common/components/consts';
import { type LabelFormatter, type ValueFormatter } from '@components/common/types';

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

/** fontSize + lineHeight from default styles break precise location of crosshair, etc. */
const TOOLTIP_NO_STYLE: CSSProperties = {
    position: 'absolute',
    pointerEvents: 'none',
    fontSize: 0,
    lineHeight: 0,
};

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

    return (
        <svg ref={containerRef} style={INVISIBLE_STYLES} key={wrapperKey}>
            {tooltipContext?.tooltipOpen && tooltipContext?.tooltipData && (
                <>
                    <Crosshair
                        horizontal={horizontal}
                        TooltipInPortal={TooltipInPortal}
                        style={crossHairStyle}
                        scalePadding={scalePadding}
                        tooltipPosition={tooltipPosition}
                    />
                    {glyphProps.length > 0 &&
                        glyphProps.map((glyphProps) => (
                            <TooltipInPortal
                                key={`${glyphProps.key}-tooltip-glyph`}
                                left={glyphProps.x}
                                top={glyphProps.y}
                                offsetLeft={0}
                                offsetTop={0}
                                detectBounds={false}
                                style={TOOLTIP_NO_STYLE}
                            >
                                <svg overflow="visible">
                                    {!isNoDataKey(glyphProps.key) && (
                                        <GlyphDot
                                            stroke={colorAccessor(glyphProps.key)}
                                            fill={colorAccessor(glyphProps.key)}
                                            r={3}
                                        />
                                    )}
                                </svg>
                            </TooltipInPortal>
                        ))}
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
                </>
            )}
        </svg>
    );
};
