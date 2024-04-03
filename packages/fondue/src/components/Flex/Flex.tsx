/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

import { Box } from '@components/Box';
import { type DimensionUnity, GAP_DIRECTIONS, GetGapClassName, type SpacingValue } from '@utilities/dimensions';
import { merge } from '@utilities/merge';

import { type ContainerHTMLElement } from '../../types/elements';

export type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';
export type FlexJustify = 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
export type FlexAlignItems = 'start' | 'end' | 'center' | 'baseline' | 'stretch';
export type FlexAlignContent =
    | 'start'
    | 'end'
    | 'center'
    | 'between'
    | 'around'
    | 'evenly'
    | 'baseline'
    | 'stretch'
    | 'normal';

export type FlexProps = {
    direction?: FlexDirection;
    wrap?: FlexWrap;
    spacing?: SpacingValue;
    spacingX?: SpacingValue;
    spacingY?: SpacingValue;
    justify?: FlexJustify;
    alignItems?: FlexAlignItems;
    alignContent?: FlexAlignContent;
    'data-test-id'?: string;
    children?: ReactNode | ReactNode[];
    bg?: string;
    color?: string;
    as?: ContainerHTMLElement;
    padding?: SpacingValue;
    paddingX?: SpacingValue;
    paddingY?: SpacingValue;
    margin?: SpacingValue;
    marginX?: SpacingValue;
    marginY?: SpacingValue;
    minWidth?: `${number}${DimensionUnity}`;
    maxWidth?: `${number}${DimensionUnity}`;
    minHeight?: `${number}${DimensionUnity}`;
    maxHeight?: `${number}${DimensionUnity}`;
};

const directionMapping = {
    row: 'tw-flex-row',
    column: 'tw-flex-col',
    'row-reverse': 'tw-flex-row-reverse',
    'column-reverse': 'tw-flex-col-reverse',
};

const wrapMapping = {
    nowrap: 'tw-flex-nowrap',
    wrap: 'tw-flex-wrap',
    'wrap-reverse': 'tw-flex-wrap-reverse',
};

const justifyMapping = {
    start: 'tw-justify-start',
    end: 'tw-justify-end',
    center: 'tw-justify-center',
    between: 'tw-justify-between',
    around: 'tw-justify-around',
    evenly: 'tw-justify-evenly',
};

const alignItemsMapping = {
    start: 'tw-items-start',
    end: 'tw-items-end',
    center: 'tw-items-center',
    baseline: 'tw-items-baseline',
    stretch: 'tw-items-stretch',
};

const alignContentMapping = {
    start: 'tw-content-start',
    end: 'tw-content-end',
    center: 'tw-content-center',
    normal: 'tw-content-normal',
    between: 'tw-content-between',
    around: 'tw-content-around',
    evenly: 'tw-content-evenly',
    baseline: 'tw-content-baseline',
    stretch: 'tw-content-stretch',
};

export const Flex = ({
    direction = 'row',
    wrap = 'nowrap',
    justify = 'center',
    alignItems = 'center',
    alignContent = 'center',
    'data-test-id': dataTestId = 'fondue-flex',
    children,
    bg,
    color,
    as: ContainerElement = 'div',
    margin,
    marginX,
    marginY,
    padding,
    paddingX,
    paddingY,
    minWidth,
    maxWidth,
    maxHeight,
    minHeight,
    spacing = 4,
    spacingX,
    spacingY,
}: FlexProps) => {
    return (
        <Box
            data-test-id={dataTestId}
            className={merge([
                'tw-flex',
                GetGapClassName(GAP_DIRECTIONS.GAP, spacing),
                GetGapClassName(GAP_DIRECTIONS.GAP_X, spacingX),
                GetGapClassName(GAP_DIRECTIONS.GAP_Y, spacingY),
                directionMapping[direction],
                wrapMapping[wrap],
                justifyMapping[justify],
                alignItemsMapping[alignItems],
                alignContentMapping[alignContent],
                bg,
                color,
            ])}
            style={{
                maxWidth,
                minWidth,
                maxHeight,
                minHeight,
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
Flex.displayName = 'FondueFlex';
