/* (c) Copyright Frontify Ltd., all rights reserved. */

import { buttonIconSizeMap, buttonTypeMap } from '@components/Button/mappings';
import { useButton } from '@react-aria/button';
import { useFocusRing } from '@react-aria/focus';
import { FOCUS_VISIBLE_STYLE } from '@utilities/focusStyle';
import { merge } from '@utilities/merge';
import { useForwardedRef } from '@utilities/useForwardedRef';
import {
    cloneElement,
    forwardRef,
    type ForwardRefRenderFunction,
    type MouseEvent,
    type ReactElement,
    type ReactNode,
} from 'react';

import {
    ButtonCommonClasses,
    ButtonDisabledClasses,
    ButtonRoundingClasses,
    ButtonSizeClasses,
    ButtonStyleClasses,
    IconSpacingClasses,
} from './ButtonClasses';
import {
    ButtonEmphasis,
    ButtonRounding,
    ButtonSize,
    ButtonStyle,
    ButtonType,
    type ButtonElements,
    type UpdatedButtonStyle,
} from './ButtonTypes';

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
    /** @deprecated use emphasis with ButtonEmphasis.Weak */
    solid?: boolean;
    /** @deprecated inverted can be done by wrapping the component in a className="tw-dark" */
    inverted?: boolean;
    'data-test-id'?: string;
};

const ButtonComponent: ForwardRefRenderFunction<HTMLButtonElement | null, ButtonProps> = (
    {
        type = ButtonType.Button,
        title = '',
        style = ButtonStyle.Default,
        size = ButtonSize.Medium,
        rounding = ButtonRounding.Medium,
        emphasis = ButtonEmphasis.Strong,
        hideLabel = false,
        disabled = false,
        icon,
        children,
        onClick,
        hugWidth = true,
        'aria-label': ariaLabel,
        'aria-describedby': ariaDescribedBy,
        formId,
        solid,
        inverted,
        'data-test-id': dataTestId = 'button',
    },
    externalRef,
) => {
    // Map Style Primary, Secondary to style and emphasis
    // Primary and Secondary can be omitted from the style type
    if (style === ButtonStyle.Primary) {
        style = ButtonStyle.Default;
        emphasis = ButtonEmphasis.Strong;
    } else if (style === ButtonStyle.Secondary) {
        style = ButtonStyle.Default;
        emphasis = ButtonEmphasis.Default;
    }

    // Rewrite Solid to property emphasis
    if (solid === false) {
        emphasis = ButtonEmphasis.Weak;
    }

    const ref = useForwardedRef<HTMLButtonElement | null>(externalRef);
    const { buttonProps } = useButton(
        {
            onPress: () => {
                if (onClick) {
                    onClick();
                }
            },
            isDisabled: disabled,
            type: buttonTypeMap[type],
        },
        ref,
    );
    const { isFocusVisible, focusProps } = useFocusRing();

    const getStyles = (kind: keyof ButtonElements) =>
        !disabled
            ? `${ButtonStyleClasses[emphasis][style as unknown as UpdatedButtonStyle][kind]}`
            : ButtonDisabledClasses;

    const buttonClassName = merge([
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
            className={merge([buttonClassName, inverted && 'tw-dark', isFocusVisible && FOCUS_VISIBLE_STYLE])}
            disabled={disabled}
            form={formId}
            title={title}
            {...buttonProps}
            {...focusProps}
        >
            {icon ? (
                <span
                    data-test-id={`${dataTestId}-icon`}
                    className={merge([children && !hideLabel ? IconSpacingClasses[size] : '', getStyles('icon')])}
                >
                    {cloneElement(icon, { size: buttonIconSizeMap[size] })}
                </span>
            ) : null}
            {children ? (
                <span
                    data-test-id={`${dataTestId}-text`}
                    className={merge([getStyles('text'), hideLabel && 'tw-sr-only'])}
                >
                    {children}
                </span>
            ) : null}
        </button>
    );
};

/**
 * @deprecated Please use updated button component from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#button the migration guide}.
 */
export const Button = forwardRef(ButtonComponent);
Button.displayName = 'FondueButton';
