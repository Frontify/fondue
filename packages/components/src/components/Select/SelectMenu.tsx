/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as RadixPopover from '@radix-ui/react-popover';
import { Slot as RadixSlot } from '@radix-ui/react-slot';
import { type UseComboboxPropGetters, type UseSelectPropGetters } from 'downshift';
import { isValidElement, type ForwardedRef, type ReactElement, type ReactNode } from 'react';

import { type SelectItemProps } from './SelectItem';
import styles from './styles/select.module.scss';
import { getSelectOptionValue, recursiveMap } from './utils';

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
};

export const SelectMenu = ({ highlightedIndex, getMenuProps, getItemProps, children, filterText }: SelectMenuProps) => {
    return (
        <RadixPopover.Portal>
            <RadixPopover.Content
                onOpenAutoFocus={(event) => {
                    event.preventDefault();
                }}
                className={styles.portal}
            >
                <ul className={styles.menu} {...getMenuProps()} role="dialog">
                    {
                        recursiveMap(
                            children,
                            (child, index) => {
                                const isValid = <TProps,>(
                                    child: ReactNode,
                                ): child is ReactElement<TProps> & { ref: ForwardedRef<HTMLElement> } => {
                                    // @ts-expect-error - We are explicitly checking for ref
                                    return isValidElement<TProps>(child) && child.ref !== undefined;
                                };

                                if (isValid<SelectItemProps>(child)) {
                                    return (
                                        <RadixSlot
                                            className={styles.item}
                                            data-highlighted={highlightedIndex === index}
                                            key={`${child.props.value}`}
                                            {...getItemProps({
                                                item: getSelectOptionValue(child.props),
                                                index,
                                                ...(child.ref ? { ref: child.ref } : {}),
                                            })}
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
