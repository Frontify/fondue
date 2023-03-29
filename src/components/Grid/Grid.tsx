/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC, MouseEvent, useMemo } from 'react';
import { merge } from '@utilities/merge';
import { useFocusRing } from '@react-aria/focus';
import { FOCUS_STYLE } from '@utilities/focusStyle';
import { useMemoizedId } from '@hooks/useMemoizedId';
import { InputLabel, InputLabelTooltipProps } from '@components/InputLabel/InputLabel';

export type GridSpacingX = 0 | 4 | 8 | 12 | 16 | 20 | 24 | 28 | 32 | 36 | 40;
export type GridSpacingY = 0 | 4 | 8 | 12 | 16 | 20 | 24 | 28 | 32 | 36 | 40;

export type GridProps = {
    column?: number;
    spacingX?: GridSpacingX;
    spacingY?: GridSpacingY;
};

export const Grid = ({ column = 2, spacingX = 0, spacingY = 0 }: GridProps) => {
    const columnMapping = {
        1: 'tw-basis',
        2: 'tw-basis-1/2',
        3: 'tw-basis-1/3',
        4: 'tw-basis-1/4',
        5: 'tw-basis-1/5',
        6: 'tw-basis-1/6',
    };


    return (
        <div className={
            merge([columnMapping[column], ])
        }
    );
};
Grid.displayName = 'FondueGrid';
