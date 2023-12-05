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
import { childrenToArray, itemToString } from '@utilities/downshift';
import { cloneElement, createContext, useMemo, useRef, useState } from 'react';
import { Validation, validationClassMap, validationTextClassMap } from '@utilities/validation';
import { SelectGroupItem } from '@components/SelectGroupItem/SelectGroupItem';

export type SelectContextProps = {
    highlightedIndex: number;
    itemsArray: SelectItemProps[];
    parentWidth?: number;
    selectedItem?: SelectItemProps | null;
    getMenuProps?: UseSelectPropGetters<SelectItemProps>['getMenuProps'];
    getItemProps?: UseSelectPropGetters<SelectItemProps>['getItemProps'];
    disabled?: boolean;
    readOnly?: boolean;
    hugWidth?: boolean;
};

export const SelectContext = createContext<SelectContextProps>({
    highlightedIndex: -1,
    itemsArray: [],
});

export type SelectProps = {
    children: ReactElement | ReactElement[];
    disabled?: boolean;
    focusOnMount?: boolean;
    open?: boolean;
    placeholder?: string;
    defaultItem?: SelectItemProps;
    onChange?: (value: SelectItemProps) => void;
    onFocus?: (event: FocusEvent<HTMLDivElement, Element>) => void;
    onBlur?: (event: FocusEvent<HTMLDivElement, Element>) => void;
} & Omit<InputBaseProps<string>, 'autocomplete' | 'clearable' | 'decorator' | 'suffix'>;

const GetSelectedText = ({
    placeholder,
    item,
    required = false,
}: {
    placeholder: string;
    item?: SelectItemProps | null;
    required?: boolean;
}) => {
    if (item) {
        const { title, value, decorator } = item;
        return (
            <span className="tw-flex tw-justify-start tw-items-center tw-px-1">
                {decorator ? <span className="tw-text-text-weak tw-pr-1">{decorator}</span> : null}
                <span className="tw-text-text-weak">{title ?? value}</span>
            </span>
        );
    }
    return (
        <span className="tw-text-text-weak">
            {placeholder}
            {required ? '*' : ''}
        </span>
    );
};

export const Select = ({
    children,
    defaultItem,
    hugWidth,
    required,
    readOnly,
    disabled = false,
    open = false,
    focusOnMount = false,
    placeholder = 'Select a option',
    status = Validation.Default,
    onChange,
    onFocus,
    onBlur,
    'data-test-id': dataTestId = 'fondue-select',
}: SelectProps) => {
    /** required to allow SelectGroupItem nested component to be optional */
    const isChildrenArray = Array.isArray(children);
    const { displayName } = isChildrenArray
        ? (children[0].type as typeof SelectGroupItem)
        : (children.type as typeof SelectGroupItem);
    const isGroupElement = displayName === SelectGroupItem.displayName;

    const toggleElementsRef = useForwardedRef<HTMLDivElement | null>(null);
    const selectItemElements = childrenToArray(isChildrenArray ? children : children.props.children);
    const childrenArrayRef = useRef<SelectItemProps[]>(selectItemElements);
    const [isToggleButtonFocused, setIsToggleButtonFocused] = useState<boolean>(focusOnMount);

    const isDisabledOrReadOnly = disabled || readOnly;

    const handleOnChange = (selectedItem?: SelectItemProps | null) => onChange?.(selectedItem?.value);

    const { isOpen, highlightedIndex, getToggleButtonProps, getMenuProps, getItemProps, selectedItem } =
        useSelect<SelectItemProps>({
            initialIsOpen: open,
            items: childrenArrayRef.current,
            initialSelectedItem: defaultItem,
            isItemDisabled: (item: SelectItemProps) => !!item.disabled,
            itemToString: itemToString<SelectItemProps>,
            onSelectedItemChange: ({ selectedItem: newSelectedItem }) => handleOnChange(newSelectedItem),
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
                        return changes;
                    default:
                        return changes;
                }
            },
        });

    const renderChildren = useMemo(() => {
        const allElements = [];
        if (isChildrenArray) {
            for (const child of children) {
                allElements.push(
                    cloneElement(child, {
                        key: child.props.id,
                    }),
                );
            }
        } else if (!isChildrenArray && isGroupElement) {
            allElements.push(
                cloneElement(children, {
                    key: children.props.id,
                }),
            );
        } else {
            for (const child of children.props.children) {
                allElements.push(
                    cloneElement(child, {
                        key: child.props.id,
                    }),
                );
            }
        }

        if (isGroupElement) {
            return allElements;
        } else {
            return <SelectGroupItem>{...allElements}</SelectGroupItem>;
        }
    }, [children, isChildrenArray, isGroupElement]);

    const parentWidth = toggleElementsRef.current?.clientWidth;

    const currentContext = useMemo(() => {
        return {
            getMenuProps,
            getItemProps,
            selectedItem,
            highlightedIndex,
            itemsArray: childrenArrayRef.current,
            parentWidth,
            disabled,
            readOnly,
            hugWidth,
        };
    }, [disabled, parentWidth, getItemProps, getMenuProps, highlightedIndex, hugWidth, readOnly, selectedItem]);

    return (
        <SelectContext.Provider value={currentContext}>
            <div
                className={merge([
                    'tw-p-2 tw-bg-base tw-flex tw-justify-between tw-border tw-rounded tw-border-line-strong tw-text-text-weak',
                    hugWidth ? 'tw-w-auto' : 'tw-w-full',
                    isToggleButtonFocused && FOCUS_STYLE_NO_OFFSET,
                    isDisabledOrReadOnly ? 'tw-cursor-not-allowed' : 'tw-cursor-pointer',
                    status === Validation.Default
                        ? ''
                        : `${validationClassMap[status]} ${validationTextClassMap[status]}`,
                ])}
                {...getToggleButtonProps({ disabled: isDisabledOrReadOnly, ref: toggleElementsRef })}
                onFocus={(event) => {
                    setIsToggleButtonFocused(!isDisabledOrReadOnly);
                    onFocus?.(event);
                }}
                onBlur={(event) => {
                    setIsToggleButtonFocused(false);
                    onBlur?.(event);
                }}
                aria-label="Select Toggle Button"
                data-test-id={dataTestId}
            >
                <GetSelectedText item={selectedItem} placeholder={placeholder} required={required} />
                <span className="tw-p-1">{isOpen ? <IconCaretUp16 /> : <IconCaretDown16 />}</span>
            </div>
            {isOpen && (
                <div
                    className={merge([
                        hugWidth ? 'tw-w-auto' : 'tw-w-full',
                        'tw-relative tw-bg-base tw-mt-1 tw-shadow-md',
                    ])}
                    style={{ width: `${parentWidth}px` }}
                    data-test-id={`${dataTestId}-menu`}
                >
                    {renderChildren}
                </div>
            )}
        </SelectContext.Provider>
    );
};
Select.displayName = 'FondueSelect';
