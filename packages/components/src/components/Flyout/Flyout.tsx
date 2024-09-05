/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCross } from '@frontify/fondue-icons';
import * as RadixPopover from '@radix-ui/react-popover';
import { forwardRef, useRef, type CSSProperties, type ForwardedRef, type ReactNode } from 'react';

import { usePreventDropdownOverflow } from '#/hooks/usePreventDropdownOverflow';
import { addAutoFocusAttribute, addShowFocusRing, syncRefs } from '#/utilities/domUtilities';

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

export type FlyoutContentProps = {
    /**
     * Add rounded corners to the flyout
     * @default true
     */
    rounded?: boolean;
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
     * Define the maximum width of the flyout
     * @default "360px"
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
        <RadixPopover.Trigger
            onMouseDown={addAutoFocusAttribute}
            data-auto-focus-visible="true"
            data-auto-focus-trigger
            data-test-id={dataTestId}
            asChild
            ref={ref}
        >
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
        rounded,
        ...props
    }: FlyoutContentProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    const localRef = useRef(null);

    const { setMaxHeight } = usePreventDropdownOverflow(localRef);

    return (
        <RadixPopover.Portal>
            <RadixPopover.Content
                style={
                    {
                        '--flyout-max-width': maxWidth,
                    } as CSSProperties
                }
                ref={localRef}
                align={align}
                collisionPadding={8}
                sideOffset={8}
                onOpenAutoFocus={() => {
                    setMaxHeight();
                    syncRefs(localRef, ref);
                }}
                onCloseAutoFocus={() => {
                    syncRefs(localRef, ref);
                }}
                className={styles.root}
                data-flyout-spacing={padding}
                data-rounded={rounded}
                data-test-id={dataTestId}
                onFocus={addShowFocusRing}
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
        <div data-test-id={dataTestId} ref={ref} className={styles.header}>
            <div>{children}</div>
            {showCloseButton && (
                <RadixPopover.Close role="button" data-test-id={`${dataTestId}-close`} className={styles.close}>
                    <IconCross size={20} />
                </RadixPopover.Close>
            )}
        </div>
    );
};
FlyoutHeader.displayName = 'Flyout.Header';

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

export const FlyoutBody = (
    { children, 'data-test-id': dataTestId = 'fondue-flyout-body' }: FlyoutBodyProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    return (
        <div data-test-id={dataTestId} ref={ref} data-flyout-spacing="compact" className={styles.body}>
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
