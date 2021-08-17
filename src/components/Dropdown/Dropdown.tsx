/* (c) Copyright Frontify Ltd., all rights reserved. */

import { getDisabledItemIds, getMenuItems, mapToAriaProps } from "@components/Menu/Aria/helper";
import { MenuItemContent, MenuItemContentSize } from "@components/Menu/MenuItem/MenuItemContent";
import { MenuBlock, SelectMenu } from "@components/Menu/SelectMenu";
import IconCaretDown from "@elements/Icon/Generated/IconCaretDown";
import IconReject from "@elements/Icon/Generated/IconReject";
import { IconSize } from "@elements/Icon/IconSize";
import useClickOutside from "@hooks/useClickOutside";
import { useButton } from "@react-aria/button";
import { FocusScope, useFocusRing } from "@react-aria/focus";
import { useFocus } from "@react-aria/interactions";
import { DismissButton } from "@react-aria/overlays";
import { HiddenSelect, useSelect } from "@react-aria/select";
import { useSelectState } from "@react-stately/select";
import { getFocusStyle } from "@utilities/focusStyle";
import generateRandomId from "@utilities/generateRandomId";
import { merge } from "@utilities/merge";
import { AnimatePresence, motion } from "framer-motion";
import React, { FC, useRef, useState } from "react";

export enum DropdownSize {
    Small = "Small",
    Large = "Large",
}

export type DropdownProps = {
    id?: string;
    menuBlocks: MenuBlock[];
    onChange: (id?: string) => void;
    activeItemId?: string;
    placeholder?: string;
    size?: DropdownSize;
    disabled?: boolean;
    clearable?: boolean;
    ariaLabel?: string;
};

const getActiveItem = (menuBlocks: MenuBlock[], id: string) =>
    menuBlocks
        .map((block) => block.menuItems)
        .flat()
        .find((item) => item.id === id) || null;

export const Dropdown: FC<DropdownProps> = ({
    id: propId,
    menuBlocks,
    onChange,
    activeItemId = "",
    placeholder = "Select item",
    size = DropdownSize.Small,
    disabled = false,
    clearable = false,
    ariaLabel = "Dropdown",
}) => {
    const [id] = useState(propId || generateRandomId());
    const dropdownElement = useRef<HTMLDivElement | null>(null);
    const activeItem = getActiveItem(menuBlocks, activeItemId);
    const props = mapToAriaProps(ariaLabel, menuBlocks);
    const state = useSelectState({
        ...props,
        defaultSelectedKey: activeItemId,
        onSelectionChange: (key) => onChange(`${key}`),
        disabledKeys: getDisabledItemIds(getMenuItems(menuBlocks)),
    });
    const ref = useRef<HTMLButtonElement | null>(null);
    const { triggerProps, valueProps, menuProps } = useSelect(props, state, ref);
    const { buttonProps } = useButton(triggerProps, ref);
    const { isOpen, setSelectedKey, selectionManager, close } = state;
    const { isFocusVisible, focusProps } = useFocusRing();
    const [isFocused, setFocused] = useState(false);
    const { focusProps: clearableFocusProps } = useFocus({
        onFocusChange: setFocused,
    });

    useClickOutside(dropdownElement.current, () => close());

    return (
        <div className="tw-relative tw-w-full tw-font-sans tw-text-s" ref={dropdownElement}>
            <div
                data-test-id="dropdown"
                className={merge([
                    "tw-group tw-relative tw-flex tw-w-full tw-box-border tw-items-center tw-justify-between tw-border tw-border-black-40 tw-rounded tw-gap-2 tw-transition-colors",
                    size === DropdownSize.Small ? "tw-pr-3 tw-min-h-[36px]" : "tw-pr-5 tw-min-h-[60px]",
                    disabled
                        ? "tw-border-black-5 tw-bg-black-5 tw-pointer-events-none"
                        : `tw-bg-white hover:tw-border-black-90 ${
                              isOpen ? "tw-border-black-90" : "tw-border-black-20"
                          }`,
                    isFocusVisible && getFocusStyle(),
                ])}
            >
                <HiddenSelect state={state} triggerRef={ref} />
                <button
                    {...buttonProps}
                    {...focusProps}
                    id={id}
                    ref={ref}
                    data-test-id="dropdown-trigger"
                    className={merge([
                        "tw-overflow-hidden tw-flex-auto tw-h-full tw-rounded tw-text-left tw-outline-none",
                        size === DropdownSize.Small ? "tw-p-3 tw-min-h-[36px]" : "tw-p-5 tw-min-h-[60px]",
                        !activeItem && "tw-text-black-60",
                        disabled && "tw-text-black-40",
                    ])}
                >
                    <MenuItemContent
                        ariaProps={valueProps}
                        title={activeItem?.title || placeholder}
                        decorator={activeItem?.decorator}
                        size={size === DropdownSize.Small ? MenuItemContentSize.Small : MenuItemContentSize.Large}
                    />
                </button>
                {clearable && activeItem && (
                    <button
                        {...clearableFocusProps}
                        data-test-id="dropdown-clear-button"
                        aria-label="Clear selection"
                        className={merge([
                            "tw-p-0",
                            isFocused && getFocusStyle(),
                            disabled ? "tw-pointer-events-none tw-text-black-40" : "tw-text-black-80",
                        ])}
                        onClick={() => {
                            setFocused(false);
                            setSelectedKey("");
                            selectionManager.setFocusedKey(state.collection.getFirstKey() || "");
                        }}
                    >
                        <IconReject size={IconSize.Size12} />
                    </button>
                )}
                <button
                    {...buttonProps}
                    aria-hidden="true"
                    tabIndex="-1"
                    className={merge([
                        "tw-p-0",
                        disabled
                            ? "tw-pointer-events-none tw-text-black-40"
                            : "tw-text-black-80 group-hover:tw-text-black",
                    ])}
                >
                    <div className={merge(["tw-transition-transform", isOpen && "tw-rotate-180"])}>
                        <IconCaretDown size={IconSize.Size16} />
                    </div>
                </button>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="tw-absolute tw-left-0 tw-w-full tw-overflow-hidden tw-box-border tw-p-0 tw-shadow-mid tw-list-none tw-m-0 tw-mt-2"
                        key="content"
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                        <FocusScope restoreFocus>
                            <DismissButton onDismiss={() => close()} />
                            <SelectMenu ariaProps={menuProps} state={state} menuBlocks={menuBlocks} />
                            <DismissButton onDismiss={() => close()} />
                        </FocusScope>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
