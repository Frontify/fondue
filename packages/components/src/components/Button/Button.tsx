/* (c) Copyright Frontify Ltd., all rights reserved. */

import { cloneElement, forwardRef, type ForwardedRef, type MouseEvent, type ReactElement, type ReactNode } from 'react';

import { cn } from '#/utilities/styleUtilities';
import { buttonIconSizeMap, buttonStyles } from './styles/buttonStyles';
import { iconStyles } from './styles/iconStyles';
import { textStyles } from './styles/textStyles';

type ButtonRounding = 'medium' | 'full';

type ButtonStyle = 'default' | 'positive' | 'negative' | 'danger' | 'loud';

type ButtonSize = 'small' | 'medium' | 'large';

type ButtonType = 'button' | 'submit' | 'reset';

type ButtonEmphasis = 'default' | 'weak' | 'strong';

type ButtonAspect = 'default' | 'square';

export type ButtonProps = {
    /**
     * @default null
     */
    type?: ButtonType;
    /**
     * @default null
     */
    title?: string;
    /**
     * @default 'default'
     */
    style?: ButtonStyle;
    /**
     * @default 'strong'
     */
    emphasis?: ButtonEmphasis;
    /**
     * @default 'medium'
     */
    size?: ButtonSize;
    /**
     * @default 'medium'
     */
    rounding?: ButtonRounding;
    /**
     * @default false
     */
    disabled?: boolean;
    /**
     * @default 'default'
     */
    aspect?: ButtonAspect;
    /**
     * @default true
     */
    hugWidth?: boolean;
    /**
     * @deprecated please pass the Icon as a child and use the `aspect` prop
     */
    icon?: ReactElement;
    children?: ReactNode;
    onClick?: (event?: MouseEvent<HTMLButtonElement>) => void;
    'aria-label'?: string;
    'aria-describedby'?: string;
    'data-test-id'?: string;
    className?: string;
};

export const Button = forwardRef<HTMLButtonElement | null, ButtonProps>(
    (
        {
            icon,
            children,
            style,
            size = 'medium',
            'data-test-id': dataTestId = 'fondue-button',
            className = '',
            ...props
        }: ButtonProps,
        ref: ForwardedRef<HTMLButtonElement | null>,
    ) => {
        return (
            <button
                ref={ref}
                data-test-id={dataTestId}
                className={cn(
                    buttonStyles({
                        size,
                        style,
                        ...props,
                    }),
                    textStyles({ style, ...props }),
                    iconStyles({
                        style,
                        ...props,
                    }),
                    className,
                )}
                {...props}
            >
                {icon && (
                    <span data-test-id={`${dataTestId}-icon`}>
                        {cloneElement(icon, { size: buttonIconSizeMap[size] })}
                    </span>
                )}
                {children}
            </button>
        );
    },
);

Button.displayName = 'Button';
