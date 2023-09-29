/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Children, ReactNode } from 'react';
import {
    DimensionUnity,
    GAP_DIRECTIONS,
    GetGapClassName,
    GetMarginClassNames,
    GetPaddingClassNames,
    SpacingValue,
} from '@utilities/dimensions';
import { ContainerHTMLElement } from 'src/types/elements';
import { merge } from '@utilities/merge';
import { Box } from '@components/Box';

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
    spacing = 0,
    spacingX = 4,
    spacingY = 4,
    children,
    'data-test-id': dataTestId = GRID_TEST_ID,
    width = '100%',
    rowHeight = 'auto',
    bg,
    color,
    margin = 0,
    marginX = 0,
    marginY = 0,
    padding = 0,
    paddingX = 0,
    paddingY = 0,
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
                GetPaddingClassNames(padding, paddingX, paddingY),
                GetMarginClassNames(margin, marginX, marginY),
                GetGapClassName(spacingX, GAP_DIRECTIONS.GAP_X),
                GetGapClassName(spacingY, GAP_DIRECTIONS.GAP_Y),
                GetGapClassName(spacing, GAP_DIRECTIONS.GAP),
            ])}
            style={{
                width,
                gridTemplateColumns: `repeat(${column}, 1fr)`,
                gridTemplateRows: `repeat(${Math.ceil(childrenLength / column)}, ${rowHeight})`,
            }}
            as={ContainerElement}
        >
            {children}
        </Box>
    );
};

Grid.displayName = 'FondueGrid';
