/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type VariationPlacement } from '@popperjs/core';
import { useButton } from '@react-aria/button';
import { FocusScope, useFocusRing } from '@react-aria/focus';
import { DismissButton, useOverlay } from '@react-aria/overlays';
import { HiddenSelect, useSelect } from '@react-aria/select';
import { mergeProps } from '@react-aria/utils';
import { useSelectState } from '@react-stately/select';
import { type ReactElement, useEffect, useRef } from 'react';
import { usePopper } from 'react-popper';

import { getDisabledItemIds, getMenuItems, mapToAriaProps } from '@components/ActionMenu/Aria/helper';
import { type MenuBlock, type MenuItemType, SelectMenu } from '@components/Dropdown/SelectMenu/SelectMenu';
import { LoadingCircle, LoadingCircleSize } from '@components/LoadingCircle';
import {
    MenuItemContent,
    MenuItemContentSize,
    MenuItemStyle,
    MenuItemTextColorState,
    menuItemTextColorRecord,
} from '@components/MenuItem';
import { Trigger, TriggerEmphasis, TriggerSize } from '@components/Trigger/Trigger';
import { DEFAULT_DROPDOWN_MAX_HEIGHT, useDropdownAutoHeight } from '@hooks/useDropdownAutoHeight';
import { useMemoizedId } from '@hooks/useMemoizedId';
import { EnablePortalWrapper } from '@utilities/dialogs/EnablePortalWrapper';
import { merge } from '@utilities/merge';
import { Validation } from '@utilities/validation';

export const DEFAULT_DROPDOWN_MIN_ANIMATION_HEIGHT = 36; // Small Input height as default

export enum DropdownSize {
    Small = 'Small',
    Large = 'Large',
}

export enum DropdownAlignment {
    Start = 'Start',
    End = 'End',
}

