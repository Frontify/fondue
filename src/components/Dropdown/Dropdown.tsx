/* (c) Copyright Frontify Ltd., all rights reserved. */

import { getDisabledItemIds, getMenuItems, mapToAriaProps } from "@components/ActionMenu/Aria/helper";
import { MenuBlock, MenuItemType, SelectMenu } from "@components/Dropdown/SelectMenu/SelectMenu";
import { MenuItemStyle, menuItemTextColorRecord, MenuItemTextColorState } from "@components/MenuItem";
import { MenuItemContent, MenuItemContentSize } from "@components/MenuItem/MenuItemContent";
import { Trigger, TriggerSize } from "@components/Trigger/Trigger";
import { useMemoizedId } from "@hooks/useMemoizedId";
import { useButton } from "@react-aria/button";
import { FocusScope, useFocusRing } from "@react-aria/focus";
import { DismissButton, useOverlay } from "@react-aria/overlays";
import { HiddenSelect, useSelect } from "@react-aria/select";
import { mergeProps } from "@react-aria/utils";
import { useSelectState } from "@react-stately/select";
import { merge } from "@utilities/merge";
import { AnimatePresence, motion } from "framer-motion";
import React, { FC, MutableRefObject, ReactElement, useEffect, useRef, useState } from "react";

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
    decorator?: ReactElement;
    autoResize?: boolean;
};

const getActiveItem = (blocks: MenuBlock[], activeId: string | number): MenuItemType | null => {
    const disabledItems = getDisabledItemIds(getMenuItems(blocks));
    if (disabledItems.has(activeId)) {
        return null;
    }

    return (
        blocks
            .map(({ menuItems }) => menuItems)
            .flat()
            .find(({ id }) => id.toString() === activeId?.toString()) || null
    );
};

const getInnerOverlayHeight = (triggerRef: MutableRefObject<HTMLElement | null>) => {
    let maxHeight = "auto";
    if (triggerRef.current) {
        const { innerHeight } = window;
        const { bottom } = triggerRef.current.getBoundingClientRect();
        const viewportPadding = 33;
        const triggerMargin = 8;
        maxHeight = `${Math.max(innerHeight - (bottom + viewportPadding + triggerMargin), 130)}px`;
    }
    return maxHeight;
};

const DEFAULT_DROPDOWN_MAX_HEIGHT = "auto";

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
    decorator,
    autoResize = true,
}) => {
    const activeItem = !!activeItemId ? getActiveItem(menuBlocks, activeItemId) : null;
    const props = mapToAriaProps(ariaLabel, menuBlocks);
    const state = useSelectState({
        ...props,
        defaultSelectedKey: activeItemId,
        onSelectionChange: (key) => onChange(key),
        disabledKeys: getDisabledItemIds(getMenuItems(menuBlocks)),
    });
    const triggerRef = useRef<HTMLButtonElement | null>(null);

    const { triggerProps, valueProps, menuProps } = useSelect(props, state, triggerRef);
    const { buttonProps } = useButton(triggerProps, triggerRef);
    const { isOpen } = state;
    const { isFocusVisible, focusProps } = useFocusRing();
    const overlayRef = useRef<HTMLDivElement | null>(null);
    const { overlayProps } = useOverlay(
        { isOpen, onClose: () => state.close(), shouldCloseOnBlur: true, isDismissable: true },
        overlayRef,
    );

    useEffect(() => {
        if (state.disabledKeys.has(activeItemId as string)) {
            return;
        }

        state.setSelectedKey(activeItemId as string);
    }, [activeItemId]);

    const [maxHeight, setMaxHeight] = useState(DEFAULT_DROPDOWN_MAX_HEIGHT);

    useEffect(() => {
        const updateMaxHeight = () => setMaxHeight(getInnerOverlayHeight(triggerRef));
        if (autoResize && isOpen) {
            updateMaxHeight();
            window.addEventListener("resize", updateMaxHeight);
        } else if (autoResize && !isOpen) {
            setMaxHeight(DEFAULT_DROPDOWN_MAX_HEIGHT);
        }

        return () => {
            if (isOpen && autoResize) {
                window.removeEventListener("resize", updateMaxHeight);
            }
        };
    }, [isOpen, autoResize]);

    const heightIsReady = !autoResize || maxHeight !== DEFAULT_DROPDOWN_MAX_HEIGHT;

    const textState = disabled ? MenuItemTextColorState.Disabled : MenuItemTextColorState.Default;

    const textClass = menuItemTextColorRecord[activeItem?.style || MenuItemStyle.Primary][textState];

    return (
        <div className="tw-relative tw-w-full tw-font-sans tw-text-s">
            <Trigger
                disabled={disabled}
                buttonProps={buttonProps}
                isFocusVisible={!disabled && isFocusVisible}
                isOpen={isOpen}
                clearable={!!activeItem}
                size={size === DropdownSize.Large ? TriggerSize.Large : TriggerSize.Small}
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
                <HiddenSelect state={state} triggerRef={triggerRef} />
                <button
                    {...mergeProps(buttonProps, focusProps)}
                    id={useMemoizedId(propId)}
                    ref={triggerRef}
                    data-test-id="dropdown-trigger"
                    className={merge([
                        "tw-overflow-hidden tw-flex-auto tw-h-full tw-rounded tw-text-left tw-outline-none tw-pr-2",
                        size === DropdownSize.Small
                            ? "tw-py-2 tw-pl-3 tw-min-h-[34px]"
                            : "tw-pl-5 tw-py-4 tw-min-h-[60px]",
                        !activeItem && "tw-text-black-60",
                        textClass,
                    ])}
                >
                    <MenuItemContent
                        ariaProps={valueProps}
                        title={activeItem?.title || placeholder}
                        decorator={decorator ?? activeItem?.decorator}
                        size={size === DropdownSize.Small ? MenuItemContentSize.Small : MenuItemContentSize.Large}
                    />
                </button>
            </Trigger>
            <AnimatePresence>
                {!disabled && isOpen && heightIsReady && (
                    <motion.div
                        className="tw-absolute tw-left-0 tw-p-0 tw-shadow-mid tw-list-none tw-m-0 tw-mt-2 tw-z-20 tw-min-w-full tw-overflow-hidden"
                        key="content"
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                        <FocusScope restoreFocus>
                            <div
                                {...overlayProps}
                                ref={overlayRef}
                                style={autoResize ? { maxHeight } : {}}
                                className="tw-flex tw-flex-col"
                                data-test-id="dropdown-menu"
                                role="dialog"
                            >
                                <DismissButton onDismiss={() => close()} />
                                <SelectMenu ariaProps={menuProps} state={state} menuBlocks={menuBlocks} scrollable />
                                <DismissButton onDismiss={() => close()} />
                            </div>
                        </FocusScope>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
