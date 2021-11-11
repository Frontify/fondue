/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Checkbox, CheckboxState } from "@components/Checkbox/Checkbox";
import { mapToAriaProps } from "@components/Menu/Aria/helper";
import IconDocument from "@foundation/Icon/Generated/IconDocument";
import IconDocumentLibrary from "@foundation/Icon/Generated/IconDocumentLibrary";
import IconExternalLink from "@foundation/Icon/Generated/IconExternalLink";
import IconLink from "@foundation/Icon/Generated/IconLink";
import IconTemplate from "@foundation/Icon/Generated/IconTemplate";
import { useDebounce } from "@hooks/useDebounce";
import { useComboBox } from "@react-aria/combobox";
import { DismissButton } from "@react-aria/overlays";
import { useComboBoxState } from "@react-stately/combobox";
import { useMachine } from "@xstate/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { FC, Key, ReactElement, useCallback, useEffect, useMemo, useRef } from "react";
import { Popover } from "./Popover";
import { SearchInput } from "./SearchInput";
import { SearchResultsList } from "./SearchResultSection";
import { SectionActionMenu } from "./SectionActionMenu";
import { linkChooserMachine, LinkChooserState } from "./state/machine";
import { LinkChooserProps } from "./types";
import * as SearchRepository from "./repositories";

export enum IconLabel {
    Document = "DOCUMENT",
    Library = "LIBRARY",
    Link = "LINK",
    External = "EXTERNAL",
    Template = "TEMPLATE",
}

export const ICON_OPTIONS: Record<IconLabel | string, ReactElement> = {
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
    getGlobalByQuery = SearchRepository.getGlobalByQuery,
    getTemplatesByQuery = SearchRepository.getTemplatesByQuery,
    openInNewTab,
    ariaLabel = "Menu",
    label,
    placeholder,
    onOpenInNewTabChange,
    onLinkChange,
}) => {
    const [{ context, matches }, send, service] = useMachine(
        linkChooserMachine.withContext({
            searchResults: [],
            openInNewTab,
            onOpenInNewTabChange,
            selectedResult: null,
            query: "",
            getGlobalByQuery,
            getTemplatesByQuery,
            onLinkChange,
        }),
        { devTools: true },
    );

    const debouncedQuery = useDebounce({ value: context.query, delay: 300 });

    const handleClearClick = useCallback(() => {
        state.setInputValue("");
        state.setSelectedKey("");
        send("CLEARING", { data: { query: "" } });
    }, []);

    const handleSelectionChange = (key: Key) => {
        const foundItem = context.searchResults.find((item) => item.id === key);
        if (foundItem) send("SET_SELECTED_SEARCH_RESULT", { data: { selectedResult: foundItem } });
    };

    const handleInputChange = (value: string) => {
        send("TYPING", { data: { query: value } });
    };

    const filterItems = (value: string, query: string) => value.toLowerCase().includes(query.toLowerCase());

    const searchResultMenuBlock = useMemo(
        () => [
            {
                id: "search",
                menuItems: context.searchResults,
            },
        ],
        [context.searchResults],
    );

    const props = mapToAriaProps(ariaLabel, searchResultMenuBlock);

    const state = useComboBoxState({
        ...props,
        defaultFilter: filterItems,
        shouldCloseOnBlur: false,
        onSelectionChange: handleSelectionChange,
        onInputChange: handleInputChange,
        menuTrigger: "manual",
        allowsEmptyCollection: true,
        onBlur: () => send("CLOSE_DROPDOWN"),
    });

    const inputRef = useRef<HTMLInputElement | null>(null);
    const listBoxRef = useRef<HTMLUListElement | null>(null);
    const popoverRef = useRef<HTMLDivElement | null>(null);

    const { inputProps, listBoxProps, labelProps } = useComboBox(
        {
            ...props,
            inputRef,
            listBoxRef,
            popoverRef,
        },
        state,
    );

    const formattedIcon = context.selectedResult?.icon
        ? ICON_OPTIONS[context.selectedResult.icon]
        : ICON_OPTIONS[DEFAULT_ICON];

    useEffect(() => {
        send("SEARCHING");
    }, [debouncedQuery]);

    return (
        <div data-test-id="link-chooser" className="tw-relative tw-w-full tw-font-sans tw-text-s">
            <label {...labelProps} className="block text-sm font-medium text-gray-700 text-left">
                {label}
            </label>
            <div
                className={`relative inline-flex flex-row rounded-md overflow-hidden shadow-sm border-2 ${
                    state.isFocused ? "border-pink-500" : "border-gray-300"
                }`}
            >
                <SearchInput
                    {...inputProps}
                    selectedResult={context.selectedResult}
                    ref={inputRef}
                    decorator={formattedIcon}
                    previewable={true}
                    copyable={true}
                    clearable={true}
                    placeholder={placeholder}
                    onClear={handleClearClick}
                    onPreview={() => send("OPEN_PREVIEW")}
                    onClick={() => send("OPEN_DROPDOWN")}
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
                    >
                        <DismissButton onDismiss={() => send("CLOSE_DROPDOWN")} />
                        <Popover
                            popoverRef={popoverRef}
                            isOpen={matches(LinkChooserState.Focused)}
                            onClose={() => send("CLOSE_DROPDOWN")}
                        >
                            <>
                                <SearchResultsList
                                    {...listBoxProps}
                                    listBoxRef={listBoxRef}
                                    state={state}
                                    menuBlocks={searchResultMenuBlock}
                                    query={context.query}
                                    noBorder={true}
                                    machineService={service}
                                />
                                <div className="tw-border-t tw-border-black-10">
                                    <SectionActionMenu machineService={service} />
                                </div>
                            </>
                        </Popover>
                        <DismissButton onDismiss={() => send("CLOSE_DROPDOWN")} />
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="tw-my-2">
                <Checkbox
                    value="new-tab"
                    state={context.openInNewTab ? CheckboxState.Checked : CheckboxState.Unchecked}
                    onChange={(isChecked) => send("SET_NEW_TAB", { data: { openInNewTab: isChecked } })}
                    label="Open in New Tab"
                />
            </div>
        </div>
    );
};
