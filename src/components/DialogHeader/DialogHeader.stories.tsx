/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { DialogHeader, DialogHeaderProps, DialogHeaderSize } from './DialogHeader';

export default {
    title: 'Components/DialogHeader',
    component: DialogHeader,
    args: {
        title: 'Collaborator Settings',
        size: DialogHeaderSize.Large,
        collapseBottom: false,
        close: true,
        onClose: () => console.log('close'),
    },
} as Meta<DialogHeaderProps>;

const Template: StoryFn<DialogHeaderProps> = (args) => <DialogHeader {...args} />;

export const Default = Template.bind({});

Default.args = {};
