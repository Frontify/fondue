/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ForwardedRef, type ReactNode } from 'react';

import styles from './styles/select.module.scss';

export type SelectItemProps = {
    /**
     *   The value of the select item.
     */
    value: string;
} & (
    | {
          /**
           *  The label of the select item. Required when the child is not a string.
           */
          label: string;
          /**
           *  The children of the select item. This can be a custom component or a string.
           */
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

export type SelectItemGroupProps = {
    /**
     *  The children of the select item group. This can contain multiple Select.Item components.
     */
    children: ReactNode;
    /**
     * The internal group id of the select item group.
     */
    groupId: string;
};

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
