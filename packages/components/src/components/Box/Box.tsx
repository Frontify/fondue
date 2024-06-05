/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

import { boxStyles } from './styles/boxStyles';

import { type LayoutComponentProps } from '#/types/layoutProps';

export type BoxProps = LayoutComponentProps & {
    /**
     * The element to render the Box component as.
     * @default 'div'
     */
    as?: 'div' | 'span';
    /**
     * The display property of the Box component.
     * @default 'block'
     */
    display?: 'none' | 'block' | 'inline-block' | 'inline';

    children?: ReactNode;
    'data-test-id'?: string;
};

export const Box = ({ as: Component = 'div', 'data-test-id': dataTestId = 'fondue-box', children }: BoxProps) => {
    return (
        <Component className={boxStyles()} data-test-id={dataTestId}>
            {children}
        </Component>
    );
};
Box.displayName = 'Box';
