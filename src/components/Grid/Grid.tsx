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

const spacingMap = {
    0: '0',
    1: 'px',
    4: '1',
    8: '2',
    12: '3',
    16: '4',
    20: '5',
    24: '6',
    28: '7',
    32: '8',
    36: '9',
    40: '10',
    44: '11',
    48: '12',
    52: '13',
    56: '14',
    60: '15',
    64: '16',
    68: '17',
    72: '18',
    76: '19',
    80: '20',
    84: '21',
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
    const spacingYClassName = spacingMap[spacingY] ? `tw-gap-y-${spacingMap[spacingY]}` : `tw-gap-y-${spacingMap[4]}`;
    const spacingXClassName = spacingMap[spacingX] ? `tw-gap-x-${spacingMap[spacingX]}` : `tw-gap-x-${spacingMap[4]}`;
    let childrenLength = 0;

    React.Children.map(children, (child) => {
        childrenLength++;
        return child;
    });

    return (
        <Box
            data-test-id={dataTestId}
            className={merge(['tw-grid', bg, color, spacingXClassName, spacingYClassName])}
            style={{
                margin,
                padding,
                width,
                gridTemplateColumns: `repeat(${column}, ${(1 / column) * 100}%)`,
                gridTemplateRows: `repeat(${Math.ceil(childrenLength / column)}, ${rowHeight})`,
            }}
            as={ContainerElement}
        >
            {children}
        </Box>
    );
};

Grid.displayName = 'FondueGrid';
