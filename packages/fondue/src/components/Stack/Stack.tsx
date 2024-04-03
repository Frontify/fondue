/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Children, type ReactElement, type ReactNode } from 'react';

import { Box } from '@components/Box';
import { GAP_DIRECTIONS, GetGapClassName, type SpacingValue } from '@utilities/dimensions';
import { merge } from '@utilities/merge';

import { type ContainerHTMLElement } from '../../types/elements';

export type STACK_DIRECTION = 'row' | 'column' | 'row-reverse' | 'column-reverse';

export type STACK_JUSTIFY = 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
export type STACK_ALIGN_ITEMS = 'start' | 'end' | 'center' | 'baseline' | 'stretch';
export type STACK_ALIGN_CONTENT =
    | 'start'
    | 'end'
    | 'center'
    | 'between'
    | 'around'
    | 'evenly'
    | 'baseline'
    | 'stretch'
    | 'normal';

export type STACK_PROPS = {
    children?: ReactNode | ReactNode[] | JSX.Element;
    direction?: STACK_DIRECTION;
    spacing?: SpacingValue;
    spacingX?: SpacingValue;
    spacingY?: SpacingValue;
    divider?: ReactElement;
    margin?: SpacingValue;
    marginX?: SpacingValue;
    marginY?: SpacingValue;
    padding?: SpacingValue;
    paddingX?: SpacingValue;
    paddingY?: SpacingValue;
    bg?: string;
    color?: string;
    'data-test-id'?: string;
    justify?: STACK_JUSTIFY;
    alignItems?: STACK_ALIGN_ITEMS;
    alignContent?: STACK_ALIGN_CONTENT;
    as?: ContainerHTMLElement;
};

export const STACK_DIRECTION_MAPPING = {
    row: 'tw-flex-row',
    column: 'tw-flex-col',
    'row-reverse': 'tw-flex-row-reverse',
    'column-reverse': 'tw-flex-col-reverse',
};

const STACK_JUSTIFY_MAPPING = {
    start: 'tw-justify-start',
    end: 'tw-justify-end',
    center: 'tw-justify-center',
    between: 'tw-justify-between',
    around: 'tw-justify-around',
    evenly: 'tw-justify-evenly',
};

const STACK_ALIGN_ITEMS_MAPPING = {
    start: 'tw-items-start',
    end: 'tw-items-end',
    center: 'tw-items-center',
    baseline: 'tw-items-baseline',
    stretch: 'tw-items-stretch',
};

export const STACK_TEST_ID = 'fondue-stack';

export const Stack = ({
    children,
    'data-test-id': dataTestId = STACK_TEST_ID,
    direction = 'column',
    spacing,
    spacingX,
    spacingY,
    divider,
    padding,
    paddingX,
    paddingY,
    margin,
    marginX,
    marginY,
    justify = 'start',
    alignItems = 'start',
    bg,
    color,
    as: ContainerElement = 'div',
}: STACK_PROPS) => {
    const renderedChildren = Children.map(children, (child) => {
        return (
            <>
                {child}
                {divider}
            </>
        );
    });

    return (
        <Box
            data-test-id={dataTestId}
            className={merge([
                'tw-flex',
                STACK_JUSTIFY_MAPPING[justify],
                STACK_ALIGN_ITEMS_MAPPING[alignItems],
                STACK_DIRECTION_MAPPING[direction],
                GetGapClassName(GAP_DIRECTIONS.GAP, spacing),
                GetGapClassName(GAP_DIRECTIONS.GAP_X, spacingX),
                GetGapClassName(GAP_DIRECTIONS.GAP_Y, spacingY),
                bg,
                color,
            ])}
            margin={margin}
            marginX={marginX}
            marginY={marginY}
            padding={padding}
            paddingX={paddingX}
            paddingY={paddingY}
            as={ContainerElement}
        >
            {renderedChildren}
        </Box>
    );
};
Stack.displayName = 'FondueStack';
