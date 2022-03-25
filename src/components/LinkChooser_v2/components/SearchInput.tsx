/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* (c) Copyright Frontify Ltd., all rights reserved. */
import { LoadingCircle, LoadingCircleSize } from "@components/LoadingCircle";
import IconCopyToClipboard from "@foundation/Icon/Generated/IconCopyToClipboard";
import IconExternalLink from "@foundation/Icon/Generated/IconExternalLink";
import IconReject from "@foundation/Icon/Generated/IconReject";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import { FOCUS_STYLE } from "@utilities/focusStyle";
import { merge } from "@utilities/merge";
import { Validation, validationClassMap } from "@utilities/validation";
import React, { forwardRef } from "react";
import { SearchInputProps } from "../types";
import { IconButton } from "./IconButton";

export const SearchInput = forwardRef<HTMLInputElement | null, SearchInputProps>(
    (
        {
            disabled = false,
            clearable = true,
            validation = Validation.Default,
            ariaProps,
            selectedKey,
            decorator,
            onClear,
            onClick,
            onMouseDown,
        },
        inputElement,
    ) => {
        const { value } = ariaProps;
        const { isFocusVisible, focusProps, isFocused } = useFocusRing({ isTextInput: true });

        const isLoading = validation === Validation.Loading;

        return (
            <div
                data-test-id="link-chooser-search-wrapper"
                className={merge([
                    "tw-flex tw-items-center tw-h-9 tw-gap-2 tw-px-2.5 tw-border tw-rounded tw-text-s tw-font-sans tw-relative tw-bg-white dark:tw-bg-transparent",
                    disabled
                        ? "tw-border-black-5 tw-bg-black-5 dark:tw-bg-black-90 dark:tw-border-black-90"
                        : merge([
                              "focus-within:tw-border-black-100",
                              isFocusVisible && FOCUS_STYLE,
                              validationClassMap[validation],
                          ]),
                ])}
                onClick={onClick}
                onMouseDown={onMouseDown}
            >
                {decorator && (
                    <div
                        className={merge([
                            "tw-flex tw-items-center tw-justify-center tw-flex-none",
                            disabled || !selectedKey ? "tw-text-black-40" : "tw-text-violet-60",
                        ])}
                        data-test-id="link-chooser-decorator-icon"
                    >
                        {decorator}
                    </div>
                )}
                <input
                    {...mergeProps(focusProps, ariaProps)}
                    readOnly={!isFocused}
                    ref={inputElement}
                    className={merge([
                        "tw-flex-auto tw-border-none tw-outline-none tw-bg-transparent tw-hide-input-arrows tw-min-w-0 tw-whitespace-nowrap tw-truncate",
                        disabled
                            ? "tw-text-black-40 tw-placeholder-black-30 dark:tw-text-black-30 dark:tw-placeholder-black-40"
                            : "tw-text-black tw-placeholder-black-60 dark:tw-text-white",
                    ])}
                    value={value}
                    disabled={disabled}
                    data-test-id="link-chooser-search-input"
                />
                {selectedKey && !isLoading && (
                    <IconButton
                        disabled={disabled}
                        testId="link-chooser-preview-icon"
                        title="Preview link"
                        ariaLabel="preview link"
                        icon={<IconExternalLink />}
                        onClick={() => alert("TODO: open preview")}
                    />
                )}
                {selectedKey && !isLoading && (
                    <IconButton
                        disabled={disabled}
                        testId="link-chooser-copy-icon"
                        title="Copy text to clipboard"
                        ariaLabel="copy text to clipboard"
                        icon={<IconCopyToClipboard />}
                        onClick={() => alert("TODO: copy to clipboard")}
                    />
                )}
                {`${value}`.length !== 0 && clearable && !isLoading && (
                    <IconButton
                        disabled={disabled}
                        testId="link-chooser-clear-icon"
                        title="Clear text input"
                        ariaLabel="clear text input"
                        icon={<IconReject />}
                        isComboBoxControl
                        onClick={onClear}
                    />
                )}
                {isLoading && (
                    <span className="tw-flex tw-flex-none tw-justify-center tw-align-center">
                        <LoadingCircle size={LoadingCircleSize.ExtraSmall} />
                    </span>
                )}
            </div>
        );
    },
);

SearchInput.displayName = "SearchInput";
