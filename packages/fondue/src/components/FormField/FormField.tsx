/* (c) Copyright Frontify Ltd., all rights reserved. */

import { VisuallyHidden } from '@react-aria/visually-hidden';
import { cloneElement, type ReactElement } from 'react';

import { Tooltip, type TooltipProps } from '@components/Tooltip/Tooltip';
import { type IconSize } from '@foundation/Icon/IconSize';
import { generateRandomId } from '@utilities/generateRandomId';
import { HelperText } from '@utilities/input';
import { merge } from '@utilities/merge';
import { Validation } from '@utilities/validation';

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

type FormattedLabelProps = {
    label: FormFieldProps['label'];
    disabled: FormFieldProps['disabled'];
    readOnly: FormFieldProps['readOnly'];
    dataTestId: FormFieldProps['data-test-id'];
};

const FormattedLabel = ({ label, disabled, readOnly, dataTestId }: FormattedLabelProps): ReactElement => {
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
        >
            {...elements}
        </span>
    );
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
        >
            {hiddenLabel ? (
                <VisuallyHidden>
                    <span>{label.text}</span>
                </VisuallyHidden>
            ) : (
                <FormattedLabel label={label} dataTestId={dataTestId} disabled={disabled} readOnly={readOnly} />
            )}

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
