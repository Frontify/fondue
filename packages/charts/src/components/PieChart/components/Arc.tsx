/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PieArcDatum } from '@visx/shape/lib/shapes/Pie';
import { type Arc as ArcType } from 'd3-shape';
import { type Dispatch, Fragment, type SetStateAction, useState } from 'react';

import { type ColorScale, type Padding, type PieChartDatum } from '@components/PieChart';
import { ArcPath } from '@components/PieChart/components/ArcPath';
import { Label } from '@components/PieChart/components/Label';
import { resizeArcIfZero } from '@components/PieChart/helpers/resizeArcIfZero';
import { type ValueFormatter } from '@components/common/types';

type ArcProps = {
    arc: PieArcDatum<PieChartDatum>;
    previousArc?: PieArcDatum<PieChartDatum>;
    path: ArcType<void, PieArcDatum<PieChartDatum>>;
    numberOfArcs: number;
    radius: number;
    isLabelHidden: boolean;
    showLabelTitle: boolean;
    showLabelValue: boolean;
    showLabelPercentage: boolean;
    setPaddingForLabels: Dispatch<SetStateAction<Padding>>;
    colorScale: ColorScale;
    valueFormatter?: ValueFormatter;
};

export const Arc = ({
    arc,
    previousArc,
    numberOfArcs,
    radius,
    isLabelHidden,
    showLabelValue,
    showLabelPercentage,
    showLabelTitle,
    path,
    setPaddingForLabels,
    colorScale,
    valueFormatter,
}: ArcProps) => {
    const showLabelsOnHover = numberOfArcs > 3;
    const [isArcHovered, setIsArcHovered] = useState(false);
    const hideLabel = isLabelHidden || (showLabelsOnHover && !isArcHovered);

    const nonZeroArc = resizeArcIfZero(arc, numberOfArcs);

    const centroidAngle = (nonZeroArc.startAngle + nonZeroArc.endAngle) / 2;
    const prevCentroidAngle = previousArc ? (previousArc.startAngle + previousArc.endAngle) / 2 : 0;
    const centroid = path.centroid(nonZeroArc);

    return (
        <Fragment key={`fondue-charts-pie-arc-${arc.index}`}>
            <ArcPath
                arcDatum={nonZeroArc}
                path={path}
                colorScale={colorScale}
                onMouseEnter={() => setIsArcHovered(true)}
                onMouseLeave={() => setIsArcHovered(false)}
            />
            <Label
                centroid={centroid}
                centroidAngle={centroidAngle}
                prevCentroidAngle={prevCentroidAngle}
                arcDatum={nonZeroArc}
                radius={radius}
                showLabelTitle={showLabelTitle}
                showLabelValue={showLabelValue}
                showLabelPercentage={showLabelPercentage}
                setPadding={setPaddingForLabels}
                valueFormatter={valueFormatter}
                labelsShownOnHover={showLabelsOnHover}
                hideLabel={hideLabel}
                colorScale={colorScale}
            />
        </Fragment>
    );
};
