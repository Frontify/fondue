/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PieArcDatum } from 'd3-shape';
import { useState } from 'react';

import { type PieChartDatum } from '@components/PieChart';
import { colorAccessorByIndex, hoverColorAccessorByIndex } from '@components/common/helpers';

const STROKE = 'var(--fc-base-color)';
const STROKE_WIDTH = '2px';

/** The arc generator visx passes. d3-shape 3.2's `Arc<void>` is not that value. */
export type PieArcPath = {
    (datum: PieArcDatum<PieChartDatum>): string | null;
    centroid(datum: PieArcDatum<PieChartDatum>): [number, number];
};

type ArcsProps = {
    arcDatum: PieArcDatum<PieChartDatum>;
    path: PieArcPath;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
};

export const ArcPath = ({ arcDatum, path, onMouseEnter, onMouseLeave }: ArcsProps) => {
    const standardColor = colorAccessorByIndex(arcDatum.index);
    const hoverColor = hoverColorAccessorByIndex(arcDatum.index);
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
