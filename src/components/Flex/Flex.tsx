/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactNode } from 'react';
import { merge } from '@utilities/merge';
import { ContainerHTMLElement } from 'src/types/elements';
import { Box } from '@components/Box';
import {
    DimensionUnity,
    MARGIN_VALUES_MAP,
    PADDING_VALUES_MAP,
    SPACING_VALUES,
    SpacingValue,
} from '@utilities/dimensions';

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
    justify?: FlexJustify;
    alignItems?: FlexAlignItems;
    alignContent?: FlexAlignContent;
    'data-test-id'?: string;
    children?: ReactNode | ReactNode[];
    bg?: string;
    color?: string;
    as?: ContainerHTMLElement;
    padding?: SpacingValue;
    margin?: SpacingValue;
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
    margin = 0,
    padding = 0,
    minWidth,
    maxWidth,
    maxHeight,
    minHeight,
}: FlexProps) => {
    const paddingClassName = SPACING_VALUES.includes(padding) ? PADDING_VALUES_MAP[padding] : PADDING_VALUES_MAP[0];
    const marginClassName = SPACING_VALUES.includes(padding) ? MARGIN_VALUES_MAP[margin] : MARGIN_VALUES_MAP[0];

    return (
        <Box
            data-test-id={dataTestId}
            className={merge([
                'tw-flex',
                'tw-gap-1',
                directionMapping[direction],
                wrapMapping[wrap],
                justifyMapping[justify],
                alignItemsMapping[alignItems],
                alignContentMapping[alignContent],
                bg,
                color,
                paddingClassName,
                marginClassName,
            ])}
            style={{
                maxWidth,
                minWidth,
                maxHeight,
                minHeight,
            }}
            as={ContainerElement}
        >
            {children}
        </Box>
    );
};
Flex.displayName = 'FondueFlex';
