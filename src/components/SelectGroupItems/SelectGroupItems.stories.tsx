/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, StoryFn } from '@storybook/react';
import { SelectGroupItems, SelectGroupItemsProps } from './SelectGroupItems';

export default {
    title: 'Components/SelectGroupItems',
    component: SelectGroupItems,
    tags: ['autodocs'],
} as Meta<SelectGroupItemsProps>;

const Template: StoryFn<SelectGroupItemsProps> = (args) => <SelectGroupItems {...args} />;

export const Default = Template.bind({});

Default.args = {};
