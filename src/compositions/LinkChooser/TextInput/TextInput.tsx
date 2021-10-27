/* (c) Copyright Frontify Ltd., all rights reserved. */

import IconExternalLink from "@elements/Icon/Generated/IconExternalLink";
import IconCopyToClipboard from "@elements/Icon/Generated/IconCopyToClipboard";
import IconReject from "@elements/Icon/Generated/IconReject";
import { useMemoizedId } from "@hooks/useMemoizedId";
import { useFocusRing } from "@react-aria/focus";
import { FOCUS_STYLE } from "@utilities/focusStyle";
import { merge } from "@utilities/merge";
import React, {
    ChangeEventHandler,
    FocusEvent,
    KeyboardEvent,
    ReactElement,
    ReactNode,
    forwardRef,
    HTMLInputTypeAttribute,
    useEffect,
    useRef,
} from "react";
import { Node } from "@react-types/shared";
import { useClipboard } from "@hooks/useClipboard";
import { MenuBlock } from "@components/Menu/SelectMenu";

export enum Validation {
    Default = "Default",
    Loading = "Loading",
    Success = "Success",
    Error = "Error",
}

const validationStyle: Record<Validation, string> = {
    [Validation.Default]: "tw-border-black-20",
    [Validation.Loading]: "tw-border-black-10",
    [Validation.Success]: "tw-border-green-50",
    [Validation.Error]: "tw-border-red-60",
};

const Spinner = (): ReactElement => (
    <svg className="tw-animate-spin" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="7.5" fill="white" stroke="#EAEBEB" />
        <path
            fill="white"
            d="M16.3302 9.5C17.7109 11.8915 16.8915 14.9494 14.5 16.3301C12.1086 17.7108 9.05063 16.8915 7.66992 14.5"
            stroke="#9088FF"
        />
    </svg>
);

export type TextInputProps = {
    id?: string;
    selectedItem: Node<unknown>;
    menuBlocks: MenuBlock[];
    type?: HTMLInputTypeAttribute;
    decorator?: ReactNode;
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
    size?: number;
};

export const TextInput = forwardRef<HTMLInputElement | null, TextInputProps>(
    (
        {
            id: propId,
            selectedItem,
            menuBlocks,
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
            size,
        },
        inputElement,
    ) => {
        const { isFocusVisible, focusProps } = useFocusRing({ within: true, isTextInput: true });
        const { isFocusVisible: previewButtonIsFocusVisible, focusProps: previewButtonFocusProps } = useFocusRing();
        const { isFocusVisible: copyButtonIsFocusVisible, focusProps: copyButtonFocusProps } = useFocusRing();
        const { isFocusVisible: clearButtonIsFocusVisible, focusProps: clearButtonFocusProps } = useFocusRing();

        const selectedLink = useRef<string>("");

        useClipboard({ selector: "[data-clipboard-id='copy-button']", target: selectedLink.current });

        const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key === "Enter") {
                onEnterPressed && onEnterPressed(event);
            }
        };

        const openExternalLink = () => {
            window.open(selectedLink.current, "_blank");
        };

        const retrieveActiveLink = () => {
            const foundItem = selectedItem
                ? menuBlocks[0].menuItems.find((item) => item.id === selectedItem.key)
                : null;
            return foundItem && foundItem.link ? foundItem.link : "";
        };

        useEffect(() => {
            selectedLink.current = retrieveActiveLink();
        }, [selectedItem]);

        return (
            <div
                {...focusProps}
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
                    placeholder={placeholder}
                    value={value}
                    type={type}
                    required={required}
                    disabled={disabled}
                    size={size}
                    data-test-id="text-input"
                />
                {selectedItem && previewable && (
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
                        onClick={openExternalLink}
                        {...previewButtonFocusProps}
                    >
                        <IconExternalLink />
                    </button>
                )}
                {selectedItem && copyable && (
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
                        data-test-id="clear-icon"
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
                        <Spinner />
                    </span>
                )}
            </div>
        );
    },
);
