/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { DialogHeader as DialogHeaderComponent } from './DialogHeader';
import { Badge, BadgeStyle } from '@components/Badge';
import { IconIcon } from '@foundation/Icon/Generated';
import { action } from '@storybook/addon-actions';
import { DIALOG_SIZE, DialogHeaderProps } from '../../types/dialog';

export default {
    title: 'Experimental/DialogHeader',
    component: DialogHeaderComponent,
    tags: ['autodocs'],
    args: {
        title: 'Collaborator Settings',
        size: 'medium',
        collapseBottom: false,
        onClose: action('click'),
    },
    argTypes: {
        size: {
            options: DIALOG_SIZE,
            control: { type: 'select' },
        },
        collapseBottom: {
            control: { type: 'boolean' },
        },
        'data-test-id': {
            type: 'string',
        },
    },
} as Meta<DialogHeaderProps>;

export const DialogHeader: StoryFn<DialogHeaderProps> = (args) => <DialogHeaderComponent {...args} />;

export const WithIconAndBadge: StoryFn<DialogHeaderProps> = (args) => <DialogHeaderComponent {...args} />;

WithIconAndBadge.args = {
    badge: <Badge style={BadgeStyle.Positive}>Badge</Badge>,
    icon: <IconIcon />,
};
