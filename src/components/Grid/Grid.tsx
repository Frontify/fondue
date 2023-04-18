/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { DimensionUnity, SpacingValue } from '@utilities/dimensions';
import { ContainerHTMLElement } from 'src/types/elements';
import { merge } from '@utilities/merge';
import { Box } from '../Box/Box';

export type GridProps = {
    column?: number;
    spacingX?: SpacingValue;
    spacingY?: SpacingValue;
    children?: React.ReactNode;
    width?: `${number}${DimensionUnity}`;
    rowHeight?: `${number}${DimensionUnity}`;
    padding?: SpacingValue;
    margin?: SpacingValue;
    bg?: string;
    color?: string;
    'data-test-id'?: string;
    as?: ContainerHTMLElement;
};

export const CONTAINER_TEST_ID = 'fondue-grid';

const spacingXMap = {
    0: 'tw-gap-x-0',
    1: 'tw-gap-x-px',
    4: 'tw-gap-x-1',
    8: 'tw-gap-x-2',
    12: 'tw-gap-x-3',
    16: 'tw-gap-x-4',
    20: 'tw-gap-x-5',
    24: 'tw-gap-x-6',
    28: 'tw-gap-x-7',
    32: 'tw-gap-x-8',
    36: 'tw-gap-x-9',
    40: 'tw-gap-x-10',
    44: 'tw-gap-x-11',
    48: 'tw-gap-x-12',
    52: 'tw-gap-x-13',
    56: 'tw-gap-x-14',
    60: 'tw-gap-x-15',
    64: 'tw-gap-x-16',
    68: 'tw-gap-x-17',
    72: 'tw-gap-x-18',
    76: 'tw-gap-x-19',
    80: 'tw-gap-x-20',
    84: 'tw-gap-x-21',
    88: 'tw-gap-x-22',
    92: 'tw-gap-x-23',
    96: 'tw-gap-x-24',
};

const spacingYMap = {
    0: 'tw-gap-y-0',
    1: 'tw-gap-y-px',
    4: 'tw-gap-y-1',
    8: 'tw-gap-y-2',
    12: 'tw-gap-y-3',
    16: 'tw-gap-y-4',
    20: 'tw-gap-y-5',
    24: 'tw-gap-y-6',
    28: 'tw-gap-y-7',
    32: 'tw-gap-y-8',
    36: 'tw-gap-y-9',
    40: 'tw-gap-y-10',
    44: 'tw-gap-y-11',
    48: 'tw-gap-y-12',
    52: 'tw-gap-y-13',
    56: 'tw-gap-y-14',
    60: 'tw-gap-y-15',
    64: 'tw-gap-y-16',
    68: 'tw-gap-y-17',
    72: 'tw-gap-y-18',
    76: 'tw-gap-y-19',
    80: 'tw-gap-y-20',
    84: 'tw-gap-y-21',
    88: 'tw-gap-y-22',
    92: 'tw-gap-y-23',
    96: 'tw-gap-y-24',
};

export const Grid = ({
    column = 2,
    spacingX = 4,
    spacingY = 4,
    children,
    'data-test-id': dataTestId = CONTAINER_TEST_ID,
    width = '100%',
    rowHeight,
    bg,
    color,
    margin = 0,
    padding = 0,
    as: ContainerElement = 'div',
}: GridProps) => {
    const spacingYClassName = spacingYMap[spacingY] ? spacingYMap[spacingY] : spacingYMap[4];
    const spacingXClassName = spacingXMap[spacingX] ? spacingXMap[spacingX] : spacingXMap[4];
    let childrenLength = 0;

    React.Children.map(children, (child) => {
        childrenLength++;
        return child;
    });

    return (
        <Box
            data-test-id={dataTestId}
            className={merge([bg, color])}
            style={{
                margin,
                padding,
                width,
            }}
            as={ContainerElement}
        >
            <div
                data-test-id="fondue-grid-inner-wrapper"
                className={merge(['tw-w-full tw-h-full tw-grid', spacingXClassName, spacingYClassName])}
                style={{
                    gridTemplateColumns: `repeat(${column}, ${(1 / column) * 100}%)`,
                    gridTemplateRows: `repeat(${Math.ceil(childrenLength / column)}, ${rowHeight})`,
                }}
            >
                {children}
            </div>
        </Box>
    );
};

Grid.displayName = 'FondueGrid';
