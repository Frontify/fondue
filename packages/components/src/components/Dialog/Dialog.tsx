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
} from './styles/dialogStyles';

export type DialogRootProps = {
    /**
     * Disable interaction with the rest of the page
     * @default false
     */
    modal?: boolean;
    /**
     * The controlled `open` state of the dialog
     * @default false
     */
    open?: boolean;
    /**
     * Event handler called when the `open` state changes
     */
    onOpenChange?: (open: boolean) => void;
    children?: ReactNode;
};

export type DialogContentProps = {
    /**
     * Add rounded corners to the dialog
     * @default true
     */
    rounded?: boolean;
    /**
     * Define the padding of the dialog
     * @default "compact"
     */
    padding?: 'compact' | 'comfortable' | 'spacious';
    /**
     * Define a maximum width for the dialog
     * @default "800px"
     */
    maxWidth?: string;
    /**
     * Define a minimum width for the dialog
     * @default "400px"
     */
    minWidth?: string;
    /**
     * Define a maximum height for the dialog
     * @default "200px"
     */
    minHeight?: string;
    /**
     * Show a dark underlay behind the dialog
     * @default false
     */
    showUnderlay?: boolean;
    children?: ReactNode;
    'data-test-id'?: string;
};

export type DialogTriggerProps = { children?: ReactNode; 'data-test-id'?: string };

export type DialogHeaderProps = {
    children?: ReactNode;
    'data-test-id'?: string;
};

export type DialogFooterProps = { children?: ReactNode; 'data-test-id'?: string };

export type DialogBodyProps = { children?: ReactNode; 'data-test-id'?: string };

export type DialogSideContentProps = { children?: ReactNode; 'data-test-id'?: string };

export type DialogCloseProps = { children?: ReactNode };

export type DialogAnnouncementProps = { children?: ReactNode; asChild?: boolean };

export const DialogRoot = ({ children, ...props }: DialogRootProps) => {
    return <RadixDialog.Root {...props}>{children}</RadixDialog.Root>;
};
DialogRoot.displayName = 'Dialog.Root';

export const DialogTrigger = (
    { children, 'data-test-id': dataTestId = 'fondue-dialog-trigger' }: DialogTriggerProps,
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
        'data-test-id': dataTestId = 'fondue-dialog-content',
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
    { children, 'data-test-id': dataTestId = 'fondue-dialog-header' }: DialogHeaderProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    return (
        <div data-test-id={dataTestId} ref={ref} className={dialogHeaderStyles} data-dialog-layout-component>
            <div>{children}</div>
            <RadixDialog.Close role="button" data-test-id={`${dataTestId}-close`} className="tw-cursor-pointer">
                <IconCross size={20} />
            </RadixDialog.Close>
        </div>
    );
};
DialogHeader.displayName = 'Dialog.Header';

export const DialogFooter = (
    { children, 'data-test-id': dataTestId = 'fondue-dialog-footer' }: DialogFooterProps,
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
    { children, 'data-test-id': dataTestId = 'fondue-dialog-body' }: DialogBodyProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    return (
        <div data-test-id={dataTestId} ref={ref} className={dialogBodyStyles} data-dialog-layout-component>
            {children}
        </div>
    );
};
DialogBody.displayName = 'Dialog.Body';

export const DialogSideContent = (
    { children, 'data-test-id': dataTestId = 'fondue-dialog-side-content' }: DialogSideContentProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    return (
        <div data-test-id={dataTestId} ref={ref} className={dialogSideContentStyles} data-dialog-layout-component>
            {children}
        </div>
    );
};
DialogSideContent.displayName = 'Dialog.SideContent';

export const DialogClose = ({ children }: DialogCloseProps) => {
    return <RadixDialog.Close asChild>{children}</RadixDialog.Close>;
};
DialogClose.displayName = 'Dialog.Close';

export const DialogTitle = ({ children, asChild }: DialogAnnouncementProps) => {
    return <RadixDialog.Title asChild={asChild}>{children}</RadixDialog.Title>;
};
DialogTitle.displayName = 'Dialog.Title';

export const DialogDescription = ({ children, asChild }: DialogAnnouncementProps) => {
    return <RadixDialog.Description asChild={asChild}>{children}</RadixDialog.Description>;
};
DialogDescription.displayName = 'Dialog.Description';

export const Dialog = {
    Root: DialogRoot,
    Title: DialogTitle,
    Description: DialogDescription,
    Close: DialogClose,
    Trigger: forwardRef<HTMLButtonElement, DialogTriggerProps>(DialogTrigger),
    Content: forwardRef<HTMLDivElement, DialogContentProps>(DialogContent),
    Header: forwardRef<HTMLDivElement, DialogHeaderProps>(DialogHeader),
    Footer: forwardRef<HTMLDivElement, DialogFooterProps>(DialogFooter),
    Body: forwardRef<HTMLDivElement, DialogBodyProps>(DialogBody),
    SideContent: forwardRef<HTMLDivElement, DialogSideContentProps>(DialogSideContent),
};
