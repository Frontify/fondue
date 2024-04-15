/* (c) Copyright Frontify Ltd., all rights reserved. */

import { cloneElement, forwardRef, type ForwardedRef, type MouseEvent, type ReactElement, type ReactNode } from 'react';

import { buttonIconSizeMap, buttonStyles } from './styles/buttonStyles';
import { iconStyles } from './styles/iconStyles';
import { textStyles } from './styles/textStyles';

type ButtonRounding = 'medium' | 'full';

type ButtonStyle = 'default' | 'positive' | 'negative' | 'danger' | 'loud';

type ButtonSize = 'small' | 'medium' | 'large';

type ButtonType = 'button' | 'submit' | 'reset';

type ButtonEmphasis = 'default' | 'weak' | 'strong';

export type ButtonProps = {
    type?: ButtonType;
    title?: string;
    style?: ButtonStyle;
    emphasis?: ButtonEmphasis;
    hideLabel?: boolean;
    size?: ButtonSize;
    rounding?: ButtonRounding;
    disabled?: boolean;
    icon?: ReactElement;
    children?: ReactNode;
    onClick?: (event?: MouseEvent<HTMLButtonElement>) => void;
    hugWidth?: boolean;
    'aria-label'?: string;
    'aria-describedby'?: string;
    'data-test-id'?: string;
};

export const Button = forwardRef<HTMLButtonElement | null, ButtonProps>(
    (
        {
            icon,
            children,
            hideLabel,
            style,
            size = 'medium',
            'data-test-id': dataTestId = 'fondue-button',
            ...props
        }: ButtonProps,
        ref: ForwardedRef<HTMLButtonElement | null>,
    ) => {
        return (
            <button
                ref={ref}
                className={buttonStyles({
                    ...props,
                    iconOnly: (icon && !children) || hideLabel,
                })}
                {...props}
            >
                {icon && (
                    <span
                        data-test-id={`${dataTestId}-icon`}
                        className={iconStyles({
                            iconSpacing: children && !hideLabel ? size : 'none',
                            style,
                            ...props,
                        })}
                    >
                        {cloneElement(icon, { size: buttonIconSizeMap[size] })}
                    </span>
                )}
                {children && (
                    <span className={textStyles({ hideLabel, style, ...props })} data-test-id={`${dataTestId}-text`}>
                        {children}
                    </span>
                )}
            </button>
        );
    },
);

Button.displayName = 'Button';
