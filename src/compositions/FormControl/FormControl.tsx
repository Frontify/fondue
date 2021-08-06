/* (c) Copyright Frontify Ltd., all rights reserved. */

import { InputLabel, InputLabelProps } from "@elements/InputLabel/InputLabel";
import React, { cloneElement, FC, isValidElement, PropsWithChildren, ReactNode } from "react";

export enum HelperTextStyle {
    Primary = "Primary",
    Positive = "Positive",
    Danger = "Danger",
}

type HelperTextProps = {
    text: string;
    disabled?: boolean;
    style?: HelperTextStyle;
    fullWidth?: boolean;
};

const HelperText: FC<HelperTextProps> = ({ text, disabled, style, fullWidth = false }) => (
    <span
        data-test-id="form-control-helper-text"
        className={`tw-text-s tw-font-sans ${fullWidth ? "tw-w-full" : ""} ${
            disabled
                ? "tw-text-black-40"
                : style === HelperTextStyle.Danger
                ? "tw-text-red-60"
                : style === HelperTextStyle.Positive
                ? "tw-text-green-60"
                : "tw-text-black-80"
        }`}
    >
        {text}
    </span>
);

export enum HelperPosition {
    Before = "Before",
    After = "After",
}

export enum FormControlDirection {
    Horizontal = "Horizontal",
    Vertical = "Vertical",
}

export type FormControlProps = PropsWithChildren<{
    direction?: FormControlDirection;
    disabled?: boolean;
    label?: Omit<InputLabelProps, "disabled">;
    extra?: ReactNode;
    helper?: Omit<HelperTextProps, "disabled"> & { position?: HelperPosition };
}>;

export const FormControl: FC<FormControlProps> = ({
    label,
    children,
    extra,
    helper,
    disabled,
    direction = FormControlDirection.Vertical,
}) => {
    const isHelperBefore = helper?.position === HelperPosition.Before;

    return (
        <div
            data-test-id="form-control"
            className={`tw-flex tw-items-center tw-gap-2 ${
                direction === FormControlDirection.Horizontal ? "tw-flex-row" : "tw-w-full tw-flex-col"
            }`}
        >
            {(label || extra) && (
                <div
                    className={`tw-flex tw-flew-row tw-items-center tw-justify-between ${
                        direction === FormControlDirection.Vertical ? "tw-w-full" : ""
                    }`}
                >
                    {label && <InputLabel {...label} disabled={disabled} />}
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
                    fullWidth={direction === FormControlDirection.Vertical}
                    text={helper.text}
                    disabled={disabled}
                    style={helper.style}
                />
            )}
            <div className={direction === FormControlDirection.Vertical ? "w-full" : ""}>
                {isValidElement(children) ? cloneElement(children, { id: label?.htmlFor, disabled }) : children}
            </div>
            {helper?.text && !isHelperBefore && (
                <HelperText
                    fullWidth={direction === FormControlDirection.Vertical}
                    text={helper.text}
                    disabled={disabled}
                    style={helper.style}
                />
            )}
        </div>
    );
};
