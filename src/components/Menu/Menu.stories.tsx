/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { useRef, useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { Menu, MenuProps } from './Menu';
import { MenuItem } from '@components/MenuItem';
import { Button } from '@components/Button';

export default {
    title: 'Components/Menu',
    component: Menu,
} as Meta<MenuProps>;

interface Item {
    label: string;
    link?: string;
    onClick?: () => void;
}
const ITEMS: Item[] = [
    {
        label: 'Item 1',
        onClick: () => void 0,
    },
    {
        label: 'Item 2',
        onClick: () => void 0,
    },
    {
        label: 'Item 3',
        onClick: () => void 0,
    },
];

const ITEMS_WITH_LINKS: Item[] = [
    {
        label: 'Item 1',
        link: 'http://www.frontify.com',
    },
    {
        label: 'Item 2',
        link: 'http://www.frontify.com',
    },
    {
        label: 'Item 3',
        link: 'http://www.frontify.com',
    },
];

const BasicMenuComponent = (props: MenuProps & { items: Item[] }) => {
    const triggerRef = useRef<HTMLButtonElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleTriggerClick = () => {
        setIsMenuOpen((isOpen) => !isOpen);
    };

    const handleOnClose = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
            <Button ref={triggerRef} onClick={handleTriggerClick}>
                Open menu
            </Button>
            <Menu {...props} triggerRef={triggerRef} open={isMenuOpen} onClose={handleOnClose}>
                {props.items.map((item, index) => (
                    <MenuItem link={item.link} onClick={item.onClick} key={`item-${index}`}>
                        {item.label}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

const Template: Story<MenuProps & { items: Item[] }> = (args) => <BasicMenuComponent {...args} />;

export const BasicMenu = Template.bind({});
BasicMenu.args = {
    open: true,
    items: ITEMS,
};

export const BasicMenuWithLinks = Template.bind({});
BasicMenuWithLinks.args = {
    // open: true,
    items: ITEMS_WITH_LINKS,
};
