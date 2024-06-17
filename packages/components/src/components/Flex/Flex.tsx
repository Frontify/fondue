/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

import styles from './styles/flex.module.scss';

import { type Responsive, type SizeValue, type LayoutComponentProps } from '#/helpers/layout';
import { propsToCssVariables } from '#/helpers/propsToCssVariables';

export type FlexProps = LayoutComponentProps & {
    /**
     * The element to render the Flex component as.
     * @default 'div'
     */
    as?: 'div' | 'span';
    /**
     * The display property of the Flex component.
     * @default 'flex'
     */
    display?: Responsive<'none' | 'flex' | 'inline-flex'>;
    /**
     * The direction of the Flex component.
     * @default 'row'
     */
    direction?: Responsive<'row' | 'row-reverse' | 'column' | 'column-reverse'>;
    /**
     * The alignment of the children of the Flex component.
     */
    align?: Responsive<'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline'>;
    /**
     * The justification of the children of the Flex component.
     */
    justify?: Responsive<'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly'>;
    /**
     * The wrap property of the Flex component.
     */
    wrap?: Responsive<'nowrap' | 'wrap' | 'wrap-reverse'>;
    /**
     * The gap between the children of the Flex component.
     */
    gap?: Responsive<SizeValue>;
    /**
     * The horizontal gap between the children of the Flex component.
     */
    gapX?: Responsive<SizeValue>;
    /**
     * The vertical gap between the children of the Flex component.
     */
    gapY?: Responsive<SizeValue>;

    children?: ReactNode;
    'data-test-id'?: string;
};

export const Flex = ({
    as: Component = 'div',
    'data-test-id': dataTestId = 'fondue-flex',
    children,
    ...props
}: FlexProps) => {
    return (
        <Component className={styles.flex} data-test-id={dataTestId} style={propsToCssVariables(props)}>
            {children}
        </Component>
    );
};
Flex.displayName = 'Flex';
