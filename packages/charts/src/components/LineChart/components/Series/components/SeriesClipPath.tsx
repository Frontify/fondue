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
    const [xStart = 0, xEnd = 0] = (xScale?.range() ?? []).map(Number);
    const [yBottom = 0, yTop = 0] = (yScale?.range() ?? []).map(Number);
    const y0 = Number(yScale?.(0) ?? 0);

    // clamp to 0: scales are degenerate on the first, unmeasured render
    const rectWidth = Math.max(0, xEnd - xStart);
    const rectHeight = Math.max(0, yBottom - yTop);

    return (
        <defs>
            <clipPath id={POSITIVE_CLIP_PATH_ID}>
                <rect
                    x={xStart}
                    y={yTop}
                    width={rectWidth}
                    height={highlightNegativeValues ? Math.max(0, y0 - yTop) : rectHeight}
                />
            </clipPath>
            <clipPath id={NEGATIVE_CLIP_PATH_ID}>
                <rect
                    x={xStart}
                    y={y0}
                    width={rectWidth}
                    height={highlightNegativeValues ? Math.max(0, yBottom - y0) : 0}
                />
            </clipPath>
        </defs>
    );
};
