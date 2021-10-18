/* (c) Copyright Frontify Ltd., all rights reserved. */

import { InputLabel, InputLabelProps } from "@elements/InputLabel/InputLabel";
import React, { FC, ReactNode, Children } from "react";

export enum MultiInputLayout {
    Columns = "Columns",
    Spider = "Spider",
}

export type MultiInputProps = {
    layout: MultiInputLayout;
    spanLastItem?: boolean;
    label?: Omit<InputLabelProps, "disabled">;
    helper?: ReactNode;
    extra?: ReactNode;
};

export const MultiInput: FC<MultiInputProps> = ({ layout, spanLastItem, label, extra, helper, children }) => {
    const childrenArray = Children.toArray(children);
    console.log({ spanLastItem });
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
            {layout === MultiInputLayout.Columns && (
                <div className="tw-grid tw-grid-cols-2 tw-gap-2">
                    {Children.map(children, (child, index) => {
                        return (
                            <div
                                className={`${
                                    spanLastItem && index === childrenArray.length - 1 ? "tw-col-span-2" : ""
                                }`}
                                key={index}
                            >
                                {child}
                            </div>
                        );
                    })}
                </div>
            )}
            {layout === MultiInputLayout.Spider && (
                <div className="tw-grid tw-grid-cols-8 tw-gap-2">
                    {childrenArray[0] && <div className="tw-col-start-3 tw-col-span-4">{childrenArray[0]}</div>}
                    {childrenArray[1] && <div className="tw-col-start-1 tw-col-span-4">{childrenArray[1]}</div>}
                    {childrenArray[2] && <div className="tw-col-start-5 tw-col-span-4">{childrenArray[2]}</div>}
                    {childrenArray[3] && <div className="tw-col-start-3 tw-col-span-4">{childrenArray[3]}</div>}
                </div>
            )}
            {helper && <div className="tw-text-s tw-font-sans tw-text-black-80">{helper}</div>}
        </div>
    );
};
