/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCaretDown, IconCheckMark, IconExclamationMarkTriangle } from '@frontify/fondue-icons';
import * as RadixPopover from '@radix-ui/react-popover';
import { Slot as RadixSlot } from '@radix-ui/react-slot';
import { useCombobox, useMultipleSelection } from 'downshift';
import {
    forwardRef,
    useId,
    useMemo,
    useRef,
    useState,
    type FocusEvent,
    type ForwardedRef,
    type ReactNode,
} from 'react';

import { LoadingCircle } from '#/components/LoadingCircle/LoadingCircle.tsx';
import { ForwardedRefSelectSlot } from './SelectSlot';
import { type CommonAriaProps } from '#/helpers/aria';
import { useTranslation } from '#/hooks/useTranslation';
import { CollapsibleBadges } from './CollapsibleBadges';
import { SelectMenu, type SelectMenuViewportCollisionPadding } from './SelectMenu';
import { useSelectData, type AsyncItemsFetcher } from '../hooks/useSelectData';

import styles from '../styles/select.module.scss';

type SelectItem = {
    value: string;
    label: string;
    children?: ReactNode;
};

export type ComboboxSharedProps = {
    /**
     * Children of the Combobox component. This can contain the `Select.Slot` components for the label, decorators, clear action and menu
     */
    children?: ReactNode;
    /**
     * The placeholder in the combobox component
     */
    placeholder?: string;
    /**
     * Status of the text input
     * @default "neutral"
     */
    status?: 'neutral' | 'success' | 'error';
    /**
     * Disables the combobox component
     */
    disabled?: boolean;
    /**
     * The alignment of the menu
     * @default "start"
     */
    alignMenu?: 'start' | 'center' | 'end';
    /**
     * Defines the preferred side of the combobox. It will not be respected if there are collisions with the viewport
     * @default "bottom"
     */
    side?: 'left' | 'right' | 'bottom' | 'top';
    /**
     * Id of the combobox component
     */
    id?: string;
    /**
     * The data test id of the combobox component
     */
    'data-test-id'?: string;
    /**
     * Define the minimum distance between the select menu and the viewport edge
     * @default 'compact'
     */
    viewportCollisionPadding?: SelectMenuViewportCollisionPadding;
    /**
     * Function to fetch items asynchronously
     */
    getAsyncItems?: AsyncItemsFetcher;
    /**
     * Event handler called when the escape key is pressed
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
    const { t } = useTranslation();
    const selectionDescriptionId = useId();
    const { inputSlots, menuSlots, items, filterText, clearButton, getItemByValue, setFilterText, asyncItemStatus } =
        useSelectData(children, getAsyncItems);

    const [hasInteractedSinceOpening, setHasInteractedSinceOpening] = useState(false);

    const wasClickedRef = useRef(false);

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

    const onBlurHandler = (blurEvent: FocusEvent<HTMLInputElement, Element>): void => {
        blurEvent.target.dataset.showFocusRing = 'false';
        wasClickedRef.current = false;

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

    const hasError = valueInvalid || !!asyncItemStatus.error || status === 'error';

    const badgeItems = useMemo(() => {
        return selectedItemValues.map((value) => {
            const item = getItemByValue(value) as SelectItem | undefined;
            const displayValue = item?.label ?? value;
            return { value, displayValue };
        });
    }, [selectedItemValues, getItemByValue]);

    // Description for screen readers when focusing the input
    const selectionDescription = useMemo((): string => {
        if (!multiple || selectedItemValues.length === 0) {
            return '';
        }
        const labels = selectedItemValues
            .map((value) => {
                const item = getItemByValue(value) as SelectItem | undefined;
                return item?.label ?? value;
            })
            .join(', ');
        return `${selectedItemValues.length} selected: ${labels}`;
    }, [multiple, selectedItemValues, getItemByValue]);

    const handleDismissBadge = (value: string): void => {
        const item = getItemByValue(value) as SelectItem | undefined;
        if (item) {
            removeSelectedItem(item);
            onItemSelect(value);
        }
    };

    const handleClear = (): void => {
        onClear();
        reset();
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
                                    {...getInputProps({
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
                                    onMouseDown={(mouseEvent) => {
                                        wasClickedRef.current = true;
                                        mouseEvent.currentTarget.dataset.showFocusRing = 'false';
                                    }}
                                    onFocus={(focusEvent) => {
                                        if (!wasClickedRef.current) {
                                            focusEvent.target.dataset.showFocusRing = 'true';
                                        }
                                    }}
                                    onBlur={onBlurHandler}
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
                            onMouseDown={(mouseEvent) => {
                                wasClickedRef.current = true;
                                mouseEvent.currentTarget.dataset.showFocusRing = 'false';
                            }}
                            onFocus={(focusEvent) => {
                                if (!wasClickedRef.current) {
                                    focusEvent.target.dataset.showFocusRing = 'true';
                                }
                            }}
                            onBlur={onBlurHandler}
                        />
                    )}
                    {inputSlots}
                    {clearButton ? (
                        <RadixSlot
                            onClick={(event) => {
                                event.stopPropagation();
                                handleClear();
                            }}
                            className={styles.clear}
                            role="button"
                            aria-label="Clear selection"
                        >
                            {clearButton}
                        </RadixSlot>
                    ) : null}
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
                        {status === 'success' ? (
                            <IconCheckMark
                                size={16}
                                className={styles.iconSuccess}
                                data-test-id={`${dataTestId}-success-icon`}
                                aria-hidden="true"
                            />
                        ) : null}
                        {hasError ? (
                            <>
                                <IconExclamationMarkTriangle
                                    size={16}
                                    className={styles.iconError}
                                    data-test-id={`${dataTestId}-error-icon`}
                                    aria-hidden="true"
                                />
                                <span className={styles.srOnly} role="alert">
                                    Error
                                </span>
                            </>
                        ) : null}
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
