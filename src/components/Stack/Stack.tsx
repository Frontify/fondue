/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactElement, ReactNode } from 'react';
import { Box } from '@components/Box';
import { MARGIN_VALUES_MAP, PADDING_VALUES_MAP, SPACING_VALUES, SpacingValue } from '@utilities/dimensions';
import { merge } from '@utilities/merge';
import { ContainerHTMLElement } from 'src/types/elements';

export type StackDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';

export type StackProps = {
    children?: ReactNode | ReactNode[];
    direction?: StackDirection;
    spacing?: SpacingValue;
    divider?: ReactElement;
    margin?: SpacingValue;
    padding?: SpacingValue;
    bg?: string;
    color?: string;
    'data-test-id'?: string;
    as?: ContainerHTMLElement;
};

export const stackDirectionMapping = {
    row: 'tw-flex-row',
    column: 'tw-flex-col',
    'row-reverse': 'tw-flex-row-reverse',
    'column-reverse': 'tw-flex-col-reverse',
};

export const CONTAINER_TEST_ID = 'fondue-container';

export const Stack = ({
    children,
    'data-test-id': dataTestId = CONTAINER_TEST_ID,
    direction = 'column',
    spacing = 4,
    divider,
    padding = 4,
    margin = 4,
    bg,
    color,
    as: ContainerElement = 'div',
}: StackProps) => {
    const paddingClassName = SPACING_VALUES.includes(padding) ? PADDING_VALUES_MAP[padding] : PADDING_VALUES_MAP[0];
    const marginClassName = SPACING_VALUES.includes(padding) ? MARGIN_VALUES_MAP[margin] : MARGIN_VALUES_MAP[0];
    const directionClassName = stackDirectionMapping[direction]
        ? stackDirectionMapping[direction]
        : stackDirectionMapping['row'];

    const renderedChildren = React.Children.map(children, (child) => {
        return (
            <>
                <div
                    data-test-id="fondue-stack-item-wrapper"
                    style={{
                        height: 'auto',
                        display: 'inline-flex',
                        margin: direction === 'row' ? `0px ${spacing / 2}px` : `${spacing / 2}px 0px`,
                    }}
                >
                    {child}
                    {divider ? divider : <></>}
                </div>
            </>
        );
    });

    return (
        <Box
            data-test-id={dataTestId}
            className={merge([directionClassName, paddingClassName, marginClassName, bg, color])}
            as={ContainerElement}
        >
            {renderedChildren}
        </Box>
    );
};
Stack.displayName = 'FondueStack';
