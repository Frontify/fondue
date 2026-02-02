/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCaretDown, IconCheckMark, IconExclamationMarkTriangle } from '@frontify/fondue-icons';
import * as RadixPopover from '@radix-ui/react-popover';
import { Slot as RadixSlot } from '@radix-ui/react-slot';
import { useSelect } from 'downshift';
import { forwardRef, useRef, useState, type ForwardedRef, type ReactNode } from 'react';

import { type CommonAriaProps } from '#/helpers/aria';

import { Badge } from '../Badge/Badge';

import { ForwardedRefCombobox } from './Combobox';
import { ForwardedRefSelectItem, ForwardedRefSelectItemGroup } from './SelectItem';
import { SelectMenu, type SelectMenuViewportCollisionPadding } from './SelectMenu';
import { ForwardedRefSelectSlot } from './SelectSlot';
import { useMultiselect } from './hooks/useMultiselect';
import { useSelectData } from './hooks/useSelectData';
import styles from './styles/select.module.scss';

export type SelectComponentProps = {
    /**
     * Children of the Select component. This can contain the `Select.Slot` components for the label, decorators, clear action and menu.
     */
    children?: ReactNode;
    /**
     * Callback function that is called when an item is selected.
     */
    onSelect?: (selectedValues: string[] | null) => void;
    /**
     * The active value in the select component. This is used to control the select externally.
     */
    value?: string[] | null;
    /**
     * The default value of the select component. Used for uncontrolled usages.
     */
    defaultValue?: string[];
    /**
     * The placeholder in the select component.
     */
    placeholder?: string;
    /**
     * Status of the text input
     * @default "neutral"
     */
    status?: 'neutral' | 'success' | 'error';
    /**
     * Disables the select component.
     */
    disabled?: boolean;
    /**
     * The alignment of the menu.
     * @default "start"
     */
    alignMenu?: 'start' | 'center' | 'end';
    /**
     * Defines the preferred side of the select. It will not be respected if there are collisions with the viewport.
     * @default "bottom"
     */
    side?: 'left' | 'right' | 'bottom' | 'top';
    /**
     * The data test id of the select component.
     */
    'data-test-id'?: string;
    /**
     * Id of the select component
     */
    id?: string;
    /**
     * Whether the select component is multiple
     * @default false
     */
    multiple?: boolean;
    /**
     * The value of the select is shown as plain text (from the label prop) when set to true.
     * Items child components are used if set to false
     * @default true
     */
    showStringValue?: boolean;
    /**
     * Define the minimum distance between the select menu and the viewport edge
     * @default 'compact'
     */
    viewportCollisionPadding?: SelectMenuViewportCollisionPadding;
    /**
     * Event handler called when the escape key is pressed.
     */
    onEscapeKeyDown?: (event: KeyboardEvent) => void;
} & CommonAriaProps;

