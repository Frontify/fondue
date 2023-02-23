/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { MenuItem } from '@components/MenuItem';
import { Menu, MenuProps } from './Menu';
import {
    BASIC_MENU_WITH_LINKS_CODE_SNIPPET,
    BASIC_MENU_WITH_ONCLICK_CODE_SNIPPET,
    BasicMenuComponent,
    COMPONENT_STRUCTURE_CODE_SNIPPET,
    ITEMS,
    ITEMS_WITH_LINKS,
    Item,
} from './utils/componentMocks';

export default {
    title: 'Components/Menu',
    component: Menu,
    tags: ['autodocs'],
} as Meta<MenuProps>;

const TemplateWithoutTrigger: StoryFn = () => (
    <div className="tw-p-4">
        <Menu>
            <MenuItem link="https://www.frontify.com">Item 1</MenuItem>
            <MenuItem link="https://www.frontify.com">Item 2</MenuItem>
            <MenuItem link="https://www.frontify.com">Item 3</MenuItem>
        </Menu>
    </div>
);
const Template: StoryFn<MenuProps & { items: Item[] }> = (args) => <BasicMenuComponent {...args} />;

export const ComponentStructure = TemplateWithoutTrigger.bind({});
ComponentStructure.args = {
    items: ITEMS,
};
ComponentStructure.parameters = {
    docs: {
        source: {
            code: COMPONENT_STRUCTURE_CODE_SNIPPET,
            language: 'tsx',
        },
    },
};

export const BasicMenu = Template.bind({});
BasicMenu.args = {
    open: true,
    items: ITEMS,
};
BasicMenu.parameters = {
    docs: {
        source: {
            code: BASIC_MENU_WITH_ONCLICK_CODE_SNIPPET,
            language: 'tsx',
        },
    },
};

export const BasicMenuWithLinks = Template.bind({});
BasicMenuWithLinks.args = {
    items: ITEMS_WITH_LINKS,
};
BasicMenuWithLinks.parameters = {
    docs: {
        source: {
            code: BASIC_MENU_WITH_LINKS_CODE_SNIPPET,
            language: 'tsx',
        },
    },
};
