/* (c) Copyright Frontify Ltd., all rights reserved. */

import type { ReactElement } from 'react';
import { TooltipIcon, TooltipIconProps } from '..';
import { merge } from '@utilities/merge';
import { IconSize } from '@foundation/Icon';
import { HelperText } from '@utilities/input';
import { Validation } from '@utilities/validation';

export type LabelProps = {
    text: string;
    hugWidth?: boolean;
    required?: boolean;
    secondaryLabel?: string;
    tooltipIcon?: TooltipIconProps;
    toolTipSize?: IconSize;
};

export type FormFieldProps = {
    children: ReactElement;
    label: LabelProps;
    disabled?: boolean;
    error?: boolean;
    errorText?: string;
    errorTextColor?: Validation;
    helperText?: string;
    helperTextColor?: Validation;
    hiddenLabel?: boolean;
    readOnly?: boolean;
    'data-test-id'?: string;
};

export const FormField = ({
    children,
    disabled = false,
    error = false,
    errorText,
    errorTextColor = Validation.Error,
    helperText,
    helperTextColor = Validation.Default,
    hiddenLabel = false,
    label,
    readOnly = false,
    'data-test-id': dataTestId = 'fondue-form-field',
}: FormFieldProps): ReactElement => {
    const getFormattedLabel = (): ReactElement | string => {
        const { text, required, secondaryLabel, hugWidth, tooltipIcon } = label;
        const elements: ReactElement[] = [];
        const secondaryLabelStyle = 'tw-w-full tw-flex tw-flex-nowrap tw-justify-between';
        const applySecondaryLabel = !hugWidth && secondaryLabel;
        let formattedLabel = text;

        if (required) {
            formattedLabel += ' *';
        }

        if (tooltipIcon) {
            const tooltipElement: ReactElement = (
                <span className={'tw-flex tw-gap-2'}>
                    {formattedLabel}
                    <TooltipIcon tooltip={tooltipIcon.tooltip} iconSize={tooltipIcon.iconSize ?? IconSize.Size16} />
                </span>
            );
            elements.push(tooltipElement);
        } else {
            elements.push(<span>{formattedLabel}</span>);
        }

        if (applySecondaryLabel) {
            elements.push(<span>{secondaryLabel}</span>);
        }
        return (
            <span
                className={merge([
                    'tw-whitespace-nowrap',
                    hugWidth ? 'tw-pt-2' : '',
                    applySecondaryLabel ? secondaryLabelStyle : '',
                ])}
            >
                {...elements}
            </span>
        );
    };

    return (
        <label
            className={merge([
                'tw-flex tw-text-text-weak tw-gap-2 tw-select-none tw-max-w-full',
                label.hugWidth ? 'tw-w-fit tw-items-start tw-justify-start' : 'tw-w-full tw-flex-col',
                disabled || readOnly
                    ? 'hover:tw-cursor-not-allowed tw-pointer-events-none'
                    : 'hover:tw-cursor-pointer hover:tw-text-text group-hover:tw-text-text',
            ])}
            data-test-id={`${dataTestId}-label`}
            aria-label={label.text}
        >
            {hiddenLabel ? null : getFormattedLabel()}
            <div className={'tw-w-full tw-flex tw-flex-col tw-gap-2'}>
                {children}
                {error && (
                    <HelperText
                        text={errorText ?? 'Something went wrong'}
                        validationStyle={errorTextColor}
                        disabled={disabled}
                        data-test-id={`${dataTestId}-error-text`}
                    />
                )}
                {helperText && (
                    <HelperText
                        text={helperText}
                        validationStyle={helperTextColor}
                        disabled={disabled}
                        data-test-id={`${dataTestId}-helper-text`}
                    />
                )}
            </div>
        </label>
    );
};
FormField.displayname = 'FondueFormField';
