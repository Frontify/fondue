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
import { useComboBox } from "@react-aria/combobox";
import { DismissButton } from "@react-aria/overlays";
import { useComboBoxState } from "@react-stately/combobox";
import { useMachine } from "@xstate/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { FC, Key, ReactElement, useCallback, useMemo, useRef } from "react";
import { Interpreter } from "xstate";
import { SectionActionMenu } from "./SectionActionMenu";
import { DropdownContext } from "./context/dropdownContext";
import { useQueriesStorage } from "./hooks/useQueriesStorage";
import { SearchResultsList } from "./SearchResultSection";
import { Popover } from "./Popover";
import { SearchInput } from "./SearchInput";
import { DropdownContext as DropdownFSMContext } from "./state/dropdown/machine";
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

const DEFAULT_ICON = ICON_OPTIONS[IconLabel.Link];

export type TemplateMenuItemType = {
    id: Key;
    preview: string;
    title: string;
    subtitle?: string;
    link?: string;
    size?: MenuItemContentSize;
    selectionIndicator?: SelectionIndicatorIcon;
    iconLabel?: string;
};

export type TemplateMenuBlock = {
    id: string;
    menuItems: TemplateMenuItemType[];
    ariaLabel?: string;
};

export type LinkChooserProps = {
    // selectMenuBlocks: MenuBlock[];
    // actionMenuBlocks?: ActionMenuBlock[];
    // templateMenuBlocks: TemplateMenuBlock[];
    // selectedOption: SelectedOption;
    openInNewTab: CheckboxState;
    // openWindow: OpenWindow;
    ariaLabel?: string;
    label?: string;
    placeholder?: string;
    // onOptionChange: (item: MenuItemType | undefined) => void;
    // onWindowChange: (window: OpenWindowType) => void;
    onOpenInNewTabChange: (value: boolean) => void;
};

const getTemplateByQuery = (query: string): SearchResult[] => {};

export const LinkChooser: FC<LinkChooserProps> = ({
    // selectMenuBlocks: searchResults = getRecentSearchFromLocalStorage(),
    // templateMenuBlocks,
    // selectedOption,
    openInNewTab,
    ariaLabel = "Menu",
    label,
    placeholder,
    //onOptionChange,
    //onWindowChange,
    onOpenInNewTabChange,
}) => {
    const [storedQueries, storeNewQuery] = useQueriesStorage();

    // doesn't update on storedQueries change
    const [{ context, matches, children }, send] = useMachine(
        linkChooserMachine.withContext({
            searchResults: storedQueries,
            openInNewTab,
            onOpenInNewTabChange,
            selectedResult: null,
            query: "",
        }),
        { devTools: true },
    );

    const handleClearClick = useCallback(() => {
        state.setInputValue("");
        state.setSelectedKey("");
        send("CLEARING");
    }, []);

    // const updateVisibleItems = () => {
    //     const storedQueries = getRecentSearchFromLocalStorage();
    //     // TODO refactor this (temp)
    //     const currentWindowMenu = (() => {
    //         switch (openWindow) {
    //             case OpenWindowType.None:
    //                 return state.inputValue
    //                     ? [
    //                           {
    //                               ...searchResults[0],
    //                               menuItems: [
    //                                   ...searchResults[0].menuItems,
    //                                   {
    //                                       id: "12",
    //                                       title: `"${state.inputValue}"`, //TODO: remove the " when selecting
    //                                       link: state.inputValue,
    //                                       size: MenuItemContentSize.Large,
    //                                       selectionIndicator: SelectionIndicatorIcon.None,
    //                                       iconLabel: IconLabel.Link,
    //                                   },
    //                               ],
    //                           },
    //                       ]
    //                     : searchResults;
    //             case OpenWindowType.Templates:
    //                 return templateMenuBlocks;
    //             case OpenWindowType.Guidelines:
    //                 return [];
    //             case OpenWindowType.Projects:
    //                 return [];
    //             default:
    //                 return [];
    //         }
    //     })();
    //     // TODO refactor this (temp)
    //     const newSelectedOptions =
    //         state.inputValue || state.selectedKey || openWindow !== OpenWindowType.None
    //             ? { options: currentWindowMenu, type: OptionsType.Server }
    //             : { options: [{ ...currentWindowMenu[0], menuItems: storedQueries }], type: OptionsType.Client };
    //     setDisplayedOptions(newSelectedOptions);
    // };

    const handleSelectionChange = (key: Key) => {
        const foundItem = context.searchResults.find((item) => item.id === key);
        if (foundItem) {
            storeNewQuery(foundItem);
            send("SET_SELECTED_RESULT", { data: { selectedResult: foundItem } });
        }
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
        : DEFAULT_ICON;

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
                                <DropdownContext.Provider
                                    value={{
                                        dropdownMachineRef: children.dropdown as Interpreter<DropdownFSMContext>,
                                    }}
                                >
                                    <SearchResultsList
                                        {...listBoxProps}
                                        listBoxRef={listBoxRef}
                                        state={state}
                                        menuBlocks={searchResultMenuBlock}
                                        query={context.query}
                                        noBorder={true}
                                        hasItems={!!context.searchResults.length}
                                        //optionsType={displayedOptions.type}
                                        //openWindow={openWindow}
                                    />

                                    <div className="tw-border-t tw-border-black-10">
                                        <SectionActionMenu />
                                    </div>
                                </DropdownContext.Provider>
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
