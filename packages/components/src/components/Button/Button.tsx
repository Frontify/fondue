/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ForwardRefRenderFunction, MouseEvent, ReactElement, ReactNode } from "react";
import { merge } from "src/utils/merge";

type ButtonType = "button" | "submit" | "reset";
type ButtonStyle = "Default" | "Positive" | "Negative" | "Danger" | "Loud";
type ButtonSize = "Small" | "Medium" | "Large";
type ButtonRounding = "Medium" | "Full";
type ButtonEmphasis = "Default" | "Weak" | "Strong";

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


export const Button: ForwardRefRenderFunction<HTMLButtonElement | null, ButtonProps> = (
    {
        type = "button",
        title = '',
        style = "default",
        size = "Medium",
        rounding = "Medium",
        emphasis = "Strong",
        hideLabel = false,
        disabled = false,
        icon,
        children,
        onClick,
        hugWidth = true,
        'aria-label': ariaLabel,
        'aria-describedby': ariaDescribedBy,
        formId,
        'data-test-id': dataTestId = 'button',
    },
    externalRef,
) => {
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
            {icon && (
                <span
                    data-test-id={`${dataTestId}-icon`}
                    className={merge([children && !hideLabel ? IconSpacingClasses[size] : '', getStyles('icon')])}
                >
                    {cloneElement(icon, { size: buttonIconSizeMap[size] })}
                </span>
            )}
            {children && (
                <span
                    data-test-id={`${dataTestId}-text`}
                    className={merge([getStyles('text'), hideLabel && 'tw-sr-only'])}
                >
                    {children}
                </span>
            )}
        </button>
  )
}
