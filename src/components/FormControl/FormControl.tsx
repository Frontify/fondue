/* (c) Copyright Frontify Ltd., all rights reserved. */

import { InputLabel, InputLabelProps } from '@components/InputLabel/InputLabel';
import { merge } from '@utilities/merge';
import { Validation } from '@utilities/validation';
import React, { PropsWithChildren, ReactElement, ReactNode, cloneElement, isValidElement } from 'react';

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
};

const inputValidation: Record<FormControlStyle, Validation> = {
    [FormControlStyle.Primary]: Validation.Default,
    [FormControlStyle.Positive]: Validation.Success,
    [FormControlStyle.Danger]: Validation.Error,
};

const HelperText = ({ text, disabled, style, fullWidth = false }: HelperTextProps): ReactElement => {
    let textColorClass;

    switch (true) {
        case disabled:
            textColorClass = 'tw-text-black-40';
            break;
        case style === FormControlStyle.Danger:
            textColorClass = 'tw-text-red-60';
            break;
        case style === FormControlStyle.Positive:
            textColorClass = 'tw-text-green-60';
            break;
        default:
            textColorClass = 'tw-text-black-80';
            break;
    }

    return (
        <span
            data-test-id="form-control-helper-text"
            className={`tw-text-s tw-font-sans ${fullWidth ? 'tw-w-full' : ''} ${textColorClass}`}
        >
            {text}
        </span>
    );
};
HelperText.displayName = 'FondueHelperText';

export enum HelperPosition {
    Before = 'Before',
    After = 'After',
}

export enum FormControlDirection {
    Horizontal = 'Horizontal',
    Vertical = 'Vertical',
}

export type FormControlProps = PropsWithChildren<{
    direction?: FormControlDirection;
    disabled?: boolean;
    clickable?: boolean;
    label?: Omit<InputLabelProps, 'disabled'>;
    extra?: ReactNode;
    helper?: Omit<HelperTextProps, 'disabled' | 'style'> & { position?: HelperPosition };
    style?: FormControlStyle;
    name?: string;
}>;

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
}: FormControlProps): ReactElement => {
    const isHelperBefore = helper?.position === HelperPosition.Before;

    return (
        <div
            data-test-id="form-control"
            data-name={name}
            className={merge([
                'tw-flex tw-items-center tw-gap-2',
                direction === FormControlDirection.Horizontal ? 'tw-flex-row' : 'tw-w-full tw-flex-col',
            ])}
        >
            {(label?.children || extra) && (
                <div
                    className={merge([
                        'tw-flex tw-flew-row tw-items-center tw-justify-between',
                        direction === FormControlDirection.Vertical && 'tw-w-full',
                    ])}
                >
                    {label?.children && <InputLabel {...label} disabled={disabled} clickable={clickable} />}
                    {extra && (
                        <span
                            data-test-id="form-control-extra"
                            className="tw-pl-2 tw-text-black-80 tw-font-sans tw-text-s tw-whitespace-nowrap"
                        >
                            {extra}
                        </span>
                    )}
                </div>
            )}
            {helper?.text && isHelperBefore && (
                <HelperText
                    style={style}
                    fullWidth={direction === FormControlDirection.Vertical}
                    text={helper.text}
                    disabled={disabled}
                />
            )}
            {children && (
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
            )}
            {helper?.text && !isHelperBefore && (
                <HelperText
                    fullWidth={direction === FormControlDirection.Vertical}
                    text={helper.text}
                    disabled={disabled}
                    style={style}
                />
            )}
        </div>
    );
};
FormControl.displayName = 'FondueFormControl';
