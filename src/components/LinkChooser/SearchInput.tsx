/* (c) Copyright Frontify Ltd., all rights reserved. */

import IconExternalLink from "@foundation/Icon/Generated/IconExternalLink";
import IconCopyToClipboard from "@foundation/Icon/Generated/IconCopyToClipboard";
import IconReject from "@foundation/Icon/Generated/IconReject";
import IconSpinner from "@foundation/Icon/Generated/IconSpinner";
import { useMemoizedId } from "@hooks/useMemoizedId";
import { useFocusRing } from "@react-aria/focus";
import { FOCUS_STYLE } from "@utilities/focusStyle";
import { merge } from "@utilities/merge";
import React, {
    ChangeEventHandler,
    FocusEvent,
    KeyboardEvent,
    forwardRef,
    HTMLInputTypeAttribute,
    ReactElement,
} from "react";
import { useClipboard } from "@hooks/useClipboard";
import { Validation } from "@components/TextInput/TextInput";
import { SearchResult } from "./LinkChooser";

const validationStyle: Record<Validation, string> = {
    [Validation.Default]: "tw-border-black-20",
    [Validation.Loading]: "tw-border-black-10",
    [Validation.Success]: "tw-border-green-50",
    [Validation.Error]: "tw-border-red-60",
};

export type SearchInputProps = {
    id?: string;
    selectedResult: SearchResult | null;
    type?: HTMLInputTypeAttribute;
    decorator?: ReactElement;
    dotted?: boolean;
    previewable?: boolean;
    copyable?: boolean;
    clearable?: boolean;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    validation?: Validation;
    value?: string | number | readonly string[];
    onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
    onEnterPressed?: (event: KeyboardEvent<HTMLInputElement>) => void;
    onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
    onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
    onClear?: () => void;
    onPreview?: () => void;
    onClick?: () => void;
    size?: number;
};

export const SearchInput = forwardRef<HTMLInputElement | null, SearchInputProps>(
    (
        {
            id: propId,
            selectedResult,
            type,
            decorator,
            validation = Validation.Default,
            previewable = false,
            copyable = false,
            clearable = false,
            placeholder,
            required,
            disabled = false,
            dotted = false,
            value = "",
            onChange,
            onEnterPressed,
            onFocus,
            onBlur,
            onClear,
            onPreview,
            onClick,
            size,
        },
        inputElement,
    ) => {
        const { isFocusVisible, focusProps } = useFocusRing({ within: true, isTextInput: true });
        const { isFocusVisible: previewButtonIsFocusVisible, focusProps: previewButtonFocusProps } = useFocusRing();
        const { isFocusVisible: copyButtonIsFocusVisible, focusProps: copyButtonFocusProps } = useFocusRing();
        const { isFocusVisible: clearButtonIsFocusVisible, focusProps: clearButtonFocusProps } = useFocusRing();

        useClipboard({ selector: "[data-clipboard-id='copy-button']", target: selectedResult?.link ?? "" });

        const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key === "Enter") {
                onEnterPressed && onEnterPressed(event);
            }
        };

        return (
            <div
                {...focusProps}
                data-test-id="search-wrapper"
                className={merge([
                    "tw-flex tw-items-center tw-h-9 tw-gap-2 tw-px-3 tw-border tw-rounded tw-text-s tw-font-sans tw-relative tw-bg-white dark:tw-bg-transparent",
                    dotted ? "tw-border-dashed" : "tw-border-solid",
                    disabled
                        ? "tw-border-black-5 tw-bg-black-5 dark:tw-bg-black-90 dark:tw-border-black-90"
                        : merge([
                              "focus-within:tw-border-black-90",
                              validationStyle[validation],
                              isFocusVisible && FOCUS_STYLE,
                          ]),
                ])}
            >
                {decorator && (
                    <div
                        className={merge([
                            "tw-flex tw-items-center tw-justify-center tw-pl-1",
                            disabled ? "tw-text-black-60" : "tw-text-black-80",
                        ])}
                        data-test-id="decorator"
                    >
                        {decorator}
                    </div>
                )}
                <input
                    id={useMemoizedId(propId)}
                    ref={inputElement}
                    className={merge([
                        "tw-flex-grow tw-border-none tw-outline-none tw-bg-transparent tw-hide-input-arrows",
                        disabled
                            ? "tw-text-black-40 tw-placeholder-black-30 dark:tw-text-black-30 dark:tw-placeholder-black-40"
                            : "tw-text-black tw-placeholder-black-60 dark:tw-text-white",
                    ])}
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onKeyDown={onKeyDown}
                    onClick={onClick}
                    placeholder={placeholder}
                    value={value}
                    type={type}
                    required={required}
                    disabled={disabled}
                    size={size}
                    data-test-id="search-input"
                />
                {selectedResult && previewable && (
                    <button
                        className={merge([
                            "tw-flex tw-items-center tw-justify-center tw-transition-colors tw-rounded",
                            previewButtonIsFocusVisible && FOCUS_STYLE,
                            disabled
                                ? "tw-cursor-default tw-text-black-40"
                                : "tw-text-black-60 hover:tw-text-black-100",
                        ])}
                        data-test-id="preview-icon"
                        title="Preview link"
                        aria-label=""
                        disabled={disabled}
                        onClick={onPreview}
                        {...previewButtonFocusProps}
                    >
                        <IconExternalLink />
                    </button>
                )}
                {selectedResult && copyable && (
                    <button
                        className={merge([
                            "tw-flex tw-items-center tw-justify-center tw-transition-colors tw-rounded",
                            copyButtonIsFocusVisible && FOCUS_STYLE,
                            disabled
                                ? "tw-cursor-default tw-text-black-40"
                                : "tw-text-black-60 hover:tw-text-black-100",
                        ])}
                        data-test-id="copy-icon"
                        data-clipboard-id="copy-button"
                        title="Copy text to clipboard"
                        aria-label=""
                        disabled={disabled}
                        {...copyButtonFocusProps}
                    >
                        <IconCopyToClipboard />
                    </button>
                )}
                {`${value}`.length !== 0 && clearable && (
                    <button
                        className={merge([
                            "tw-flex tw-items-center tw-justify-center tw-transition-colors tw-rounded",
                            disabled
                                ? "tw-cursor-default tw-text-black-40"
                                : "tw-text-black-60  hover:tw-text-black-100",
                            clearButtonIsFocusVisible && FOCUS_STYLE,
                        ])}
                        data-test-id="discard-icon"
                        title="Clear text input"
                        aria-label="clear text input"
                        disabled={disabled}
                        onClick={onClear}
                        {...clearButtonFocusProps}
                    >
                        <IconReject />
                    </button>
                )}
                {validation === Validation.Loading && (
                    <span className="tw-absolute tw-top-[-0.75rem] tw-right-[-0.75rem]">
                        <IconSpinner />
                    </span>
                )}
            </div>
        );
    },
);
