/* (c) Copyright Frontify Ltd., all rights reserved. */

import type { ReactElement } from 'react';
import { cloneElement } from 'react';
import { merge } from '@utilities/merge';
import { IconSize } from '@foundation/Icon';
import { HelperText } from '@utilities/input';
import { Validation } from '@utilities/validation';
import { generateRandomId } from '@utilities/generateRandomId';
import { Tooltip, TooltipProps } from '@components/Tooltip/Tooltip';

export type LabelProps = {
    text: string;
    hugWidth?: boolean;
    required?: boolean;
    secondaryLabel?: string;
    tooltips?: TooltipProps[];
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
    status?: Validation;
    'data-test-id'?: string;
};

type FormatTooltipsProps = { tooltips: TooltipProps[] };

const FormatTooltips = ({ tooltips }: FormatTooltipsProps): ReactElement[] => {
    return tooltips.map((tip: TooltipProps) => (
        <Tooltip
            key={`form-field-tooltip-${generateRandomId()}`}
            content={tip.content}
            size={tip.size}
            data-test-id={tip['data-test-id']}
        >
            {tip.children}
        </Tooltip>
    ));
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
    status = Validation.Default,
    'data-test-id': dataTestId = 'fondue-form-field',
}: FormFieldProps): ReactElement => {
    const formattedLabel = (): ReactElement => {
        const { text, required, secondaryLabel, hugWidth, tooltips } = label;
        const elements: ReactElement[] = [];
        const secondaryLabelStyle = 'tw-w-full tw-flex tw-flex-nowrap tw-justify-between';
        const applySecondaryLabel = !hugWidth && secondaryLabel;
        let formattedLabel = text;

        if (required) {
            formattedLabel += ' *';
        }

        if (tooltips?.length) {
            elements.push(
                <span className={'tw-flex tw-gap-2'}>
                    {formattedLabel}
                    <FormatTooltips tooltips={tooltips} />
                </span>,
            );
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
                    hugWidth && 'tw-pt-2',
                    applySecondaryLabel && secondaryLabelStyle,
                    disabled || readOnly ? 'tw-text-black-60' : 'tw-text-black-80',
                ])}
                data-test-id={`${dataTestId}-label-text`}
                aria-label={formattedLabel}
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
            {hiddenLabel ? null : formattedLabel()}
            <div className={'tw-w-full tw-flex tw-flex-col tw-gap-2'} data-test-id={`${dataTestId}-input`}>
                {cloneElement(children, {
                    hugWidth: label.hugWidth,
                    required: label.required,
                    status,
                    disabled,
                    readOnly,
                })}
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
