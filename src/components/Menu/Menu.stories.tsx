/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { useRef } from 'react';
import { Meta, Story } from '@storybook/react';
import { Menu, MenuProps } from './Menu';
import { MenuItem } from '@components/MenuItem';
import { Button } from '@components/Button';

export default {
    title: 'Components/Menu',
    component: Menu,
} as Meta<MenuProps>;

const BasicMenuComponent = (props: MenuProps) => {
    const triggerRef = useRef<HTMLButtonElement>(null);
    return (
        <>
            <Button ref={triggerRef}>Open menu</Button>
            <Menu {...props} triggerRef={triggerRef}>
                <MenuItem>Item 1</MenuItem>
                <MenuItem>Item 2</MenuItem>
                <MenuItem>Item 3</MenuItem>
            </Menu>
        </>
    );
};

const Template: Story<MenuProps> = (args) => <BasicMenuComponent {...args} />;

export const BasicMenu = Template.bind({});
BasicMenuComponent.args = {};
