/* (c) Copyright Frontify Ltd., all rights reserved. */

import { GridRows as CustomGridRows } from '@visx/grid';
import { DataContext } from '@visx/xychart';
import { useContext } from 'react';

export const GridRows = ({ tickValues }: { tickValues: number[] }) => {
    const { yScale, innerWidth, margin } = useContext(DataContext);

    if (!yScale) {
        return null;
    }

    return (
        <CustomGridRows
            left={margin?.left || 0}
            width={innerWidth || 0}
            scale={yScale}
            numTicks={5}
            tickValues={tickValues}
        />
    );
};
