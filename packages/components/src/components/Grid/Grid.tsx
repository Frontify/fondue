/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

import { type Responsive, type SizeValue, type LayoutComponentProps } from '#/helpers/layout';
import { propsToCssVariables } from '#/helpers/propsToCssVariables';

import styles from './styles/grid.module.scss';

export type GridProps = LayoutComponentProps & {
    /**
     * The element to render the Grid component as.
     * @default 'div'
     */
    as?: 'div' | 'span';

    /**
     * The display property.
     * @default 'grid'
     */
    display?: 'none' | 'grid' | 'inline-grid';
    /**
     * The columns property.
     */
    columns?: Responsive<string>;
    /**
     * The rows property.
     */
    rows?: Responsive<string>;
    /**
     * The flow property.
     */
    flow?: Responsive<'row' | 'column' | 'dense' | 'row-dense' | 'column-dense'>;
    /**
     * The alignment of the children.
     */
    align?: Responsive<'start' | 'center' | 'end' | 'baseline' | 'stretch'>;
    /**
     * The justification of the children.
     */
    justify?: Responsive<'start' | 'center' | 'end' | 'between'>;
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
};

export const Grid = ({
    as: Component = 'div',
    'data-test-id': dataTestId = 'fondue-grid',
    children,
    ...props
}: GridProps) => {
    return (
        <Component
            className={styles.grid}
            data-test-id={dataTestId}
            style={propsToCssVariables(props, { justify: 'justify-items' })}
        >
            {children}
        </Component>
    );
};
Grid.displayName = 'Grid';
