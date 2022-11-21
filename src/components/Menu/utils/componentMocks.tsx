/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { useRef, useState } from 'react';
import { Menu, MenuProps } from '../Menu';
import { MenuItem } from '@components/MenuItem';
import { Button } from '@components/Button';

export interface Item {
    label: string;
    link?: string;
    onClick?: () => void;
    disabled?: boolean;
}
export const ITEMS: Item[] = [
    { label: 'Button Item 1', onClick: () => void 0 },
    { label: 'Button Item 2', onClick: () => void 0 },
    { label: 'Button Item 3', onClick: () => void 0 },
];

export const ITEMS_WITH_LINKS: Item[] = [
    { label: 'Some first label', link: '/some-first-link' },
    { label: 'Some second label', link: '/some-second-link' },
    { label: 'Some third label', link: '/some-third-link' },
];

export const ITEMS_WITHOUT_ITERACTION = [{ label: 'Span Item 1' }, { label: 'Span Item 2' }, { label: 'Span Item 3' }];

const getMenuItem = (item: Item, index?: number) => (
    <MenuItem link={item.link} onClick={item.onClick} disabled={item.disabled} key={`item-${index}`}>
        {item.label}
    </MenuItem>
);

export const BasicMenuComponent = (props: MenuProps & { items: Item[] }) => {
    const triggerRef = useRef<HTMLButtonElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleTriggerClick = () => {
        setIsMenuOpen((isOpen) => !isOpen);
    };

    const handleOnClose = () => {
        setIsMenuOpen(false);
    };

    return (
        <div data-test-id="menu">
            <Button ref={triggerRef} onClick={handleTriggerClick}>
                Open menu
            </Button>
            <Menu {...props} triggerRef={triggerRef} open={isMenuOpen} onClose={handleOnClose}>
                {props.items.map(getMenuItem)}
            </Menu>
        </div>
    );
};

export const NoTriggerMenuComponent = (props: MenuProps & { items: Item[] }) => {
    return (
        <div data-test-id="menu">
            <Menu {...props}>{props.items.map(getMenuItem)}</Menu>
        </div>
    );
};
