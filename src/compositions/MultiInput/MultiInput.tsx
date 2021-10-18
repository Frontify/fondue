/* (c) Copyright Frontify Ltd., all rights reserved. */

import { InputLabel, InputLabelProps } from "@elements/InputLabel/InputLabel";
import React, { FC } from "react";

export enum MultiInputLayout {
    Columns = "Columns",
    Spider = "Spider",
}

export type MultiInputProps = {
    layout: MultiInputLayout;
    label?: Omit<InputLabelProps, "disabled">;
    helper?: string;
};

export const MultiInput: FC<MultiInputProps> = ({ layout, label, extra, helper, children }) => {
    return (
        <div data-test-id="multi-input" className="tw-flex tw-gap-2 tw-w-full tw-flex-col">
            {(label || extra) && (
                <div className="tw-flex tw-flew-row tw-items-center tw-justify-between">
                    {label && <InputLabel {...label} />}
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
            {layout === MultiInputLayout.Columns && <div className="tw-grid tw-grid-cols-2 tw-gap-2">{children}</div>}
            {layout === MultiInputLayout.Spider && children.length === 4 && (
                <div className="tw-grid tw-grid-cols-8 tw-gap-2">
                    <div className="tw-col-start-3 tw-col-span-4">{children[0]}</div>
                    <div className="tw-col-start-1 tw-col-span-4">{children[1]}</div>
                    <div className="tw-col-start-5 tw-col-span-4">{children[2]}</div>
                    <div className="tw-col-start-3 tw-col-span-4">{children[3]}</div>
                </div>
            )}
            {helper && <div className="tw-text-s tw-font-sans tw-text-black-80">{helper}</div>}
        </div>
    );
};
