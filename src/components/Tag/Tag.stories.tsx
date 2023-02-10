/* (c) Copyright Frontify Ltd., all rights reserved. */

import { action } from '@storybook/addon-actions';
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { Tag, TagProps, TagSize, TagType } from './Tag';

export default {
    title: 'Components/Tag',
    component: Tag,
    tags: ['autodocs'],
    args: {
        label: 'Label',
        size: TagSize.Medium,
    },
    argTypes: {
        type: {
            options: Object.keys(TagType),
            control: { type: 'select' },
        },
        size: {
            options: Object.keys(TagSize),
            control: { type: 'select' },
        },
    },
} as Meta<TagProps>;

const TagTemplate: StoryFn<TagProps> = (args: TagProps) => <Tag {...args} />;

export const Suggested = TagTemplate.bind({});
Suggested.args = {
    type: TagType.Suggested,
};

export const Selected = TagTemplate.bind({});
Selected.args = {
    type: TagType.Selected,
    onClick: action('onClick'),
};

export const SelectedWithFocus = TagTemplate.bind({});
SelectedWithFocus.args = {
    type: TagType.SelectedWithFocus,
    onClick: action('onClick'),
};

export const PreviouslySelected = TagTemplate.bind({});
PreviouslySelected.args = {
    type: TagType.PreviouslySelected,
};