export enum DropdownPosition {
    Top = 'Top',
    Bottom = 'Bottom',
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
    validation?: Validation;
    alignment?: DropdownAlignment;
    position?: DropdownPosition;
    emphasis?: TriggerEmphasis;
    flip?: boolean;
    'data-test-id'?: string;
    enablePortal?: boolean;
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

export const Dropdown = ({
    id: propId,
    menuBlocks,
    onChange,
    activeItemId,
    placeholder = 'Select item',
    size = DropdownSize.Small,
    disabled = false,
    clearable = false,
    ariaLabel = 'Dropdown',
    decorator,
    autoResize = true,
    validation = Validation.Default,
    alignment = DropdownAlignment.Start,
    position = DropdownPosition.Bottom,
    emphasis = TriggerEmphasis.Default,
    flip = false,
    'data-test-id': dataTestId = 'dropdown',
    enablePortal = true,
}: DropdownProps): ReactElement => {
    const activeItem = activeItemId ? getActiveItem(menuBlocks, activeItemId) : null;
    const props = mapToAriaProps(ariaLabel, menuBlocks);
    const state = useSelectState({
        ...props,
        defaultSelectedKey: activeItemId,
        onSelectionChange: (key) => onChange(key as string),
        disabledKeys: getDisabledItemIds(getMenuItems(menuBlocks)),
    });
    const triggerRef = useRef<HTMLButtonElement | null>(null);

    const { triggerProps, valueProps, menuProps } = useSelect({ ...props, isDisabled: disabled }, state, triggerRef);

    const { buttonProps } = useButton({ ...triggerProps, isDisabled: disabled }, triggerRef);
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

        if (activeItemId !== state.selectedKey) {
            state.setSelectedKey(activeItemId as string);
        }
    }, [activeItemId]);

    const { maxHeight } = useDropdownAutoHeight(triggerRef, { isOpen, autoResize });

    const heightIsReady = !autoResize || maxHeight !== DEFAULT_DROPDOWN_MAX_HEIGHT;

    const enabledTextColorState = activeItem ? MenuItemTextColorState.Active : MenuItemTextColorState.Default;
    const textState = disabled ? MenuItemTextColorState.Disabled : enabledTextColorState;

    const textColorClass = activeItem
        ? menuItemTextColorRecord[activeItem.style || MenuItemStyle.Primary][textState]
        : 'tw-text-text-x-weak';

    const onClear = clearable
        ? () => {
              state.setSelectedKey('');
              const first = state.collection.getFirstKey();
              if (first) {
                  state.selectionManager.setFocusedKey(first);
              }
          }
        : undefined;

    const showClear = !!activeItem && !!onClear;
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const placementMap: Record<string, VariationPlacement> = {
        'Top-Start': 'top-start',
        'Top-End': 'top-end',
        'Bottom-Start': 'bottom-start',
        'Bottom-End': 'bottom-end',
    };
    const popperInstance = usePopper(triggerRef?.current, dropdownRef.current, {
        placement: placementMap[`${position}-${alignment}`],
        strategy: 'fixed',
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset: [0, 8],
                },
            },
            {
                name: 'flip',
                enabled: flip,
            },
        ],
    });

    return (
        <div className="tw-relative tw-w-full tw-font-sans tw-text-s" data-test-id={dataTestId}>
            <Trigger
                disabled={disabled}
                buttonProps={buttonProps}
                isFocusVisible={!disabled && isFocusVisible}
                isOpen={isOpen}
                size={size === DropdownSize.Large ? TriggerSize.Large : TriggerSize.Small}
                emphasis={emphasis}
                onClear={onClear}
                showClear={showClear}
                validation={validation}
            >
                <HiddenSelect state={state} triggerRef={triggerRef} />
                <button
                    {...mergeProps(buttonProps, focusProps)}
                    id={useMemoizedId(propId)}
                    ref={triggerRef}
                    data-test-id={`${dataTestId}-trigger`}
                    className={merge([
                        'tw-overflow-hidden tw-flex-auto tw-h-full tw-rounded tw-text-left tw-outline-none',
                        size === DropdownSize.Small
                            ? 'tw-py-2 tw-pl-3 tw-min-h-[34px]'
                            : 'tw-pl-5 tw-py-4 tw-min-h-[60px]',
                        showClear ? 'tw-pr-12' : 'tw-pr-8',
                        textColorClass,
                    ])}
                >
                    <MenuItemContent
                        ariaProps={valueProps}
                        title={activeItem?.title || placeholder}
                        decorator={decorator ?? activeItem?.decorator}
                        subtitle={activeItem?.subtitle}
                        size={size === DropdownSize.Small ? MenuItemContentSize.Small : MenuItemContentSize.Large}
                    />
                </button>
            </Trigger>
            {!disabled && isOpen && heightIsReady && (
                <EnablePortalWrapper enablePortal={enablePortal}>
                    <div
                        ref={dropdownRef}
                        style={{
                            ...popperInstance.styles.popper,
                            width: triggerRef.current?.getBoundingClientRect().width,
                            minWidth: 'fit-content',
                        }}
                        {...popperInstance.attributes.popper}
                        className="tw-absolute tw-p-0 tw-shadow tw-list-none tw-m-0 tw-z-[120000] tw-min-w-full tw-overflow-hidden"
                        key="content"
                    >
                        <FocusScope restoreFocus>
                            <div
                                {...overlayProps}
                                ref={overlayRef}
                                style={autoResize ? { maxHeight } : {}}
                                className="tw-flex tw-flex-col"
                                data-test-id={`${dataTestId}-menu`}
                                role="dialog"
                            >
                                <DismissButton onDismiss={() => close()} />
                                <SelectMenu ariaProps={menuProps} state={state} menuBlocks={menuBlocks} scrollable />
                                <DismissButton onDismiss={() => close()} />
                            </div>
                        </FocusScope>
                    </div>
                </EnablePortalWrapper>
            )}
            {validation === Validation.Loading && (
                <span className="tw-absolute tw-top-[-0.55rem] tw-right-[-0.55rem] tw-bg-base tw-rounded-full tw-p-[2px] tw-border tw-border-line-weak">
                    <LoadingCircle size={LoadingCircleSize.ExtraSmall} />
                </span>
            )}
        </div>
    );
};
Dropdown.displayName = 'FonduesDropdown';
