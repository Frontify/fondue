/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Checkbox, CheckboxState } from "@components/Checkbox/Checkbox";
import { mapToAriaProps } from "@components/Menu/Aria/helper";
import IconDocument from "@foundation/Icon/Generated/IconDocument";
import IconDocumentLibrary from "@foundation/Icon/Generated/IconDocumentLibrary";
import IconExternalLink from "@foundation/Icon/Generated/IconExternalLink";
import IconLink from "@foundation/Icon/Generated/IconLink";
import IconTemplate from "@foundation/Icon/Generated/IconTemplate";
import { useComboBox } from "@react-aria/combobox";
import { DismissButton } from "@react-aria/overlays";
import { useComboBoxState } from "@react-stately/combobox";
import { useMachine } from "@xstate/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { FC, Key, ReactElement, useCallback, useEffect, useMemo, useRef } from "react";
import { Popover } from "./Popover";
import { SearchInput } from "./SearchInput";
import { SearchResultsList } from "./SearchResultsList";
import { linkChooserMachine, LinkChooserState } from "./state/machine";
import { IconLabel, LinkChooserProps, SearchMenuBlock } from "./types";
import { decoratedResults, getDefaultData, goToSection } from "./utils/helpers";
import { doesContainSubstring } from "./utils/helpers";
import { closeBoxState, isLoaded, openBoxState, queryMatchesSelection, shouldGoBack } from "./utils/state";
import { createCustomLink } from "./utils/transformers";
import { Validation } from "@components/TextInput";
import { defaultSection, sections } from "./sections";
import { useManualComboBoxEventHandlers } from "./utils/useManualComboBoxHandlers";
import { NavigationMenu } from "./NavigationMenu";

export const IconOptions: Record<IconLabel | string, ReactElement> = {
    [IconLabel.Document]: <IconDocument />,
    [IconLabel.Library]: <IconDocumentLibrary />,
    [IconLabel.Link]: <IconLink />,
    [IconLabel.External]: <IconExternalLink />,
    [IconLabel.Template]: <IconTemplate />,
};

export const DEFAULT_ICON = IconLabel.Link;
export const CUSTOM_LINK_ID = "custom-link";
export const MAX_STORED_ITEMS = 5;
export const QUERIES_STORAGE_KEY = "queries";

