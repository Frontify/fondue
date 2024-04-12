/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PieArcDatum } from '@visx/shape/lib/shapes/Pie';
import { type Arc } from 'd3-shape';
import { useState } from 'react';

import { type ColorScale, type PieChartDatum } from '@components/PieChart';
import { gradientColorAccessorByIndex, hoverGradientColorAccessorByIndex } from '@components/PieChart/helpers';
import { colorAccessorByIndex, hoverColorAccessorByIndex } from '@components/common/helpers';

const STROKE = 'var(--fc-base-color)';
const STROKE_WIDTH = '2px';

type ArcsProps = {
    arcDatum: PieArcDatum<PieChartDatum>;
    path: Arc<void, PieArcDatum<PieChartDatum>>;
    colorScale: ColorScale;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
};

export const ArcPath = ({ arcDatum, path, colorScale, onMouseEnter, onMouseLeave }: ArcsProps) => {
    const useGradientColors = colorScale === 'continuous';
    const standardColor = useGradientColors
        ? gradientColorAccessorByIndex(arcDatum.index)
        : colorAccessorByIndex(arcDatum.index);
    const hoverColor = useGradientColors
        ? hoverGradientColorAccessorByIndex(arcDatum.index)
        : hoverColorAccessorByIndex(arcDatum.index);
    const [fill, setFill] = useState(standardColor);

    const onArcMouseEnter = () => {
        setFill(hoverColor);
        onMouseEnter();
    };

    const onArcMouseLeave = () => {
        setFill(standardColor);
        onMouseLeave();
    };

    return (
        <path
            d={path(arcDatum) || ''}
            fill={fill}
            stroke={STROKE}
            strokeWidth={STROKE_WIDTH}
            onMouseEnter={onArcMouseEnter}
            onMouseLeave={onArcMouseLeave}
            tabIndex={0}
            aria-label={`${arcDatum.data.label} ${arcDatum.data.value}`}
        />
    );
};
