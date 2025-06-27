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
     * The style of the divider
     * @default "solid"
     */
    variant?: DividerStyle;
    /**
     * The padding of the divider
     * @default "medium"
     */
    padding?: DividerPadding;
    /**
     * The color of the divider
     * @default "default"
     */
    color?: DividerColor;
    /**
     * The direction of the divider
     * @default "horizontal"
     */
    direction?: DividerDirection;
    /**
     * The html element to be used
     * @default "div"
     */
    as?: 'div' | 'li';
    'data-test-id'?: string;
    className?: string;
};

export const Divider = forwardRef<HTMLDivElement, DividerProps>(
    (
        {
            'data-test-id': dataTestId = 'fondue-divider',
            direction = 'horizontal',
            className,
            variant,
            as = 'div',
            ...props
        }: DividerProps,
        ref: ForwardedRef<HTMLDivElement | null>,
    ): ReactElement => {
        const Component = as;

        return (
            <Separator.Root
                ref={ref}
                className={cn(
                    dividerStyles({
                        direction,
                        variant,
                        ...props,
                    }),
                    className,
                )}
                data-test-id={dataTestId}
                asChild
            >
                <Component />
            </Separator.Root>
        );
    },
);

Divider.displayName = 'Divider';
