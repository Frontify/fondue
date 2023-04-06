/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactElement } from 'react';
import { merge } from '@utilities/merge';

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
    boxColorToken?: string;
    'data-test-id'?: string;
    children?: ReactElement;
};

export const Flex = ({
    direction = 'row',
    wrap = 'nowrap',
    justify = 'center',
    alignItems = 'center',
    alignContent = 'center',
    'data-test-id': dataTestId = 'fondue-flex',
    children,
}: FlexProps): ReactElement => {
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

    return (
        <div
            data-test-id={dataTestId}
            className={merge([
                directionMapping[direction],
                wrapMapping[wrap],
                justifyMapping[justify],
                alignItemsMapping[alignItems],
                alignContentMapping[alignContent],
                boxColorTokenClassName,
            ])}
        >
            {children}
        </div>
    );
};
Flex.displayName = 'FondueFlex';
