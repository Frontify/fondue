/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCross } from '@frontify/fondue-icons';
import * as RadixDialog from '@radix-ui/react-dialog';
import {
    createContext,
    forwardRef,
    useContext,
    useMemo,
    useRef,
    type CSSProperties,
    type ForwardedRef,
    type ReactNode,
} from 'react';

import { type CommonAriaProps } from '#/helpers/aria';
import { useSyncRefs } from '#/hooks/useSyncRefs';
import { useTranslation } from '#/hooks/useTranslation';
import { addAutoFocusAttribute, addShowFocusRing } from '#/utilities/domUtilities';

import { ThemeProvider, useFondueTheme } from '../ThemeProvider/ThemeProvider';

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
     * Define the padding for the dialog header
     */
    padding?: 'none' | 'tight' | 'compact' | 'comfortable' | 'spacious';
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
    closeProps?: CommonAriaProps;
    children?: ReactNode;
    'data-test-id'?: string;
};

export type DialogFooterProps = {
    /**
     * Define the padding for the dialog footer
     */
    padding?: 'none' | 'tight' | 'compact' | 'comfortable' | 'spacious';
    /**
     * Show a border at the top of the footer
     * @default true
     */
    showBorder?: boolean;
    children?: ReactNode;
    'data-test-id'?: string;
};

export type DialogBodyProps = {
    /**
     * Define the padding for the dialog body
     */
    padding?: 'none' | 'tight' | 'compact' | 'comfortable' | 'spacious';
    children?: ReactNode;
    'data-test-id'?: string;
};

export type DialogSideContentProps = { children?: ReactNode; 'data-test-id'?: string };

export type DialogCloseProps = { children?: ReactNode };

export type DialogAnnouncementProps = { children?: ReactNode; asChild?: boolean };

type DialogContextType = {
    isModal: boolean;
};

const DialogContext = createContext<DialogContextType>({ isModal: false });
DialogContext.displayName = 'DialogContext';

export const DialogRoot = ({ children, modal, onOpenChange, open }: DialogRootProps) => {
    const value = useMemo(() => ({ isModal: modal ?? false }), [modal]);

    return (
        <DialogContext.Provider value={value}>
            <RadixDialog.Root open={open} onOpenChange={onOpenChange} modal={modal}>
                {children}
            </RadixDialog.Root>
        </DialogContext.Provider>
    );
};
DialogRoot.displayName = 'Dialog.Root';

export const DialogTrigger = (
    { asChild = true, children, 'data-test-id': dataTestId = 'fondue-dialog-trigger' }: DialogTriggerProps,
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
        rounded = true,
        children,
    }: DialogContentProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    const { theme, dir } = useFondueTheme();
    const contentRef = useRef<HTMLDivElement>(null);

    useSyncRefs<HTMLDivElement>(contentRef, ref);

    const handleOpenAutoFocus = (event: Event) => {
        event.preventDefault();

        const focusableSelector =
            'button:not([data-tooltip-trigger="true"]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

        // Try to find focusable element in order: body -> footer -> header -> content
        const dialogBody = contentRef.current?.querySelector('[data-dialog-layout-component="body"]');
        const dialogFooter = contentRef.current?.querySelector('[data-dialog-layout-component="footer"]');
        const dialogHeader = contentRef.current?.querySelector('[data-dialog-layout-component="header"]');

        const firstFocusable =
            dialogBody?.querySelector(focusableSelector) ||
            dialogFooter?.querySelector(focusableSelector) ||
            dialogHeader?.querySelector(focusableSelector);

        if (firstFocusable instanceof HTMLElement) {
            firstFocusable.focus();
        } else if (contentRef.current) {
            // Fallback: focus the dialog content itself
            contentRef.current.focus();
        }
    };

    return (
        <RadixDialog.Portal>
            <ThemeProvider theme={theme} dir={dir}>
                <DialogUnderlay showUnderlay={showUnderlay}>
                    <RadixDialog.Content
                        style={
                            {
                                '--dialog-max-width': maxWidth,
                                '--dialog-min-width': minWidth,
                                '--dialog-min-height': minHeight,
                            } as CSSProperties
                        }
                        ref={contentRef}
                        className={styles.content}
                        onFocus={addShowFocusRing}
                        onOpenAutoFocus={handleOpenAutoFocus}
                        data-dialog-padding={padding}
                        data-dialog-rounded={rounded}
                        data-test-id={dataTestId}
                        data-dialog-vertical-align={verticalAlign}
                        dir={dir}
                    >
                        {children}
                    </RadixDialog.Content>
                </DialogUnderlay>
            </ThemeProvider>
        </RadixDialog.Portal>
    );
};
DialogContent.displayName = 'Dialog.Content';

export const DialogHeader = (
    {
        padding,
        showBorder = true,
        showCloseButton = true,
        closeProps,
        children,
        'data-test-id': dataTestId = 'fondue-dialog-header',
    }: DialogHeaderProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    const { t } = useTranslation();

    return (
        <div
            data-test-id={dataTestId}
            ref={ref}
            className={styles.header}
            data-dialog-header-padding={padding}
            data-show-border={showBorder}
            data-dialog-layout-component="header"
        >
            <div>{children}</div>
            {showCloseButton && (
                <RadixDialog.Close
                    role="button"
                    data-test-id={`${dataTestId}-close`}
                    className="tw-cursor-pointer"
                    aria-label={t('Dialog_close')}
                    {...closeProps}
                >
                    <IconCross size={20} />
                </RadixDialog.Close>
            )}
        </div>
    );
};
DialogHeader.displayName = 'Dialog.Header';

export const DialogFooter = (
    { padding, showBorder = true, children, 'data-test-id': dataTestId = 'fondue-dialog-footer' }: DialogFooterProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    return (
        <div
            data-test-id={dataTestId}
            ref={ref}
            className={styles.footer}
            data-dialog-footer-padding={padding}
            data-show-border={showBorder}
            data-dialog-layout-component="footer"
        >
            {children}
        </div>
    );
};
DialogFooter.displayName = 'Dialog.Footer';

export const DialogBody = (
    { padding, children, 'data-test-id': dataTestId = 'fondue-dialog-body' }: DialogBodyProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    return (
        <div
            data-test-id={dataTestId}
            ref={ref}
            className={styles.body}
            data-dialog-body-padding={padding}
            data-dialog-layout-component="body"
        >
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
