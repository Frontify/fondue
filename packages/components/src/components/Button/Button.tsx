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
     * @default "button"
     */
    type?: ButtonType;
    /**
     * @default null
     */
    title?: string;
    /**
     * @default "default"
     */
    variant?: ButtonStyle;
    /**
     * @default "strong"
     */
    emphasis?: ButtonEmphasis;
    /**
     * @default "medium"
     */
    size?: ButtonSize;
    /**
     * @default "medium"
     */
    rounding?: ButtonRounding;
    /**
     * @default false
     */
    disabled?: boolean;
    /**
     * @default "default"
     */
    aspect?: ButtonAspect;
    /**
     * @default true
     */
    hugWidth?: boolean;
    children?: ReactNode;
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
