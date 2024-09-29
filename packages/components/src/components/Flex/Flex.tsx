/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

import { type CommonAriaProps } from '#/helpers/aria';
import { type Responsive, type SizeValue, type LayoutComponentProps } from '#/helpers/layout';
import { propsToCssVariables } from '#/helpers/propsToCssVariables';

import styles from './styles/flex.module.scss';

export type FlexProps = LayoutComponentProps & {
    /**
     * The element to render the Flex component as.
     * @default 'div'
     */
    as?: 'div' | 'span';
    /**
     * The display property.
     * @default 'flex'
     */
    display?: Responsive<'none' | 'flex' | 'inline-flex'>;
    /**
     * The direction of the children.
     * @default 'row'
     */
    direction?: Responsive<'row' | 'row-reverse' | 'column' | 'column-reverse'>;
    /**
     * The alignment of the children.
     */
    align?: Responsive<'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline'>;
    /**
     * The justification of the children.
     */
    justify?: Responsive<'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly'>;
    /**
     * The wrap property.
     */
    wrap?: Responsive<'nowrap' | 'wrap' | 'wrap-reverse'>;
    /**
     * The gap between the children.
     */
    gap?: Responsive<SizeValue>;
    /**
     * The horizontal gap between the children.
     */
    gapX?: Responsive<SizeValue>;
    /**
     * The vertical gap between the children.
     */
    gapY?: Responsive<SizeValue>;

    children?: ReactNode;
    'data-test-id'?: string;
} & CommonAriaProps;

export const Flex = ({
    as: Component = 'div',
    'data-test-id': dataTestId = 'fondue-flex',
    children,
    ...props
}: FlexProps) => {
    return (
        <Component
            data-fondue-component="Flex"
            className={styles.root}
            data-test-id={dataTestId}
            style={propsToCssVariables(props, { justify: 'justify-content' })}
        >
            {children}
        </Component>
    );
};
Flex.displayName = 'Flex';
