/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCross } from '@frontify/fondue-icons';
import * as RadixPopover from '@radix-ui/react-popover';
import { forwardRef, type CSSProperties, type ForwardedRef, type ReactNode } from 'react';

import { flyoutBodyStyles, flyoutContentStyles, flyoutFooterStyles, flyoutHeaderStyles } from './styles/FlyoutStyles';

export type FlyoutRootProps = {
    /**
     * Disable Interaction with the rest of the page
     * @default false
     */
    modal?: boolean;
    /**
     * The controlled `open` state of the flyout
     */
    open?: boolean;
    /**
     * callback when the open state changes
     */
    onOpenChange?: (open: boolean) => void;
    children?: ReactNode;
};

export type FlyoutContentProps = {
    /**
     * Add rounded corners to the flyout
     * @default true
     */
    rounded?: boolean;
    /**
     * Define the preffered side of the flyout. Can be overriden by viewport collisions viewport.
     * @default bottom
     */
    side?: 'top' | 'right' | 'bottom' | 'left';
    /**
     * Define the preffered alignment of the flyout. Can be overriden by viewport collisions viewport.
     * @default start
     */
    align?: 'start' | 'center' | 'end';
    /**
     * Define the padding of the flyout
     * @default compact
     */
    padding?: 'compact' | 'comfortable' | 'spacious';
    /**
     * Override the `360px` maximum width of the flyout
     * @default 360px
     */
    maxWidth?: string;
    children?: ReactNode;
    'data-test-id'?: string;
};

export type FlyoutTriggerProps = { children?: ReactNode; 'data-test-id'?: string };

export type FlyoutHeaderProps = {
    /**
     * Show a close button in the header
     * @default false
     */
    showCloseButton?: boolean;
    children?: ReactNode;
    'data-test-id'?: string;
};

export type FlyoutFooterProps = { children?: ReactNode; 'data-test-id'?: string };

export type FlyoutBodyProps = { children?: ReactNode; 'data-test-id'?: string };

export const FlyoutRoot = ({ children, ...props }: FlyoutRootProps) => {
    return <RadixPopover.Root {...props}>{children}</RadixPopover.Root>;
};
FlyoutRoot.displayName = 'Flyout.Root';

export const FlyoutTrigger = (
    { children, 'data-test-id': dataTestId = 'fondue-flyout-trigger' }: FlyoutTriggerProps,
    ref: ForwardedRef<HTMLButtonElement>,
) => {
    return (
        <RadixPopover.Trigger data-test-id={dataTestId} asChild ref={ref}>
            {children}
        </RadixPopover.Trigger>
    );
};
FlyoutTrigger.displayName = 'Flyout.Trigger';

export const FlyoutContent = (
    {
        align = 'start',
        maxWidth = '360px',
        padding = 'compact',
        'data-test-id': dataTestId = 'fondue-flyout-content',
        children,
        ...props
    }: FlyoutContentProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    return (
        <RadixPopover.Portal>
            <RadixPopover.Content
                style={
                    {
                        '--flyout-max-width': maxWidth,
                    } as CSSProperties
                }
                ref={ref}
                align={align}
                collisionPadding={8}
                sideOffset={8}
                className={flyoutContentStyles({ ...props })}
                data-flyout-spacing={padding}
                data-test-id={dataTestId}
                {...props}
            >
                {children}
            </RadixPopover.Content>
        </RadixPopover.Portal>
    );
};
FlyoutContent.displayName = 'Flyout.Content';

export const FlyoutHeader = (
    { showCloseButton, children, 'data-test-id': dataTestId = 'fondue-flyout-header' }: FlyoutHeaderProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    return (
        <div data-test-id={dataTestId} ref={ref} className={flyoutHeaderStyles}>
            <div>{children}</div>
            {showCloseButton && (
                <RadixPopover.Close className="tw-cursor-pointer">
                    <IconCross size={20} />
                </RadixPopover.Close>
            )}
        </div>
    );
};

export const FlyoutFooter = (
    { children, 'data-test-id': dataTestId = 'fondue-flyout-footer' }: FlyoutFooterProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    return (
        <div data-test-id={dataTestId} ref={ref} className={flyoutFooterStyles}>
            {children}
        </div>
    );
};

export const FlyoutBody = (
    { children, 'data-test-id': dataTestId = 'fondue-flyout-body' }: FlyoutBodyProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    return (
        <div data-test-id={dataTestId} ref={ref} data-flyout-spacing="compact" className={flyoutBodyStyles}>
            {children}
        </div>
    );
};

export const Flyout = {
    Root: FlyoutRoot,
    Trigger: forwardRef<HTMLButtonElement, FlyoutTriggerProps>(FlyoutTrigger),
    Content: forwardRef<HTMLDivElement, FlyoutContentProps>(FlyoutContent),
    Header: forwardRef<HTMLDivElement, FlyoutHeaderProps>(FlyoutHeader),
    Footer: forwardRef<HTMLDivElement, FlyoutFooterProps>(FlyoutFooter),
    Body: forwardRef<HTMLDivElement, FlyoutBodyProps>(FlyoutBody),
};
