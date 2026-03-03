/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCheckMark } from '@frontify/fondue-icons';
import { forwardRef, type ForwardedRef, type ReactNode } from 'react';

import styles from '../styles/select.module.scss';

export type SelectItemProps = {
    /**
     * A unique string that identifies this option.
     * This is the value passed to `onSelect` when the user picks this item.
     */
    value: string;
    'data-test-id'?: string;
} & (
    | {
          /**
           * The plain-text label for this option. Required when `children` is a custom component
           * so the select can display and filter by text.
           */
          label: string;
          /**
           * Custom content rendered inside the option.
           * When omitted, the `label` text is displayed instead.
           */
          children?: ReactNode;
      }
    | {
          label?: string;
          /**
           * The text content for this option. When passed as a string,
           * it doubles as both the label and the display content.
           */
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
     * The group's options. Nest `Select.Item` components here.
     */
    children: ReactNode;
    /**
     * A unique identifier for this group, used internally to track option membership.
     */
    groupId: string;
    /**
     * An optional visible heading displayed above the group's options — e.g., "Recently used."
     */
    heading?: string;
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
