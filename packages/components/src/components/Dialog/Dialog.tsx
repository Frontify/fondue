/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCross } from '@frontify/fondue-icons';
import * as RadixDialog from '@radix-ui/react-dialog';
import { createContext, forwardRef, useContext, type CSSProperties, type ForwardedRef, type ReactNode } from 'react';

import { addAutoFocusAttribute, addShowFocusRing } from '#/utilities/domUtilities';

import styles from './styles/dialog.module.scss';

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
    padding?: 'none' | 'tight' | 'compact' | 'comfortable' | 'spacious';
    /**
     * The vertical alignment of the divider
     * @default "center"
     */
    verticalAlign?: 'top' | 'center';

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
     * Define a minimum height for the dialog
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

export type DialogTriggerProps = {
    /**
     * Change the default rendered element for the one passed as a child, merging their props and behavior.
     * @default true
     */
    asChild?: boolean;
    children?: ReactNode;
    'data-test-id'?: string;
};

export type DialogHeaderProps = {
    /**
     * Show a border at the bottom of the header
     * @default true
     */
    showBorder?: boolean;
    /**
     * Show a close button in the header
     * @default true
     */
    showCloseButton?: boolean;
    children?: ReactNode;
    'data-test-id'?: string;
};

export type DialogFooterProps = {
    /**
     * Show a border at the top of the footer
     * @default true
     */
    showBorder?: boolean;
    children?: ReactNode;
    'data-test-id'?: string;
};

export type DialogBodyProps = { children?: ReactNode; 'data-test-id'?: string };

export type DialogSideContentProps = { children?: ReactNode; 'data-test-id'?: string };

export type DialogCloseProps = { children?: ReactNode };

export type DialogAnnouncementProps = { children?: ReactNode; asChild?: boolean };

type DialogContextType = {
    isModal: boolean;
};

const DialogContext = createContext<DialogContextType>({ isModal: false });

export const DialogRoot = ({ children, ...props }: DialogRootProps) => {
    return (
        <DialogContext.Provider value={{ isModal: props.modal ?? false }}>
            <RadixDialog.Root {...props}>{children}</RadixDialog.Root>
        </DialogContext.Provider>
    );
};
DialogRoot.displayName = 'Dialog.Root';

export const DialogTrigger = (
    { asChild = true, children, 'data-test-id': dataTestId = 'fondue-dialog-trigger', ...props }: DialogTriggerProps,
    ref: ForwardedRef<HTMLButtonElement>,
) => {
    return (
        <RadixDialog.Trigger
            onMouseDown={addAutoFocusAttribute}
            data-auto-focus-visible="true"
            data-auto-focus-trigger
            data-test-id={dataTestId}
            asChild={asChild}
            ref={ref}
            {...props}
        >
            {children}
        </RadixDialog.Trigger>
    );
};
DialogTrigger.displayName = 'Dialog.Trigger';

const DialogUnderlay = ({ children, showUnderlay }: { children: ReactNode; showUnderlay: boolean }) => {
    const { isModal } = useContext(DialogContext);
    if (isModal) {
        return (
            <RadixDialog.Overlay data-visible={showUnderlay} className={styles.underlay}>
                {children}
            </RadixDialog.Overlay>
        );
    }
    return (
        <div className={styles.underlay} data-visible={showUnderlay}>
            {children}
        </div>
    );
};

export const DialogContent = (
    {
        maxWidth = '800px',
        minWidth = '400px',
        minHeight = '200px',
        padding = 'compact',
        verticalAlign = 'center',
        'data-test-id': dataTestId = 'fondue-dialog-content',
        showUnderlay = false,
        children,
        rounded = true,
        ...props
    }: DialogContentProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    return (
        <RadixDialog.Portal>
            <DialogUnderlay showUnderlay={showUnderlay}>
                <RadixDialog.Content
                    style={
                        {
                            '--dialog-max-width': maxWidth,
                            '--dialog-min-width': minWidth,
                            '--dialog-min-height': minHeight,
                        } as CSSProperties
                    }
                    ref={ref}
                    className={styles.content}
                    onFocus={addShowFocusRing}
                    data-dialog-rounded={rounded}
                    data-dialog-spacing={padding}
                    data-test-id={dataTestId}
                    data-dialog-vertical-align={verticalAlign}
                    {...props}
                >
                    {children}
                </RadixDialog.Content>
            </DialogUnderlay>
        </RadixDialog.Portal>
    );
};
DialogContent.displayName = 'Dialog.Content';

export const DialogHeader = (
    {
        children,
        showBorder = true,
        showCloseButton = true,
        'data-test-id': dataTestId = 'fondue-dialog-header',
    }: DialogHeaderProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    return (
        <div
            data-test-id={dataTestId}
            ref={ref}
            className={styles.header}
            data-show-border={showBorder}
            data-dialog-layout-component
        >
            <div>{children}</div>
            {showCloseButton && (
                <RadixDialog.Close role="button" data-test-id={`${dataTestId}-close`} className="tw-cursor-pointer">
                    <IconCross size={20} />
                </RadixDialog.Close>
            )}
        </div>
    );
};
DialogHeader.displayName = 'Dialog.Header';

export const DialogFooter = (
    { showBorder = true, children, 'data-test-id': dataTestId = 'fondue-dialog-footer' }: DialogFooterProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    return (
        <div
            data-test-id={dataTestId}
            ref={ref}
            className={styles.footer}
            data-show-border={showBorder}
            data-dialog-layout-component
        >
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
        <div data-test-id={dataTestId} ref={ref} className={styles.body} data-dialog-layout-component>
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
        <div data-test-id={dataTestId} ref={ref} className={styles.sideContent} data-dialog-layout-component>
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