export const SelectInput = (
    {
        children,
        onSelect,
        value,
        defaultValue,
        placeholder = '',
        status = 'neutral',
        disabled,
        alignMenu = 'start',
        side = 'bottom',
        id,
        showStringValue = true,
        'data-test-id': dataTestId = 'fondue-select',
        viewportCollisionPadding = 'compact',
        onEscapeKeyDown,
        multiple = false,
        ...props
    }: SelectComponentProps,
    forwardedRef: ForwardedRef<HTMLDivElement>,
) => {
    const { inputSlots, menuSlots, items, clearButton, getItemByValue } = useSelectData(children);

    const { selectedItemValues, toggleSelectedItem } = useMultiselect(onSelect, value, defaultValue);

    const wasClicked = useRef(false);

    const [hasInteractedSinceOpening, setHasInteractedSinceOpening] = useState(false);

    const { getToggleButtonProps, getMenuProps, getItemProps, reset, isOpen, highlightedIndex } = useSelect<{
        value: string;
        label: string;
        children?: ReactNode;
    }>({
        items,
        selectedItem: null,
        toggleButtonId: id,
        labelId: 'aria-labelledby' in props ? props['aria-labelledby'] : undefined,
        onIsOpenChange: () => {
            setHasInteractedSinceOpening(false);
        },
        onHighlightedIndexChange: () => {
            setHasInteractedSinceOpening(true);
        },
        onSelectedItemChange: ({ selectedItem }) => {
            toggleSelectedItem(selectedItem?.value);
        },
        itemToString: (item) => (item ? item.label : ''),
        ...(multiple
            ? {
                  stateReducer: (state, actionAndChanges) => {
                      const { changes, type } = actionAndChanges;
                      switch (type) {
                          case useSelect.stateChangeTypes.ToggleButtonKeyDownEnter:
                          case useSelect.stateChangeTypes.ToggleButtonKeyDownSpaceButton:
                          case useSelect.stateChangeTypes.ItemClick:
                              return {
                                  ...changes,
                                  isOpen: true,
                                  highlightedIndex: state.highlightedIndex,
                              };
                      }
                      return changes;
                  },
              }
            : {}),
    });

    const getDisplayedValue = (itemValue?: string) => {
        const selectedItem = getItemByValue(itemValue);
        if (selectedItem) {
            return showStringValue && selectedItem?.children ? selectedItem.children : selectedItem?.label;
        }
        return undefined;
    };

    return (
        <RadixPopover.Root open={isOpen}>
            <RadixPopover.Anchor
                asChild
                onMouseDown={(mouseEvent) => {
                    wasClicked.current = true;
                    mouseEvent.currentTarget.dataset.showFocusRing = 'false';
                }}
                onFocus={(focusEvent) => {
                    if (!wasClicked.current) {
                        focusEvent.target.dataset.showFocusRing = 'true';
                    }
                }}
                onBlur={(blurEvent) => {
                    blurEvent.target.dataset.showFocusRing = 'false';
                    wasClicked.current = false;
                }}
            >
                <div
                    className={styles.root}
                    data-status={status}
                    data-disabled={disabled}
                    data-empty={selectedItemValues.length === 0}
                    data-test-id={dataTestId}
                    {...(disabled
                        ? {}
                        : // eslint-disable-next-line react-hooks/refs
                          getToggleButtonProps({
                              'aria-label': 'aria-label' in props ? props['aria-label'] : undefined,
                              ref: forwardedRef,
                          }))}
                >
                    {multiple ? (
                        <div
                            className={styles.selectedValue}
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                        >
                            {selectedItemValues.map((selectedItemValue) => {
                                return <Badge key={selectedItemValue}>{getDisplayedValue(selectedItemValue)}</Badge>;
                            })}
                        </div>
                    ) : (
                        <span className={styles.selectedValue}>
                            {getDisplayedValue(selectedItemValues[0]) || placeholder}
                        </span>
                    )}
                    {inputSlots}
                    {clearButton ? (
                        <RadixSlot
                            onClick={(event) => {
                                event.stopPropagation();
                                reset();
                            }}
                            className={styles.clear}
                        >
                            {clearButton}
                        </RadixSlot>
                    ) : null}
                    <div className={styles.icons}>
                        <IconCaretDown size={16} className={styles.caret} />
                        {status === 'success' ? (
                            <IconCheckMark
                                size={16}
                                className={styles.iconSuccess}
                                data-test-id={`${dataTestId}-success-icon`}
                            />
                        ) : null}
                        {status === 'error' ? (
                            <IconExclamationMarkTriangle
                                size={16}
                                className={styles.iconError}
                                data-test-id={`${dataTestId}-error-icon`}
                            />
                        ) : null}
                    </div>
                </div>
            </RadixPopover.Anchor>

            <SelectMenu
                align={alignMenu}
                side={side}
                highlightedIndex={highlightedIndex}
                getMenuProps={getMenuProps}
                getItemProps={getItemProps}
                selectedItemValues={selectedItemValues}
                hasInteractedSinceOpening={hasInteractedSinceOpening}
                viewportCollisionPadding={viewportCollisionPadding}
                onEscapeKeyDown={onEscapeKeyDown}
            >
                {menuSlots}
            </SelectMenu>
        </RadixPopover.Root>
    );
};
SelectInput.displayName = 'Select';

export const ForwardedRefSelect = forwardRef<HTMLDivElement, SelectComponentProps>(SelectInput);

// @ts-expect-error We support both Select and Select.Combobox as the Root
export const Select: typeof SelectInput & {
    Combobox: typeof ForwardedRefCombobox;
    Item: typeof ForwardedRefSelectItem;
    Group: typeof ForwardedRefSelectItemGroup;
    Slot: typeof ForwardedRefSelectSlot;
} = ForwardedRefSelect;
Select.displayName = 'Select';
Select.Combobox = ForwardedRefCombobox;
Select.Combobox.displayName = 'Select.Combobox';
Select.Item = ForwardedRefSelectItem;
Select.Item.displayName = 'Select.Item';
Select.Group = ForwardedRefSelectItemGroup;
Select.Group.displayName = 'Select.Group';
Select.Slot = ForwardedRefSelectSlot;
Select.Slot.displayName = 'Select.Slot';
