/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

import { gridStyles } from './styles/gridStyles';

import { type LayoutComponentProps } from '#/types/layoutProps';

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
    children?: ReactNode;
    'data-test-id'?: string;
};

export const Grid = ({ as: Component = 'div', 'data-test-id': dataTestId = 'fondue-grid', children }: GridProps) => {
    return (
        <Component className={gridStyles()} data-test-id={dataTestId}>
            {children}
        </Component>
    );
};
Grid.displayName = 'Grid';
