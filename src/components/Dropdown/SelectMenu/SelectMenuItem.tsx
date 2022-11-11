/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useFocusRing } from '@react-aria/focus';
import { useOption } from '@react-aria/listbox';
import { mergeProps } from '@react-aria/utils';
import { ListState } from '@react-stately/list';
import { Node } from '@react-types/shared';
import { FOCUS_STYLE_INSET } from '@utilities/focusStyle';
import { merge } from '@utilities/merge';
import React, { FC, useRef } from 'react';
import { MenuItem } from '../../MenuItem';
import { MenuItemType } from './SelectMenu';

type SelectMenuItemProps = {
    state: ListState<object>;
    menuItem: MenuItemType;
    node: Node<object>;
};

export const SelectMenuItem: FC<SelectMenuItemProps> = ({ state, menuItem, node }) => {
    const ref = useRef<HTMLLIElement | null>(null);
    const { optionProps, isSelected } = useOption(
        {
            key: node.key,
            shouldFocusOnHover: false,
        },
        state,
        ref,
    );

    const { title, decorator, subtitle, size, style, disabled, selectionIndicator } = menuItem;
    const { isFocusVisible, focusProps } = useFocusRing();

    return (
        <li
            {...mergeProps(optionProps, focusProps)}
            data-test-id="menu-item"
            className={merge([
                'tw-relative hover:tw-bg-box-neutral-hover tw-list-none tw-outline-none',
                disabled && 'tw-pointer-events-none tw-top-px',
                isFocusVisible && FOCUS_STYLE_INSET,
            ])}
            ref={ref}
        >
            <MenuItem
                title={title}
                decorator={decorator}
                subtitle={subtitle}
                size={size}
                style={style}
                disabled={disabled}
                active={isSelected}
                selectionIndicator={selectionIndicator}
            />
        </li>
    );
};
