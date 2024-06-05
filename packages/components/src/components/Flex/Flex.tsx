/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

import { flexStyles } from './styles/flexStyles';

import { type LayoutComponentProps } from '#/types/layoutProps';

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
    display?: 'none' | 'flex' | 'inline-flex';
    children?: ReactNode;
    'data-test-id'?: string;
};

export const Flex = ({ as: Component = 'div', 'data-test-id': dataTestId = 'fondue-flex', children }: FlexProps) => {
    return (
        <Component className={flexStyles()} data-test-id={dataTestId}>
            {children}
        </Component>
    );
};
Flex.displayName = 'Flex';
