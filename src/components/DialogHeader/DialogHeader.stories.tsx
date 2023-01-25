/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { DialogHeader as DialogHeaderComponent, DialogHeaderProps, DialogHeaderSize } from './DialogHeader';
import { BadgeStyle } from '@components/Badge';
import { IconIcon } from '@foundation/Icon';

export default {
    title: 'Components/DialogHeader',
    component: DialogHeaderComponent,
    args: {
        title: 'Collaborator Settings',
        size: DialogHeaderSize.Large,
        collapseBottom: false,
        close: true,
        onClose: () => console.log('close'),
    },
} as Meta<DialogHeaderProps>;

export const DialogHeader: StoryFn<DialogHeaderProps> = (args) => <DialogHeaderComponent {...args} />;

export const WithIconAndBadge: StoryFn<DialogHeaderProps> = (args) => <DialogHeaderComponent {...args} />;

WithIconAndBadge.args = {
    badge: {
        style: BadgeStyle.Positive,
        children: 'Badge',
    },
    icon: <IconIcon />,
};
