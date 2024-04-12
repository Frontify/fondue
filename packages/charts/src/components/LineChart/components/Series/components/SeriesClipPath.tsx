/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DataContext } from '@visx/xychart';
import { useContext } from 'react';

export const POSITIVE_CLIP_PATH_ID = 'positive';
export const NEGATIVE_CLIP_PATH_ID = 'negative';

type SeriesClipPathProps = {
    highlightNegativeValues: boolean;
};

export const SeriesClipPath = ({ highlightNegativeValues }: SeriesClipPathProps) => {
    const dataContext = useContext(DataContext);
    const { xScale, yScale } = dataContext;
    const xScaleRange = [Number(xScale?.range()[0] ?? 0), Number(xScale?.range()[1] ?? 0)];
    const yScaleRange = [Number(yScale?.range()[0] ?? 0), Number(yScale?.range()[1] ?? 0)];
    const y0 = Number(yScale?.(0) ?? 0);

    // @ts-expect-error Wrong typing in the original code
    const rectWidth = xScaleRange[1] - xScaleRange[0];
    // @ts-expect-error Wrong typing in the original code
    const rectHeight = yScaleRange[0] - yScaleRange[1];

    return (
        <defs>
            <clipPath id={POSITIVE_CLIP_PATH_ID}>
                <rect
                    x={xScaleRange[0]}
                    y={yScaleRange[1]}
                    width={rectWidth}
                    // @ts-expect-error Wrong typing in the original code
                    height={highlightNegativeValues ? y0 - yScaleRange[1] : rectHeight}
                />
            </clipPath>
            <clipPath id={NEGATIVE_CLIP_PATH_ID}>
                <rect
                    x={xScaleRange[0]}
                    y={y0}
                    width={rectWidth}
                    // @ts-expect-error Wrong typing in the original code
                    height={highlightNegativeValues ? yScaleRange[0] - y0 : 0}
                />
            </clipPath>
        </defs>
    );
};
