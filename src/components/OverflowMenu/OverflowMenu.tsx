/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { MouseEvent, useRef, useState } from 'react';
import { IconDotsHorizontal } from '@foundation/Icon';
import { merge } from '@utilities/merge';
import { FOCUS_VISIBLE_STYLE } from '@utilities/focusStyle';
import { Menu } from '@components/Menu';
import { MenuItem } from '@components/MenuItem';

export interface OverflowMenuItemProps {
    id?: string;
    label: string;
    link?: string;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
}

export interface OverflowMenuProps {
    items: OverflowMenuItemProps[];
}

export const OverflowMenu = ({ items }: OverflowMenuProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuOpenerRef = useRef<HTMLButtonElement>(null);

    return (
        <div data-test-id="overflow-menu" className="tw-relative tw-bottom-0 tw-top-0 tw-flex">
            <button
                aria-haspopup="true"
                aria-expanded={isMenuOpen}
                aria-label="Open overflow menu"
                ref={menuOpenerRef}
                className={merge([
                    'tw-w-6 tw-h-6 hover:tw-bg-box-neutral-strong-inverse-hover tw-rounded tw-flex tw-justify-center tw-items-center',
                    isMenuOpen ? 'tw-bg-box-neutral-strong-inverse-pressed' : 'tw-bg-box-neutral-strong-inverse',
                    FOCUS_VISIBLE_STYLE,
                ])}
                type="button"
                onClick={() => {
                    setIsMenuOpen(!isMenuOpen);
                }}
            >
                <IconDotsHorizontal />
            </button>
            <Menu triggerRef={menuOpenerRef} onClose={() => setIsMenuOpen(false)} open={isMenuOpen}>
                {items.map((item, index) => (
                    <MenuItem link={item.link} onClick={item.onClick} key={`overflow-menu-item-${index}`}>
                        {item.label}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};
