/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCheckMark } from '@frontify/fondue-icons';
import { forwardRef, type ForwardedRef, type ReactNode } from 'react';

import styles from '../styles/select.module.scss';

export type SelectItemProps = {
    /**
     * The value of the select item.
     */
    value: string;
    /**
     * The data test id of the select item.
     */
    'data-test-id'?: string;
} & (
    | {
          /**
           * The label of the select item. Required when the child is not a string.
           */
          label: string;
          /**
           * The children of the select item. This can be a custom component or a string.
           */
          children?: ReactNode;
      }
    | {
          label?: string;
          children: string;
      }
);

export const SelectItem = (
    { 'data-test-id': dataTestId = 'fondue-select-item', ...props }: SelectItemProps,
    forwardedRef?: ForwardedRef<HTMLLIElement>,
) => {
    return (
        <li data-test-id={dataTestId} ref={forwardedRef} {...props}>
            <div className={styles.itemValue}>{props.children}</div>
            <IconCheckMark className={styles.checkmarkIcon} />
        </li>
    );
};
SelectItem.displayName = 'Select.Item';

export const ForwardedRefSelectItem = forwardRef<HTMLLIElement, SelectItemProps>(SelectItem);

export type SelectItemGroupProps = {
    /**
     * The children of the select item group. This can contain multiple `Select.Item` components.
     */
    children: ReactNode;
    /**
     * The internal group ID of the select item group.
     */
    groupId: string;
    /**
     * The groups heading
     */
    heading?: string;
    /**
     * The data test id of the select item group.
     */
    'data-test-id'?: string;
};

export const SelectItemGroup = (
    { children, groupId, heading, 'data-test-id': dataTestId = 'fondue-select-item-group' }: SelectItemGroupProps,
    forwardedRef?: ForwardedRef<HTMLDivElement>,
) => {
    return (
        <div data-test-id={dataTestId} className={styles.group} ref={forwardedRef} key={groupId}>
            {heading ? (
                <div className={styles.groupHeading}>
                    <span>{heading}</span>
                </div>
            ) : null}
            {children}
        </div>
    );
};
SelectItemGroup.displayName = 'Select.Group';

export const ForwardedRefSelectItemGroup = forwardRef<HTMLDivElement, SelectItemGroupProps>(SelectItemGroup);
