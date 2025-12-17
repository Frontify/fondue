/* (c) Copyright Frontify Ltd., all rights reserved. */

import { InputLabel, type InputLabelProps } from '@components/InputLabel/InputLabel';
import { merge } from '@utilities/merge';
import { Validation } from '@utilities/validation';
import { type ReactElement, type ReactNode, cloneElement, isValidElement } from 'react';
/**
 * @deprecated Please use a custom component instead.
 */
export enum FormControlStyle {
    Primary = 'Primary',
    Positive = 'Positive',
    Danger = 'Danger',
}

type HelperTextProps = {
    text: string;
    style: FormControlStyle;
    disabled?: boolean;
    fullWidth?: boolean;
    'data-test-id'?: string;
};

const inputValidation: Record<FormControlStyle, Validation> = {
    [FormControlStyle.Primary]: Validation.Default,
    [FormControlStyle.Positive]: Validation.Success,
    [FormControlStyle.Danger]: Validation.Error,
};

const HelperText = ({
    text,
    disabled,
    style,
    fullWidth = false,
    'data-test-id': dataTestId = 'form-control',
}: HelperTextProps): ReactElement => {
    let textColorClass;

    switch (true) {
        case disabled:
            textColorClass = 'tw-text-text-disabled';
            break;
        case style === FormControlStyle.Danger:
            textColorClass = 'tw-text-text-negative';
            break;
        case style === FormControlStyle.Positive:
            textColorClass = 'tw-text-text-positive';
            break;
        default:
            textColorClass = 'tw-text-text-weak';
            break;
    }

    return (
        <span
            data-test-id={`${dataTestId}-helper-text`}
            className={`tw-text-s tw-font-sans ${fullWidth ? 'tw-w-full' : ''} ${textColorClass}`}
        >
            {text}
        </span>
    );
};
HelperText.displayName = 'FondueHelperText';
/**
 * @deprecated Please use a custom component instead.
 */
export enum HelperPosition {
    Before = 'Before',
    After = 'After',
}
/**
 * @deprecated Please use a custom component instead.
 */
export enum FormControlDirection {
    Horizontal = 'Horizontal',
    Vertical = 'Vertical',
}
/**
 * @deprecated Please use a custom component instead.
 */
export type FormControlProps = {
    direction?: FormControlDirection;
    disabled?: boolean;
    clickable?: boolean;
    label?: Omit<InputLabelProps, 'disabled'>;
    extra?: ReactNode;
    helper?: Omit<HelperTextProps, 'disabled' | 'style'> & { position?: HelperPosition };
    style?: FormControlStyle;
    name?: string;
    children?: ReactNode;
    'data-test-id'?: string;
};

/**
 * @deprecated This component is deprecated and will be removed in the next major version.
 */
export const FormControl = ({
    label,
    children,
    extra,
    name,
    helper,
    disabled,
    clickable,
    direction = FormControlDirection.Vertical,
    style = FormControlStyle.Primary,
    'data-test-id': dataTestId = 'form-control',
}: FormControlProps): ReactElement => {
    const isHelperBefore = helper?.position === HelperPosition.Before;

    return (
        <div
            data-test-id={dataTestId}
            data-name={name}
            className={merge([
                'tw-flex tw-items-center tw-gap-2',
                direction === FormControlDirection.Horizontal ? 'tw-flex-row' : 'tw-w-full tw-flex-col',
            ])}
        >
            {label?.children || extra ? (
                <div
                    className={merge([
                        'tw-flex tw-flew-row tw-items-center tw-justify-between',
                        direction === FormControlDirection.Vertical && 'tw-w-full',
                    ])}
                >
                    {label?.children ? <InputLabel {...label} disabled={disabled} clickable={clickable} /> : null}
                    {extra ? (
                        <span
                            data-test-id={`${dataTestId}-extra`}
                            className="tw-pl-2 tw-text-black-80 tw-font-sans tw-text-s tw-whitespace-nowrap"
                        >
                            {extra}
                        </span>
                    ) : null}
                </div>
            ) : null}
            {helper?.text && isHelperBefore && (
                <HelperText
                    style={style}
                    fullWidth={direction === FormControlDirection.Vertical}
                    text={helper.text}
                    disabled={disabled}
                    data-test-id={dataTestId}
                />
            )}
            {children ? (
                <div
                    className={
                        direction === FormControlDirection.Vertical ? 'tw-w-full tw-grid tw-grid-cols-1 tw-gap-5' : ''
                    }
                >
                    {isValidElement(children)
                        ? cloneElement(children as ReactElement, {
                              id: label?.htmlFor ?? children.props.id,
                              disabled,
                              validation: inputValidation[style],
                          })
                        : children}
                </div>
            ) : null}
            {helper?.text && !isHelperBefore && (
                <HelperText
                    fullWidth={direction === FormControlDirection.Vertical}
                    text={helper.text}
                    disabled={disabled}
                    style={style}
                    data-test-id={dataTestId}
                />
            )}
        </div>
    );
};
FormControl.displayName = 'FondueFormControl';
