/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Checkbox, CheckboxState } from "@components/Checkbox/Checkbox";
import { mapToAriaProps } from "@components/Menu/Aria/helper";
import { useComboBox } from "@react-aria/combobox";
import { DismissButton } from "@react-aria/overlays";
import { useComboBoxState } from "@react-stately/combobox";
import { merge } from "@utilities/merge";
import { useMachine } from "@xstate/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { FC, Key, useCallback, useEffect, useMemo, useRef } from "react";
import { Popover } from "./Popover";
import { SearchInput } from "./SearchInput";
import { SearchResultsList } from "./SearchResultSection";
import { SectionActionMenu } from "./SectionActionMenu";
import { DropdownState, linkChooserMachine, LinkChooserState } from "./state/machine";
import { IconOptions, IconType, LinkChooserProps } from "./types";
import { doesContainSubstring, flatten, mapToSearchResult } from "./utils/helpers";
import { isLoaded, queryMatchesSelection } from "./utils/state";
import { createCustomLink } from "./utils/transformers";

export const DEFAULT_ICON = IconType.Link;
export const CUSTOM_LINK_ID = "custom-link";
export const MAX_STORED_ITEMS = 5;
export const QUERIES_STORAGE_KEY = "queries";

export const LinkChooser: FC<LinkChooserProps> = ({
    openPreview = window.open,
    clipboardOptions = navigator.clipboard,
    ariaLabel = "Link chooser",
    disabled = false,
    clearable = true,
    getGlobalByQuery,
    getTemplatesByQuery,
    getGuidelinesByQuery,
    openInNewTab,
    label,
    placeholder,
    onOpenInNewTabChange,
    onLinkChange,
}) => {
    const [{ context, matches, value }, send, service] = useMachine(
        linkChooserMachine.withContext({
            guidelineNodes: [],
            searchResults: [],
            selectedResult: null,
            query: "",
            interruptedFetch: false,
            clipboardOptions,
            openPreview,
            getGlobalByQuery,
            getGuidelinesByQuery,
            getTemplatesByQuery,
            onLinkChange,
        }),
    );

    const handleClearClick = useCallback(() => {
        state.setInputValue("");
        state.setSelectedKey("");
        send("CLEARING", { data: { query: "" } });
    }, []);

    const isGuidelinesView = matches(`${LinkChooserState.Focused}.${DropdownState.Guidelines}`);

    const onSelectionChange = (key: Key) => {
        const foundItem = isGuidelinesView
            ? mapToSearchResult(flatten(context.guidelineNodes).find((item) => item.id === key))
            : context.searchResults.find((item) => item.id === key);

        if (foundItem) {
            send("SET_SELECTED_SEARCH_RESULT", { data: { selectedResult: foundItem } });
        }
    };

    const onInputChange = useCallback(
        (value: string) => {
            send("TYPING", { data: { query: value } });
        },
        [value],
    );

    const handleDropdownOpen = () => send("OPEN_DROPDOWN");

    const handleDropdownClose = () => {
        const selectedResult = context.query
            ? queryMatchesSelection(context.selectedResult, context.query)
                ? context.selectedResult
                : createCustomLink(state.inputValue)
            : null;
        send("CLOSE_DROPDOWN", { data: { selectedResult } });
        state.setSelectedKey(selectedResult?.id || "");
    };

    const searchResultMenuBlock = useMemo(
        () => [
            {
                id: "search",
                menuItems: context.searchResults,
            },
        ],
        [context.searchResults],
    );

    const ariaProps = mapToAriaProps(ariaLabel, searchResultMenuBlock);

    const state = useComboBoxState({
        ...ariaProps,
        isDisabled: disabled,
        defaultFilter: doesContainSubstring,
        menuTrigger: "manual",
        allowsEmptyCollection: clearable,
        onBlur: handleDropdownClose,
        onInputChange,
        onSelectionChange,
    });

    const inputRef = useRef<HTMLInputElement | null>(null);
    const listBoxRef = useRef<HTMLUListElement | null>(null);
    const popoverRef = useRef<HTMLDivElement | null>(null);

    const { inputProps, listBoxProps, labelProps } = useComboBox(
        {
            ...ariaProps,
            inputRef,
            listBoxRef,
            popoverRef,
            onBlur: handleDropdownClose,
        },
        state,
    );

    const formattedIcon = IconOptions[context.selectedResult?.icon || DEFAULT_ICON];
    const menuBlocks = searchResultMenuBlock.map((block) => {
        const itemsWithDecorator = block.menuItems.map((item) => ({
            ...item,
            decorator: formattedIcon,
        }));

        return { ...block, menuItems: itemsWithDecorator };
    });

    useEffect(() => {
        if (isLoaded(matches) && context.interruptedFetch) {
            send("TYPING", { data: { query: context.query } });
        }
    }, [context.interruptedFetch, value]);

    return (
        <div data-test-id="link-chooser" className="tw-relative tw-w-full tw-font-sans tw-text-s">
            <label {...labelProps} className="block text-sm font-medium text-gray-700 text-left">
                {label}
            </label>
            <div
                className={merge([
                    "relative inline-flex flex-row rounded-md overflow-hidden shadow-sm border-2",
                    state.isFocused ? "border-pink-500" : "border-gray-300",
                ])}
            >
                <SearchInput
                    ariaProps={inputProps}
                    selectedResult={context.selectedResult}
                    ref={inputRef}
                    decorator={formattedIcon}
                    placeholder={placeholder}
                    onClear={handleClearClick}
                    onClick={handleDropdownOpen}
                    machineService={service}
                    disabled={disabled}
                    clearable={clearable}
                />
            </div>
            <AnimatePresence>
                {matches(LinkChooserState.Focused) && (
                    <motion.div
                        className="tw-absolute tw-left-0 tw-w-full tw-overflow-hidden tw-p-0 tw-shadow-mid tw-list-none tw-m-0 tw-mt-2 tw-z-10"
                        key="content"
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ ease: [0.04, 0.62, 0.23, 0.98] }}
                        data-test-id="link-chooser-dropdown"
                    >
                        <DismissButton onDismiss={handleDropdownClose} />
                        <Popover
                            popoverRef={popoverRef}
                            isOpen={matches(LinkChooserState.Focused)}
                            onClose={handleDropdownClose}
                        >
                            <SearchResultsList
                                {...listBoxProps}
                                listBoxRef={listBoxRef}
                                state={state}
                                menuBlocks={menuBlocks}
                                onSelectionChange={onSelectionChange}
                                border={false}
                                machineService={service}
                            />
                            <div data-test-id="link-chooser-action-menu" className="tw-border-t tw-border-black-10">
                                <SectionActionMenu machineService={service} />
                            </div>
                        </Popover>
                        <DismissButton onDismiss={handleDropdownClose} />
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="tw-my-2" data-test-id="link-chooser-new-tab">
                <Checkbox
                    value="new-tab"
                    state={openInNewTab ? CheckboxState.Checked : CheckboxState.Unchecked}
                    onChange={onOpenInNewTabChange}
                    label="Open in New Tab"
                />
            </div>
        </div>
    );
};
