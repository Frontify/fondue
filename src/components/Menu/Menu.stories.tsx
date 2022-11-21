/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Menu, MenuProps } from './Menu';
import { BasicMenuComponent, ITEMS, ITEMS_WITH_LINKS, Item, NoTriggerMenuComponent } from './utils/componentMocks';

export default {
    title: 'Components/Menu',
    component: Menu,
} as Meta<MenuProps>;

const TemplateWithoutTrigger: Story<MenuProps & { items: Item[] }> = (args) => (
    <div className="tw-p-4">
        <NoTriggerMenuComponent {...args} />
    </div>
);
const Template: Story<MenuProps & { items: Item[] }> = (args) => <BasicMenuComponent {...args} />;

export const BasicMenu = Template.bind({});
BasicMenu.args = {
    open: true,
    items: ITEMS,
};

export const BasicMenuWithLinks = Template.bind({});
BasicMenuWithLinks.args = {
    items: ITEMS_WITH_LINKS,
};

export const MenuWithoutTrigger = TemplateWithoutTrigger.bind({});
MenuWithoutTrigger.args = {
    items: ITEMS,
};
