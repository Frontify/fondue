/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as RadixPopover from '@radix-ui/react-popover';
import { Slot as RadixSlot } from '@radix-ui/react-slot';
import { type UseComboboxPropGetters, type UseSelectPropGetters } from 'downshift';
import { isValidElement, useRef, type ForwardedRef, type MouseEvent, type ReactElement, type ReactNode } from 'react';

import { type SelectItemProps } from './SelectItem';
import styles from './styles/select.module.scss';
import { getSelectOptionValue, recursiveMap } from './utils';

import { usePreventDropdownOverflow } from '#/hooks/usePreventDropdownOverflow';

export type SelectMenuProps = {
    /**
     * @internal
     * The index of the highlighted item in the menu.
     */
    highlightedIndex: number;
    /**
     * @internal
     * Callback function to retrieve the props for a menu element.
     */
    getMenuProps: UseSelectPropGetters<unknown>['getMenuProps'] | UseComboboxPropGetters<unknown>['getMenuProps'];
    /**
     * @internal
     * Callback function to retrieve the props for a item element.
     */
    getItemProps: UseSelectPropGetters<unknown>['getItemProps'] | UseComboboxPropGetters<unknown>['getItemProps'];
    /**
     * @internal
     * The children of the menu component. This can contain multiple `Select.Item` or `Select.Group` components.
     */
    children: ReactNode;
    /**
     * @internal
     * The filter text shown in the combobox input element.
     */
    filterText?: string;
    /**
     * @internal
     * The type of the menu.
     */
    selectedItem?: {
        value: string;
    } | null;
};

export const SelectMenu = ({
    highlightedIndex,
    getMenuProps,
    getItemProps,
    children,
    filterText,
    selectedItem,
}: SelectMenuProps) => {
    const ref = useRef<HTMLUListElement | null>(null);

    const { setMaxHeight } = usePreventDropdownOverflow(ref);

    const handleOnOpenAutoFocus = (event: Event) => {
        event.preventDefault();
        setMaxHeight();
    };

    return (
        <RadixPopover.Portal>
            <RadixPopover.Content onOpenAutoFocus={handleOnOpenAutoFocus} className={styles.portal}>
                <ul className={styles.menu} {...getMenuProps()} ref={ref} data-test-id="fondue-select-menu">
                    {
                        recursiveMap(
                            children,
                            (child, index) => {
                                const isValid = <TProps,>(
                                    child: ReactNode,
                                ): child is ReactElement<TProps> & { ref: ForwardedRef<HTMLElement> } =>
                                    // @ts-expect-error - We are explicitly checking for ref
                                    isValidElement<TProps>(child) && child.ref !== undefined;

                                if (isValid<SelectItemProps>(child)) {
                                    const optionData = getSelectOptionValue(child.props);
                                    const itemProps = getItemProps({
                                        item: optionData,
                                        index,
                                        ...(child.ref ? { ref: child.ref } : {}),
                                    });

                                    console.log(
                                        optionData.value,
                                        selectedItem?.value,
                                        optionData.value === selectedItem?.value,
                                    );

                                    return (
                                        <RadixSlot
                                            className={styles.item}
                                            data-highlighted={highlightedIndex === index}
                                            data-selected={selectedItem?.value === optionData.value}
                                            key={`${child.props.value}`}
                                            // Workaround for the issue where the onClick event is not fired on touch devices because of portal usage
                                            onTouchStart={(event) => {
                                                if (itemProps.onClick) {
                                                    itemProps.onClick(event as unknown as MouseEvent<HTMLElement>);
                                                }
                                            }}
                                            {...itemProps}
                                        >
                                            {child}
                                        </RadixSlot>
                                    );
                                }
                            },
                            filterText,
                        ).parsedChildren
                    }
                </ul>
            </RadixPopover.Content>
        </RadixPopover.Portal>
    );
};
SelectMenu.displayName = 'Select.Menu';
