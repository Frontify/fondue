/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCaretDown } from '@frontify/fondue-icons';
import * as RadixPopover from '@radix-ui/react-popover';
import { useCombobox, useMultipleSelection } from 'downshift';
import {
    forwardRef,
    useCallback,
    useMemo,
    useRef,
    useState,
    type FocusEvent,
    type ForwardedRef,
    type ReactNode,
} from 'react';

import { LoadingCircle } from '#/components/LoadingCircle/LoadingCircle.tsx';
import { type CommonAriaProps } from '#/helpers/aria';
import { useTranslation } from '#/hooks/useTranslation';

import { useBadgeItems } from '../hooks/useBadgeItems';
import { useFocusRing } from '../hooks/useFocusRing';
import { useSelectData, type AsyncItemsFetcher } from '../hooks/useSelectData';
import { useSelectionDescription } from '../hooks/useSelectionDescription';
import styles from '../styles/select.module.scss';

import { ClearButton } from './ClearButton';
import { CollapsibleBadges } from './CollapsibleBadges';
import { SelectMenu, type SelectMenuViewportCollisionPadding } from './SelectMenu';
import { ForwardedRefSelectSlot } from './SelectSlot';
import { StatusIcons } from './StatusIcons';

type SelectItem = {
    value: string;
    label: string;
    children?: ReactNode;
};

export type ComboboxSharedProps = {
    /**
     * The combobox content. Use `Select.Item` for options, `Select.Group` for grouped options,
     * and `Select.Slot` for decorators, clear actions, or custom menu content.
     */
    children?: ReactNode;
    /**
     * Text shown when no value is selected.
     * Use it to hint at the expected choice — e.g., "Search languages\u2026"
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
     * Prevents interaction and dims the combobox visually.
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
    id?: string;
    'data-test-id'?: string;
    /**
     * Controls the minimum distance between the dropdown menu and the viewport edge.
     * `'compact'` keeps it tight, `'spacious'` adds breathing room.
     *
     * @default "compact"
     */
    viewportCollisionPadding?: SelectMenuViewportCollisionPadding;
    /**
     * Async function that fetches items based on the user's typed filter text.
     * Use this for server-side search or large datasets that shouldn't be loaded upfront.
     */
    getAsyncItems?: AsyncItemsFetcher;
    /**
     * Callback fired when the Escape key is pressed while the menu is open.
     */
    onEscapeKeyDown?: (event: KeyboardEvent) => void;
} & CommonAriaProps;

type ComboboxBaseProps = ComboboxSharedProps & {
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
     * Whether the combobox allows multiple selections
     */
    multiple: boolean;
};

