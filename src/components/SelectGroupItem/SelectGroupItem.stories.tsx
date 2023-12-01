/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, StoryFn } from '@storybook/react';
import { SelectGroupItem, SelectGroupItemProps } from './SelectGroupItem';

export default {
    title: 'Components/SelectGroupItem',
    component: SelectGroupItem,
    tags: ['autodocs'],
} as Meta<SelectGroupItemProps>;

const Template: StoryFn<SelectGroupItemProps> = (args) => <SelectGroupItem {...args} />;

export const Default = Template.bind({});

Default.args = {};
