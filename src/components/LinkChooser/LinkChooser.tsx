import { Checkbox, CheckboxState } from "@components/Checkbox/Checkbox";
import { mapToAriaProps } from "@components/Menu/Aria/helper";
import { MenuItemType } from "@components/Menu/SelectMenu";
import { SelectionIndicatorIcon } from "@components/MenuItem/MenuItem";
import { MenuItemContentSize } from "@components/MenuItem/MenuItemContent";
import IconDocument from "@foundation/Icon/Generated/IconDocument";
import IconDocumentLibrary from "@foundation/Icon/Generated/IconDocumentLibrary";
import IconExternalLink from "@foundation/Icon/Generated/IconExternalLink";
import IconLink from "@foundation/Icon/Generated/IconLink";
import IconReject from "@foundation/Icon/Generated/IconReject";
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
import { linkChooserMachine, LinkChooserState } from "./state/link-chooser/machine";
export { Item, Section } from "@react-stately/collections";

export type SearchResult = MenuItemType & { icon: string };

export enum IconLabel {
    Document = "DOCUMENT",
    Library = "LIBRARY",
    Link = "LINK",
    External = "EXTERNAL",
    Reject = "REJECT",
    Template = "TEMPLATE",
}

export const ICON_OPTIONS: Record<IconLabel | string, ReactElement> = {
    [IconLabel.Document]: <IconDocument />,
    [IconLabel.Library]: <IconDocumentLibrary />,
    [IconLabel.Link]: <IconLink />,
    [IconLabel.External]: <IconExternalLink />,
    [IconLabel.Reject]: <IconReject />,
    [IconLabel.Template]: <IconTemplate />,
};

export const DEFAULT_ICON = IconLabel.Link;
export const CUSTOM_LINK_ID = "custom-link";
export const MAX_STORED_ITEMS = 5;
export const QUERIES_STORAGE_KEY = "queries";

export type TemplateMenuItemType = {
    id: Key;
    preview: string;
    title: string;
    subtitle?: string;
    link?: string;
    size?: MenuItemContentSize;
    selectionIndicator?: SelectionIndicatorIcon;
    iconLabel?: string;

    getTemplateByQuery?: (query: string) => SearchResult[];
};

export type TemplateMenuBlock = {
    id: string;
    menuItems: TemplateMenuItemType[];
    ariaLabel?: string;
};

export type LinkChooserProps = {
    getGlobalByQuery: (query: string) => Promise<SearchResult[]>;
    getGuidelinesByQuery: (query: string) => Promise<SearchResult[]>;
    getTemplatesByQuery: (query: string) => Promise<SearchResult[]>;
    openInNewTab: CheckboxState;
    ariaLabel?: string;
    label?: string;
    placeholder?: string;
    onOpenInNewTabChange: (value: boolean) => void;
};

// const mockAsyncFetch = (timeout) => new Promise((resolve) => setTimeout(resolve, timeout));

export const LinkChooser: FC<LinkChooserProps> = ({
    getGlobalByQuery,
    getTemplatesByQuery,
    openInNewTab,
    ariaLabel = "Menu",
    label,
    placeholder,
    onOpenInNewTabChange,
}) => {
    /* const [storedQueries, storeNewQuery] = useQueriesStorage(); */

    // doesn't update on storedQueries change
    const [{ context, matches, children, value }, send, service] = useMachine(
        linkChooserMachine.withContext({
            searchResults: [],
            openInNewTab,
            onOpenInNewTabChange,
            selectedResult: null,
            query: "",
            getGlobalByQuery,
            getTemplatesByQuery,
        }),
        { devTools: true },
    );

    const debouncedQuery = useDebounce({ value: context.query, delay: 500 });

    /* const [{ context: contextChild, matches: matchesChild }, sendChild] = useActor(children.dropdown); */

    const handleClearClick = useCallback(() => {
        state.setInputValue("");
        state.setSelectedKey("");
        send("CLEARING", { data: { query: "" } });
    }, []);

    // should search be triggered even when a user selects one of the options from the local storage?
    // open dropdown -> select one of the items from recent queries -> open the dropdown again (this time an option
    // is selected) -> should this trigger the search with the query of the currently selected item?
    const handleSelectionChange = (key: Key) => {
        const foundItem = context.searchResults.find((item) => item.id === key);
        if (foundItem) send("SET_SELECTED_SEARCH_RESULT", { data: { selectedResult: foundItem } });
    };

    // setting -> allowsEmptyCollection: true keeps dropdown open on custom value but introduces a discrepancy
    // between textinput and dropdown (if an item is selected and then textinput is modified, textinput contains one value
    // while the dropdown contains a different one)
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

    const formattedIcon = context.selectedResult?.iconLabel
        ? ICON_OPTIONS[context.selectedResult.iconLabel]
        : ICON_OPTIONS[DEFAULT_ICON];

    useEffect(() => {
        send("SEARCHING");
    }, [debouncedQuery]);

    useEffect(() => {
        /*
        // if current window/section !== default
            // if query/state.inputValue 
                // set loading state
                // hit the search endpoint with the query value (for the current window/section)
                // if successful
                    // return search results
                // else
                    // show error
                // finally
                    // stop loading state
            // else
                // get all results from A to Z
        // else
            // if current window/section "supports" recent queries and !query/state.inputValue
                // display recent queries (from local storage)
            // else 
                // display whatever current window/section needs to show (all results)
                    // set loading state
                    // hit the search endpoint with the query value (for the current window/section)
                    // if successful
                        // return search results
                    // else
                        // show error
                    // finally
                        // stop loading state
        */
    }, [state.inputValue, value]);

    return (
        <div
            data-test-id="link-chooser"
            className="tw-relative tw-w-full tw-font-sans tw-text-s"
            //onBlur={() => send("CLOSE_DROPDOWN")}
        >
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
                            <div>
                                <SearchResultsList
                                    {...listBoxProps}
                                    listBoxRef={listBoxRef}
                                    state={state}
                                    menuBlocks={searchResultMenuBlock}
                                    query={context.query}
                                    noBorder={true}
                                    machineService={service}
                                    //optionsType={displayedOptions.type}
                                    //openWindow={openWindow}
                                />
                                <div className="tw-border-t tw-border-black-10">
                                    <SectionActionMenu machineService={service} />
                                </div>
                            </div>
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