const ComboboxBaseInput = (
    {
        children,
        selectedItemValues,
        onItemSelect,
        onClear,
        placeholder = '',
        status = 'neutral',
        disabled,
        'data-test-id': dataTestId = 'fondue-select-combobox',
        alignMenu = 'start',
        side = 'bottom',
        id,
        viewportCollisionPadding = 'compact',
        getAsyncItems,
        onEscapeKeyDown,
        multiple,
        ...props
    }: ComboboxBaseProps,
    forwardedRef: ForwardedRef<HTMLDivElement>,
): ReactNode => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const inputCallbackRef = useCallback((node: HTMLInputElement | null): void => {
        inputRef.current = node;
    }, []);
    const { t } = useTranslation();
    const { inputSlots, menuSlots, items, filterText, clearButton, getItemByValue, setFilterText, asyncItemStatus } =
        useSelectData(children, getAsyncItems);
    const { wasClickedRef, onMouseDown, onFocus, onBlur } = useFocusRing();
    const { selectionDescriptionId, selectionDescription } = useSelectionDescription(
        multiple,
        selectedItemValues,
        getItemByValue,
    );
    const badgeItems = useBadgeItems(selectedItemValues, getItemByValue);

    const [hasInteractedSinceOpening, setHasInteractedSinceOpening] = useState(false);

    const selectedItems = useMemo((): SelectItem[] => {
        return selectedItemValues
            .map((value) => getItemByValue(value))
            .filter((item): item is SelectItem => item !== undefined && 'value' in item && 'label' in item);
    }, [selectedItemValues, getItemByValue]);

    const multipleSelectionResult = useMultipleSelection<SelectItem>(
        multiple
            ? {
                  selectedItems,
                  onStateChange({ selectedItems: newSelectedItems, type }) {
                      if (type === useMultipleSelection.stateChangeTypes.SelectedItemKeyDownBackspace) {
                          const removedItem = selectedItems.find((item) => !newSelectedItems?.includes(item));
                          if (removedItem) {
                              onItemSelect(removedItem.value);
                          }
                      }
                  },
              }
            : { selectedItems: [] },
    );
    const removeSelectedItem = multiple ? multipleSelectionResult.removeSelectedItem : (): void => {};

    const {
        getInputProps,
        getToggleButtonProps,
        getMenuProps,
        getItemProps,
        reset,
        selectedItem,
        isOpen,
        highlightedIndex,
        inputValue,
    } = useCombobox<SelectItem>({
        items,
        selectedItem: multiple ? null : (getItemByValue(selectedItemValues[0]) as SelectItem | null | undefined),
        defaultHighlightedIndex: 0,
        toggleButtonId: id,
        // Only set labelId if aria-labelledby is explicitly provided, otherwise downshift generates an orphan ID
        ...('aria-labelledby' in props && props['aria-labelledby'] ? { labelId: props['aria-labelledby'] } : {}),
        onSelectedItemChange: ({ selectedItem }) => {
            if (selectedItem) {
                onItemSelect(selectedItem.value);
            }
            if (multiple) {
                setFilterText('');
            }
        },
        onInputValueChange: ({ inputValue }) => {
            setFilterText(inputValue);
        },
        onIsOpenChange: () => {
            setHasInteractedSinceOpening(false);
            setFilterText('');
        },
        onHighlightedIndexChange: () => {
            setHasInteractedSinceOpening(true);
        },
        itemToString: (item) => (item ? item.label : ''),
        ...(multiple
            ? {
                  stateReducer: (state, actionAndChanges) => {
                      const { changes, type } = actionAndChanges;
                      switch (type) {
                          case useCombobox.stateChangeTypes.InputKeyDownEnter:
                          case useCombobox.stateChangeTypes.ItemClick:
                              return {
                                  ...changes,
                                  isOpen: true,
                                  highlightedIndex: state.highlightedIndex,
                                  inputValue: '',
                              };
                          case useCombobox.stateChangeTypes.InputBlur:
                              // Select item on blur (Tab key) but clear the input
                              return {
                                  ...changes,
                                  inputValue: '',
                              };
                      }
                      return changes;
                  },
              }
            : {}),
    });

    const valueInvalid = useMemo(() => {
        if (multiple) {
            return false;
        }
        return !getAsyncItems && !items.find((item) => item.label.toLowerCase().includes(inputValue.toLowerCase()));
    }, [inputValue, items, getAsyncItems, multiple]);

    const hasError = valueInvalid || !!asyncItemStatus.error || status === 'error';

    const handleDismissBadge = (value: string, preventFocusRing: boolean): void => {
        const item = getItemByValue(value) as SelectItem | undefined;
        if (item) {
            removeSelectedItem(item);
            onItemSelect(value);
            if (inputRef.current) {
                inputRef.current.focus();
                if (preventFocusRing) {
                    inputRef.current.dataset.showFocusRing = 'false';
                }
            }
        }
    };

    const handleClear = (): void => {
        onClear();
        reset();
    };

    const handleBlur = (blurEvent: FocusEvent<HTMLInputElement, Element>): void => {
        onBlur(blurEvent);

        if (!multiple) {
            const selectedItemLabel = selectedItem?.label ?? '';
            const isOutdated = selectedItemLabel.toLocaleLowerCase() !== inputValue.toLocaleLowerCase();

            if (isOutdated) {
                reset();
            }
        }

        if (getInputProps().onBlur) {
            getInputProps().onBlur?.(blurEvent);
        }
    };

    return (
        <RadixPopover.Root open={isOpen}>
            <RadixPopover.Anchor asChild>
                <div
                    ref={forwardedRef}
                    className={styles.root}
                    data-status={hasError ? 'error' : status}
                    data-disabled={disabled}
                    data-empty={selectedItemValues.length === 0}
                >
                    {multiple ? (
                        <>
                            {/* Hidden description for screen readers - announced on focus */}
                            <span id={selectionDescriptionId} className={styles.srOnly}>
                                {selectionDescription}
                            </span>
                            <CollapsibleBadges
                                items={badgeItems}
                                onDismiss={handleDismissBadge}
                                selectedCount={selectedItemValues.length}
                            >
                                <input
                                    // eslint-disable-next-line react-hooks/refs
                                    {...getInputProps({
                                        ref: inputCallbackRef,
                                        'aria-label': 'aria-label' in props ? props['aria-label'] : undefined,
                                        // Remove auto-generated aria-labelledby if not explicitly provided
                                        'aria-labelledby':
                                            'aria-labelledby' in props && props['aria-labelledby']
                                                ? props['aria-labelledby']
                                                : undefined,
                                        'aria-describedby': selectionDescription ? selectionDescriptionId : undefined,
                                    })}
                                    data-test-id={dataTestId}
                                    placeholder={selectedItemValues.length === 0 ? placeholder : ''}
                                    className={styles.multiSelectInput}
                                    disabled={disabled}
                                    onMouseDown={onMouseDown}
                                    onFocus={onFocus}
                                    onBlur={handleBlur}
                                />
                            </CollapsibleBadges>
                        </>
                    ) : (
                        <input
                            {...getInputProps({
                                'aria-label': 'aria-label' in props ? props['aria-label'] : undefined,
                                // Remove auto-generated aria-labelledby if not explicitly provided
                                'aria-labelledby':
                                    'aria-labelledby' in props && props['aria-labelledby']
                                        ? props['aria-labelledby']
                                        : undefined,
                            })}
                            data-test-id={dataTestId}
                            placeholder={placeholder}
                            className={styles.input}
                            disabled={disabled}
                            onMouseDown={onMouseDown}
                            onFocus={onFocus}
                            onBlur={handleBlur}
                        />
                    )}
                    {inputSlots}
                    {clearButton ? <ClearButton onClear={handleClear}>{clearButton}</ClearButton> : null}
                    {asyncItemStatus.isLoading && isOpen ? (
                        <ForwardedRefSelectSlot name="right" data-test-id={`${dataTestId}-right-slot`}>
                            <LoadingCircle size="x-small" data-test-id={`${dataTestId}-loading-circle`} />
                        </ForwardedRefSelectSlot>
                    ) : null}
                    <div className={styles.icons}>
                        <button
                            aria-label={t('Select_toggleMenu')}
                            {...getToggleButtonProps()}
                            type="button"
                            disabled={disabled}
                            onMouseDown={() => {
                                wasClickedRef.current = true;
                            }}
                        >
                            <IconCaretDown size={16} className={styles.caret} />
                        </button>
                        <StatusIcons status={status} hasError={hasError} dataTestId={dataTestId} />
                    </div>
                </div>
            </RadixPopover.Anchor>

            <SelectMenu
                align={alignMenu}
                side={side}
                highlightedIndex={highlightedIndex}
                filterText={filterText}
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
ComboboxBaseInput.displayName = 'Select.Combobox';

export const ComboboxBase = forwardRef<HTMLDivElement, ComboboxBaseProps>(ComboboxBaseInput);
