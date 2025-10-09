/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCross } from '@frontify/fondue-icons';
import * as RadixPopover from '@radix-ui/react-popover';
import { forwardRef, type CSSProperties, type ForwardedRef, type ReactNode } from 'react';

import { type CommonAriaProps } from '#/helpers/aria';
import { addAutoFocusAttribute, addShowFocusRing } from '#/utilities/domUtilities';

import { ThemeProvider, useFondueTheme } from '../ThemeProvider/ThemeProvider';

import styles from './styles/flyout.module.scss';

export type FlyoutRootProps = {
    /**
     * Disable interaction with the rest of the page
     * @default false
     */
    modal?: boolean;
    /**
     * The controlled `open` state of the flyout
     * @default false
     */
    open?: boolean;
    /**
     * Event handler called when the `open` state changes
     */
    onOpenChange?: (open: boolean) => void;
    children?: ReactNode;
};

export const FlyoutRoot = ({ children, ...props }: FlyoutRootProps) => {
    return <RadixPopover.Root {...props}>{children}</RadixPopover.Root>;
};
FlyoutRoot.displayName = 'Flyout.Root';

export type FlyoutTriggerProps = {
    /**
     * Change the default rendered element for the one passed as a child, merging their props and behavior.
     * @default true
     */
    asChild?: boolean;
    children?: ReactNode;
    'data-test-id'?: string;
};

export const FlyoutTrigger = (
    { asChild = true, children, 'data-test-id': dataTestId = 'fondue-flyout-trigger', ...props }: FlyoutTriggerProps,
    ref: ForwardedRef<HTMLButtonElement>,
) => {
    return (
        <RadixPopover.Trigger
            onMouseDown={addAutoFocusAttribute}
            data-auto-focus-visible="true"
            data-auto-focus-trigger
            data-test-id={dataTestId}
            asChild={asChild}
            ref={ref}
            {...props}
        >
            {children}
        </RadixPopover.Trigger>
    );
};
FlyoutTrigger.displayName = 'Flyout.Trigger';

type FlyoutSpacing = 'compact' | 'comfortable' | 'spacious';
type FlyoutViewportCollisionPadding = 'compact' | 'spacious';
export type FlyoutContentProps = {
    /**
     * Add a shadow to the flyout
     * @default "medium"
     */
    shadow?: 'none' | 'medium' | 'large';
    /**
     * Add rounded corners to the flyout
     * @default "medium"
     */
    rounded?: 'none' | 'medium' | 'large';
    /**
     * Define the prefered side of the flyout. Can be overriden by viewport collisions viewport.
     * @default "bottom"
     */
    side?: 'top' | 'right' | 'bottom' | 'left';
    /**
     * Define the prefered alignment of the flyout. Can be overriden by viewport collisions viewport.
     * @default "start"
     */
    align?: 'start' | 'center' | 'end';
    /**
     * Define the padding of the flyout
     * @default "compact"
     */
    padding?: 'none' | 'tight' | 'compact' | 'comfortable' | 'spacious';
    /**
     * Define the fixed width of the flyout
     * @default "fit-content"
     */
    width?: string;
    /**
     * Defines the spacing between the dropdown and its trigger.
     * @default 'compact'
     */
    triggerOffset?: FlyoutSpacing;
    /**
     * Define the maximum width of the flyout
     * @default "360px"
     */
    maxWidth?: string;
    /**
     * Define the minimum distance between the flyout and the viewport edge
     * @default 'compact'
     */
    viewportCollisionPadding?: FlyoutViewportCollisionPadding;
    /**
     * Event handler called when auto-focusing on open
     */
    onOpenAutoFocus?: (event: Event) => void;
    children?: ReactNode;
    'data-test-id'?: string;
};

const SPACING_MAP: Record<FlyoutSpacing, number> = {
    compact: 8,
    comfortable: 12,
    spacious: 16,
};

const VIEWPORT_COLLISION_PADDING_MAP: Record<FlyoutViewportCollisionPadding, number> = {
    compact: 8,
    spacious: 24,
};

