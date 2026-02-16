/* (c) Copyright Frontify Ltd., all rights reserved. */

import { forwardRef, type ForwardedRef, type MouseEvent, type ReactNode } from 'react';

import styles from './styles/splitButton.module.scss';

type ButtonSize = 'small' | 'medium' | 'large';

type ButtonEmphasis = 'default' | 'weak' | 'strong';

export type SplitButtonProps = {
    /**
     * Controls the visual prominence. `'default'` for standard actions, `'weak'` for secondary options, `'strong'` for primary calls to action.
     * @default 'default'
     */
    emphasis?: ButtonEmphasis;
    /**
     * Controls the button size. `'small'` for toolbars, `'medium'` for most layouts, `'large'` for prominent actions.
     * @default 'medium'
     */
    size?: ButtonSize;
    /**
     * Prevents interaction and dims the entire button group visually.
     * @default false
     */
    disabled?: boolean;
    /**
     * Accessible label for the button group
     */
    'aria-label'?: string;
    /**
     * Test ID for the root element
     */
    'data-test-id'?: string;
    children: ReactNode;
};

export type SplitButtonContentProps = {
    /**
     * The HTML button type. Use `'submit'` inside forms, `'button'` (default) everywhere else.
     * @default 'button'
     */
    type?: 'button' | 'submit' | 'reset';
    /**
     * Prevents interaction with the primary button independently of the root `disabled` state.
     * @default false
     */
    disabled?: boolean;
    /**
     * Callback fired when the primary button is clicked.
     */
    onPress?: (event?: MouseEvent<HTMLButtonElement>) => void;
    /**
     * Accessible label
     */
    'aria-label'?: string;
    /**
     * Accessible description
     */
    'aria-describedby'?: string;
    /**
     * Test ID for the content section
     */
    'data-test-id'?: string;
    /**
     * Tooltip text shown on hover.
     */
    title?: string;
    children: ReactNode;
};

export type SplitButtonActionProps = {
    /**
     * Accessible label
     */
    'aria-label'?: string;
    /**
     * Test ID for the action slot
     */
    'data-test-id'?: string;
    /**
     * When `true`, rotates the child icon 180° when the action is active — typically used with a caret icon to indicate an open dropdown.
     * @default true
     */
    rotateIcon?: boolean;
    children: ReactNode;
};

export type SplitButtonActionButtonProps = {
    /**
     * The HTML button type. Use `'submit'` inside forms, `'button'` (default) everywhere else.
     * @default 'button'
     */
    type?: 'button' | 'submit' | 'reset';
    /**
     * Prevents interaction with the action button independently of the root `disabled` state.
     * @default false
     */
    disabled?: boolean;
    /**
     * Accessible label
     */
    'aria-label'?: string;
    /**
     * Accessible description
     */
    'aria-describedby'?: string;
    /**
     * Test ID for the action button
     */
    'data-test-id'?: string;
    /**
     * Tooltip text shown on hover.
     */
    title?: string;
    children: ReactNode;
};

export const SplitButtonRoot = forwardRef<HTMLDivElement, SplitButtonProps>(
    (
        {
            'aria-label': ariaLabel,
            'data-test-id': dataTestId = 'split-button',
            children,
            disabled = false,
            emphasis = 'default',
            size = 'medium',
        }: SplitButtonProps,
        ref: ForwardedRef<HTMLDivElement>,
    ) => {
        return (
            <div
                ref={ref}
                role="group"
                aria-label={ariaLabel}
                data-test-id={dataTestId}
                data-component="split-button"
                data-emphasis={emphasis}
                data-size={size}
                data-disabled={disabled}
                className={styles.root}
            >
                {children}
            </div>
        );
    },
);
SplitButtonRoot.displayName = 'SplitButton.Root';

export const SplitButtonContent = forwardRef<HTMLButtonElement, SplitButtonContentProps>(
    (
        {
            'aria-label': ariaLabel,
            'aria-describedby': ariaDescribedby,
            'data-test-id': dataTestId = 'split-button-content',
            children,
            disabled = false,
            onPress,
            title,
            type = 'button',
        }: SplitButtonContentProps,
        ref: ForwardedRef<HTMLButtonElement>,
    ) => {
        return (
            <button
                ref={ref}
                type={type}
                disabled={disabled}
                aria-label={ariaLabel}
                aria-describedby={ariaDescribedby}
                title={title}
                data-test-id={dataTestId}
                className={styles.content}
                onClick={onPress}
            >
                {children}
            </button>
        );
    },
);
SplitButtonContent.displayName = 'SplitButton.Content';

export const SplitButtonAction = ({
    'aria-label': ariaLabel,
    'data-test-id': dataTestId = 'split-button-action',
    rotateIcon = true,
    children,
}: SplitButtonActionProps) => {
    return (
        <div aria-label={ariaLabel} data-test-id={dataTestId} data-rotate-icon={rotateIcon} className={styles.action}>
            {children}
        </div>
    );
};
SplitButtonAction.displayName = 'SplitButton.Action';

export const SplitButtonActionButton = forwardRef<HTMLButtonElement, SplitButtonActionButtonProps>(
    (
        {
            'aria-label': ariaLabel,
            'aria-describedby': ariaDescribedby,
            'data-test-id': dataTestId = 'split-button-action-button',
            children,
            disabled = false,
            title,
            type = 'button',
            ...props
        },
        ref,
    ) => {
        return (
            <button
                ref={ref}
                type={type}
                disabled={disabled}
                aria-label={ariaLabel}
                aria-describedby={ariaDescribedby}
                title={title}
                data-test-id={dataTestId}
                className={styles.actionButton}
                {...props}
            >
                {children}
            </button>
        );
    },
);
SplitButtonActionButton.displayName = 'SplitButton.ActionButton';

/** A two-part button — compose `Root` with a primary `Content` button and a secondary `Action` with an `ActionButton` trigger. */
export const SplitButton = {
    Root: SplitButtonRoot,
    Content: SplitButtonContent,
    Action: SplitButtonAction,
    ActionButton: SplitButtonActionButton,
};
