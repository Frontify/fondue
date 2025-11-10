/* (c) Copyright Frontify Ltd., all rights reserved. */

import { forwardRef, type ForwardedRef, type MouseEvent, type ReactNode } from 'react';

import styles from './styles/splitButton.module.scss';

type ButtonSize = 'small' | 'medium' | 'large';

type ButtonEmphasis = 'default' | 'weak' | 'strong';

export type SplitButtonProps = {
    /**
     * @default 'default'
     */
    emphasis?: ButtonEmphasis;
    /**
     * @default 'medium'
     */
    size?: ButtonSize;
    /**
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
     * Button type
     * @default 'button'
     */
    type?: 'button' | 'submit' | 'reset';
    /**
     * Click handler
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
     * Button title
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
     * Whether to rotate the icon 180 degrees when active (typically for caret icons)
     * @default true
     */
    rotateIcon?: boolean;
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

export const SplitButton = {
    Root: SplitButtonRoot,
    Content: SplitButtonContent,
    Action: SplitButtonAction,
};
