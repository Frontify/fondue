import React, { FC, useState, useRef, useEffect } from "react";
import { useComboBoxState } from "@react-stately/combobox";
import { useComboBox } from "@react-aria/combobox";
import { ListBox } from "./ListBox/ListBox";
import { Popover } from "./Popover/Popover";
import { mapToAriaProps } from "@components/Menu/Aria/helper";
import { MenuBlock } from "@components/Menu/SelectMenu";
import { TextInput } from "./TextInput/TextInput";
import IconLink from "@elements/Icon/Generated/IconLink";
import { AnimatePresence, motion } from "framer-motion";
import { DismissButton } from "@react-aria/overlays";

export { Item, Section } from "@react-stately/collections";

export type LinkChooserProps = {
    menuBlocks: MenuBlock[];
    ariaLabel?: string;
    label?: string;
};

export type LinkChooserState = { [key: string]: string | number };

export const LinkChooser: FC<LinkChooserProps> = ({ menuBlocks, ariaLabel = "Menu", label }) => {
    const [excludedItems, setExcludedItems] = useState<LinkChooserState>({});

    const filterItems = (value: string, query: string) => {
        if (excludedItems.hasOwnProperty(value)) return true;
        if (value.toLowerCase().includes(query.toLowerCase())) return true;
        return false;
    };

    const excludeMenuItems = () => {
        setExcludedItems(menuBlocks[1].menuItems.reduce((obj, key) => ({ ...obj, [key.title]: key.id }), {}));
    };

    const clearInput = () => {
        state.setInputValue("");
        state.setSelectedKey("");
    };

    const handleSelectionChange = (id: string | number) => {
        const excludedTitles = Object.keys(excludedItems);
        for (const title of excludedTitles) {
            if (excludedItems[title] === id) {
                console.log("should open a modal and leave the state as is");
            }
        }
    };

    const props = mapToAriaProps(ariaLabel, menuBlocks);

    const state = useComboBoxState({
        ...props,
        defaultFilter: filterItems,
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

    // exclude the actions section of the menu
    useEffect(() => {
        excludeMenuItems();
    }, []);

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
                <TextInput
                    {...inputProps}
                    selectedItem={state.selectedItem}
                    ref={inputRef}
                    decorator={<IconLink />}
                    previewable={true}
                    copyable={true}
                    clearable={true}
                    onClear={clearInput}
                />
            </div>
            <AnimatePresence>
                {state.isOpen && (
                    <motion.div
                        className="tw-absolute tw-left-0 tw-w-full tw-overflow-hidden tw-p-0 tw-list-none tw-m-0 tw-mt-2 tw-z-10"
                        key="content"
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                        <DismissButton onDismiss={() => close()} />
                        <Popover popoverRef={popoverRef} isOpen={state.isOpen} onClose={state.close}>
                            <ListBox {...listBoxProps} listBoxRef={listBoxRef} state={state} menuBlocks={menuBlocks} />
                        </Popover>
                        <DismissButton onDismiss={() => close()} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
