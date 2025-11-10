/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCaretDown, IconCheckMark, IconExclamationMarkTriangle } from '@frontify/fondue-icons';
import * as RadixPopover from '@radix-ui/react-popover';
import { Slot as RadixSlot } from '@radix-ui/react-slot';
import { useCombobox } from 'downshift';
import { forwardRef, useMemo, useRef, useState, type FocusEvent, type ForwardedRef, type ReactNode } from 'react';

import { LoadingCircle } from '#/components/LoadingCircle/LoadingCircle.tsx';
import { ForwardedRefSelectSlot } from '#/components/Select/SelectSlot.tsx';
import { type CommonAriaProps } from '#/helpers/aria';
import { useTranslation } from '#/hooks/useTranslation';

import { SelectMenu, type SelectMenuViewportCollisionPadding } from './SelectMenu';
import styles from './styles/select.module.scss';
import { useSelectData, type AsyncItemsFetcher } from './useSelectData';

export type ComboboxProps = {
    /**
     * Children of the Combobox component. This can contain the `Select.Slot` components for the label, decorators, clear action and menu.
     */
    children?: ReactNode;
    /**
     * Callback function that is called when an item is selected.
     */
    onSelect?: (selectedValue: string | null) => void;
    /**
     * The active value in the combobox component. This is used to control the combobox externally.
     */
    value?: string | null;
    /**
     * The default value of the combobox component. Used for uncontrolled usages.
     */
    defaultValue?: string;
    /**
     * The placeholder in the combobox component.
     */
    placeholder?: string;
    /**
     * Status of the text input
     * @default "neutral"
     */
    status?: 'neutral' | 'success' | 'error';
    /**
     * Disables the combobox component.
     */
    disabled?: boolean;
    /**
     * The alignment of the menu.
     * @default "start"
     */
    alignMenu?: 'start' | 'center' | 'end' /**
     * Defines the preferred side of the combobox. It will not be respected if there are collisions with the viewport.
     * @default "bottom"
     */;
    side?: 'left' | 'right' | 'bottom' | 'top';
    /**
     * Id of the combobox component
     */
    id?: string;
    /**
     * The data test id of the combobox component.
     */
    'data-test-id'?: string;
    /**
     * Define the minimum distance between the select menu and the viewport edge
     * @default 'compact'
     */
    viewportCollisionPadding?: SelectMenuViewportCollisionPadding;
    /**
     * Function to fetch items asynchronously.
     */
    getAsyncItems?: AsyncItemsFetcher;
} & CommonAriaProps;

export const SelectCombobox = (
    {
        children,
        onSelect,
        value,
        defaultValue,
        placeholder = '',
        status = 'neutral',
        disabled,
        'data-test-id': dataTestId = 'fondue-select-combobox',
        alignMenu = 'start',
        side = 'bottom',
        id,
        viewportCollisionPadding = 'compact',
        getAsyncItems,
        ...props
    }: ComboboxProps,
    forwardedRef: ForwardedRef<HTMLDivElement>,
) => {
    const { t } = useTranslation();
    const { inputSlots, menuSlots, items, filterText, clearButton, getItemByValue, setFilterText, asyncItemStatus } =
        useSelectData(children, getAsyncItems);

    const [hasInteractedSinceOpening, setHasInteractedSinceOpening] = useState(false);

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
    } = useCombobox({
        items,
        selectedItem: getItemByValue(value),
        defaultSelectedItem: getItemByValue(defaultValue),
        defaultHighlightedIndex: 0,
        toggleButtonId: id,
        labelId: 'aria-labelledby' in props ? props['aria-labelledby'] : undefined,
        onSelectedItemChange: ({ selectedItem }) => {
            onSelect?.(selectedItem?.value ?? null);
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
    });

    const wasClicked = useRef(false);

    const valueInvalid = useMemo(
        () => !getAsyncItems && !items.find((item) => item.label.toLowerCase().includes(inputValue.toLowerCase())),
        [inputValue, items, getAsyncItems],
    );

    const onBlurHandler = (blurEvent: FocusEvent<HTMLInputElement, Element>) => {
        blurEvent.target.dataset.showFocusRing = 'false';
        wasClicked.current = false;

        const selectedItemNullOrOutdated = selectedItem?.label.toLocaleLowerCase() !== inputValue.toLocaleLowerCase();

        if (selectedItemNullOrOutdated) {
            // if there is no selection or
            // the existing selected value is not the same as the input value (old),
            // reset the input
            reset();
        }

        if (getInputProps().onBlur) {
            getInputProps().onBlur?.(blurEvent);
        }
    };
    const hasError = valueInvalid || !!asyncItemStatus.error || status === 'error';

    return (
        <RadixPopover.Root open={isOpen}>
            <RadixPopover.Anchor asChild>
                <div ref={forwardedRef} className={styles.root} data-status={hasError ? 'error' : status}>
                    <input
                        {...getInputProps({
                            'aria-label': 'aria-label' in props ? props['aria-label'] : undefined,
                        })}
                        data-test-id={dataTestId}
                        placeholder={placeholder}
                        className={styles.input}
                        disabled={disabled}
                        onMouseDown={(mouseEvent) => {
                            wasClicked.current = true;
                            mouseEvent.currentTarget.dataset.showFocusRing = 'false';
                        }}
                        onFocus={(focusEvent) => {
                            if (!wasClicked.current) {
                                focusEvent.target.dataset.showFocusRing = 'true';
                            }
                        }}
                        onBlur={onBlurHandler}
                    />
                    {inputSlots}
                    {clearButton ? (
                        <RadixSlot
                            onClick={(event) => {
                                event.stopPropagation();
                                reset();
                            }}
                            className={styles.clear}
                            role="button"
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
                                wasClicked.current = true;
                            }}
                        >
                            <IconCaretDown size={16} className={styles.caret} />
                        </button>
                        {status === 'success' ? (
                            <IconCheckMark
                                size={16}
                                className={styles.iconSuccess}
                                data-test-id={`${dataTestId}-success-icon`}
                            />
                        ) : null}
                        {hasError ? (
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
                filterText={filterText}
                getMenuProps={getMenuProps}
                getItemProps={getItemProps}
                selectedItem={selectedItem}
                hasInteractedSinceOpening={hasInteractedSinceOpening}
                viewportCollisionPadding={viewportCollisionPadding}
            >
                {menuSlots}
            </SelectMenu>
        </RadixPopover.Root>
    );
};
SelectCombobox.displayName = 'Select.Combobox';

export const ForwardedRefCombobox = forwardRef<HTMLDivElement, ComboboxProps>(SelectCombobox);
