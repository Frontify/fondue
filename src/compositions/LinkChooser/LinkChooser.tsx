import React, { FC, Key, ReactNode, useRef, useState, useEffect } from "react";
import { useComboBoxState } from "@react-stately/combobox";
import { useComboBox } from "@react-aria/combobox";
import { ListBox } from "./ListBox/ListBox";
import { Popover } from "./Popover/Popover";
import { mapToAriaProps } from "@components/Menu/Aria/helper";
import { MenuBlock, MenuItemType } from "@components/Menu/SelectMenu";
import { SearchInput } from "./SearchInput/SearchInput";
import IconLink from "@elements/Icon/Generated/IconLink";
import { AnimatePresence, motion } from "framer-motion";
import { DismissButton } from "@react-aria/overlays";
import { ActionMenu, ActionMenuBlock } from "@components/Menu/ActionMenu/ActionMenu";
import { Checkbox, CheckboxState } from "@elements/Checkbox/Checkbox";

export { Item, Section } from "@react-stately/collections";

const MAX_STORED_ITEMS = 5;

export type LinkChooserProps = {
    selectMenuBlocks: MenuBlock[];
    actionMenuBlocks?: ActionMenuBlock[];
    ariaLabel?: string;
    label?: string;
};

export type SelectedOption = { title: string; id: Key; link: string; icon: ReactNode };

export const LinkChooser: FC<LinkChooserProps> = ({
    selectMenuBlocks,
    actionMenuBlocks,
    ariaLabel = "Menu",
    label,
}) => {
    const [displayedOptions, setDisplayedOptions] = useState<MenuBlock[]>(selectMenuBlocks);
    const [selectedOption, setSelectedOption] = useState<SelectedOption>({
        title: "",
        id: "",
        link: "",
        icon: <IconLink />,
    });
    const [newTab, setNewTab] = useState<CheckboxState>(CheckboxState.Unchecked);

    const handleClearClick = () => {
        state.setInputValue("");
        state.setSelectedKey("");
    };

    const handleSelectionChange = (key: Key) => {
        const foundItem = selectMenuBlocks[0].menuItems.find((item) => item.id === key);
        storeNewSelection(foundItem);
        setSelectedOption({
            title: foundItem?.title || "",
            link: foundItem?.link || "",
            id: foundItem?.id || "",
            icon: foundItem?.decorator || <IconLink />,
        });
    };

    const handlePreviewClick = () => {
        newTab === CheckboxState.Checked
            ? window.open(selectedOption.link, "_blank")
            : (window.location.href = selectedOption.link);
    };

    const updateVisibleItems = () => {
        const storedQueries = retrieveStoredQueries();
        const newSelectedOptions = state.selectedKey
            ? selectMenuBlocks
            : [{ ...selectMenuBlocks[0], menuItems: storedQueries }];
        setDisplayedOptions(newSelectedOptions);
    };

    const updateCheckState = (value: boolean) => {
        setNewTab(value ? CheckboxState.Checked : CheckboxState.Unchecked);
    };

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
                : [...recentQueries];
            localStorage.setItem("queries", JSON.stringify(updatedQueries));
        }
    };

    const filterItems = (value: string, query: string) => value.toLowerCase().includes(query.toLowerCase());

    const props = mapToAriaProps(ariaLabel, displayedOptions);

    const state = useComboBoxState({
        ...props,
        defaultFilter: filterItems,
        shouldCloseOnBlur: false,
        onSelectionChange: handleSelectionChange,
        menuTrigger: "focus",
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

    useEffect(() => {
        updateVisibleItems();
    }, [state.selectedKey]);

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
                    decorator={selectedOption.icon}
                    previewable={true}
                    copyable={true}
                    clearable={true}
                    onClear={handleClearClick}
                    onPreview={handlePreviewClick}
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
                        <Popover popoverRef={popoverRef} isOpen={state.isOpen} onClose={state.close}>
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
                        </Popover>
                        <DismissButton onDismiss={() => close()} />
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="tw-my-2">
                <Checkbox state={newTab} onChange={updateCheckState} label="Open in New Tab" />
            </div>
        </div>
    );
};
