/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

import { type CommonAriaProps } from '#/helpers/aria';
import { type Responsive, type SizeValue, type LayoutComponentProps, type GlobalValues } from '#/helpers/layout';
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
    display?: Responsive<'none' | 'flex' | 'inline-flex' | GlobalValues>;
    /**
     * The direction of the children.
     * @default 'row'
     */
    direction?: Responsive<'row' | 'row-reverse' | 'column' | 'column-reverse' | GlobalValues>;
    /**
     * The alignment of the children.
     */
    align?: Responsive<'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline' | GlobalValues>;
    /**
     * The justification of the children.
     */
    justify?: Responsive<
        'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly' | GlobalValues
    >;
    /**
     * The wrap property.
     */
    wrap?: Responsive<'nowrap' | 'wrap' | 'wrap-reverse' | GlobalValues>;
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

const ALL_POSSIBLE_PROPS_DEFAILT_VALUES: FlexProps = {
    direction: 'initial',
    align: 'initial',
    justify: 'initial',
    wrap: 'initial',
    gap: 'initial',
    gapX: 'initial',
    gapY: 'initial',
    m: 'initial',
    mx: 'initial',
    my: 'initial',
    mt: 'initial',
    mr: 'initial',
    mb: 'initial',
    ml: 'initial',
    p: 'initial',
    px: 'initial',
    py: 'initial',
    pt: 'initial',
    pr: 'initial',
    pb: 'initial',
    pl: 'initial',
    width: 'initial',
    minWidth: 'initial',
    maxWidth: 'initial',
    height: 'initial',
    minHeight: 'initial',
    maxHeight: 'initial',
    overflow: 'initial',
    overflowX: 'initial',
    overflowY: 'initial',
    position: 'initial',
    top: 'initial',
    right: 'initial',
    bottom: 'initial',
    left: 'initial',
};

export const Flex = ({
    as: Component = 'div',
    'data-test-id': dataTestId = 'fondue-flex',
    children,
    ...props
}: FlexProps) => {
    for (const key in ALL_POSSIBLE_PROPS_DEFAILT_VALUES) {
        if (!props[key]) {
            props[key] = ALL_POSSIBLE_PROPS_DEFAILT_VALUES[key];
        }
    }

    return (
        <Component
            className={styles.root}
            data-test-id={dataTestId}
            style={propsToCssVariables(props, { justify: 'justify-content' })}
        >
            {children}
        </Component>
    );
};
Flex.displayName = 'Flex';
