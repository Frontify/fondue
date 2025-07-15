/* (c) Copyright Frontify Ltd., all rights reserved. */

import { forwardRef, type ReactNode, type MouseEvent, useCallback } from 'react';

import { cn } from '#/utilities/styleUtilities';

import { useFondueRouter } from '../RouterProvider/RouterProvider';

import styles from './styles/link.module.scss';

type LinkSize = 'x-small' | 'small' | 'medium' | 'large';
type LinkWeight = 'light' | 'regular' | 'medium' | 'bold' | 'default' | 'strong' | 'x-strong';
type LinkColor = 'default' | 'weak' | 'x-weak' | 'disabled' | 'negative' | 'positive' | 'warning' | 'interactive';
type BoxColor = 'neutral' | 'selected' | 'disabled' | 'positive' | 'negative' | 'warning';
type LinkWrap = 'wrap' | 'nowrap';
type LinkUnderline = 'auto' | 'always' | 'hover' | 'none';

export type LinkProps = {
    children?: ReactNode;
    /**
     * The link to navigate to when clicked
     */
    href: string;
    /**
     * Id of the element
     */
    id?: string;
    /**
     * Size of the text
     *
     * @default 'medium'
     */
    size?: LinkSize;
    /**
     * Weight of the font
     *
     * @default 'default'
     */
    weight?: LinkWeight;
    /**
     * Color of the text
     *
     * @default 'default'
     */
    color?: LinkColor;
    /**
     * The texts color when used within a box
     *
     * @description optional color prop that uses the inverse box color when accessibility contrast is needed
     **/
    boxColor?: BoxColor;
    /**
     * Truncate the text if it overflows
     */
    truncate?: boolean;
    /**
     * Wrap the text if it overflows
     * @default 'nowrap'
     */
    wrap?: LinkWrap;
    /**
     * Underline behavior of the link
     * @default 'auto'
     */
    underline?: LinkUnderline;
    /**
     * The target attribute for the link
     * @default '_self'
     */
    target?: string;
    /**
     * The rel attribute for the link
     * @default 'noopener noreferrer'
     */
    rel?: string;
    className?: string;
    onPress?: (event: MouseEvent<HTMLAnchorElement>) => void;
    'data-test-id'?: string;
    /**
     * Aria label for the component.
     */
    'aria-label'?: string;
    /**
     * Aria labelled by for the component.
     */
    'aria-labelledby'?: string;
    /**
     * Aria described by for the component.
     */
    'aria-describedby'?: string;
    /**
     * Aria details for extend description of the component.
     */
    'aria-details'?: string;
};

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
    (
        {
            id,
            className,
            children,
            size = 'medium',
            weight = 'default',
            truncate = false,
            wrap = 'nowrap',
            underline = 'auto',
            color = 'default',
            href,
            boxColor,
            onPress,
            ...props
        },
        ref,
    ) => {
        const { navigate, useHref } = useFondueRouter();
        const resolvedHref = useHref(href);

        const handleClick = useCallback(
            (event: MouseEvent<HTMLAnchorElement>) => {
                onPress?.(event);

                if (href) {
                    event.preventDefault();
                    navigate(href);
                }
            },
            [href, navigate, onPress],
        );

        return (
            <a
                id={id}
                className={cn([
                    styles.root,
                    styles[`size-${size}`],
                    styles[`weight-${weight}`],
                    styles[boxColor ? `color-box-${boxColor}` : `color-${color}`],
                    styles[`wrap-${wrap}`],
                    styles[`underline-${underline}`],
                    truncate && styles.truncate,
                    className,
                ])}
                ref={ref}
                href={resolvedHref}
                onClick={handleClick}
                {...props}
            >
                {children}
            </a>
        );
    },
);
Link.displayName = 'Link';
