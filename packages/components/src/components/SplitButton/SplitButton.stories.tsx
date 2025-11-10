/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCaretDown, IconDotsVertical, IconIcon, IconPlus } from '@frontify/fondue-icons';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import { Button } from '../Button/Button';
import { Dropdown } from '../Dropdown/Dropdown';

import { SplitButton } from './SplitButton';

type Story = StoryObj<typeof SplitButton>;

const meta: Meta<typeof SplitButton> = {
    title: 'Components/Split Button',
    component: SplitButton,
    subcomponents: {
        'SplitButton.Content': SplitButton.Content,
        'SplitButton.Action': SplitButton.Action,
    },
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'in_development',
        },
    },
    args: {
        variant: 'default',
        emphasis: 'strong',
        size: 'medium',
        disabled: false,
    },
};
export default meta;

export const Default: Story = {
    render: (args) => (
        <SplitButton {...args}>
            <SplitButton.Content onPress={action('primary-action')}>Primary Action</SplitButton.Content>
            <SplitButton.Action>
                <Dropdown.Root>
                    <Dropdown.Trigger asChild>
                        <Button variant={args.variant} emphasis={args.emphasis} size={args.size} aspect="square">
                            <IconCaretDown size={16} />
                        </Button>
                    </Dropdown.Trigger>
                    <Dropdown.Content align="end">
                        <Dropdown.Item onSelect={action('option-1')}>Option 1</Dropdown.Item>
                        <Dropdown.Item onSelect={action('option-2')}>Option 2</Dropdown.Item>
                        <Dropdown.Item onSelect={action('option-3')}>Option 3</Dropdown.Item>
                    </Dropdown.Content>
                </Dropdown.Root>
            </SplitButton.Action>
        </SplitButton>
    ),
};

export const WithIcon: Story = {
    render: (args) => (
        <SplitButton {...args}>
            <SplitButton.Content onPress={action('add')}>
                <IconPlus size={16} />
                Add Item
            </SplitButton.Content>
            <SplitButton.Action>
                <Dropdown.Root>
                    <Dropdown.Trigger asChild>
                        <Button variant={args.variant} emphasis={args.emphasis} size={args.size} aspect="square">
                            <IconCaretDown size={16} />
                        </Button>
                    </Dropdown.Trigger>
                    <Dropdown.Content align="end">
                        <Dropdown.Item onSelect={action('add-file')}>Add File</Dropdown.Item>
                        <Dropdown.Item onSelect={action('add-folder')}>Add Folder</Dropdown.Item>
                        <Dropdown.Item onSelect={action('add-link')}>Add Link</Dropdown.Item>
                    </Dropdown.Content>
                </Dropdown.Root>
            </SplitButton.Action>
        </SplitButton>
    ),
};

