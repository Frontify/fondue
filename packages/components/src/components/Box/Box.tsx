/* (c) Copyright Frontify Ltd., all rights reserved. */

import { forwardRef, type ReactNode } from 'react';

import { type CommonAriaProps } from '#/helpers/aria';
import { type Responsive, type LayoutComponentProps } from '#/helpers/layout';
import { propsToCssVariables } from '#/helpers/propsToCssVariables';

import styles from './styles/box.module.scss';

export type BoxProps = LayoutComponentProps & {
    /**
     * The element to render the Box component as.
     * @default 'div'
     */
    as?: 'div' | 'span';
    /**
     * The display property.
     * @default 'block'
     */
    display?: Responsive<'none' | 'block' | 'inline-block' | 'inline'>;

    children?: ReactNode;
    'data-test-id'?: string;
} & CommonAriaProps;

export const Box = forwardRef<HTMLDivElement, BoxProps>(
    ({
        as: Component = 'div',
        'data-test-id': dataTestId = 'fondue-box',
        children,
        role,
        'aria-label': ariaLabel,
        'aria-hidden': ariaHidden,
        'aria-describedby': ariaDescribedBy,
        'aria-labelledby': ariaLabelledBy,
        'aria-expanded': ariaExpanded,
        'aria-haspopup': ariaHasPopup,
        ...props
    }: BoxProps) => {
        return (
            <Component
                className={styles.root}
                data-test-id={dataTestId}
                style={propsToCssVariables(props)}
                role={role}
                aria-label={ariaLabel}
                aria-hidden={ariaHidden}
                aria-describedby={ariaDescribedBy}
                aria-labelledby={ariaLabelledBy}
                aria-expanded={ariaExpanded}
                aria-haspopup={ariaHasPopup}
            >
                {children}
            </Component>
        );
    },
);
Box.displayName = 'Box';
