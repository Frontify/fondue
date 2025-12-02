/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconArrowHook, IconCross } from '@frontify/fondue-icons';
import { type ForwardedRef, forwardRef, type MouseEvent, type ReactElement, type ReactNode } from 'react';

import { cn } from '#/utilities/styleUtilities';

import { useTranslation } from '../../hooks/useTranslation';

import styles from './styles/toast.module.scss';

export type ToastProps = {
    /**
     * The message content to display in the toast. Can also contain Toast.Action slots for custom actions
     */
    children: ReactNode;

    /**
     * Optional icon to display at the start of the toast
     */
    icon?: ReactNode;

    /**
     * Callback when the action button is clicked. When provided, displays an "Undo" button
     */
    onAction?: () => void;

    /**
     * Custom label for the action button. Defaults to "Undo"
     */
    actionLabel?: string;

    /**
     * Whether the toast can be dismissed with a close button
     */
    dismissible?: boolean;

    /**
     * Callback when the dismiss button is clicked
     */
    onDismiss?: (event?: MouseEvent<HTMLButtonElement>) => void;

    /**
     * Keyboard shortcut text to display (e.g., "^Z")
     */
    shortcut?: string;

    /**
     * Accessible label for the toast
     */
    'aria-label'?: string;

    /**
     * Test ID for the toast element
     */
    'data-test-id'?: string;
};

export type ToastActionProps = {
    /**
     * The content to display in the action slot
     */
    children: ReactNode;
    /**
     * Optional className for custom styling
     */
    className?: string;
};

const ToastRoot = (
    {
        children,
        icon,
        onAction,
        actionLabel,
        dismissible = false,
        onDismiss,
        shortcut,
        'aria-label': ariaLabel,
        'data-test-id': dataTestId = 'toast',
    }: ToastProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    const { t } = useTranslation();

    // Check if children contains Toast.Action slots
    const childrenArray = Array.isArray(children) ? children : [children];
    const hasActionSlots = childrenArray.some(
        (child) => child && typeof child === 'object' && 'type' in child && child.type === ToastAction,
    );

    // Extract message and action slots from children
    const messageContent: ReactNode[] = [];
    const actionSlots: ReactElement[] = [];

    childrenArray.forEach((child) => {
        if (child && typeof child === 'object' && 'type' in child && child.type === ToastAction) {
            actionSlots.push(child as ReactElement);
        } else {
            messageContent.push(child);
        }
    });

    // Render legacy props-based actions if no action slots are provided
    const legacyActions = !hasActionSlots && (shortcut || onAction || dismissible) && (
        <>
            {shortcut && (
                <span className={styles.shortcut} aria-label={t('Toast_shortcut', { key: shortcut })}>
                    {shortcut}
                </span>
            )}

            {onAction && (
                <button
                    type="button"
                    className={styles.button}
                    onClick={onAction}
                    aria-label={actionLabel || t('Toast_undo')}
                >
                    <IconArrowHook size={16} />
                    <span>{actionLabel || t('Toast_undo')}</span>
                </button>
            )}

            {dismissible && (
                <button
                    type="button"
                    className={styles.dismiss}
                    onClick={onDismiss}
                    aria-label={t('Toast_dismiss')}
                >
                    <IconCross size={16} />
                </button>
            )}
        </>
    );

    return (
        <div
            ref={ref}
            className={styles.root}
            role="alert"
            aria-live="polite"
            aria-label={ariaLabel}
            data-test-id={dataTestId}
        >
            {icon ? <div className={styles.icon}>{icon}</div> : null}

            <div className={styles.message}>{hasActionSlots ? messageContent : children}</div>

            {(hasActionSlots || legacyActions) && (
                <div className={styles.actions}>{hasActionSlots ? actionSlots : legacyActions}</div>
            )}
        </div>
    );
};

ToastRoot.displayName = 'Toast.Root';

export const ToastAction = (
    { children, className }: ToastActionProps,
    forwardedRef: ForwardedRef<HTMLDivElement>,
) => {
    return (
        <div data-toast-action ref={forwardedRef} className={cn(styles.action, className)}>
            {children}
        </div>
    );
};

ToastAction.displayName = 'Toast.Action';

const ForwardedRefToastRoot = forwardRef<HTMLDivElement, ToastProps>(ToastRoot);
const ForwardedRefToastAction = forwardRef<HTMLDivElement, ToastActionProps>(ToastAction);

/**
 * Toast component for displaying temporary notifications and messages
 *
 * @example
 * // Simple usage with built-in actions
 * <Toast icon={<IconCheck />} dismissible onDismiss={handleDismiss}>
 *   Message saved
 * </Toast>
 *
 * @example
 * // Advanced usage with custom action slots
 * <Toast.Root icon={<IconCheck />}>
 *   Message saved
 *   <Toast.Action>
 *     <Button onClick={handleUndo}>Undo</Button>
 *     <Button onClick={handleDismiss}>Dismiss</Button>
 *   </Toast.Action>
 * </Toast.Root>
 */
// @ts-expect-error We support both single component (without slots) and compound components (with slots)
export const Toast: typeof ToastRoot & {
    Root: typeof ForwardedRefToastRoot;
    Action: typeof ForwardedRefToastAction;
} = ForwardedRefToastRoot;
Toast.Root = ForwardedRefToastRoot;
Toast.Action = ForwardedRefToastAction;
