import React, { FC, Key, useRef, useState, useEffect, useCallback, ReactElement, Children } from "react";
import { useComboBoxState } from "@react-stately/combobox";
import { useComboBox } from "@react-aria/combobox";
import { ListBox } from "./ListBox/ListBox";
import { Popover } from "./Popover/Popover";
import { mapToAriaProps } from "@components/Menu/Aria/helper";
import { MenuBlock, MenuItemType } from "@components/Menu/SelectMenu";
import { SearchInput } from "./SearchInput/SearchInput";
import { AnimatePresence, motion } from "framer-motion";
import { DismissButton } from "@react-aria/overlays";
import { ActionMenu, ActionMenuBlock } from "@components/Menu/ActionMenu/ActionMenu";
import { Checkbox, CheckboxState } from "@components/Checkbox/Checkbox";
import IconDocument from "@foundation/Icon/Generated/IconDocument";
import IconLink from "@foundation/Icon/Generated/IconLink";
import IconExternalLink from "@foundation/Icon/Generated/IconExternalLink";
import IconDocumentLibrary from "@foundation/Icon/Generated/IconDocumentLibrary";
import IconReject from "@foundation/Icon/Generated/IconReject";
import { OpenWindow, OpenWindowType, SelectedOption } from "./LinkChooser.stories";
import IconTemplate from "@foundation/Icon/Generated/IconTemplate";
import { MenuItemContentSize } from "@components/MenuItem/MenuItemContent";
import { SelectionIndicatorIcon } from "@components/MenuItem/MenuItem";
import { useMachine } from "@xstate/react";
import { linkChooserMachine, LinkChooserState } from "./state/link-chooser/machine";
import { DropdownContext } from "./context/dropdownContext";
import { Interpreter } from "xstate";
import { DropdownContext as DropdownFSMContext } from "./state/dropdown/machine";
import { SectionActionMenu } from "./components/SectionActionMenu";
export { Item, Section } from "@react-stately/collections";

const MAX_STORED_ITEMS = 5;

export type SearchResult = MenuItemType;

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
    selectMenuBlocks: MenuBlock[];
    actionMenuBlocks?: ActionMenuBlock[];
    templateMenuBlocks: TemplateMenuBlock[];
    selectedOption: SelectedOption;
    newTab: CheckboxState;
    openWindow: OpenWindow;
    ariaLabel?: string;
    label?: string;
    placeholder?: string;
    onOptionChange: (item: MenuItemType | undefined) => void;
    onWindowChange: (window: OpenWindowType) => void;
    onTabChange: (value: boolean) => void;
};

export enum OptionsType {
    Client = "CLIENT",
    Server = "SERVER",
}

type LinkChooserState2 = {
    options: MenuBlock[];
    type: OptionsType;
};

const getRecentSearchFromLocalStorage = (): SearchResult[] => {
    const recentQueries = JSON.parse(localStorage.getItem("queries") || "null");
    return recentQueries || [];
};

