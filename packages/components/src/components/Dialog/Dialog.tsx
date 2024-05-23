/* (c) Copyright Frontify Ltd., all rights reserved. */

/* (c) Copyright Frontify Ltd., all rights reserved. */
import { IconCross } from '@frontify/fondue-icons';
import * as RadixDialog from '@radix-ui/react-dialog';
import { forwardRef, type CSSProperties, type ForwardedRef, type ReactNode } from 'react';

import {
    dialogBodyStyles,
    dialogContentStyles,
    dialogFooterStyles,
    dialogHeaderStyles,
    dialogSideContentStyles,
    dialogUnderlayStyles,
} from './styles/DialogStyles';

export type DialogRootProps = {
    /**
     * Disable Interaction with the rest of the page
     * @default false
     */
    modal?: boolean;
    /**
     * The controlled `open` state of the Dialog
     */
    open?: boolean;
    /**
     * callback when the open state changes
     */
    onOpenChange?: (open: boolean) => void;
    children?: ReactNode;
};

export type DialogContentProps = {
    /**
     * Add rounded corners to the Dialog
     * @default true
     */
    rounded?: boolean;
    /**
     * Define the padding of the Dialog
     * @default compact
     */
    padding?: 'compact' | 'comfortable' | 'spacious';
    /**
     * Override the `800px` maximum width of the Dialog
     * @default 800px
     */
    maxWidth?: string;
    /**
     * Override the `400px` maximum width of the Dialog
     * @default 400px
     */
    minWidth?: string;
    /**
     * Override the `200px` maximum width of the Dialog
     * @default 200px
     */
    minHeight?: string;
    /**
     * Show a dark underlay behind the Dialog
     * @default false
     */
    showUnderlay?: boolean;
    children?: ReactNode;
    'data-test-id'?: string;
};

export type DialogTriggerProps = { children?: ReactNode; 'data-test-id'?: string };

export type DialogHeaderProps = {
    /**
     * Show a close button in the header
     * @default false
     */
    showCloseButton?: boolean;
    children?: ReactNode;
    'data-test-id'?: string;
};

export type DialogFooterProps = { children?: ReactNode; 'data-test-id'?: string };

export type DialogBodyProps = { children?: ReactNode; 'data-test-id'?: string };

export type SideContentProps = { children?: ReactNode; 'data-test-id'?: string };

export const DialogRoot = ({ children, ...props }: DialogRootProps) => {
    return <RadixDialog.Root {...props}>{children}</RadixDialog.Root>;
};
DialogRoot.displayName = 'Dialog.Root';

export const DialogTrigger = (
    { children, 'data-test-id': dataTestId = 'fondue-Dialog-trigger' }: DialogTriggerProps,
    ref: ForwardedRef<HTMLButtonElement>,
) => {
    return (
        <RadixDialog.Trigger data-test-id={dataTestId} asChild ref={ref}>
            {children}
        </RadixDialog.Trigger>
    );
};
DialogTrigger.displayName = 'Dialog.Trigger';

export const DialogContent = (
    {
        maxWidth = '800px',
        minWidth = '400px',
        minHeight = '200px',
        padding = 'compact',
        'data-test-id': dataTestId = 'fondue-Dialog-content',
        showUnderlay = false,
        children,
        ...props
    }: DialogContentProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    return (
        <RadixDialog.Portal>
            <RadixDialog.Overlay className={dialogUnderlayStyles({ showUnderlay })} />
            <RadixDialog.Content
                style={
                    {
                        '--dialog-max-width': maxWidth,
                        '--dialog-min-width': minWidth,
                        '--dialog-min-height': minHeight,
                    } as CSSProperties
                }
                ref={ref}
                className={dialogContentStyles({ ...props })}
                data-dialog-spacing={padding}
                data-test-id={dataTestId}
                {...props}
            >
                {children}
            </RadixDialog.Content>
        </RadixDialog.Portal>
    );
};
DialogContent.displayName = 'Dialog.Content';

export const DialogHeader = (
    { showCloseButton, children, 'data-test-id': dataTestId = 'fondue-Dialog-header' }: DialogHeaderProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    return (
        <div data-test-id={dataTestId} ref={ref} className={dialogHeaderStyles} data-dialog-layout-component>
            <div>{children}</div>
            {showCloseButton && (
                <RadixDialog.Close className="tw-cursor-pointer">
                    <IconCross size={20} />
                </RadixDialog.Close>
            )}
        </div>
    );
};
DialogHeader.displayName = 'Dialog.Header';

export const DialogFooter = (
    { children, 'data-test-id': dataTestId = 'fondue-Dialog-footer' }: DialogFooterProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    return (
        <div data-test-id={dataTestId} ref={ref} className={dialogFooterStyles} data-dialog-layout-component>
            {children}
        </div>
    );
};
DialogFooter.displayName = 'Dialog.Footer';

export const DialogBody = (
    { children, 'data-test-id': dataTestId = 'fondue-Dialog-body' }: DialogBodyProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    return (
        <div data-test-id={dataTestId} ref={ref} className={dialogBodyStyles} data-dialog-layout-component>
            {children}
        </div>
    );
};
DialogBody.displayName = 'Dialog.Body';

export const SideContent = (
    { children, 'data-test-id': dataTestId = 'fondue-Dialog-body' }: DialogBodyProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    return (
        <div data-test-id={dataTestId} ref={ref} className={dialogSideContentStyles} data-dialog-layout-component>
            {children}
        </div>
    );
};
SideContent.displayName = 'Dialog.SideContent';

export const Dialog = {
    Root: DialogRoot,
    Trigger: forwardRef<HTMLButtonElement, DialogTriggerProps>(DialogTrigger),
    Content: forwardRef<HTMLDivElement, DialogContentProps>(DialogContent),
    Header: forwardRef<HTMLDivElement, DialogHeaderProps>(DialogHeader),
    Footer: forwardRef<HTMLDivElement, DialogFooterProps>(DialogFooter),
    Body: forwardRef<HTMLDivElement, DialogBodyProps>(DialogBody),
    SideContent: forwardRef<HTMLDivElement, SideContentProps>(SideContent),
};
