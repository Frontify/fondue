/* (c) Copyright Frontify Ltd., all rights reserved. */

import { forwardRef, type ReactNode } from 'react';

import { type CommonAriaProps } from '#/helpers/aria';
import { type Responsive, type SizeValue, type LayoutComponentProps } from '#/helpers/layout';
import { propsToCssVariables } from '#/helpers/propsToCssVariables';

import styles from './styles/flex.module.scss';

export type FlexProps = LayoutComponentProps & {
    /**
     * The HTML element to render. Use `'span'` for inline flex contexts.
     * @default "div"
     */
    as?: 'div' | 'span';
    /**
     * Controls the display mode. `'flex'` for block-level flex, `'inline-flex'` for inline contexts, `'none'` to hide.
     * @default "flex"
     */
    display?: Responsive<'none' | 'flex' | 'inline-flex'>;
    /**
     * Sets the main axis. `'row'` for horizontal, `'column'` for vertical stacking. Supports responsive values.
     * @default "row"
     */
    direction?: Responsive<'row' | 'row-reverse' | 'column' | 'column-reverse'>;
    /**
     * Aligns children along the cross axis. `'center'` for vertical centering in a row, `'stretch'` to fill the container height.
     */
    align?: Responsive<'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline'>;
    /**
     * Distributes children along the main axis. `'space-between'` for even spacing, `'center'` for centering.
     */
    justify?: Responsive<'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly'>;
    /**
     * Controls whether children wrap to new lines. `'wrap'` for multi-line, `'nowrap'` to keep on one line.
     */
    wrap?: Responsive<'nowrap' | 'wrap' | 'wrap-reverse'>;
    /**
     * Spacing between children in both directions. Values are spacing tokens (1 = 0.25rem). Supports responsive values.
     */
    gap?: Responsive<SizeValue>;
    /**
     * Horizontal spacing between children. Overrides `gap` for the horizontal axis.
     */
    gapX?: Responsive<SizeValue>;
    /**
     * Vertical spacing between children. Overrides `gap` for the vertical axis.
     */
    gapY?: Responsive<SizeValue>;

    children?: ReactNode;
    'data-test-id'?: string;
} & CommonAriaProps;

export const Flex = forwardRef<HTMLDivElement, FlexProps>(
    (
        {
            as: Component = 'div',
            'data-test-id': dataTestId = 'fondue-flex',
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
                style={propsToCssVariables(props, { justify: 'justify-content' })}
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
Flex.displayName = 'Flex';
