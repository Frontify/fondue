/* (c) Copyright Frontify Ltd., all rights reserved. */

import { forwardRef, type ReactNode } from 'react';

import { type CommonAriaProps } from '#/helpers/aria';
import { type Responsive, type SizeValue, type LayoutComponentProps } from '#/helpers/layout';
import { propsToCssVariables } from '#/helpers/propsToCssVariables';

import styles from './styles/grid.module.scss';

export type GridProps = LayoutComponentProps & {
    /**
     * The HTML element to render. Use `'span'` for inline grid contexts.
     * @default "div"
     */
    as?: 'div' | 'span';
    /**
     * Controls the display mode. `'grid'` for block-level grid, `'inline-grid'` for inline contexts, `'none'` to hide.
     * @default "grid"
     */
    display?: 'none' | 'grid' | 'inline-grid';
    /**
     * Defines the column template. Pass a number for equal-width columns or a CSS grid-template-columns string for custom sizing.
     */
    columns?: Responsive<string | number>;
    /**
     * Defines the row template. Pass a number for equal-height rows or a CSS grid-template-rows string for custom sizing.
     */
    rows?: Responsive<string | number>;
    /**
     * Controls the auto-placement algorithm. `'row'` fills rows first, `'column'` fills columns first, `'dense'` fills gaps.
     */
    flow?: Responsive<'row' | 'column' | 'dense' | 'row-dense' | 'column-dense'>;
    /**
     * Aligns children along the block (vertical) axis within their grid area.
     */
    align?: Responsive<'start' | 'center' | 'end' | 'baseline' | 'stretch'>;
    /**
     * Aligns children along the inline (horizontal) axis within their grid area.
     */
    justify?: Responsive<'start' | 'center' | 'end' | 'between'>;
    /**
     * Spacing between children in both directions. Values are spacing tokens (1 = 0.25rem). Supports responsive values.
     */
    gap?: Responsive<SizeValue>;
    /**
     * Horizontal spacing between columns. Overrides `gap` for the horizontal axis.
     */
    gapX?: Responsive<SizeValue>;
    /**
     * Vertical spacing between rows. Overrides `gap` for the vertical axis.
     */
    gapY?: Responsive<SizeValue>;

    children?: ReactNode;
    'data-test-id'?: string;
} & CommonAriaProps;

export const Grid = forwardRef<HTMLDivElement, GridProps>(
    (
        {
            as: Component = 'div',
            'data-test-id': dataTestId = 'fondue-grid',
            children,
            role,
            'aria-label': ariaLabel,
            'aria-hidden': ariaHidden,
            'aria-describedby': ariaDescribedBy,
            'aria-labelledby': ariaLabelledBy,
            'aria-expanded': ariaExpanded,
            'aria-haspopup': ariaHasPopup,
            ...props
        },
        ref,
    ) => {
        return (
            <Component
                className={styles.root}
                data-test-id={dataTestId}
                style={propsToCssVariables(props, { justify: 'justify-items' })}
                role={role}
                aria-label={ariaLabel}
                aria-hidden={ariaHidden}
                aria-describedby={ariaDescribedBy}
                aria-labelledby={ariaLabelledBy}
                aria-expanded={ariaExpanded}
                aria-haspopup={ariaHasPopup}
                ref={ref}
            >
                {children}
            </Component>
        );
    },
);
Grid.displayName = 'Grid';
