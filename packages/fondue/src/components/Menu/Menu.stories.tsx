/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryFn } from '@storybook/react-vite';

import { Menu, type MenuProps } from './Menu';
import {
    BASIC_MENU_WITH_LINKS_CODE_SNIPPET,
    BASIC_MENU_WITH_ONCLICK_CODE_SNIPPET,
    BasicMenuComponent,
    COMPONENT_STRUCTURE_CODE_SNIPPET,
    ComponentStructure,
    ITEMS,
    ITEMS_WITH_LINKS,
    type Item,
} from './utils/componentMocks';

/**
 ### This component is deprecated, please use the [new Dropdown component](/docs/current_components-dropdown--documentation) instead.
 */
export default {
    title: 'Components/Menu',
    component: Menu,
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'deprecated',
        },
    },
} as Meta<MenuProps>;

const TemplateWithoutTrigger: StoryFn = () => (
    <div className="tw-p-4">
        <ComponentStructure />
    </div>
);
const Template: StoryFn<MenuProps & { items: Item[] }> = (args) => <BasicMenuComponent {...args} />;

export const BasicComponentStructure = TemplateWithoutTrigger.bind({});
BasicComponentStructure.args = {
    items: ITEMS,
};
BasicComponentStructure.parameters = {
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