export const AllVariants: Story = {
    render: (args) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <SplitButton {...args} variant="default">
                <SplitButton.Content onPress={action('default')}>Default</SplitButton.Content>
                <SplitButton.Action>
                    <Dropdown.Root>
                        <Dropdown.Trigger asChild>
                            <Button variant="default" emphasis={args.emphasis} size={args.size} aspect="square">
                                <IconCaretDown size={16} />
                            </Button>
                        </Dropdown.Trigger>
                        <Dropdown.Content align="end">
                            <Dropdown.Item onSelect={action('option-1')}>Option 1</Dropdown.Item>
                            <Dropdown.Item onSelect={action('option-2')}>Option 2</Dropdown.Item>
                        </Dropdown.Content>
                    </Dropdown.Root>
                </SplitButton.Action>
            </SplitButton>

            <SplitButton {...args} variant="positive">
                <SplitButton.Content onPress={action('positive')}>Positive</SplitButton.Content>
                <SplitButton.Action>
                    <Dropdown.Root>
                        <Dropdown.Trigger asChild>
                            <Button variant="positive" emphasis={args.emphasis} size={args.size} aspect="square">
                                <IconCaretDown size={16} />
                            </Button>
                        </Dropdown.Trigger>
                        <Dropdown.Content align="end">
                            <Dropdown.Item onSelect={action('option-1')}>Option 1</Dropdown.Item>
                            <Dropdown.Item onSelect={action('option-2')}>Option 2</Dropdown.Item>
                        </Dropdown.Content>
                    </Dropdown.Root>
                </SplitButton.Action>
            </SplitButton>

            <SplitButton {...args} variant="negative">
                <SplitButton.Content onPress={action('negative')}>Negative</SplitButton.Content>
                <SplitButton.Action>
                    <Dropdown.Root>
                        <Dropdown.Trigger asChild>
                            <Button variant="negative" emphasis={args.emphasis} size={args.size} aspect="square">
                                <IconCaretDown size={16} />
                            </Button>
                        </Dropdown.Trigger>
                        <Dropdown.Content align="end">
                            <Dropdown.Item onSelect={action('option-1')}>Option 1</Dropdown.Item>
                            <Dropdown.Item onSelect={action('option-2')}>Option 2</Dropdown.Item>
                        </Dropdown.Content>
                    </Dropdown.Root>
                </SplitButton.Action>
            </SplitButton>

            <SplitButton {...args} variant="danger">
                <SplitButton.Content onPress={action('danger')}>Danger</SplitButton.Content>
                <SplitButton.Action>
                    <Dropdown.Root>
                        <Dropdown.Trigger asChild>
                            <Button variant="danger" emphasis={args.emphasis} size={args.size} aspect="square">
                                <IconCaretDown size={16} />
                            </Button>
                        </Dropdown.Trigger>
                        <Dropdown.Content align="end">
                            <Dropdown.Item onSelect={action('option-1')}>Option 1</Dropdown.Item>
                            <Dropdown.Item onSelect={action('option-2')}>Option 2</Dropdown.Item>
                        </Dropdown.Content>
                    </Dropdown.Root>
                </SplitButton.Action>
            </SplitButton>

            <SplitButton {...args} variant="loud">
                <SplitButton.Content onPress={action('loud')}>Loud</SplitButton.Content>
                <SplitButton.Action>
                    <Dropdown.Root>
                        <Dropdown.Trigger asChild>
                            <Button variant="loud" emphasis={args.emphasis} size={args.size} aspect="square">
                                <IconCaretDown size={16} />
                            </Button>
                        </Dropdown.Trigger>
                        <Dropdown.Content align="end">
                            <Dropdown.Item onSelect={action('option-1')}>Option 1</Dropdown.Item>
                            <Dropdown.Item onSelect={action('option-2')}>Option 2</Dropdown.Item>
                        </Dropdown.Content>
                    </Dropdown.Root>
                </SplitButton.Action>
            </SplitButton>
        </div>
    ),
};

export const AllEmphasis: Story = {
    render: (args) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <SplitButton {...args} emphasis="strong">
                <SplitButton.Content onPress={action('strong')}>Strong</SplitButton.Content>
                <SplitButton.Action>
                    <Dropdown.Root>
                        <Dropdown.Trigger asChild>
                            <Button variant={args.variant} emphasis="strong" size={args.size} aspect="square">
                                <IconCaretDown size={16} />
                            </Button>
                        </Dropdown.Trigger>
                        <Dropdown.Content align="end">
                            <Dropdown.Item onSelect={action('option-1')}>Option 1</Dropdown.Item>
                            <Dropdown.Item onSelect={action('option-2')}>Option 2</Dropdown.Item>
                        </Dropdown.Content>
                    </Dropdown.Root>
                </SplitButton.Action>
            </SplitButton>

            <SplitButton {...args} emphasis="default">
                <SplitButton.Content onPress={action('default')}>Default</SplitButton.Content>
                <SplitButton.Action>
                    <Dropdown.Root>
                        <Dropdown.Trigger asChild>
                            <Button variant={args.variant} emphasis="default" size={args.size} aspect="square">
                                <IconCaretDown size={16} />
                            </Button>
                        </Dropdown.Trigger>
                        <Dropdown.Content align="end">
                            <Dropdown.Item onSelect={action('option-1')}>Option 1</Dropdown.Item>
                            <Dropdown.Item onSelect={action('option-2')}>Option 2</Dropdown.Item>
                        </Dropdown.Content>
                    </Dropdown.Root>
                </SplitButton.Action>
            </SplitButton>

            <SplitButton {...args} emphasis="weak">
                <SplitButton.Content onPress={action('weak')}>Weak</SplitButton.Content>
                <SplitButton.Action>
                    <Dropdown.Root>
                        <Dropdown.Trigger asChild>
                            <Button variant={args.variant} emphasis="weak" size={args.size} aspect="square">
                                <IconCaretDown size={16} />
                            </Button>
                        </Dropdown.Trigger>
                        <Dropdown.Content align="end">
                            <Dropdown.Item onSelect={action('option-1')}>Option 1</Dropdown.Item>
                            <Dropdown.Item onSelect={action('option-2')}>Option 2</Dropdown.Item>
                        </Dropdown.Content>
                    </Dropdown.Root>
                </SplitButton.Action>
            </SplitButton>
        </div>
    ),
};

