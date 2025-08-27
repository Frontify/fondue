/* (c) Copyright Frontify Ltd., all rights reserved. */

import { forwardRef, type ReactNode, type MouseEvent, useCallback } from 'react';

import { cn } from '#/utilities/styleUtilities';

import { useFondueRouter } from '../RouterProvider/RouterProvider';

import styles from './styles/link.module.scss';

type LinkSize = 'xx-small' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large' | 'xx-large';
type LinkWeight = 'regular' | 'medium' | 'bold';
type LinkColor = 'primary' | 'secondary' | 'error' | 'success' | 'warning' | 'highlight';
type LinkOnContainerColor = 'secondary' | 'disabled' | 'error' | 'success' | 'warning' | 'highlight';
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
     * @default 'regular'
     */
    weight?: LinkWeight;
    /**
     * Color of the text
     *
     * @default 'primary'
     */
    color?: LinkColor;
    /**
     * The texts color when used within a container
     *
     * @description optional color prop that uses the inverse container color when accessibility contrast is needed
     **/
    onContainer?: LinkOnContainerColor;
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
    /**
     * Disable the link
     *
     * @default false
     */
    disabled?: boolean;
};

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
    (
        {
            id,
            className,
            children,
            size = 'medium',
            weight = 'regular',
            truncate = false,
            wrap = 'nowrap',
            underline = 'auto',
            color = 'primary',
            href,
            onContainer,
            onPress,
            disabled = false,
            ...props
        },
        ref,
    ) => {
        const { navigate, useHref } = useFondueRouter();
        const resolvedHref = useHref(href);

        const handleClick = useCallback(
            (event: MouseEvent<HTMLAnchorElement>) => {
                if (disabled) {
                    event.preventDefault();
                    return;
                }
                onPress?.(event);

                if (href) {
                    event.preventDefault();
                    navigate(href);
                }
            },
            [href, navigate, onPress, disabled],
        );

        const computedColor = disabled
            ? styles.disabled
            : styles[onContainer ? `color-on-container-${onContainer}` : `color-${color}`];

        return (
            <a
                id={id}
                className={cn([
                    styles.root,
                    styles[`size-${size}`],
                    styles[`weight-${weight}`],
                    styles[`wrap-${wrap}`],
                    styles[`underline-${underline}`],
                    truncate && styles.truncate,
                    computedColor,
                    className,
                ])}
                ref={ref}
                href={disabled ? undefined : resolvedHref}
                onClick={handleClick}
                aria-disabled={disabled || undefined}
                tabIndex={disabled ? -1 : undefined}
                {...props}
            >
                {children}
            </a>
        );
    },
);
Link.displayName = 'Link';
