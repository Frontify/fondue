/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

import { type Responsive, type SizeValue, type LayoutComponentProps } from '#/helpers/layout';
import { propsToCssVariables } from '#/helpers/propsToCssVariables';

import styles from './styles/grid.module.scss';

export type GridProps = LayoutComponentProps & {
    /**
     * The element to render the Box component as.
     * @default 'div'
     */
    as?: 'div' | 'span';

    /**
     * The display property of the Grid component.
     * @default 'grid'
     */
    display?: 'none' | 'grid' | 'inline-grid';
    /**
     * The columns property of the Grid component.
     */
    columns?: Responsive<string>; // TODO
    /**
     * The rows property of the Grid component.
     */
    rows?: Responsive<string>; // TODO
    /**
     * The flow property of the Grid component.
     */
    flow?: Responsive<string>; // TODO
    /**
     * The alignment of the children of the Grid component.
     */
    align?: Responsive<''>; // TODO
    /**
     * The justification of the children of the Grid component.
     */
    justify?: Responsive<''>; // TODO
    /**
     * The gap between the children of the Grid component.
     */
    gap?: Responsive<SizeValue>;
    /**
     * The horizontal gap between the children of the Grid component.
     */
    gapX?: Responsive<SizeValue>;
    /**
     * The vertical gap between the children of the Grid component.
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
        <Component className={styles.grid} data-test-id={dataTestId} style={propsToCssVariables(props)}>
            {children}
        </Component>
    );
};
Grid.displayName = 'Grid';
