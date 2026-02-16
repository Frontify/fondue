/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCaretDown } from '@frontify/fondue-icons';
import * as RadixPopover from '@radix-ui/react-popover';
import { useSelect } from 'downshift';
import { forwardRef, useCallback, useMemo, useRef, useState, type ForwardedRef, type ReactNode } from 'react';

import { type CommonAriaProps } from '#/helpers/aria';

import { useBadgeItems } from '../hooks/useBadgeItems';
import { useFocusRing } from '../hooks/useFocusRing';
import { useSelectData } from '../hooks/useSelectData';
import { useSelectionDescription } from '../hooks/useSelectionDescription';
import styles from '../styles/select.module.scss';

import { ClearButton } from './ClearButton';
import { CollapsibleBadges } from './CollapsibleBadges';
import { SelectMenu, type SelectMenuViewportCollisionPadding } from './SelectMenu';
import { StatusIcons } from './StatusIcons';

export type SelectSharedProps = {
    /**
     * The select content. Use `Select.Item` for options, `Select.Group` for grouped options,
     * and `Select.Slot` for decorators, clear actions, or custom menu content.
     */
    children?: ReactNode;
    /**
     * Text shown when no value is selected.
     * Use it to hint at the expected choice — e.g., "Choose a language."
     */
    placeholder?: string;
    /**
     * Conveys validation state. `'neutral'` for default, `'success'` for valid input,
     * `'error'` for invalid input.
     *
     * @default "neutral"
     */
    status?: 'neutral' | 'success' | 'error';
    /**
     * Prevents interaction and dims the select visually.
     *
     * @default false
     */
    disabled?: boolean;
    /**
     * Controls the horizontal alignment of the dropdown menu relative to the trigger.
     *
     * @default "start"
     */
    alignMenu?: 'start' | 'center' | 'end';
    /**
     * The preferred side the dropdown opens on.
     * Falls back to the opposite side if there isn't enough viewport space.
     *
     * @default "bottom"
     */
    side?: 'left' | 'right' | 'bottom' | 'top';
    'data-test-id'?: string;
    id?: string;
    /**
     * When `true`, shows the selected item's `label` as plain text.
     * When `false`, renders the item's `children` instead — useful for rich content like icons or badges.
     *
     * @default true
     */
    showStringValue?: boolean;
    /**
     * Controls the minimum distance between the dropdown menu and the viewport edge.
     * `'compact'` keeps it tight, `'spacious'` adds breathing room.
     *
     * @default "compact"
     */
    viewportCollisionPadding?: SelectMenuViewportCollisionPadding;
    /**
     * Callback fired when the Escape key is pressed while the menu is open.
     */
    onEscapeKeyDown?: (event: KeyboardEvent) => void;
} & CommonAriaProps;

type SelectBaseProps = SelectSharedProps & {
    /**
     * The currently selected item values
     */
    selectedItemValues: string[];
    /**
     * Callback fired when an item is selected or deselected
     */
    onItemSelect: (value?: string) => void;
    /**
     * Callback fired when the selection is cleared
     */
    onClear: () => void;
    /**
     * Whether the select allows multiple selections
     */
    multiple: boolean;
};

const SelectBaseInput = (
    {
        children,
        selectedItemValues,
        onItemSelect,
        onClear,
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
        multiple,
        ...props
    }: SelectBaseProps,
    forwardedRef: ForwardedRef<HTMLDivElement>,
): ReactNode => {
    const internalRef = useRef<HTMLDivElement | null>(null);
    const triggerRef = useCallback(
        (node: HTMLDivElement | null): void => {
            internalRef.current = node;
            if (typeof forwardedRef === 'function') {
                forwardedRef(node);
            } else if (forwardedRef) {
                forwardedRef.current = node;
            }
        },
        [forwardedRef],
    );
    const { inputSlots, menuSlots, items, clearButton, getItemByValue } = useSelectData(children);
    const { onMouseDown, onFocus, onBlur } = useFocusRing();
    const { selectionDescriptionId, selectionDescription } = useSelectionDescription(
        multiple,
        selectedItemValues,
        getItemByValue,
    );
    const badgeItems = useBadgeItems(selectedItemValues, getItemByValue);

    const [hasInteractedSinceOpening, setHasInteractedSinceOpening] = useState(false);

    const getDisplayedValue = useCallback(
        (itemValue?: string): ReactNode => {
            const selectedItem = getItemByValue(itemValue);
            if (selectedItem) {
                return !showStringValue && selectedItem?.children ? selectedItem.children : selectedItem?.label;
            }
            return undefined;
        },
        [getItemByValue, showStringValue],
    );

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
            onItemSelect(selectedItem?.value);
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
                          case useSelect.stateChangeTypes.ToggleButtonBlur:
                              return {
                                  ...changes,
                                  selectedItem: state.selectedItem,
                              };
                      }
                      return changes;
                  },
              }
            : {}),
    });

    const hasError = status === 'error';

    const handleClear = (): void => {
        onClear();
        reset();
    };

    const singleSelectValue = useMemo(
        (): ReactNode => getDisplayedValue(selectedItemValues[0]) || placeholder,
        [getDisplayedValue, selectedItemValues, placeholder],
    );

    return (
        <RadixPopover.Root open={isOpen}>
            <RadixPopover.Anchor asChild onMouseDown={onMouseDown} onFocus={onFocus} onBlur={onBlur}>
                <div
                    ref={triggerRef}
                    className={styles.root}
                    data-status={hasError ? 'error' : status}
                    data-disabled={disabled}
                    data-empty={selectedItemValues.length === 0}
                    data-test-id={dataTestId}
                    {...(disabled
                        ? {}
                        : // eslint-disable-next-line react-hooks/refs
                          getToggleButtonProps({
                              'aria-label': 'aria-label' in props ? props['aria-label'] : undefined,
                              'aria-describedby': selectionDescription ? selectionDescriptionId : undefined,
                              ref: triggerRef,
                          }))}
                >
                    {selectionDescription ? (
                        <span id={selectionDescriptionId} className={styles.srOnly}>
                            {selectionDescription}
                        </span>
                    ) : null}
                    {multiple ? (
                        <div className={styles.selectedValue}>
                            <CollapsibleBadges
                                items={badgeItems}
                                placeholder={placeholder}
                                onDismiss={(value) => {
                                    onItemSelect(value);
                                    internalRef.current?.focus();
                                }}
                                selectedCount={selectedItemValues.length}
                            />
                        </div>
                    ) : (
                        <span className={styles.selectedValue}>{singleSelectValue}</span>
                    )}
                    {inputSlots}
                    {clearButton ? <ClearButton onClear={handleClear}>{clearButton}</ClearButton> : null}
                    <div className={styles.icons}>
                        <IconCaretDown size={16} className={styles.caret} />
                        <StatusIcons status={status} hasError={hasError} dataTestId={dataTestId} />
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
SelectBaseInput.displayName = 'Select';

export const SelectBase = forwardRef<HTMLDivElement, SelectBaseProps>(SelectBaseInput);
