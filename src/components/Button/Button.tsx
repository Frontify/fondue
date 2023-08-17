/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ForwardRefRenderFunction, MouseEvent, ReactElement, ReactNode, cloneElement, forwardRef } from 'react';

import { useButton } from '@react-aria/button';
import { merge } from '@utilities/merge';
import { useForwardedRef } from '@utilities/useForwardedRef';
import {
    ButtonElements,
    ButtonEmphasis,
    ButtonRounding,
    ButtonSize,
    ButtonStyle,
    ButtonType,
    UpdatedButtonStyle,
} from './ButtonTypes';
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
import { useFocusRing } from '@react-aria/focus';
import { AnimatePresence, motion } from 'framer-motion';
import { LoadingCircle, LoadingCircleSize } from '..';
import { useButtonLoadingAnimation } from './useButtonLoadingAnimation';

// To be NON-Breaking but import should be done through index.ts
export * from './ButtonClasses';
export * from './ButtonTypes';

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
    loading?: boolean;
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
        loading = false,
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

    const ref = useForwardedRef<HTMLButtonElement>(externalRef);

    const { buttonProps } = useButton(
        { onPress: () => onClick && onClick(), isDisabled: disabled, type: buttonTypeMap[type] },
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

    const { loadingProps, contentProps } = useButtonLoadingAnimation(children, icon);

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
            {...buttonProps}
            {...focusProps}
        >
            <AnimatePresence mode="wait">
                {loading ? (
                    <motion.div {...loadingProps} className="w-w-full tw-flex tw-items-center tw-justify-center">
                        <LoadingCircle size={LoadingCircleSize.ExtraSmall} />
                    </motion.div>
                ) : (
                    <motion.div
                        {...contentProps}
                        className="tw-w-full tw-flex tw-items-center tw-relative tw-justify-center"
                    >
                        {icon && (
                            <span
                                data-test-id={`${dataTestId}-icon`}
                                className={merge([
                                    children && !hideLabel ? IconSpacingClasses[size] : '',
                                    getStyles('icon'),
                                ])}
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
                    </motion.div>
                )}
            </AnimatePresence>
        </button>
    );
};

export const Button = forwardRef(ButtonComponent);
Button.displayName = 'FondueButton';
