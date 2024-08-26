/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

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

export const Box = ({
    as: Component = 'div',
    'data-test-id': dataTestId = 'fondue-box',
    children,
    ...props
}: BoxProps) => {
    return (
        <Component className={styles.root} data-test-id={dataTestId} {...props} style={propsToCssVariables(props)}>
            {children}
        </Component>
    );
};
Box.displayName = 'Box';
