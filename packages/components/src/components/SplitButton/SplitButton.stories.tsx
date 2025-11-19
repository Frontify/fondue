/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCaretDown, IconDotsVertical, IconIcon, IconPlus } from '@frontify/fondue-icons';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import { Dropdown } from '../Dropdown/Dropdown';

import { SplitButton, SplitButtonRoot, SplitButtonContent, SplitButtonAction } from './SplitButton';

type Story = StoryObj<typeof SplitButtonRoot>;

const meta: Meta<typeof SplitButtonRoot> = {
    title: 'Components/Split Button',
    component: SplitButtonRoot,
    subcomponents: {
        'SplitButton.Content': SplitButtonContent,
        'SplitButton.Action': SplitButtonAction,
    },
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'in_development',
        },
    },
    args: {
        emphasis: 'strong',
        size: 'medium',
        disabled: false,
    },
};
export default meta;

export const Default: Story = {
    render: (args) => (
        <SplitButton.Root {...args}>
            <SplitButton.Content onPress={action('primary-action')}>Primary Action</SplitButton.Content>
            <SplitButton.Action>
                <Dropdown.Root>
                    <Dropdown.Trigger asChild>
                        <SplitButton.ActionButton aria-label="Show more options">
                            <IconCaretDown size={16} />
                        </SplitButton.ActionButton>
                    </Dropdown.Trigger>
                    <Dropdown.Content align="end">
                        <Dropdown.Item onSelect={action('option-1')}>Option 1</Dropdown.Item>
                        <Dropdown.Item onSelect={action('option-2')}>Option 2</Dropdown.Item>
                        <Dropdown.Item onSelect={action('option-3')}>Option 3</Dropdown.Item>
                    </Dropdown.Content>
                </Dropdown.Root>
            </SplitButton.Action>
        </SplitButton.Root>
    ),
};

export const WithIcon: Story = {
    render: (args) => (
        <SplitButton.Root {...args}>
            <SplitButton.Content onPress={action('add')}>
                <IconPlus size={16} />
                Add Item
            </SplitButton.Content>
            <SplitButton.Action>
                <Dropdown.Root>
                    <Dropdown.Trigger asChild>
                        <SplitButton.ActionButton>
                            <IconCaretDown size={16} />
                        </SplitButton.ActionButton>
                    </Dropdown.Trigger>
                    <Dropdown.Content align="end">
                        <Dropdown.Item onSelect={action('add-file')}>Add File</Dropdown.Item>
                        <Dropdown.Item onSelect={action('add-folder')}>Add Folder</Dropdown.Item>
                        <Dropdown.Item onSelect={action('add-link')}>Add Link</Dropdown.Item>
                    </Dropdown.Content>
                </Dropdown.Root>
            </SplitButton.Action>
        </SplitButton.Root>
    ),
};

export const AllEmphasis: Story = {
    render: (args) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <SplitButton.Root {...args} emphasis="strong">
                <SplitButton.Content onPress={action('strong')}>Strong</SplitButton.Content>
                <SplitButton.Action>
                    <Dropdown.Root>
                        <Dropdown.Trigger asChild>
                            <SplitButton.ActionButton>
                                <IconCaretDown size={16} />
                            </SplitButton.ActionButton>
                        </Dropdown.Trigger>
                        <Dropdown.Content align="end">
                            <Dropdown.Item onSelect={action('option-1')}>Option 1</Dropdown.Item>
                            <Dropdown.Item onSelect={action('option-2')}>Option 2</Dropdown.Item>
                        </Dropdown.Content>
                    </Dropdown.Root>
                </SplitButton.Action>
            </SplitButton.Root>

            <SplitButton.Root {...args} emphasis="default">
                <SplitButton.Content onPress={action('default')}>Default</SplitButton.Content>
                <SplitButton.Action>
                    <Dropdown.Root>
                        <Dropdown.Trigger asChild>
                            <SplitButton.ActionButton>
                                <IconCaretDown size={16} />
                            </SplitButton.ActionButton>
                        </Dropdown.Trigger>
                        <Dropdown.Content align="end">
                            <Dropdown.Item onSelect={action('option-1')}>Option 1</Dropdown.Item>
                            <Dropdown.Item onSelect={action('option-2')}>Option 2</Dropdown.Item>
                        </Dropdown.Content>
                    </Dropdown.Root>
                </SplitButton.Action>
            </SplitButton.Root>

            <SplitButton.Root {...args} emphasis="weak">
                <SplitButton.Content onPress={action('weak')}>Weak</SplitButton.Content>
                <SplitButton.Action>
                    <Dropdown.Root>
                        <Dropdown.Trigger asChild>
                            <SplitButton.ActionButton>
                                <IconCaretDown size={16} />
                            </SplitButton.ActionButton>
                        </Dropdown.Trigger>
                        <Dropdown.Content align="end">
                            <Dropdown.Item onSelect={action('option-1')}>Option 1</Dropdown.Item>
                            <Dropdown.Item onSelect={action('option-2')}>Option 2</Dropdown.Item>
                        </Dropdown.Content>
                    </Dropdown.Root>
                </SplitButton.Action>
            </SplitButton.Root>
        </div>
    ),
};

