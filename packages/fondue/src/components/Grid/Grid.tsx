/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Children, type ReactNode } from 'react';

import { Box } from '@components/Box';
import { type DimensionUnity, GAP_DIRECTIONS, GetGapClassName, type SpacingValue } from '@utilities/dimensions';
import { merge } from '@utilities/merge';

import { type ContainerHTMLElement } from '../../types/elements';

export type GridProps = {
    column?: number;
    spacing?: SpacingValue;
    spacingX?: SpacingValue;
    spacingY?: SpacingValue;
    children?: ReactNode;
    width?: `${number}${DimensionUnity}`;
    rowHeight?: `${number}${DimensionUnity}` | 'auto';
    padding?: SpacingValue;
    paddingX?: SpacingValue;
    paddingY?: SpacingValue;
    margin?: SpacingValue;
    marginX?: SpacingValue;
    marginY?: SpacingValue;
    bg?: string;
    color?: string;
    'data-test-id'?: string;
    as?: ContainerHTMLElement;
};

export const GRID_TEST_ID = 'fondue-grid';

export const Grid = ({
    column = 2,
    spacing = 4,
    spacingX,
    spacingY,
    children,
    'data-test-id': dataTestId = GRID_TEST_ID,
    width = '100%',
    rowHeight = 'auto',
    bg,
    color,
    margin,
    marginX,
    marginY,
    padding,
    paddingX,
    paddingY,
    as: ContainerElement = 'div',
}: GridProps) => {
    let childrenLength = 0;

    Children.map(children, (child) => {
        childrenLength++;
        return child;
    });

    return (
        <Box
            data-test-id={dataTestId}
            className={merge([
                'tw-grid',
                bg,
                color,
                GetGapClassName(GAP_DIRECTIONS.GAP, spacing),
                GetGapClassName(GAP_DIRECTIONS.GAP_X, spacingX),
                GetGapClassName(GAP_DIRECTIONS.GAP_Y, spacingY),
            ])}
            style={{
                width,
                gridTemplateColumns: `repeat(${column}, 1fr)`,
                gridTemplateRows: `repeat(${Math.ceil(childrenLength / column)}, ${rowHeight})`,
            }}
            margin={margin}
            marginX={marginX}
            marginY={marginY}
            padding={padding}
            paddingX={paddingX}
            paddingY={paddingY}
            as={ContainerElement}
        >
            {children}
        </Box>
    );
};

Grid.displayName = 'FondueGrid';
