/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ForwardRefRenderFunction, MouseEvent, ReactElement, ReactNode, cloneElement, forwardRef } from 'react';

import { useButton } from '@react-aria/button';
import { merge } from '@utilities/merge';
import { useForwardedRef } from '@utilities/useForwardedRef';
import { ButtonElements, ButtonEmphasis, ButtonRounding, ButtonSize, ButtonStyle, ButtonType } from './ButtonTypes';
import {
    ButtonCommonClasses,
    ButtonDisabledClasses,
    ButtonRoundingClasses,
    ButtonSizeClasses,
    ButtonStyleClasses,
    IconSpacingClasses,
} from './ButtonClasses';
import { FOCUS_VISIBLE_STYLE } from '@utilities/focusStyle';
import { buttonIconSizeMap, buttonTypeMap } from '@components/Button/mappings';

export type ButtonProps = {
    type?: ButtonType;
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
    formId?: string;
};

const ButtonComponent: ForwardRefRenderFunction<HTMLButtonElement | null, ButtonProps> = (
    {
        type = ButtonType.Button,
        style = ButtonStyle.Default,
        size = ButtonSize.Medium,
        rounding = ButtonRounding.Medium,
        emphasis = ButtonEmphasis.Default,
        hideLabel = false,
        disabled = false,
        icon,
        children,
        onClick,
        hugWidth = true,
        'aria-label': ariaLabel,
        formId,
    },
    externalRef,
) => {
    const ref = useForwardedRef<HTMLButtonElement | null>(externalRef);
    const { buttonProps } = useButton(
        { onPress: () => onClick && onClick(), isDisabled: disabled, type: buttonTypeMap[type] },
        ref,
    );

    const getStyles = (kind: keyof ButtonElements) =>
        !disabled ? `${ButtonStyleClasses[emphasis][style][kind]}` : ButtonDisabledClasses;

    const buttonClassName = merge([
        FOCUS_VISIBLE_STYLE,
        getStyles('button'),
        ButtonCommonClasses,
        ButtonRoundingClasses[rounding],
        (icon && !children) || hideLabel ? ButtonSizeClasses[size].iconOnly : ButtonSizeClasses[size].default,
        !hugWidth && 'tw-w-full',
    ]);

    return (
        <button
            aria-label={ariaLabel}
            aria-disabled={disabled}
            ref={ref}
            className={buttonClassName}
            disabled={disabled}
            data-test-id="button"
            form={formId}
            {...buttonProps}
        >
            {icon && (
                <span
                    data-test-id="button-icon"
                    className={merge([children && !hideLabel ? IconSpacingClasses[size] : '', getStyles('icon')])}
                >
                    {cloneElement(icon, { size: buttonIconSizeMap[size] })}
                </span>
            )}
            {children && (
                <span data-test-id="button-text" className={merge([getStyles('text'), hideLabel && 'tw-sr-only'])}>
                    {children}
                </span>
            )}
        </button>
    );
};

export const Button = forwardRef(ButtonComponent);
