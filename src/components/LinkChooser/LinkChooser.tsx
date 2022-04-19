/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mapToAriaProps } from "@components/ActionMenu/Aria/helper";
import { Checkbox, CheckboxState } from "@components/Checkbox/Checkbox";
import { useDropdownAutoHeight } from "@components/Dropdown/useDropdownAutoHeight";
import IconDocument from "@foundation/Icon/Generated/IconDocument";
import IconPatternLibrary from "@foundation/Icon/Generated/IconDocument";
import IconDocumentLibrary from "@foundation/Icon/Generated/IconDocumentLibrary";
import IconExternalLink from "@foundation/Icon/Generated/IconExternalLink";
import IconLink from "@foundation/Icon/Generated/IconLink";
import IconTemplate from "@foundation/Icon/Generated/IconTemplate";
import { useComboBox } from "@react-aria/combobox";
import { DismissButton } from "@react-aria/overlays";
import { scrollIntoView } from "@react-aria/utils";
import { useComboBoxState } from "@react-stately/combobox";
import { useMachine } from "@xstate/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { FC, Key, MouseEvent, ReactElement, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { NavigationMenu } from "./NavigationMenu";
import { Popover } from "./Popover";
import { SearchInput } from "./SearchInput";
import { SearchResultsList } from "./SearchResultsList";
import { defaultSection } from "./sections";
import { linkChooserMachine } from "./state/machine";
import { IconLabel, LinkChooserProps, SearchMenuBlock } from "./types";
import { decoratedResults, doesContainSubstring, findSection, getDefaultData } from "./utils/helpers";
import { closeBoxState, isLoaded, openBoxState, queryMatchesSelection, shouldGoBack } from "./utils/state";
import { createCustomLink } from "./utils/transformers";
import { useManualComboBoxEventHandlers } from "./utils/useManualComboBoxHandlers";
import { Validation } from "@utilities/validation";
import { LinkChooserState } from "./state/types";

export const IconOptions: Record<IconLabel | string, ReactElement> = {
    [IconLabel.Document]: <IconDocument />,
    [IconLabel.Library]: <IconDocumentLibrary />,
    [IconLabel.Link]: <IconLink />,
    [IconLabel.External]: <IconExternalLink />,
    [IconLabel.Template]: <IconTemplate />,
    [IconLabel.Block]: <IconPatternLibrary />,
};

export const DEFAULT_ICON = IconLabel.Link;
export const CUSTOM_LINK_ID = "custom-link";
export const MAX_STORED_ITEMS = 5;
export const QUERIES_STORAGE_KEY = "queries";