export const AllSizes: Story = {
    render: (args) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
            <SplitButton.Root {...args} size="small">
                <SplitButton.Content onPress={action('small')}>Small</SplitButton.Content>
                <SplitButton.Action>
                    <Dropdown.Root>
                        <Dropdown.Trigger asChild>
                            <SplitButton.ActionButton>
                                <IconCaretDown size={12} />
                            </SplitButton.ActionButton>
                        </Dropdown.Trigger>
                        <Dropdown.Content align="end">
                            <Dropdown.Item onSelect={action('option-1')}>Option 1</Dropdown.Item>
                            <Dropdown.Item onSelect={action('option-2')}>Option 2</Dropdown.Item>
                        </Dropdown.Content>
                    </Dropdown.Root>
                </SplitButton.Action>
            </SplitButton.Root>

            <SplitButton.Root {...args} size="medium">
                <SplitButton.Content onPress={action('medium')}>Medium</SplitButton.Content>
                <SplitButton.Action>
                    <Dropdown.Root>
                        <Dropdown.Trigger asChild>
                            <SplitButton.ActionButton>
                                <IconCaretDown size={16} />
                            </SplitButton.ActionButton>
                        </Dropdown.Trigger>
                        <Dropdown.Content align="end">
                            <Dropdown.Item onSelect={action('option-1')}>Option 1</Dropdown.Item>
                            <Dropdown.Item onSelect={action('option-2')}>Option 2</Dropdown.Item>
                        </Dropdown.Content>
                    </Dropdown.Root>
                </SplitButton.Action>
            </SplitButton.Root>

            <SplitButton.Root {...args} size="large">
                <SplitButton.Content onPress={action('large')}>Large</SplitButton.Content>
                <SplitButton.Action>
                    <Dropdown.Root>
                        <Dropdown.Trigger asChild>
                            <SplitButton.ActionButton>
                                <IconCaretDown size={20} />
                            </SplitButton.ActionButton>
                        </Dropdown.Trigger>
                        <Dropdown.Content align="end">
                            <Dropdown.Item onSelect={action('option-1')}>Option 1</Dropdown.Item>
                            <Dropdown.Item onSelect={action('option-2')}>Option 2</Dropdown.Item>
                        </Dropdown.Content>
                    </Dropdown.Root>
                </SplitButton.Action>
            </SplitButton.Root>
        </div>
    ),
};

export const Disabled: Story = {
    args: {
        disabled: true,
    },
    render: (args) => (
        <SplitButton.Root {...args}>
            <SplitButton.Content onPress={action('disabled')}>Disabled Action</SplitButton.Content>
            <SplitButton.Action>
                <Dropdown.Root>
                    <Dropdown.Trigger asChild>
                        <SplitButton.ActionButton aria-label="More options">
                            <IconCaretDown size={16} />
                        </SplitButton.ActionButton>
                    </Dropdown.Trigger>
                    <Dropdown.Content align="end">
                        <Dropdown.Item onSelect={action('option-1')}>Option 1</Dropdown.Item>
                        <Dropdown.Item onSelect={action('option-2')}>Option 2</Dropdown.Item>
                    </Dropdown.Content>
                </Dropdown.Root>
            </SplitButton.Action>
        </SplitButton.Root>
    ),
};