export const AllSizes: Story = {
    render: (args) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
            <SplitButton {...args} size="small">
                <SplitButton.Content onPress={action('small')}>Small</SplitButton.Content>
                <SplitButton.Action>
                    <Dropdown.Root>
                        <Dropdown.Trigger asChild>
                            <Button variant={args.variant} emphasis={args.emphasis} size="small" aspect="square">
                                <IconCaretDown size={12} />
                            </Button>
                        </Dropdown.Trigger>
                        <Dropdown.Content align="end">
                            <Dropdown.Item onSelect={action('option-1')}>Option 1</Dropdown.Item>
                            <Dropdown.Item onSelect={action('option-2')}>Option 2</Dropdown.Item>
                        </Dropdown.Content>
                    </Dropdown.Root>
                </SplitButton.Action>
            </SplitButton>

            <SplitButton {...args} size="medium">
                <SplitButton.Content onPress={action('medium')}>Medium</SplitButton.Content>
                <SplitButton.Action>
                    <Dropdown.Root>
                        <Dropdown.Trigger asChild>
                            <Button variant={args.variant} emphasis={args.emphasis} size="medium" aspect="square">
                                <IconCaretDown size={16} />
                            </Button>
                        </Dropdown.Trigger>
                        <Dropdown.Content align="end">
                            <Dropdown.Item onSelect={action('option-1')}>Option 1</Dropdown.Item>
                            <Dropdown.Item onSelect={action('option-2')}>Option 2</Dropdown.Item>
                        </Dropdown.Content>
                    </Dropdown.Root>
                </SplitButton.Action>
            </SplitButton>

            <SplitButton {...args} size="large">
                <SplitButton.Content onPress={action('large')}>Large</SplitButton.Content>
                <SplitButton.Action>
                    <Dropdown.Root>
                        <Dropdown.Trigger asChild>
                            <Button variant={args.variant} emphasis={args.emphasis} size="large" aspect="square">
                                <IconCaretDown size={20} />
                            </Button>
                        </Dropdown.Trigger>
                        <Dropdown.Content align="end">
                            <Dropdown.Item onSelect={action('option-1')}>Option 1</Dropdown.Item>
                            <Dropdown.Item onSelect={action('option-2')}>Option 2</Dropdown.Item>
                        </Dropdown.Content>
                    </Dropdown.Root>
                </SplitButton.Action>
            </SplitButton>
        </div>
    ),
};

export const Disabled: Story = {
    args: {
        disabled: true,
    },
    render: (args) => (
        <SplitButton {...args}>
            <SplitButton.Content onPress={action('disabled')}>Disabled Action</SplitButton.Content>
            <SplitButton.Action>
                <Dropdown.Root>
                    <Dropdown.Trigger asChild>
                        <Button
                            variant={args.variant}
                            emphasis={args.emphasis}
                            size={args.size}
                            aspect="square"
                            disabled
                        >
                            <IconCaretDown size={16} />
                        </Button>
                    </Dropdown.Trigger>
                    <Dropdown.Content align="end">
                        <Dropdown.Item onSelect={action('option-1')}>Option 1</Dropdown.Item>
                        <Dropdown.Item onSelect={action('option-2')}>Option 2</Dropdown.Item>
                    </Dropdown.Content>
                </Dropdown.Root>
            </SplitButton.Action>
        </SplitButton>
    ),
};

export const AlternativeIcon: Story = {
    render: (args) => (
        <SplitButton {...args}>
            <SplitButton.Content onPress={action('primary')}>More Actions</SplitButton.Content>
            <SplitButton.Action rotateIcon={false}>
                <Dropdown.Root>
                    <Dropdown.Trigger asChild>
                        <Button variant={args.variant} emphasis={args.emphasis} size={args.size} aspect="square">
                            <IconDotsVertical size={16} />
                        </Button>
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
        </SplitButton>
    ),
};

export const ComplexMenu: Story = {
    render: (args) => (
        <SplitButton {...args}>
            <SplitButton.Content onPress={action('save')}>Save</SplitButton.Content>
            <SplitButton.Action>
                <Dropdown.Root>
                    <Dropdown.Trigger asChild>
                        <Button variant={args.variant} emphasis={args.emphasis} size={args.size} aspect="square">
                            <IconCaretDown size={16} />
                        </Button>
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
        </SplitButton>
    ),
};