export const LinkChooser: FC<LinkChooserProps> = ({
    getGlobalByQuery = getDefaultData,
    getTemplatesByQuery = getDefaultData,
    getGuidelinesByQuery = getDefaultData,
    openPreview = window.open,
    clipboardOptions = navigator.clipboard,
    openInNewTab = false,
    ariaLabel = "Menu",
    label,
    placeholder,
    onOpenInNewTabChange,
    onLinkChange,
    disabled,
    clearable,
    required,
    validation = Validation.Default,
}) => {
    const [{ context, matches, value }, send, service] = useMachine(
        linkChooserMachine.withContext({
            searchResults: [],
            selectedResult: null,
            query: "",
            interruptedFetch: false,
            clipboardOptions,
            openPreview,
            getGlobalByQuery,
            getTemplatesByQuery,
            getGuidelinesByQuery,
            onLinkChange,
        }),
    );

    const isDefault = shouldGoBack(matches);
    const searchResultMenuBlock = useMemo(
        () =>
            [
                isDefault && { id: "menu-top", menuItems: [defaultSection] },
                {
                    id: "search",
                    menuItems: decoratedResults(context.searchResults),
                },
                !isDefault && { id: "menu-bottom", menuItems: sections },
            ].filter(Boolean),
        [context.searchResults, isDefault],
    ) as SearchMenuBlock[];

    const props = mapToAriaProps(ariaLabel, searchResultMenuBlock);

    const inputRef = useRef<HTMLInputElement | null>(null);
    const listBoxRef = useRef<HTMLUListElement | null>(null);
    const popoverRef = useRef<HTMLDivElement | null>(null);

    const handleSelectionChange = (key: Key) => {
        const foundItem = context.searchResults.find((item) => item.id === key);
        if (foundItem) {
            send("SET_SELECTED_SEARCH_RESULT", { data: { selectedResult: foundItem } });
        }
        closeBoxState(state);
    };
    const handleInputChange = useCallback(
        (query: string) => {
            send("TYPING", { data: { query } });
        },
        [value],
    );

    const state = useComboBoxState({
        ...props,
        defaultFilter: doesContainSubstring,
        onInputChange: handleInputChange,
        onSelectionChange: handleSelectionChange,
        menuTrigger: "manual",
        shouldCloseOnBlur: false,
        allowsEmptyCollection: true,
    });

    const { inputProps, listBoxProps, labelProps } = useComboBox(
        {
            ...props,
            inputRef,
            listBoxRef,
            popoverRef,
            isRequired: required,
            placeholder,
        },
        state,
    );

    const handleClearClick = useCallback(() => {
        state.setInputValue("");
        state.setSelectedKey("");
        send("CLEARING", { data: { query: "" } });
    }, []);

    const handleDropdownOpen = () => {
        send("OPEN_DROPDOWN");
        openBoxState(state);
    };

    const handleDropdownClose = () => {
        const selectedResult = context.query
            ? queryMatchesSelection(context.selectedResult, context.query)
                ? context.selectedResult
                : createCustomLink(state.inputValue)
            : null;
        send("CLOSE_DROPDOWN", { data: { selectedResult } });

        if (selectedResult && state.selectedKey !== selectedResult.id) {
            state.setSelectedKey(selectedResult.id);
        }

        closeBoxState(state);
    };

    const manualInputProps = useManualComboBoxEventHandlers(
        { inputProps, inputRef, popoverRef, state },
        { onOpen: handleDropdownOpen, onClose: handleDropdownClose, onNavigate: (id) => goToSection(id, send) },
    );

    const inputDecorator = IconOptions[context.selectedResult?.icon || DEFAULT_ICON];

    useEffect(() => {
        if (isLoaded(matches) && context.interruptedFetch) {
            send("TYPING", { data: { query: context.query } });
        }
    }, [context.interruptedFetch, value]);

    return (
        <div data-test-id="link-chooser" className="tw-relative tw-w-full tw-font-sans tw-text-s">
            {!!label && (
                <label
                    {...labelProps}
                    data-test-id="link-chooser-label"
                    className="tw-text-black-80 tw-mb-1 tw-flex tw-align-items-center"
                >
                    {label}
                    {required && (
                        <span
                            data-test-id="link-chooser-label-required"
                            className="tw-h-4 tw-text-m tw-text-red-60 dark:tw-text-red-50 tw-ml-1"
                        >
                            *
                        </span>
                    )}
                </label>
            )}
            <div>
                <SearchInput
                    ariaProps={manualInputProps}
                    selectedResult={context.selectedResult}
                    ref={inputRef}
                    disabled={disabled}
                    decorator={inputDecorator}
                    clearable={clearable}
                    onClear={handleClearClick}
                    machineService={service}
                    validation={validation}
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
                                menuBlocks={searchResultMenuBlock}
                                query={context.query}
                                border={false}
                                machineService={service}
                            />
                            <div data-test-id="link-chooser-action-menu" className="tw-border-t tw-border-black-10">
                                <NavigationMenu machineService={service} state={state} />
                            </div>
                        </Popover>
                        <DismissButton onDismiss={handleDropdownClose} />
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="tw-my-2" data-test-id="link-chooser-new-tab">
                <Checkbox
                    value="new-tab"
                    disabled={disabled}
                    state={openInNewTab ? CheckboxState.Checked : CheckboxState.Unchecked}
                    onChange={onOpenInNewTabChange}
                    label="Open in New Tab"
                />
            </div>
        </div>
    );
};
