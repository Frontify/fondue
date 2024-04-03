/* (c) Copyright Frontify Ltd., all rights reserved. */

import { action } from '@storybook/addon-actions';
import { type Meta, type StoryFn } from '@storybook/react';

import { Badge, BadgeStyle } from '@components/Badge';
import IconIcon24 from '@foundation/Icon/Generated/IconIcon24';

import { DIALOG_PADDING, type DialogHeaderProps } from '../../types';

import { DialogHeader as DialogHeaderComponent } from './DialogHeader';

export default {
    title: 'Experimental/DialogHeader',
    component: DialogHeaderComponent,
    tags: ['autodocs'],
    args: {
        title: 'Collaborator Settings',
        padding: 'comfortable',
        separator: true,
        onClose: action('click'),
    },
    argTypes: {
        padding: {
            options: DIALOG_PADDING,
            control: { type: 'select' },
        },
        separator: {
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
    icon: <IconIcon24 />,
};

export const WithIconAndBadgeAndCustomContent: StoryFn<DialogHeaderProps> = (args) => (
    <DialogHeaderComponent {...args} />
);

export const WithNoSeparator: StoryFn<DialogHeaderProps> = (args) => <DialogHeaderComponent {...args} />;

WithNoSeparator.args = {
    separator: false,
};
export const WithNoCloseButton: StoryFn<DialogHeaderProps> = (args) => <DialogHeaderComponent {...args} />;

WithNoCloseButton.args = {
    onClose: undefined,
};

WithIconAndBadgeAndCustomContent.args = {
    badge: <Badge style={BadgeStyle.Positive}>Badge</Badge>,
    icon: <IconIcon24 />,
    children: (
        <div className="tw-flex tw-justify-end">
            <p className="tw-text-box-negative-strong">Some extra content, feel free to add what you wish</p>
        </div>
    ),
};
