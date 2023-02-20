/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Menu, MenuProps } from './Menu';
import {
    BASIC_MENU_WITH_LINKS_CODE_SNIPPET,
    BASIC_MENU_WITH_ONCLICK_CODE_SNIPPET,
    BasicMenuComponent,
    ITEMS,
    ITEMS_WITH_LINKS,
    Item,
    MENU_WITHOUT_TRIGGER_CODE_SNIPPET,
    NoTriggerMenuComponent,
} from './utils/componentMocks';

export default {
    title: 'Components/Menu',
    component: Menu,
    tags: ['autodocs'],
} as Meta<MenuProps>;

const TemplateWithoutTrigger: StoryFn<MenuProps & { items: Item[] }> = (args) => (
    <div className="tw-p-4">
        <NoTriggerMenuComponent {...args} />
    </div>
);
const Template: StoryFn<MenuProps & { items: Item[] }> = (args) => <BasicMenuComponent {...args} />;

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

export const MenuWithoutTrigger = TemplateWithoutTrigger.bind({});
MenuWithoutTrigger.args = {
    items: ITEMS,
};
MenuWithoutTrigger.parameters = {
    docs: {
        source: {
            code: MENU_WITHOUT_TRIGGER_CODE_SNIPPET,
            language: 'tsx',
        },
    },
};
