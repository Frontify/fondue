/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactElement } from 'react';

import { cn } from '#/utilities/styleUtilities';

import { dividerStyles } from './styles/dividerStyles';
import { lineStyles } from './styles/lineStyles';

type DividerStyle = 'noline' | 'dashed' | 'solid';
type DividerPadding = 'none' | 'small' | 'medium' | 'large';
type DividerDirection = 'horizontal' | 'vertical';
type DividerColor = 'weak' | 'default' | 'strong' | 'x-strong';

export type DividerProps = {
    style?: DividerStyle;
    padding?: DividerPadding;
    color?: DividerColor;
    direction?: DividerDirection;
    'data-test-id'?: string;
    className?: string;
};

const DIVIDER_TEST_ID = 'fondue-divider';
const DIVIDER_LINE_TEST_ID_SUFFIX = '-line';

export const Divider = ({
    'data-test-id': dataTestId = DIVIDER_TEST_ID,
    direction = 'horizontal',
    className,
    ...props
}: DividerProps): ReactElement => {
    return (
        <div
            aria-hidden="true"
            className={cn(
                dividerStyles({
                    direction,
                    ...props,
                }),
                className,
            )}
            data-test-id={dataTestId}
        >
            <hr
                data-test-id={`${dataTestId}${DIVIDER_LINE_TEST_ID_SUFFIX}`}
                className={lineStyles({
                    direction,
                    ...props,
                })}
            />
        </div>
    );
};
