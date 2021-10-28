/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TextInputBaseProps, TextInputType } from "@components/TextInput/TextInput";
import { useMemoizedId } from "@hooks/useMemoizedId";
import { useFocusRing } from "@react-aria/focus";
import { FOCUS_STYLE } from "@utilities/focusStyle";
import { merge } from "@utilities/merge";
import React, { FC, useRef } from "react";

export type ColorInputProps = { min?: number; max?: number } & Pick<
    TextInputBaseProps,
    "decorator" | "value" | "onChange" | "type" | "size" | "onBlur"
>;

export const ColorInput: FC<ColorInputProps> = ({
    min,
    max,
    decorator,
    onChange,
    size,
    onBlur,
    value = "",
    type = TextInputType.Text,
}) => {
    const { isFocusVisible, focusProps } = useFocusRing({ within: true, isTextInput: true });
    const inputElement = useRef<HTMLInputElement | null>(null);

    return (
        <div
            {...focusProps}
            className={merge([
                "tw-flex tw-items-center tw-h-9 tw-gap-1 tw-px-3 md:tw-px-1 tw-border tw-rounded tw-text-s tw-font-sans tw-relative tw-bg-white dark:tw-bg-transparent focus-within:tw-border-black-90 tw-border-black-20",
                isFocusVisible && FOCUS_STYLE,
            ])}
            data-test-id="color-input"
        >
            {decorator && (
                <div className="tw-flex tw-items-center tw-justify-center md:tw-pl-0.5 tw-text-black-80">
                    {decorator}
                </div>
            )}
            <input
                id={useMemoizedId()}
                ref={inputElement}
                className="tw-flex-grow tw-border-none tw-outline-none tw-bg-transparent tw-hide-input-arrows tw-text-black tw-placeholder-black-60 dark:tw-text-white"
                onClick={() => inputElement.current?.focus()}
                onChange={(event) => onChange && onChange(event.currentTarget.value)}
                onBlur={onBlur}
                value={value}
                type={type}
                min={min}
                max={max}
                size={size}
            />
        </div>
    );
};
