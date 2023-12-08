/* (c) Copyright Frontify Ltd., all rights reserved. */

import { SelectItem, type SelectItemProps } from '@components/SelectItem/SelectItem';
import type { UseSelectPropGetters } from 'downshift';
import type { FocusEvent, ReactElement } from 'react';
import { useSelect } from 'downshift';
import { merge } from '@utilities/merge';
import { InputBaseProps } from 'src/types/input';
import { useForwardedRef } from '@utilities/useForwardedRef';
import { FOCUS_STYLE_NO_OFFSET } from '@utilities/focusStyle';
import { IconCaretDown16, IconCaretUp16 } from '@foundation/Icon';
import { childrenToArray, itemToString } from '@utilities/downshift';
import { Children, createContext, isValidElement, useMemo, useRef, useState } from 'react';
import { Validation, validationClassMap, validationTextClassMap } from '@utilities/validation';
import { SelectGroupItem, SelectGroupItemProps } from '@components/SelectGroupItem/SelectGroupItem';
import { InputStyles } from '@utilities/input';

export type SelectContextProps = {
    highlightedIndex: number;
    itemsArray: SelectItemProps[];
    parentWidth?: number;
    selectedItem?: SelectItemProps | null;
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
    autoOpen?: boolean;
    autoClose?: boolean;
    placeholder?: string;
    defaultItem?: SelectItemProps;
    onChange?: (value: SelectItemProps) => void;
    onFocus?: (event: FocusEvent<HTMLElement, Element>) => void;
    onBlur?: (event: FocusEvent<HTMLElement, Element>) => void;
} & Omit<
    InputBaseProps<string>,
    'autocomplete' | 'clearable' | 'decorator' | 'suffix' | 'extraActions' | 'size' | 'valueSelect' | 'value'
>;

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
        const { title, value, children, decorator } = item;
        return (
            <span className="tw-flex tw-justify-start tw-items-center tw-px-1">
                {decorator ? <span className="tw-text-text-weak tw-pr-1">{decorator}</span> : null}
                <span className="tw-text-text-weak">{children ?? title ?? value}</span>
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
    autoOpen = false,
    autoClose = false,
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
    const isSelectGroupItem = (item: SelectGroupItemProps | SelectItemProps): boolean =>
        typeof item === 'object' && 'groupTitle' in item;

    const allSelectItems: SelectItemProps[] = useMemo(
        () => childrenToArray(Array.isArray(children) ? children : children.props.children),
        [children],
    );

    const childrenArrayRef = useRef<SelectItemProps[]>(allSelectItems);
    const toggleElementsRef = useForwardedRef<HTMLDivElement | null>(null);
    const [isToggleButtonFocused, setIsToggleButtonFocused] = useState<boolean>(focusOnMount);

    const allItems: SelectItemProps[] | SelectGroupItemProps[] | (SelectItemProps | SelectGroupItemProps)[] =
        Children.map(children, (child) => {
            if (isValidElement<SelectItemProps>(child)) {
                return child.props;
            }
            return null;
        }) ?? [];

    const isDisabledOrReadOnly = disabled || readOnly;

    const handleOnChange = (selectedItem?: SelectItemProps | null) => onChange?.(selectedItem?.value);

    const {
        isOpen,
        highlightedIndex,
        getToggleButtonProps,
        getMenuProps,
        getItemProps,
        selectedItem,
        openMenu,
        closeMenu,
    } = useSelect<SelectItemProps>({
        initialIsOpen: open,
        items: allSelectItems,
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

    const parentWidth = toggleElementsRef.current?.clientWidth;

    const currentContext = useMemo(() => {
        return {
            getItemProps,
            selectedItem,
            highlightedIndex,
            itemsArray: childrenArrayRef.current,
            parentWidth,
            disabled,
            readOnly,
            hugWidth,
        };
    }, [disabled, parentWidth, getItemProps, highlightedIndex, hugWidth, readOnly, selectedItem]);

    return (
        <SelectContext.Provider value={currentContext}>
            <div
                className={merge([
                    InputStyles.base,
                    InputStyles.element,
                    InputStyles.height,
                    InputStyles.hover,
                    InputStyles.focus,
                    hugWidth ? 'tw-w-auto' : InputStyles.width,
                    isToggleButtonFocused && FOCUS_STYLE_NO_OFFSET,
                    isDisabledOrReadOnly ? `${InputStyles.disabled} ${InputStyles.readOnly}` : 'tw-cursor-pointer',
                    status === Validation.Default
                        ? ''
                        : `${validationClassMap[status]} ${validationTextClassMap[status]}`,
                ])}
                {...getToggleButtonProps({
                    disabled: isDisabledOrReadOnly,
                    ref: toggleElementsRef,
                    onKeyDown: (event) => {
                        if (Number(event.code) === 9) {
                            setIsToggleButtonFocused(!isDisabledOrReadOnly);
                        }
                    },
                    onBlur: (event) => {
                        setIsToggleButtonFocused(false);
                        onBlur?.(event);
                    },
                    onFocus: (event) => {
                        if (!isOpen) {
                            setIsToggleButtonFocused(!isDisabledOrReadOnly);
                        }
                        onFocus?.(event);
                    },
                    onMouseEnter() {
                        autoOpen && openMenu();
                    },
                })}
                aria-label="Select Toggle Button"
                data-test-id={dataTestId}
            >
                <GetSelectedText item={selectedItem} placeholder={placeholder} required={required} />
                <span className="tw-p-1">{isOpen ? <IconCaretUp16 /> : <IconCaretDown16 />}</span>
            </div>
            <ul
                className={merge([
                    'tw-relative tw-bg-base tw-mt-1 tw-shadow-md',
                    hugWidth ? 'tw-w-auto' : 'tw-w-full',
                    isOpen && allItems.length > 0 ? '' : 'hidden',
                ])}
                style={{ width: `${parentWidth}px` }}
                data-test-id={`${dataTestId}-menu`}
                {...getMenuProps({
                    disabled: isDisabledOrReadOnly,
                    onMouseLeave() {
                        autoClose && closeMenu();
                    },
                })}
            >
                {isOpen &&
                    allItems.map((item, index: number) =>
                        isSelectGroupItem(item) ? (
                            <li key={`group-${index + 1}`}>
                                <SelectGroupItem
                                    key={`group-element-${index + 1}`}
                                    groupTitle={(item as SelectGroupItemProps).groupTitle}
                                >
                                    {(item as SelectGroupItemProps).children.map((options) => (
                                        <SelectItem key={options.props.id} {...options.props} />
                                    ))}
                                </SelectGroupItem>
                            </li>
                        ) : (
                            <SelectItem key={(item as SelectItemProps).id} {...(item as SelectItemProps)} />
                        ),
                    )}
            </ul>
        </SelectContext.Provider>
    );
};
Select.displayName = 'FondueSelect';
