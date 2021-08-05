/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC, PropsWithChildren, ReactNode } from "react";
import { InputLabel, InputLabelProps } from "@elements/InputLabel/InputLabel";

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
        className={`text-s font-sans ${fullWidth ? "w-full" : ""} ${
            disabled
                ? "text-black-40"
                : style === HelperTextStyle.Danger
                ? "text-red-60"
                : style === HelperTextStyle.Positive
                ? "text-green-60"
                : "text-black-80"
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
            className={`flex items-center gap-2 ${
                direction === FormControlDirection.Horizontal ? "flex-row" : "w-full flex-col"
            }`}
        >
            {(label || extra) && (
                <div
                    className={`flex flew-row items-center justify-between ${
                        direction === FormControlDirection.Vertical ? "w-full" : ""
                    }`}
                >
                    {label && <InputLabel {...label} disabled={disabled} />}
                    {extra && (
                        <span
                            data-test-id="form-control-extra"
                            className="pl-2 text-black-80 font-sans text-s whitespace-nowrap"
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
            <div className={direction === FormControlDirection.Vertical ? "w-full" : ""}>{children}</div>
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
