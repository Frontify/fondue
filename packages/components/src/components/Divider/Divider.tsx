/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as Separator from '@radix-ui/react-separator';
import { type ReactElement } from 'react';

import { cn } from '#/utilities/styleUtilities';

import { dividerStyles } from './styles/dividerStyles';

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

export const Divider = ({
    'data-test-id': dataTestId = DIVIDER_TEST_ID,
    direction = 'horizontal',
    className,
    ...props
}: DividerProps): ReactElement => {
    return (
        <Separator.Root
            className={cn(
                dividerStyles({
                    direction,
                    ...props,
                }),
                className,
            )}
            data-test-id={dataTestId}
        />
    );
};