export const LinkChooser: FC<LinkChooserProps> = ({
    selectMenuBlocks = getRecentSearchFromLocalStorage(),
    templateMenuBlocks,
    selectedOption,
    newTab,
    openWindow,
    ariaLabel = "Menu",
    label,
    placeholder,
    onOptionChange,
    //onWindowChange,
    onTabChange,
}) => {
    const [
        {
            //context,
            matches,
            children,
        },
        send,
    ] = useMachine(
        linkChooserMachine.withContext({
            selectMenuBlocks,
            templateMenuBlocks,
            selectedMenuBlock: selectedOption,
            newTab,
            onOpenInNewTabChange: onTabChange,
        }),
        { devTools: true },
    );
    const actionMenuBlocks = [
        {
            id: "Actions",
            menuItems: [
                {
                    id: "guidelines",
                    title: "Guidelines",
                    size: MenuItemContentSize.Small,
                    selectionIndicator: SelectionIndicatorIcon.CaretRight,
                    onClick: () => send("GO_TO_GUIDELINES"),
                },
                {
                    id: "projects",
                    title: "Projects",
                    size: MenuItemContentSize.Small,
                    selectionIndicator: SelectionIndicatorIcon.CaretRight,
                    onClick: () => send("GO_TO_PROJECTS"),
                },
                {
                    id: "templates",
                    title: "Templates",
                    size: MenuItemContentSize.Small,
                    selectionIndicator: SelectionIndicatorIcon.CaretRight,
                    onClick: () => send("GO_TO_TEMPLATES"),
                },
            ],
        },
    ];
    // TODO should add loading and error state?
    const [displayedOptions, setDisplayedOptions] = useState<LinkChooserState2>({
        options: selectMenuBlocks,
        type: OptionsType.Server,
    });

    const handleClearClick = useCallback(() => {
        state.setInputValue("");
        state.setSelectedKey("");
    }, []);

    const handlePreviewClick = useCallback(() => {
        newTab === CheckboxState.Checked
            ? window.open(selectedOption.link, "_blank")
            : (window.location.href = selectedOption.link);
    }, [newTab, selectedOption.link]);

    const updateVisibleItems = () => {
        const storedQueries = getRecentSearchFromLocalStorage();
        // TODO refactor this (temp)
        const currentWindowMenu = (() => {
            switch (openWindow) {
                case OpenWindowType.None:
                    return state.inputValue
                        ? [
                              {
                                  ...selectMenuBlocks[0],
                                  menuItems: [
                                      ...selectMenuBlocks[0].menuItems,
                                      {
                                          id: "12",
                                          title: `"${state.inputValue}"`, //TODO: remove the " when selecting
                                          link: state.inputValue,
                                          size: MenuItemContentSize.Large,
                                          selectionIndicator: SelectionIndicatorIcon.None,
                                          iconLabel: IconLabel.Link,
                                      },
                                  ],
                              },
                          ]
                        : selectMenuBlocks;
                case OpenWindowType.Templates:
                    return templateMenuBlocks;
                case OpenWindowType.Guidelines:
                    return [];
                case OpenWindowType.Projects:
                    return [];
                default:
                    return [];
            }
        })();
        // TODO refactor this (temp)
        const newSelectedOptions =
            state.inputValue || state.selectedKey || openWindow !== OpenWindowType.None
                ? { options: currentWindowMenu, type: OptionsType.Server }
                : { options: [{ ...currentWindowMenu[0], menuItems: storedQueries }], type: OptionsType.Client };
        setDisplayedOptions(newSelectedOptions);
    };

    const handleSelectionChange = (key: Key) => {
        const foundItem = displayedOptions.options[0].menuItems.find((item) => item.id === key);
        storeNewSelection(foundItem);
        onOptionChange(foundItem);
    };

    const filterItems = (value: string, query: string) => value.toLowerCase().includes(query.toLowerCase());

    const storeNewSelection = (option: MenuItemType | undefined) => {
        if (option) {
            const recentQueries = getRecentSearchFromLocalStorage();
            const retrievedItem = recentQueries.find((item: MenuItemType) => item.id === option.id);
            const updatedQueries = retrievedItem
                ? [{ ...option }, ...recentQueries.filter((item: MenuItemType) => item.id !== option.id)]
                : recentQueries.length < MAX_STORED_ITEMS
                ? [{ ...option }, ...recentQueries]
                : [{ ...option }, ...recentQueries.slice(0, -1)];
            localStorage.setItem("queries", JSON.stringify(updatedQueries));
        }
    };

    /*     const handleMenuOpen = () => state.open(); */

    /*     const handleMenuClose = () => state.close(); */

    const props = mapToAriaProps(ariaLabel, displayedOptions.options);

    const state = useComboBoxState({
        ...props,
        defaultFilter: filterItems,
        shouldCloseOnBlur: false,
        onSelectionChange: handleSelectionChange,
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

    // TODO remove (temp)
    /*     const currentWindow = {
        [OpenWindowType.None]: (
            <div>
                <ListBox
                    {...listBoxProps}
                    listBoxRef={listBoxRef}
                    state={state}
                    menuBlocks={selectMenuBlocks}
                    noBorder={true}
                    hasItems={!!displayedOptions[0].menuItems.length}
                />
                {actionMenuBlocks && (
                    <div className="tw-border-t tw-border-black-10">
                        <ActionMenu menuBlocks={actionMenuBlocks} noBorder={true} />
                    </div>
                )}
            </div>
        ),
        [OpenWindowType.Templates]: (
            <Templates templates={[]} onClick={onWindowChange} onSelect={handleSelectionChange} />
        ),
        [OpenWindowType.Guidelines]: null,
        [OpenWindowType.Projects]: null,
    }[openWindow]; */

    const formattedIcon = selectedOption && selectedOption.icon ? ICON_OPTIONS[selectedOption.icon] : undefined;

    useEffect(() => {
        updateVisibleItems();
    }, [state.inputValue, openWindow, state.selectedKey]);

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
                    selectedOption={selectedOption}
                    ref={inputRef}
                    decorator={formattedIcon}
                    previewable={true}
                    copyable={true}
                    clearable={true}
                    placeholder={placeholder}
                    onClear={handleClearClick}
                    onPreview={handlePreviewClick}
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
                                <ListBox
                                    {...listBoxProps}
                                    listBoxRef={listBoxRef}
                                    state={state}
                                    menuBlocks={displayedOptions.options}
                                    noBorder={true}
                                    hasItems={!!displayedOptions.options[0].menuItems.length}
                                    optionsType={displayedOptions.type}
                                    //openWindow={openWindow}
                                    //onClick={onWindowChange}
                                />
                                <DropdownContext.Provider
                                    value={{
                                        dropdownMachineRef: children.dropdown as Interpreter<DropdownFSMContext>,
                                    }}
                                >
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
                <Checkbox value="new-tab" state={newTab} onChange={onTabChange} label="Open in New Tab" />
            </div>
        </div>
    );
};