export const LinkChooser: FC<LinkChooserProps> = ({
    getGlobalByQuery = getDefaultData,
    openPreview = window.open,
    clipboardOptions = navigator.clipboard,
    selectedResult = null,
    openInNewTab = false,
    ariaLabel = "Menu",
    extraSections = [],
    label,
    placeholder,
    onOpenInNewTabChange,
    onLinkChange,
    disabled,
    clearable,
    required,
    validation = Validation.Default,
}) => {
    const [{ context, matches, value }, send, service] = useMachine(() =>
        linkChooserMachine.withContext({
            searchResults: [],
            selectedResult,
            query: "",
            interruptedFetch: false,
            getExtraResultsByQuery: null,
            currentSectionId: defaultSection.id,
            extraSections,
            clipboardOptions,
            openPreview,
            getGlobalByQuery,
            onLinkChange,
        }),
    );

    const [searchInput, setSearchInput] = useState(selectedResult?.title);
    const isDefault = !shouldGoBack(matches);
    const searchResultMenuBlocks = useMemo(
        () =>
            [
                !isDefault && { id: "menu-top", menuItems: [findSection(extraSections, context.currentSectionId)] },
                {
                    id: "search",
                    menuItems: decoratedResults(context.searchResults),
                },
                isDefault && { id: "menu-bottom", menuItems: extraSections.map(({ id, title }) => ({ id, title })) },
            ].filter(Boolean),
        [context.searchResults, isDefault, context.currentSectionId],
    ) as SearchMenuBlock[];

    const props = mapToAriaProps(ariaLabel, searchResultMenuBlocks);

    const inputRef = useRef<HTMLInputElement | null>(null);
    const listBoxRef = useRef<HTMLUListElement | null>(null);
    const popoverRef = useRef<HTMLDivElement | null>(null);

    const handleSelectionChange = (key: Key) => {
        const foundItem = context.searchResults.find((item) => item.id === key);
        if (foundItem) {
            setSearchInput(foundItem.title);
            send({ type: "SET_SELECTED_SEARCH_RESULT", data: { selectedResult: foundItem } });
        }
        closeBoxState(state);
        setSelectedKey(key);
    };

    const handleInputChange = useCallback(
        (query: string) => {
            setSearchInput(query);
            send({ type: "TYPING", data: { query } });
        },
        [value],
    );

    const [selectedKey, setSelectedKey] = useState<Key | undefined>(context.selectedResult?.id);

    const state = useComboBoxState({
        ...props,
        defaultFilter: (textValue, inputValue) => doesContainSubstring(textValue, inputValue, extraSections),
        inputValue: searchInput,
        onInputChange: handleInputChange,
        onSelectionChange: handleSelectionChange,
        menuTrigger: "manual",
        shouldCloseOnBlur: false,
        allowsEmptyCollection: true,
        selectedKey,
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
        setSelectedKey("");
        send({ type: "CLEARING", data: { query: "" } });
    }, []);

    const handleDropdownOpen = () => {
        send("OPEN_DROPDOWN");
        openBoxState(state);
    };

    const handleWrapperClick = () => {
        if (document.activeElement !== inputRef.current) {
            inputRef.current?.focus();
        }
        handleDropdownOpen();
    };

    const handleWrapperMouseDown = (event: MouseEvent<HTMLDivElement>) => {
        if (matches(LinkChooserState.Focused) && event.target !== inputRef.current) {
            event.preventDefault();
        }
    };

    const handleDropdownClose = () => {
        let selectedResult = null;
        if (context.query) {
            if (queryMatchesSelection(context.selectedResult, context.query)) {
                selectedResult = context.selectedResult;
            } else {
                selectedResult = createCustomLink(state.inputValue);
            }
        }
        send({ type: "CLOSE_DROPDOWN", data: { selectedResult } });
        if (selectedResult && selectedKey !== selectedResult.id) {
            setSelectedKey(selectedResult.id);
        }
        closeBoxState(state);
    };

    const manualInputProps = useManualComboBoxEventHandlers(
        { inputProps, inputRef, popoverRef, state },
        {
            onOpen: handleDropdownOpen,
            onClose: handleDropdownClose,
            onNavigate: (id) => {
                if (isDefault) {
                    send({
                        type: "SELECT_EXTRA_SECTION",
                        data: {
                            getExtraResultsByQuery: findSection(extraSections, id)?.getResults || null,
                            currentSectionId: id.toString(),
                        },
                    });
                } else {
                    send({
                        type: "BACK_TO_DEFAULT",
                        data: { getExtraResultsByQuery: null },
                    });
                }
            },
            onSelect: handleSelectionChange,
        },
    );

    useEffect(() => {
        if (isLoaded(matches) && context.interruptedFetch) {
            send({ type: "TYPING", data: { query: context.query } });
        }
    }, [context.interruptedFetch, value]);

    const { maxHeight } = useDropdownAutoHeight(inputRef, {
        isOpen: matches(LinkChooserState.Focused),
        autoResize: true,
    });

    const {
        isOpen,
        selectionManager: { focusedKey },
    } = state;

    useEffect(() => {
        if (focusedKey && popoverRef.current && isOpen) {
            const dropdownItem = popoverRef.current.querySelector(`[data-key="${focusedKey}"]`);
            if (dropdownItem) {
                scrollIntoView(popoverRef.current, dropdownItem as HTMLElement);
            }
        }
    }, [focusedKey, isOpen]);

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
                    decorator={IconOptions[context.selectedResult?.icon || DEFAULT_ICON]}
                    clearable={clearable}
                    onClear={handleClearClick}
                    machineService={service}
                    validation={validation}
                    onClick={handleWrapperClick}
                    onMouseDown={handleWrapperMouseDown}
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
                            maxHeight={maxHeight}
                        >
                            <SearchResultsList
                                {...listBoxProps}
                                listBoxRef={listBoxRef}
                                state={state}
                                menuBlocks={searchResultMenuBlocks}
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
