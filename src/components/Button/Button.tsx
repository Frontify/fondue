/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ForwardRefRenderFunction, MouseEvent, ReactElement, ReactNode, cloneElement, forwardRef } from 'react';

import { useButton } from '@react-aria/button';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import { merge } from '@utilities/merge';
import { useForwardedRef } from '@utilities/useForwardedRef';

import { IconSize } from '@foundation/Icon/IconSize';
import { ButtonElements, ButtonEmphasis, ButtonRounding, ButtonSize, ButtonStyle, ButtonType } from './ButtonTypes';
import {
    ButtonCommonClasses,
    ButtonDisabledClasses,
    ButtonRoundingClasses,
    ButtonSizeClasses,
    ButtonStyleClasses,
    IconSpacingClasses,
    Solid,
} from './ButtonClasses';
import { FOCUS_STYLE } from '@utilities/focusStyle';

export * from './ButtonTypes';

const iconSizes: Record<ButtonSize, IconSize> = {
    [ButtonSize.Small]: IconSize.Size16,
    [ButtonSize.Medium]: IconSize.Size20,
    [ButtonSize.Large]: IconSize.Size24,
};

const typesMap: Record<ButtonType, 'button' | 'submit' | 'reset'> = {
    [ButtonType.Button]: 'button',
    [ButtonType.Submit]: 'submit',
    [ButtonType.Reset]: 'reset',
};

export type ButtonProps = {
    type?: ButtonType;
    style?: ButtonStyle;
    emphasis?: ButtonEmphasis;
    hideLabel?: boolean;
    size?: ButtonSize;
    rounding?: ButtonRounding;
    solid?: Solid;
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
        solid = Solid.filled,
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
    // some accessibility stuff
    const { isFocusVisible, focusProps } = useFocusRing();
    const ref = useForwardedRef<HTMLButtonElement | null>(externalRef);
    const { buttonProps } = useButton(
        { onPress: () => onClick && onClick(), isDisabled: disabled, type: typesMap[type] },
        ref,
    );

    const getStyles = (kind: keyof ButtonElements) => {
        if (!disabled) {
            return `${ButtonStyleClasses[solid][emphasis][style][kind]} ${
                isFocusVisible && kind === 'button' && FOCUS_STYLE
            }`;
        } else {
            return ButtonDisabledClasses[solid];
        }
    };

    const buttonClassName = merge([
        ButtonCommonClasses,
        ButtonRoundingClasses[rounding],
        (icon && !children) || hideLabel ? ButtonSizeClasses[size].iconOnly : ButtonSizeClasses[size].default,
        !hugWidth && 'tw-w-full',
        getStyles('button'),
    ]);

    return (
        <button
            {...mergeProps(buttonProps, focusProps)}
            aria-label={ariaLabel}
            ref={ref}
            className={buttonClassName}
            disabled={disabled}
            data-test-id="button"
            form={formId}
        >
            {icon && (
                <span
                    data-test-id="button-icon"
                    className={merge([children && !hideLabel ? IconSpacingClasses[size] : '', getStyles('icon')])}
                >
                    {cloneElement(icon, { size: iconSizes[size] })}
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
