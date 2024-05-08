/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as Separator from '@radix-ui/react-separator';
import { forwardRef, type ForwardedRef, type ReactElement } from 'react';

import { cn } from '#/utilities/styleUtilities';

import { dividerStyles } from './styles/dividerStyles';

type DividerStyle = 'noline' | 'dashed' | 'solid';
type DividerPadding = 'none' | 'small' | 'medium' | 'large';
type DividerDirection = 'horizontal' | 'vertical';
type DividerColor = 'weak' | 'default' | 'strong' | 'x-strong';

export type DividerProps = {
    /**
     * @default 'solid'
     */
    style?: DividerStyle;
    /**
     * @default 'medium'
     */
    padding?: DividerPadding;
    /**
     * @default 'default'
     */
    color?: DividerColor;
    /**
     * @default 'horizontal'
     */
    direction?: DividerDirection;
    'data-test-id'?: string;
    className?: string;
};

const DIVIDER_TEST_ID = 'fondue-divider';

export const DividerComponent = (
    { 'data-test-id': dataTestId = DIVIDER_TEST_ID, direction = 'horizontal', className, ...props }: DividerProps,
    ref: ForwardedRef<HTMLDivElement | null>,
): ReactElement => {
    return (
        <Separator.Root
            ref={ref}
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

DividerComponent.displayName = 'Divider';

export const Divider = forwardRef<HTMLDivElement, DividerProps>(DividerComponent);
