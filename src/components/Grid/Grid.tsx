/* (c) Copyright Frontify Ltd., all rights reserved. */

import { merge } from '@utilities/merge';
import React from 'react';

export type GridSpacingX = 0 | 4 | 8 | 12 | 16 | 20 | 24 | 28 | 32 | 36 | 40;
export type GridSpacingY = 0 | 4 | 8 | 12 | 16 | 20 | 24 | 28 | 32 | 36 | 40;

export type GridProps = {
    column?: number;
    spacingX?: GridSpacingX;
    spacingY?: GridSpacingY;
    children?: React.ReactNode;
};

export const Grid = ({ column = 2, spacingX = 4, spacingY = 4, children }: GridProps) => {
    const acceptableSpacingXInput: GridSpacingX[] = [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40];
    const acceptableSpacingYInput: GridSpacingY[] = [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40];

    const gridSpacingXMappings = {
        0: 'tw-gap-0',
        4: 'tw-gap-1',
        8: 'tw-gap-2',
        12: 'tw-gap-3',
        16: 'tw-gap-4',
        20: 'tw-gap-5',
        24: 'tw-gap-6',
        28: 'tw-gap-7',
        32: 'tw-gap-8',
        36: 'tw-gap-9',
        40: 'tw-gap-10',
    };

    const gridSpacingYMappings = {
        0: 'tw-gap-0',
        4: 'tw-gap-1',
        8: 'tw-gap-2',
        12: 'tw-gap-3',
        16: 'tw-gap-4',
        20: 'tw-gap-5',
        24: 'tw-gap-6',
        28: 'tw-gap-7',
        32: 'tw-gap-8',
        36: 'tw-gap-9',
        40: 'tw-gap-10',
    };

    const gridSpacingXClass = acceptableSpacingXInput.includes(spacingX)
        ? gridSpacingXMappings[spacingX]
        : gridSpacingXMappings[4];
    const gridSpacingYClass = acceptableSpacingYInput.includes(spacingX)
        ? gridSpacingYMappings[spacingY]
        : gridSpacingYMappings[4];

    return (
        <div
            className={merge(['tw-flex', gridSpacingXClass, gridSpacingYClass])}
            style={{
                flexBasis: `${(1 / column) * 100}`,
            }}
        >
            {children}
        </div>
    );
};

Grid.displayName = 'FondueGrid';
