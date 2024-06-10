/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as RadixPopover from '@radix-ui/react-popover';
import { Slot as RadixSlot } from '@radix-ui/react-slot';
import { type UseComboboxPropGetters, type UseSelectPropGetters } from 'downshift';
import { isValidElement, type ForwardedRef, type ReactElement, type ReactNode } from 'react';

import styles from './styles/select.module.scss';
import { getSelectOptionValue, recursiveMap } from './utils';

export type SelectMenuProps = {
    isOpen: boolean;
    highlightedIndex: number;
    getMenuProps: UseSelectPropGetters<unknown>['getMenuProps'] | UseComboboxPropGetters<unknown>['getMenuProps'];
    getItemProps: UseSelectPropGetters<unknown>['getItemProps'] | UseComboboxPropGetters<unknown>['getItemProps'];
    children: React.ReactNode;
};

export const SelectMenu = ({ isOpen, highlightedIndex, getMenuProps, getItemProps, children }: SelectMenuProps) => {
    return (
        <RadixPopover.Portal>
            <RadixPopover.Content>
                <ul data-open-state={isOpen} className={styles.menu} {...getMenuProps()}>
                    {
                        recursiveMap(children, (child, index) => {
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
                        }).parsedChildren
                    }
                </ul>
            </RadixPopover.Content>
        </RadixPopover.Portal>
    );
};
SelectMenu.displayName = 'Select.Menu';

export type SelectItemGroupProps = { children: ReactNode; groupId: string };

export const SelectItemGroup = (
    { children, groupId }: SelectItemGroupProps,
    forwardedRef?: ForwardedRef<HTMLDivElement>,
) => {
    return (
        <div className={styles.group} ref={forwardedRef} key={groupId}>
            {children}
        </div>
    );
};
SelectItemGroup.displayName = 'Select.Group';

export type SelectItemProps = { value: string } & (
    | {
          label: string;
          children?: React.ReactNode;
      }
    | {
          label?: string;
          children: string;
      }
);

export const SelectItem = (props: SelectItemProps, forwardedRef?: ForwardedRef<HTMLLIElement>) => {
    return (
        <li ref={forwardedRef} data-test-bla {...props}>
            {props.children}
        </li>
    );
};
SelectItem.displayName = 'Select.Item';
