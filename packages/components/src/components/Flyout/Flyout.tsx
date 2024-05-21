/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as RadixPopover from '@radix-ui/react-popover';
import { forwardRef, type ForwardedRef, type ReactNode } from 'react';

import { flyoutContentStyles } from './styles/FlyoutStyles';

export type FlyoutRootProps = {
    /**
     * Disable Interaction with the rest of the page
     * @default false
     */
    modal?: boolean;
    /**
     * external control of the open state
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
     * @default true
     */
    rounded?: boolean;
    /**
     * @default bottom
     */
    side?: 'top' | 'right' | 'bottom' | 'left';
    /**
     * @default start
     */
    align?: 'start' | 'center' | 'end';
    children?: ReactNode;
};
export type FlyoutTriggerProps = { children?: ReactNode };

export const FlyoutRoot = ({ children }: FlyoutRootProps) => {
    return <RadixPopover.Root>{children}</RadixPopover.Root>;
};
FlyoutRoot.displayName = 'Flyout.Root';

export const FlyoutTrigger = ({ children }: FlyoutTriggerProps, ref: ForwardedRef<HTMLButtonElement>) => {
    return (
        <RadixPopover.Trigger asChild ref={ref}>
            {children}
        </RadixPopover.Trigger>
    );
};
FlyoutTrigger.displayName = 'Flyout.Trigger';

export const FlyoutContent = (
    { align = 'start', children, ...props }: FlyoutContentProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    return (
        <RadixPopover.Portal>
            <RadixPopover.Content
                ref={ref}
                align={align}
                sideOffset={8}
                className={flyoutContentStyles({ ...props })}
                {...props}
            >
                {children}
            </RadixPopover.Content>
        </RadixPopover.Portal>
    );
};
FlyoutContent.displayName = 'Flyout.Content';

export const Flyout = {
    Root: FlyoutRoot,
    Trigger: forwardRef<HTMLButtonElement, FlyoutTriggerProps>(FlyoutTrigger),
    Content: forwardRef<HTMLDivElement, FlyoutContentProps>(FlyoutContent),
};
