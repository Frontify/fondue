import React, { FC, useRef } from "react";
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
import { ActionMenu, ActionMenuBlock } from "@components/Menu/ActionMenu/ActionMenu";

export { Item, Section } from "@react-stately/collections";

export type LinkChooserProps = {
    selectMenuBlocks: MenuBlock[];
    actionMenuBlocks?: ActionMenuBlock[];
    ariaLabel?: string;
    label?: string;
};

export type LinkChooserState = { [key: string]: string | number };

export const LinkChooser: FC<LinkChooserProps> = ({
    selectMenuBlocks,
    actionMenuBlocks,
    ariaLabel = "Menu",
    label,
}) => {
    const filterItems = (value: string, query: string) => value.toLowerCase().includes(query.toLowerCase());

    const clearInput = () => {
        state.setInputValue("");
        state.setSelectedKey("");
    };

    const props = mapToAriaProps(ariaLabel, selectMenuBlocks);

    const state = useComboBoxState({
        ...props,
        defaultFilter: filterItems,
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
                    menuBlocks={selectMenuBlocks}
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
                            <ListBox
                                {...listBoxProps}
                                listBoxRef={listBoxRef}
                                state={state}
                                menuBlocks={selectMenuBlocks}
                                noBottomBorder={true}
                            />
                            {actionMenuBlocks && <ActionMenu menuBlocks={actionMenuBlocks} noTopBorder={true} />}
                        </Popover>
                        <DismissButton onDismiss={() => close()} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
