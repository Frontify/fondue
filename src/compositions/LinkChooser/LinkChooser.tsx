import React, { FC, Key, useRef, useState, useEffect, useCallback, ReactElement } from "react";
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
import { Checkbox, CheckboxState } from "@elements/Checkbox/Checkbox";
import IconDocument from "@elements/Icon/Generated/IconDocument";
import IconLink from "@elements/Icon/Generated/IconLink";
import IconExternalLink from "@elements/Icon/Generated/IconExternalLink";
import IconDocumentLibrary from "@elements/Icon/Generated/IconDocumentLibrary";
import IconReject from "@elements/Icon/Generated/IconReject";
import { OpenWindow, OpenWindowType, SelectedOption } from "./LinkChooser.stories";
import IconTemplate from "@elements/Icon/Generated/IconTemplate";
import { MenuItemContentSize } from "@components/Menu/MenuItem/MenuItemContent";
import { SelectionIndicatorIcon } from "@components/Menu/MenuItem/MenuItem";
export { Item, Section } from "@react-stately/collections";

const MAX_STORED_ITEMS = 5;

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

export const LinkChooser: FC<LinkChooserProps> = ({
    selectMenuBlocks,
    actionMenuBlocks,
    templateMenuBlocks,
    selectedOption,
    newTab,
    openWindow,
    ariaLabel = "Menu",
    label,
    placeholder,
    onOptionChange,
    onWindowChange,
    onTabChange,
}) => {
    const [displayedOptions, setDisplayedOptions] = useState<MenuBlock[]>(selectMenuBlocks);

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
        const storedQueries = retrieveStoredQueries();
        const currentWindowMenu = (() => {
            switch (openWindow) {
                case OpenWindowType.None:
                    return selectMenuBlocks;
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
                ? currentWindowMenu
                : [{ ...currentWindowMenu[0], menuItems: storedQueries }];
        setDisplayedOptions(newSelectedOptions);
    };

    const handleSelectionChange = (key: Key) => {
        const foundItem = displayedOptions[0].menuItems.find((item) => item.id === key);
        storeNewSelection(foundItem);
        onOptionChange(foundItem);
    };

    const handleInputChange = (value: string) => {
        console.log(value);
        if (!state.isOpen) {
            state.open();
        }
    };

    const filterItems = (value: string, query: string) => value.toLowerCase().includes(query.toLowerCase());

    const retrieveStoredQueries = () => {
        const recentQueries = JSON.parse(localStorage.getItem("queries") || "null");
        return recentQueries || [];
    };

    const storeNewSelection = (option: MenuItemType | undefined) => {
        if (option) {
            const recentQueries = retrieveStoredQueries();
            const retrievedItem = recentQueries.find((item: MenuItemType) => item.id === option.id);
            const updatedQueries = retrievedItem
                ? [{ ...option }, ...recentQueries.filter((item: MenuItemType) => item.id !== option.id)]
                : recentQueries.length < MAX_STORED_ITEMS
                ? [{ ...option }, ...recentQueries]
                : [{ ...option }, ...recentQueries.slice(0, -1)];
            localStorage.setItem("queries", JSON.stringify(updatedQueries));
        }
    };

    const handleMenuOpen = () => state.open();

    const handleMenuClose = () => state.close();

    const props = mapToAriaProps(ariaLabel, displayedOptions);

    const state = useComboBoxState({
        ...props,
        defaultFilter: filterItems,
        shouldCloseOnBlur: false,
        onSelectionChange: handleSelectionChange,
        onInputChange: handleInputChange,
        menuTrigger: "manual",
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
                    selectedOption={selectedOption}
                    ref={inputRef}
                    decorator={formattedIcon}
                    previewable={true}
                    copyable={true}
                    clearable={true}
                    placeholder={placeholder}
                    onClear={handleClearClick}
                    onPreview={handlePreviewClick}
                    onClick={handleMenuOpen}
                />
            </div>
            <AnimatePresence>
                {state.isOpen && (
                    <motion.div
                        className="tw-absolute tw-left-0 tw-w-full tw-overflow-hidden tw-p-0 tw-shadow-mid tw-list-none tw-m-0 tw-mt-2 tw-z-10"
                        key="content"
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                        <DismissButton onDismiss={() => close()} />
                        <Popover popoverRef={popoverRef} isOpen={state.isOpen} onClose={handleMenuClose}>
                            <div>
                                <ListBox
                                    {...listBoxProps}
                                    listBoxRef={listBoxRef}
                                    state={state}
                                    menuBlocks={displayedOptions}
                                    noBorder={true}
                                    hasItems={!!displayedOptions[0].menuItems.length}
                                    openWindow={openWindow}
                                    onClick={onWindowChange}
                                />
                                {openWindow === OpenWindowType.None && actionMenuBlocks && (
                                    <div className="tw-border-t tw-border-black-10">
                                        <ActionMenu menuBlocks={actionMenuBlocks} noBorder={true} />
                                    </div>
                                )}
                            </div>
                        </Popover>
                        <DismissButton onDismiss={() => close()} />
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="tw-my-2">
                <Checkbox state={newTab} onChange={onTabChange} label="Open in New Tab" />
            </div>
        </div>
    );
};
