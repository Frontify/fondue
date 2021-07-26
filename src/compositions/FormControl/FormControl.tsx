/* (c) Copyright Frontify Ltd., all rights reserved. */

import InputLabel, { InputLabelProps } from "@elements/InputLabel/InputLabel";
import { Orientation, Style } from "@utilities/enum";
import { FC, PropsWithChildren, ReactElement, ReactNode } from "react";

type HelperTextProps = {
    text: string;
    disabled?: boolean;
    style?: Style.Primary | Style.Success | Style.Error;
    fullWidth?: boolean;
};
const HelperText: FC<HelperTextProps> = ({ text, disabled, style, fullWidth = false }: HelperTextProps) => (
    <span
        data-test-id="form-control-helper-text"
        className={`text-s font-sans ${fullWidth ? "w-full" : ""} ${
            disabled
                ? "text-black-40"
                : style === Style.Error
                ? "text-red-60"
                : style === Style.Success
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

export type FormControlProps = PropsWithChildren<{
    orientation?: Orientation;
    disabled?: boolean;
    label?: Omit<InputLabelProps, "disabled">;
    extra?: ReactNode;
    helper?: Omit<HelperTextProps, "disabled"> & { position?: HelperPosition };
}>;

export default function FormControl({
    label,
    children,
    extra,
    helper,
    disabled,
    orientation = Orientation.Vertical,
}: FormControlProps): ReactElement<FormControlProps> {
    const isHelperBefore = helper?.position === HelperPosition.Before;

    return (
        <div
            data-test-id="form-control"
            className={`flex items-center gap-2 ${
                orientation === Orientation.Horizontal ? "flex-row" : "w-full flex-col"
            }`}
        >
            {(label || extra) && (
                <div
                    className={`flex flew-row items-center justify-between ${
                        orientation === Orientation.Vertical ? "w-full" : ""
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
                    fullWidth={orientation === Orientation.Vertical}
                    text={helper.text}
                    disabled={disabled}
                    style={helper.style}
                />
            )}
            <div className={orientation === Orientation.Vertical ? "w-full" : ""}>{children}</div>
            {helper?.text && !isHelperBefore && (
                <HelperText
                    fullWidth={orientation === Orientation.Vertical}
                    text={helper.text}
                    disabled={disabled}
                    style={helper.style}
                />
            )}
        </div>
    );
}
