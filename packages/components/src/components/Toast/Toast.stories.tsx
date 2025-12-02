/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconLightning } from '@frontify/fondue-icons';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import { Button } from '../Button/Button';

import { Toast, ToastAction } from './Toast';

type Story = StoryObj<typeof Toast>;
const meta: Meta<typeof Toast> = {
    title: 'Components/Toast',
    component: Toast,
    subcomponents: {
        'Toast.Action': ToastAction,
    },
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'in_progress',
        },
    },
    args: {
        dismissible: false,
    },
};
export default meta;

export const Default: Story = {
    render: (args) => <Toast {...args}>Toast message text goes here</Toast>,
};

export const WithIcon: Story = {
    render: (args) => (
        <Toast {...args} icon={<IconLightning size={16} />}>
            Toast message text goes here
        </Toast>
    ),
};

export const WithButton: Story = {
    args: { onAction: action('onAction') },
    render: (args) => <Toast {...args}>Toast message text goes here</Toast>,
};

export const WithIconAndButton: Story = {
    args: { onAction: action('onAction') },
    render: (args) => (
        <Toast {...args} icon={<IconLightning size={16} />}>
            Toast message text goes here
        </Toast>
    ),
};

export const WithDismiss: Story = {
    args: { dismissible: true, onDismiss: action('onDismiss') },
    render: (args) => <Toast {...args}>Toast message text goes here</Toast>,
};

export const WithIconAndDismiss: Story = {
    args: { dismissible: true, onDismiss: action('onDismiss') },
    render: (args) => (
        <Toast {...args} icon={<IconLightning size={16} />}>
            Toast message text goes here
        </Toast>
    ),
};

export const WithButtonAndDismiss: Story = {
    args: { onAction: action('onAction'), dismissible: true, onDismiss: action('onDismiss') },
    render: (args) => <Toast {...args}>Toast message text goes here</Toast>,
};

export const WithIconButtonAndDismiss: Story = {
    args: { onAction: action('onAction'), dismissible: true, onDismiss: action('onDismiss') },
    render: (args) => (
        <Toast {...args} icon={<IconLightning size={16} />}>
            Toast message text goes here
        </Toast>
    ),
};

export const WithShortcut: Story = {
    args: { shortcut: '^Z' },
    render: (args) => <Toast {...args}>Toast message text goes here</Toast>,
};

export const WithShortcutAndDismiss: Story = {
    args: { shortcut: '^Z', dismissible: true, onDismiss: action('onDismiss') },
    render: (args) => <Toast {...args}>Toast message text goes here</Toast>,
};

export const WithIconAndShortcut: Story = {
    args: { shortcut: '^Z' },
    render: (args) => (
        <Toast {...args} icon={<IconLightning size={16} />}>
            Toast message text goes here
        </Toast>
    ),
};

export const WithIconShortcutAndDismiss: Story = {
    args: { shortcut: '^Z', dismissible: true, onDismiss: action('onDismiss') },
    render: (args) => (
        <Toast {...args} icon={<IconLightning size={16} />}>
            Toast message text goes here
        </Toast>
    ),
};

export const WithButtonAndShortcut: Story = {
    args: { onAction: action('onAction'), shortcut: '^Z' },
    render: (args) => <Toast {...args}>Toast message text goes here</Toast>,
};

export const WithButtonShortcutAndDismiss: Story = {
    args: { onAction: action('onAction'), shortcut: '^Z', dismissible: true, onDismiss: action('onDismiss') },
    render: (args) => <Toast {...args}>Toast message text goes here</Toast>,
};

export const AllFeatures: Story = {
    args: { onAction: action('onAction'), shortcut: '^Z', dismissible: true, onDismiss: action('onDismiss') },
    render: (args) => (
        <Toast {...args} icon={<IconLightning size={16} />}>
            Toast message text goes here
        </Toast>
    ),
};

export const CustomActionLabel: Story = {
    args: { onAction: action('onAction'), actionLabel: 'Restore' },
    render: (args) => <Toast {...args}>Item deleted</Toast>,
};

export const LongMessage: Story = {
    args: { onAction: action('onAction'), dismissible: true, onDismiss: action('onDismiss') },
    render: (args) => (
        <Toast {...args} icon={<IconLightning size={16} />}>
            This is a much longer toast message that demonstrates how the component handles text that wraps to multiple
            lines. The layout should remain consistent and readable.
        </Toast>
    ),
};

export const WithCustomActionSlot: Story = {
    render: () => (
        <Toast.Root icon={<IconLightning size={16} />}>
            Message saved successfully
            <Toast.Action>
                <Button size="small" emphasis="weak" onPress={action('undo')}>
                    Undo
                </Button>
            </Toast.Action>
        </Toast.Root>
    ),
};

export const WithMultipleCustomActions: Story = {
    render: () => (
        <Toast.Root icon={<IconLightning size={16} />}>
            Message saved successfully
            <Toast.Action>
                <Button size="small" emphasis="weak" onPress={action('undo')}>
                    Undo
                </Button>
                <Button size="small" emphasis="weak" onPress={action('dismiss')}>
                    Dismiss
                </Button>
            </Toast.Action>
        </Toast.Root>
    ),
};

export const WithCustomActionAndShortcut: Story = {
    render: () => (
        <Toast.Root icon={<IconLightning size={16} />}>
            Message deleted
            <Toast.Action>
                <span style={{ fontSize: 'var(--body-size-xsmall)', opacity: 0.8 }}>⌘Z</span>
                <Button size="small" emphasis="weak" onPress={action('restore')}>
                    Restore
                </Button>
            </Toast.Action>
        </Toast.Root>
    ),
};
