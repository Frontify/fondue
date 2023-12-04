/* (c) Copyright Frontify Ltd., all rights reserved. */

import type { SelectItemProps } from '@components/SelectItem/SelectItem';
import type { UseSelectPropGetters } from 'downshift';
import type { FocusEvent, ReactElement } from 'react';
import { useSelect } from 'downshift';
import { merge } from '@utilities/merge';
import { InputBaseProps } from 'src/types/input';
import { useForwardedRef } from '@utilities/useForwardedRef';
import { FOCUS_STYLE_NO_OFFSET } from '@utilities/focusStyle';
import { IconCaretDown16, IconCaretUp16 } from '@foundation/Icon';
import { childrenToArray, itemToString } from '@hooks/useDownshift';
import { cloneElement, createContext, useMemo, useRef, useState } from 'react';
import { Validation, validationClassMap, validationTextClassMap } from '@utilities/validation';

export type SelectContextProps = {
    highlightedIndex: number;
    itemsArray: SelectItemProps[];
    parentWidth?: number;
    selectedItem?: SelectItemProps | null;
    getMenuProps?: UseSelectPropGetters<SelectItemProps>['getMenuProps'];
    getItemProps?: UseSelectPropGetters<SelectItemProps>['getItemProps'];
};

export const SelectContext = createContext<SelectContextProps>({
    highlightedIndex: -1,
    itemsArray: [],
});

export type SelectProps = {
    children: ReactElement | ReactElement[];
    disabled?: boolean;
    focusOnMount?: boolean;
    initialIsOpen?: boolean;
    listPlaceholder?: string;
    defaultItem?: SelectItemProps;
    onChange?: (value: SelectItemProps) => void;
    onFocus?: (event: FocusEvent<HTMLDivElement, Element>) => void;
    onBlur?: (event: FocusEvent<HTMLDivElement, Element>) => void;
} & Omit<InputBaseProps<string>, 'autocomplete' | 'clearable' | 'decorator' | 'suffix'>;

const GetSelectedText = ({ placeholder, item }: { placeholder: string; item?: SelectItemProps | null }) => {
    if (item) {
        const { title, value, decorator } = item;
        return (
            <span className="tw-flex tw-justify-start tw-items-center tw-px-1">
                {decorator ? <span className="tw-text-text-weak tw-pr-1">{decorator}</span> : null}
                <span className="tw-text-text-weak">{title ?? value}</span>
            </span>
        );
    }
    return <span className="tw-text-text-weak">{placeholder}</span>;
};

export const Select = ({
    children,
    defaultItem,
    disabled = false,
    initialIsOpen = false,
    focusOnMount = false,
    listPlaceholder = 'Select a option',
    status = Validation.Default,
    onChange,
    onFocus,
    onBlur,
    'data-test-id': dataTestId = 'fondue-select',
}: SelectProps) => {
    const toggleElementsRef = useForwardedRef<HTMLDivElement | null>(null);
    const childrenArrayRef = useRef<SelectItemProps[]>(childrenToArray(children));
    const [isToggleButtonFocused, setIsToggleButtonFocused] = useState<boolean>(focusOnMount);

    const isMultipleGroups = Array.isArray(children);

    const handleOnChange = (selectedItem?: SelectItemProps | null) => onChange?.(selectedItem?.value);

    const { isOpen, highlightedIndex, getToggleButtonProps, getMenuProps, getItemProps, selectedItem } =
        useSelect<SelectItemProps>({
            initialIsOpen,
            items: childrenArrayRef.current,
            initialSelectedItem: defaultItem,
            isItemDisabled: (item) => !!item.disabled,
            itemToString: itemToString<SelectItemProps>,
            onSelectedItemChange: ({ selectedItem: newSelectItem }) => handleOnChange(newSelectItem),
            stateReducer: (state, actionAndChanges) => {
                const { type, changes } = actionAndChanges;
                const { ToggleButtonKeyDownEnter, ToggleButtonBlur, ItemClick, ToggleButtonKeyDownSpaceButton } =
                    useSelect.stateChangeTypes;

                switch (type) {
                    case ItemClick:
                    case ToggleButtonBlur:
                    case ToggleButtonKeyDownEnter:
                    case ToggleButtonKeyDownSpaceButton:
                        if (changes.selectedItem?.disabled) {
                            return state;
                        }
                    default:
                        return changes;
                }
            },
        });

    const renderChildren = useMemo(() => {
        const allElements = [];
        if (isMultipleGroups) {
            for (const child of children) {
                allElements.push(
                    cloneElement(child, {
                        key: child.props.id,
                    }),
                );
            }
        } else {
            allElements.push(
                cloneElement(children, {
                    key: children.props.id,
                }),
            );
        }
        return allElements;
    }, [children, isMultipleGroups]);

    return (
        <SelectContext.Provider
            value={{
                getMenuProps,
                getItemProps,
                selectedItem,
                highlightedIndex,
                itemsArray: childrenArrayRef.current,
                parentWidth: toggleElementsRef.current?.clientWidth,
            }}
        >
            <div
                className={merge([
                    'tw-p-2 tw-bg-base tw-flex tw-justify-between tw-cursor-pointer tw-border tw-rounded tw-border-line-strong tw-text-text-weak',
                    (isToggleButtonFocused || isOpen) && FOCUS_STYLE_NO_OFFSET,
                    status === Validation.Default
                        ? ''
                        : `${validationClassMap[status]} ${validationTextClassMap[status]}`,
                ])}
                {...getToggleButtonProps({ disabled, ref: toggleElementsRef })}
                onFocus={(event) => {
                    setIsToggleButtonFocused(true);
                    onFocus?.(event);
                }}
                onBlur={(event) => {
                    setIsToggleButtonFocused(false);
                    onBlur?.(event);
                }}
                aria-label="Select Toggle Button"
                data-test-id={dataTestId}
            >
                <GetSelectedText item={selectedItem} placeholder={listPlaceholder} />
                <span className="tw-p-1">{isOpen ? <IconCaretUp16 /> : <IconCaretDown16 />}</span>
            </div>
            {isOpen && (
                <div
                    className={'tw-w-full tw-absolute tw-bg-base tw-mt-1 tw-shadow-md tw-h-auto tw-p-0 tw-z-10'}
                    style={{ width: `${toggleElementsRef.current?.clientWidth}px` }}
                >
                    {renderChildren}
                </div>
            )}
        </SelectContext.Provider>
    );
};
Select.displayName = 'FondueSelect';