export const ContentDisabled: Story = {
    render: (args) => (
        <SplitButton.Root {...args}>
            <SplitButton.Content disabled onPress={action('primary-action')}>
                Primary Action (disabled)
            </SplitButton.Content>
            <SplitButton.Action>
                <Dropdown.Root>
                    <Dropdown.Trigger asChild>
                        <SplitButton.ActionButton aria-label="More options">
                            <IconCaretDown size={16} />
                        </SplitButton.ActionButton>
                    </Dropdown.Trigger>
                    <Dropdown.Content align="end">
                        <Dropdown.Item onSelect={action('option-1')}>Option 1</Dropdown.Item>
                        <Dropdown.Item onSelect={action('option-2')}>Option 2</Dropdown.Item>
                        <Dropdown.Item onSelect={action('option-3')}>Option 3</Dropdown.Item>
                    </Dropdown.Content>
                </Dropdown.Root>
            </SplitButton.Action>
        </SplitButton.Root>
    ),
};

export const ActionButtonDisabled: Story = {
    render: (args) => (
        <SplitButton.Root {...args}>
            <SplitButton.Content onPress={action('primary-action')}>Primary Action</SplitButton.Content>
            <SplitButton.Action>
                <Dropdown.Root>
                    <Dropdown.Trigger asChild>
                        <SplitButton.ActionButton disabled aria-label="More options (disabled)">
                            <IconCaretDown size={16} />
                        </SplitButton.ActionButton>
                    </Dropdown.Trigger>
                    <Dropdown.Content align="end">
                        <Dropdown.Item onSelect={action('option-1')}>Option 1</Dropdown.Item>
                        <Dropdown.Item onSelect={action('option-2')}>Option 2</Dropdown.Item>
                        <Dropdown.Item onSelect={action('option-3')}>Option 3</Dropdown.Item>
                    </Dropdown.Content>
                </Dropdown.Root>
            </SplitButton.Action>
        </SplitButton.Root>
    ),
};

export const AlternativeIcon: Story = {
    render: (args) => (
        <SplitButton.Root {...args}>
            <SplitButton.Content onPress={action('primary')}>More Actions</SplitButton.Content>
            <SplitButton.Action rotateIcon={false}>
                <Dropdown.Root>
                    <Dropdown.Trigger asChild>
                        <SplitButton.ActionButton>
                            <IconDotsVertical size={16} />
                        </SplitButton.ActionButton>
                    </Dropdown.Trigger>
                    <Dropdown.Content align="end">
                        <Dropdown.Item onSelect={action('edit')}>Edit</Dropdown.Item>
                        <Dropdown.Item onSelect={action('duplicate')}>Duplicate</Dropdown.Item>
                        <Dropdown.Item onSelect={action('delete')} emphasis="danger">
                            Delete
                        </Dropdown.Item>
                    </Dropdown.Content>
                </Dropdown.Root>
            </SplitButton.Action>
        </SplitButton.Root>
    ),
};

export const ComplexMenu: Story = {
    render: (args) => (
        <SplitButton.Root {...args}>
            <SplitButton.Content onPress={action('save')}>Save</SplitButton.Content>
            <SplitButton.Action>
                <Dropdown.Root>
                    <Dropdown.Trigger asChild>
                        <SplitButton.ActionButton>
                            <IconCaretDown size={16} />
                        </SplitButton.ActionButton>
                    </Dropdown.Trigger>
                    <Dropdown.Content align="end">
                        <Dropdown.Group>
                            <Dropdown.Item onSelect={action('save-and-close')}>Save and Close</Dropdown.Item>
                            <Dropdown.Item onSelect={action('save-and-new')}>Save and New</Dropdown.Item>
                            <Dropdown.Item onSelect={action('save-as')}>Save As...</Dropdown.Item>
                        </Dropdown.Group>
                        <Dropdown.Group heading="Export">
                            <Dropdown.Item onSelect={action('export-pdf')}>
                                <Dropdown.Slot name="left">
                                    <IconIcon size={16} />
                                </Dropdown.Slot>
                                Export as PDF
                            </Dropdown.Item>
                            <Dropdown.Item onSelect={action('export-json')}>
                                <Dropdown.Slot name="left">
                                    <IconIcon size={16} />
                                </Dropdown.Slot>
                                Export as JSON
                            </Dropdown.Item>
                        </Dropdown.Group>
                    </Dropdown.Content>
                </Dropdown.Root>
            </SplitButton.Action>
        </SplitButton.Root>
    ),
};
