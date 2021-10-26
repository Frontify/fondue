/* (c) Copyright Frontify Ltd., all rights reserved. */

import { getDisabledItemIds, getMenuItems, mapToAriaProps } from "@components/Menu/Aria/helper";
import { MenuBlock, SelectMenu } from "@components/Menu/SelectMenu";
import { Trigger } from "@components/Trigger/Trigger";
import { useMemoizedId } from "@hooks/useMemoizedId";
import { useButton } from "@react-aria/button";
import { FocusScope, useFocusRing } from "@react-aria/focus";
import { DismissButton, useOverlay } from "@react-aria/overlays";
import { HiddenSelect, useSelect } from "@react-aria/select";
import { mergeProps } from "@react-aria/utils";
import { useSelectState } from "@react-stately/select";
import { merge } from "@utilities/merge";
import { AnimatePresence, motion } from "framer-motion";
import React, { FC, useRef } from "react";

export enum DropdownSize {
    Small = "Small",
    Large = "Large",
}

export type DropdownProps = {
    id?: string;
    menuBlocks: MenuBlock[];
    onChange: (id?: string | number) => void;
    activeItemId?: string | number;
    placeholder?: string;
    size?: DropdownSize;
    disabled?: boolean;
    clearable?: boolean;
    ariaLabel?: string;
};

const getActiveItem = (blocks: MenuBlock[], activeId?: string | number) =>
    blocks
        .map(({ menuItems }) => menuItems)
        .flat()
        .find(({ id }) => id.toString() === activeId?.toString()) || null;

export const Dropdown: FC<DropdownProps> = ({
    id: propId,
    menuBlocks,
    onChange,
    activeItemId,
    placeholder = "Select item",
    size = DropdownSize.Small,
    disabled = false,
    clearable = false,
    ariaLabel = "Dropdown",
}) => {
    const activeItem = getActiveItem(menuBlocks, activeItemId);
    const props = mapToAriaProps(ariaLabel, menuBlocks);
    const state = useSelectState({
        ...props,
        defaultSelectedKey: activeItemId,
        onSelectionChange: (key) => onChange(key),
        disabledKeys: getDisabledItemIds(getMenuItems(menuBlocks)),
    });
    const ref = useRef<HTMLButtonElement | null>(null);
    const { triggerProps, valueProps, menuProps } = useSelect(props, state, ref);
    const { buttonProps } = useButton(triggerProps, ref);
    const { isOpen } = state;
    const { isFocusVisible, focusProps } = useFocusRing();
    const overlayRef = useRef<HTMLDivElement | null>(null);
    const { overlayProps } = useOverlay(
        { isOpen, onClose: () => state.close(), shouldCloseOnBlur: true, isDismissable: true },
        overlayRef,
    );

    return (
        <div className="tw-relative tw-w-full tw-font-sans tw-text-s ">
            <Trigger
                disabled={disabled}
                buttonProps={buttonProps}
                isFocusVisible={!disabled && isFocusVisible}
                isOpen={isOpen}
                clearable={!!activeItem}
                onClear={
                    clearable
                        ? () => {
                              state.setSelectedKey("");
                              const first = state.collection.getFirstKey();
                              if (first) {
                                  state.selectionManager.setFocusedKey(first);
                              }
                          }
                        : undefined
                }
            >
                <HiddenSelect state={state} triggerRef={ref} />
                <button
                    {...mergeProps(buttonProps, focusProps)}
                    id={useMemoizedId(propId)}
                    ref={ref}
                    data-test-id="dropdown-trigger"
                    className={merge([
                        "tw-overflow-hidden tw-flex-auto tw-h-full tw-rounded tw-text-left tw-outline-none",
                        size === DropdownSize.Small ? "tw-py-1 tw-px-3" : "tw-p-5 tw-min-h-[60px]",
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
            </Trigger>
            <AnimatePresence>
                {!disabled && isOpen && (
                    <motion.div
                        className="tw-absolute tw-left-0 tw-w-full tw-overflow-hidden tw-p-0 tw-shadow-mid tw-list-none tw-m-0 tw-mt-2 tw-z-20"
                        key="content"
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                        <FocusScope restoreFocus>
                            <div {...overlayProps} ref={overlayRef}>
                                <DismissButton onDismiss={() => close()} />
                                <SelectMenu ariaProps={menuProps} state={state} menuBlocks={menuBlocks} />
                                <DismissButton onDismiss={() => close()} />
                            </div>
                        </FocusScope>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
