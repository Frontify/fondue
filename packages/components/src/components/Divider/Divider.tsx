/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as Separator from '@radix-ui/react-separator';
import { forwardRef, type ForwardedRef, type ReactElement } from 'react';

import styles from './styles/divider.module.scss';

type DividerStyle = 'noline' | 'dashed' | 'solid';
type DividerPadding = 'none' | 'small' | 'medium' | 'large';
type DividerDirection = 'horizontal' | 'vertical';
type DividerColor = 'weak' | 'default' | 'strong';

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
    /**
     * When `true`, signifies that it is purely visual, carries no semantic
     * meaning, and ensures it is not present in the accessibility tree.
     * @default false
     */
    decorative?: boolean;
    'data-test-id'?: string;
    className?: string;
};

export const Divider = forwardRef<HTMLDivElement, DividerProps>(
    (
        {
            'data-test-id': dataTestId = 'fondue-divider',
            direction = 'horizontal',
            padding = 'medium',
            className = '',
            variant = 'solid',
            color = 'default',
            as = 'div',
            decorative,
        }: DividerProps,
        ref: ForwardedRef<HTMLDivElement | null>,
    ): ReactElement => {
        const Component = as;

        return (
            <Separator.Root
                ref={ref}
                className={[styles.root, className].filter(Boolean).join(' ')}
                data-variant={variant}
                data-color={color}
                data-padding={padding}
                data-test-id={dataTestId}
                decorative={decorative}
                data-orientation={direction}
                asChild
            >
                <Component />
            </Separator.Root>
        );
    },
);

Divider.displayName = 'Divider';