export const FlyoutContent = (
    {
        align = 'start',
        maxWidth = '360px',
        padding = 'compact',
        rounded = 'medium',
        width = 'fit-content',
        shadow = 'medium',
        side,
        triggerOffset = 'compact',
        viewportCollisionPadding = 'compact',
        'data-test-id': dataTestId = 'fondue-flyout-content',
        children,
        ...props
    }: FlyoutContentProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    const { theme, dir } = useFondueTheme();

    const getAdjustedSide = (side?: 'top' | 'right' | 'bottom' | 'left') => {
        if (!side || dir === 'ltr') {
            return side;
        }

        if (side === 'left') {
            return 'right';
        }
        if (side === 'right') {
            return 'left';
        }

        return side;
    };

    return (
        <RadixPopover.Portal>
            <ThemeProvider theme={theme} dir={dir}>
                <div data-test-id="fondue-flyout-overlay" className={styles.overlay} />
                <RadixPopover.Content
                    style={
                        {
                            '--flyout-max-width': maxWidth,
                            '--flyout-width': width,
                        } as CSSProperties
                    }
                    ref={ref}
                    align={align}
                    collisionPadding={VIEWPORT_COLLISION_PADDING_MAP[viewportCollisionPadding]}
                    sideOffset={SPACING_MAP[triggerOffset]}
                    side={getAdjustedSide(side)}
                    className={styles.root}
                    data-flyout-spacing={padding}
                    data-rounded={rounded}
                    data-shadow={shadow}
                    data-test-id={dataTestId}
                    onFocus={addShowFocusRing}
                    {...props}
                >
                    {children}
                </RadixPopover.Content>
            </ThemeProvider>
        </RadixPopover.Portal>
    );
};
FlyoutContent.displayName = 'Flyout.Content';

export type FlyoutHeaderProps = {
    /**
     * Show a close button in the header
     * @default false
     */
    showCloseButton?: boolean;
    children?: ReactNode;
    'data-test-id'?: string;
    closeProps?: CommonAriaProps;
};

export const FlyoutHeader = (
    { showCloseButton, children, 'data-test-id': dataTestId = 'fondue-flyout-header', closeProps }: FlyoutHeaderProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    return (
        <div data-test-id={dataTestId} ref={ref} className={styles.header}>
            <div>{children}</div>
            {showCloseButton && (
                <RadixPopover.Close
                    role="button"
                    data-test-id={`${dataTestId}-close`}
                    className={styles.close}
                    aria-label="Close"
                    {...closeProps}
                >
                    <IconCross size={20} />
                </RadixPopover.Close>
            )}
        </div>
    );
};
FlyoutHeader.displayName = 'Flyout.Header';

export type FlyoutFooterProps = { children?: ReactNode; 'data-test-id'?: string };

export const FlyoutFooter = (
    { children, 'data-test-id': dataTestId = 'fondue-flyout-footer' }: FlyoutFooterProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    return (
        <div data-test-id={dataTestId} ref={ref} className={styles.footer}>
            {children}
        </div>
    );
};
FlyoutFooter.displayName = 'Flyout.Footer';

export type FlyoutBodyProps = {
    children?: ReactNode;
    'data-test-id'?: string;
    /**
     * Allow the body to scroll if the max height of the flyout is reached
     * @default false
     */
    scrollable?: boolean;
};

export const FlyoutBody = (
    { children, 'data-test-id': dataTestId = 'fondue-flyout-body', scrollable = false }: FlyoutBodyProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    return (
        <div
            data-test-id={dataTestId}
            ref={ref}
            data-flyout-spacing="compact"
            data-scrollable={scrollable}
            className={styles.body}
        >
            {children}
        </div>
    );
};
FlyoutBody.displayName = 'Flyout.Body';

export const Flyout = {
    Root: FlyoutRoot,
    Trigger: forwardRef<HTMLButtonElement, FlyoutTriggerProps>(FlyoutTrigger),
    Content: forwardRef<HTMLDivElement, FlyoutContentProps>(FlyoutContent),
    Header: forwardRef<HTMLDivElement, FlyoutHeaderProps>(FlyoutHeader),
    Footer: forwardRef<HTMLDivElement, FlyoutFooterProps>(FlyoutFooter),
    Body: forwardRef<HTMLDivElement, FlyoutBodyProps>(FlyoutBody),
};
