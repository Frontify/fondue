/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MouseEvent, useRef, useState } from 'react';
import IconDotsHorizontal from '@foundation/Icon/Generated/IconDotsHorizontal';
import { merge } from '@utilities/merge';
import { FOCUS_VISIBLE_STYLE } from '@utilities/focusStyle';
import { Menu } from '@components/Menu';
import { MenuItem } from '@components/MenuItem';
import { useFocusRing } from '@react-aria/focus';

export interface OverflowMenuItemProps {
    id?: string;
    label: string;
    link?: string;
    onClick?: <T extends HTMLAnchorElement | HTMLButtonElement>(event: MouseEvent<T>) => void;
    disabled?: boolean;
}

export interface OverflowMenuProps {
    items: OverflowMenuItemProps[];
    'data-test-id'?: string;
}

export const OverflowMenu = ({ items, 'data-test-id': dataTestId = 'overflow-menu' }: OverflowMenuProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuOpenerRef = useRef<HTMLButtonElement>(null);
    const { isFocusVisible, focusProps } = useFocusRing();

    const handleClose = () => {
        menuOpenerRef.current?.focus();
        setIsMenuOpen(false);
    };
    return (
        <div data-test-id={dataTestId} className="tw-relative tw-bottom-0 tw-top-0 tw-flex">
            <button
                aria-haspopup="true"
                aria-expanded={isMenuOpen}
                aria-label="Open overflow menu"
                ref={menuOpenerRef}
                className={merge([
                    'tw-w-6 tw-h-6 hover:tw-bg-box-neutral-strong-inverse-hover tw-rounded tw-flex tw-justify-center tw-items-center',
                    isMenuOpen ? 'tw-bg-box-neutral-strong-inverse-pressed' : 'tw-bg-box-neutral-strong-inverse',
                    isFocusVisible && FOCUS_VISIBLE_STYLE,
                ])}
                type="button"
                onClick={() => {
                    setIsMenuOpen(!isMenuOpen);
                }}
                {...focusProps}
            >
                <IconDotsHorizontal />
            </button>
            <Menu triggerRef={menuOpenerRef} onClose={handleClose} open={isMenuOpen}>
                {items.map((item, index) => (
                    <MenuItem link={item.link} onClick={item.onClick} key={`overflow-menu-item-${index}`}>
                        {item.label}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};
OverflowMenu.displayName = 'FondueOverflowMenu';
