/* (c) Copyright Frontify Ltd., all rights reserved. */

import { forwardRef, type ForwardedRef, type MouseEvent, type ReactNode } from 'react';

import styles from './styles/button.module.scss';

type ButtonRounding = 'medium' | 'full';

type ButtonStyle = 'default' | 'positive' | 'negative' | 'danger' | 'loud';

type ButtonSize = 'small' | 'medium' | 'large';

type ButtonType = 'button' | 'submit' | 'reset';

type ButtonEmphasis = 'default' | 'weak' | 'strong';

type ButtonAspect = 'default' | 'square';

export type ButtonProps = {
    /**
     * The HTML button type. Use `'submit'` for form submission, `'reset'` to clear form fields, `'button'` for general actions.
     * @default "button"
     */
    type?: ButtonType;
    /**
     * @default null
     */
    title?: string;
    /**
     * Conveys the tone of the action. `'default'` for neutral actions, `'positive'` for confirmations like "Approve", `'negative'` for cautionary actions like "Cancel", `'danger'` for irreversible actions like "Delete", `'loud'` for high-visibility actions — use sparingly.
     * @default "default"
     */
    variant?: ButtonStyle;
    /**
     * Controls visual hierarchy. `'strong'` for primary actions, `'default'` for common actions, `'weak'` for secondary or less prominent options.
     * @default "strong"
     */
    emphasis?: ButtonEmphasis;
    /**
     * Controls the button size. `'small'` for tight spaces or lower priority, `'medium'` for most layouts, `'large'` for prominent actions.
     * @default "medium"
     */
    size?: ButtonSize;
    /**
     * Controls border radius. `'medium'` for standard buttons, `'full'` for pill-shaped buttons.
     * @default "medium"
     */
    rounding?: ButtonRounding;
    /**
     * @default false
     */
    disabled?: boolean;
    /**
     * Controls the aspect ratio. `'default'` for standard buttons with label, `'square'` for icon-only buttons.
     * @default "default"
     */
    aspect?: ButtonAspect;
    /**
     * When `true`, the button sizes to fit its content. When `false`, the button expands to fill its container width. Use full-width sparingly — it works well on mobile or at the bottom of forms.
     * @default true
     */
    hugWidth?: boolean;
    children?: ReactNode;
    /**
     * Callback fired when the button is pressed.
     */
    onPress?: (event?: MouseEvent<HTMLButtonElement>) => void;
    form?: string;
    'aria-label'?: string;
    'aria-describedby'?: string;
    'data-test-id'?: string;
    className?: string;
};

export const Button = forwardRef<HTMLButtonElement | null, ButtonProps>(
    (
        {
            children,
            type = 'button',
            variant = 'default',
            size = 'medium',
            emphasis = 'strong',
            rounding = 'medium',
            aspect = 'default',
            form,
            'data-test-id': dataTestId = 'fondue-button',
            className = '',
            onPress = () => {},
            hugWidth = true,
            ...props
        }: ButtonProps,
        ref: ForwardedRef<HTMLButtonElement | null>,
    ) => {
        return (
            <button
                ref={ref}
                type={type}
                form={form}
                data-test-id={dataTestId}
                className={[styles.root, className].filter(Boolean).join(' ')}
                data-variant={variant}
                data-size={size}
                data-emphasis={emphasis}
                data-rounding={rounding}
                data-aspect={aspect}
                data-hug-width={String(hugWidth)}
                {...props}
                onClick={(event) => {
                    // @ts-expect-error - Allows other components who use Button as a trigger to pass an action
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                    props.onClick?.(event);
                    onPress?.(event);
                }}
            >
                {children}
            </button>
        );
    },
);

Button.displayName = 'Button';
