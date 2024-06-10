/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as RadixPopover from '@radix-ui/react-popover';
import { Slot as RadixSlot } from '@radix-ui/react-slot';
import { type UseComboboxPropGetters, type UseSelectPropGetters } from 'downshift';
import { isValidElement, type ForwardedRef, type ReactElement, type ReactNode } from 'react';

import { type SelectItemProps } from './SelectItem';
import styles from './styles/select.module.scss';
import { getSelectOptionValue, recursiveMap } from './utils';

export type SelectMenuProps = {
    isOpen: boolean;
    highlightedIndex: number;
    getMenuProps: UseSelectPropGetters<unknown>['getMenuProps'] | UseComboboxPropGetters<unknown>['getMenuProps'];
    getItemProps: UseSelectPropGetters<unknown>['getItemProps'] | UseComboboxPropGetters<unknown>['getItemProps'];
    children: React.ReactNode;
    filterText: string;
};

export const SelectMenu = ({
    isOpen,
    highlightedIndex,
    getMenuProps,
    getItemProps,
    children,
    filterText,
}: SelectMenuProps) => {
    return (
        <RadixPopover.Portal>
            <RadixPopover.Content>
                <ul data-open-state={isOpen} className={styles.menu} {...getMenuProps()}>
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
                                            key={`${index}`}
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
