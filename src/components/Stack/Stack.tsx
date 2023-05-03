/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactElement, ReactNode } from 'react';
import { Box } from '@components/Box';
import { MARGIN_VALUES_MAP, PADDING_VALUES_MAP, SPACING_VALUES, SpacingValue } from '@utilities/dimensions';
import { merge } from '@utilities/merge';
import { ContainerHTMLElement } from 'src/types/elements';

export type STACK_DIRECTION = 'row' | 'column' | 'row-reverse' | 'column-reverse';

export type STACK_PROPS = {
    children?: ReactNode | ReactNode[] | JSX.Element;
    direction?: STACK_DIRECTION;
    spacing?: SpacingValue;
    divider?: ReactElement;
    margin?: SpacingValue;
    padding?: SpacingValue;
    bg?: string;
    color?: string;
    'data-test-id'?: string;
    as?: ContainerHTMLElement;
};

export const STACK_DIRECTION_MAPPING = {
    row: 'tw-flex-row',
    column: 'tw-flex-col',
    'row-reverse': 'tw-flex-row-reverse',
    'column-reverse': 'tw-flex-col-reverse',
};

export const STACK_TEST_ID = 'fondue-stack';

export const Stack = ({
    children,
    'data-test-id': dataTestId = STACK_TEST_ID,
    direction = 'column',
    spacing = 4,
    divider,
    padding = 4,
    margin = 4,
    bg,
    color,
    as: ContainerElement = 'div',
}: STACK_PROPS) => {
    const paddingClassName = SPACING_VALUES.includes(padding) ? PADDING_VALUES_MAP[padding] : PADDING_VALUES_MAP[0];
    const marginClassName = SPACING_VALUES.includes(padding) ? MARGIN_VALUES_MAP[margin] : MARGIN_VALUES_MAP[0];
    const directionClassName = STACK_DIRECTION_MAPPING[direction]
        ? STACK_DIRECTION_MAPPING[direction]
        : STACK_DIRECTION_MAPPING['row'];

    const renderedChildren = React.Children.map(children, (child) => {
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
            className={merge(['tw-flex', directionClassName, paddingClassName, marginClassName, bg, color])}
            style={{
                gap: spacing,
            }}
            as={ContainerElement}
        >
            {renderedChildren}
        </Box>
    );
};
Stack.displayName = 'FondueStack';
