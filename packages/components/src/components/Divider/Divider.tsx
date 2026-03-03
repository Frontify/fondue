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
     * Controls the line style. `'solid'` for a continuous line, `'dashed'` for a dotted line, `'noline'` for spacing-only separation.
     * @default "solid"
     */
    variant?: DividerStyle;
    /**
     * Controls the spacing around the divider. `'none'` for tight layouts, `'medium'` for standard separation, `'large'` for prominent breaks.
     * @default "medium"
     */
    padding?: DividerPadding;
    /**
     * Controls the line color intensity. `'weak'` for subtle separation, `'default'` for standard, `'strong'` for prominent borders.
     * @default "default"
     */
    color?: DividerColor;
    /**
     * Controls the orientation. `'horizontal'` for full-width breaks, `'vertical'` for side-by-side content separation.
     * @default "horizontal"
     */
    direction?: DividerDirection;
    /**
     * The HTML element to render. Use `'li'` when the divider sits inside a list.
     * @default "div"
     */
    as?: 'div' | 'li';
    /**
     * When `true`, the divider is purely visual — it carries no semantic meaning and is hidden from the accessibility tree.
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
