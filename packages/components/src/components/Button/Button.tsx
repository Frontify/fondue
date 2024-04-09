/* (c) Copyright Frontify Ltd., all rights reserved. */

import { forwardRef, type MouseEvent, type ReactElement, type ReactNode } from 'react';

import { twMerge } from 'tailwind-merge';

import { FOCUS_VISIBLE_STYLE } from '@utilities/focusStyle';

import {
    ButtonCommonClasses,
    ButtonDisabledClasses,
    ButtonEmphasisClasses,
    ButtonRoundingClasses,
    ButtonSizeClasses,
} from './ButtonClasses';
import {
    ButtonEmphasis,
    type ButtonElements,
    type ButtonRounding,
    type ButtonSize,
    type ButtonStyle,
    type ButtonType,
    type UpdatedButtonStyle,
} from './ButtonTypes';
/*
const buttonIconSizeMap: Record<ButtonSize, IconSize> = {
    ['small']: IconSize.Size16,
    ['medium']: IconSize.Size20,
    ['large']: IconSize.Size24,
};*/

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
    formId?: string;
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
        formId,
        'aria-label': ariaLabel,
        'aria-describedby': ariaDescribedBy,
        'data-test-id': dataTestId = 'button',
    }: ButtonProps,
    ref: React.ForwardedRef<HTMLButtonElement | null>,
) => {
    const getStyles = (kind: keyof ButtonElements) =>
        !disabled ? `${ButtonEmphasisClasses[style as unknown as UpdatedButtonStyle][kind]}` : ButtonDisabledClasses;

    const buttonClassName = twMerge([
        getStyles('button'),
        ButtonCommonClasses,
        ButtonRoundingClasses[rounding],
        (icon && !children) || hideLabel ? ButtonSizeClasses[size].iconOnly : ButtonSizeClasses[size].default,
        !hugWidth && 'tw-w-full',
    ]);

    return (
        <button
            data-test-id={dataTestId}
            aria-label={ariaLabel}
            aria-disabled={disabled}
            aria-describedby={ariaDescribedBy}
            ref={ref}
            className={twMerge([buttonClassName, true && FOCUS_VISIBLE_STYLE])}
            disabled={disabled}
            form={formId}
            title={title}
        >
            {icon && (
                <span
                    data-test-id={`${dataTestId}-icon`}
                    className={twMerge([children && !hideLabel ? IconSpacingClasses[size] : '', getStyles('icon')])}
                >
                    {icon}
                    {/*cloneElement(icon, { size: buttonIconSizeMap[size] })*/}
                </span>
            )}
            {children && (
                <span
                    data-test-id={`${dataTestId}-text`}
                    className={twMerge([getStyles('text'), hideLabel && 'tw-sr-only'])}
                >
                    {children}
                </span>
            )}
        </button>
    );
};

export const Button = forwardRef<HTMLButtonElement | null, ButtonProps>(ButtonComponent);
Button.displayName = 'FondueButton';
