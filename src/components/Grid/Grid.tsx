/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { useEffect } from 'react';
import { merge } from '@utilities/merge';
import {
    DimensionUnities,
    MARGIN_VALUES_MAP,
    PADDING_VALUES_MAP,
    SPACING_VALUES,
    SpacingValues,
} from '@utilities/dimensions';
import { BOX_ALIAS_TOKENS_PREFIX } from '@utilities/tokens';

export type GridSpacingX = 0 | 4 | 8 | 12 | 16 | 20 | 24 | 28 | 32 | 36 | 40;
export type GridSpacingY = 0 | 4 | 8 | 12 | 16 | 20 | 24 | 28 | 32 | 36 | 40;

export type GridProps = {
    column?: number;
    spacingX?: GridSpacingX;
    spacingY?: GridSpacingY;
    children?: React.ReactNode;
    minWidth?: `${number}${DimensionUnities}`;
    maxWidth?: `${number}${DimensionUnities}`;
    minHeight?: `${number}${DimensionUnities}`;
    maxHeight?: `${number}${DimensionUnities}`;
    padding?: SpacingValues;
    margin?: SpacingValues;
    boxColorToken?: string;
    'data-test-id'?: string;
};

export const CONTAINER_TEST_ID = 'fondue-grid';

export const Grid = ({
    column = 2,
    spacingX = 4,
    spacingY = 4,
    children,
    'data-test-id': dataTestId = CONTAINER_TEST_ID,
    minWidth,
    maxWidth,
    maxHeight,
    minHeight,
    boxColorToken,
    margin = 0,
    padding = 0,
}: GridProps) => {
    const acceptableSpacingXInput: GridSpacingX[] = [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40];
    const acceptableSpacingYInput: GridSpacingY[] = [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40];

    const paddingClassName = SPACING_VALUES.includes(padding) ? PADDING_VALUES_MAP[padding] : PADDING_VALUES_MAP[0];
    const marginClassName = SPACING_VALUES.includes(padding) ? MARGIN_VALUES_MAP[margin] : MARGIN_VALUES_MAP[0];

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

    const colorClasses = !boxColorToken ? '' : `tw-bg-${boxColorToken} tw-text-${boxColorToken}-inverse`;

    useEffect(() => {
        if (!boxColorToken) {
            return;
        }

        if (!BOX_ALIAS_TOKENS_PREFIX.includes(boxColorToken)) {
            throw new Error(
                `boxColorToken should be one of the following values \n${BOX_ALIAS_TOKENS_PREFIX.join('\n')}`,
            );
        }
    }, [boxColorToken]);

    return (
        <div
            data-test-id={dataTestId}
            className={merge([
                'tw-flex',
                gridSpacingXClass,
                gridSpacingYClass,
                paddingClassName,
                marginClassName,
                colorClasses,
            ])}
            style={{
                flexBasis: `${(1 / column) * 100}`,
                maxWidth,
                minWidth,
                maxHeight,
                minHeight,
            }}
        >
            {children}
        </div>
    );
};

Grid.displayName = 'FondueGrid';
