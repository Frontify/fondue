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

export const ButtonComponent = (
    {
        type = 'button',
        style = 'default',
        size = 'medium',
        rounding = 'medium',
        emphasis = 'strong',
        title = '',
        hideLabel = false,
        disabled = false,
        icon,
        children,
        onClick,
        hugWidth = true,
        'aria-label': ariaLabel,
        'aria-describedby': ariaDescribedBy,
        'data-test-id': dataTestId = 'fondue-button',
    }: ButtonProps,
    ref: ForwardedRef<HTMLButtonElement | null>,
) => {
    return (
        <button
            data-test-id={dataTestId}
            aria-label={ariaLabel}
            aria-disabled={disabled}
            aria-describedby={ariaDescribedBy}
            ref={ref}
            title={title}
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={buttonStyles({
                disabled,
                rounding,
                size,
                hugWidth,
                emphasis,
                style,
                iconOnly: (icon && !children) || hideLabel,
            })}
        >
            {icon && (
                <span
                    data-test-id={`${dataTestId}-icon`}
                    className={iconStyles({
                        iconSpacing: children && !hideLabel ? size : 'none',
                        emphasis,
                        style,
                    })}
                >
                    {cloneElement(icon, { size: buttonIconSizeMap[size] })}
                </span>
            )}
            {children && (
                <span className={textStyles({ hideLabel, emphasis, style })} data-test-id={`${dataTestId}-text`}>
                    {children}
                </span>
            )}
        </button>
    );
};

export const Button = forwardRef<HTMLButtonElement | null, ButtonProps>(ButtonComponent);
Button.displayName = 'FondueButton';
