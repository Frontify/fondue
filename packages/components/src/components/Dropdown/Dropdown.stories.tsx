/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconIcon } from '@frontify/fondue-icons';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Button } from '../Button/Button';
import { Tooltip } from '../Tooltip/Tooltip';

import {
    Dropdown,
    DropdownContent,
    DropdownGroup,
    DropdownItem,
    DropdownRoot,
    DropdownSubContent,
    DropdownSubMenu,
    DropdownSubTrigger,
    DropdownTrigger,
} from './Dropdown';

type Story = StoryObj<typeof meta>;
const meta: Meta<typeof DropdownRoot> = {
    title: 'Components/Dropdown',
    component: DropdownRoot,
    subcomponents: {
        'Dropdown.Trigger': DropdownTrigger,
        'Dropdown.Content': DropdownContent,
        'Dropdown.Item': DropdownItem,
        'Dropdown.Group': DropdownGroup,
        'Dropdown.SubMenu': DropdownSubMenu,
        'Dropdown.SubTrigger': DropdownSubTrigger,
        'Dropdown.SubContent': DropdownSubContent,
    },
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'released',
        },
    },
    args: {},
};
export default meta;

export const Default: Story = {
    render: ({ ...args }) => (
        <Dropdown.Root {...args}>
            <Dropdown.Trigger>
                <Button>Trigger</Button>
            </Dropdown.Trigger>
            <Dropdown.Content>
                <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 2</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 3</Dropdown.Item>
            </Dropdown.Content>
        </Dropdown.Root>
    ),
};

export const LinkItems: Story = {
    render: ({ ...args }) => (
        <Dropdown.Root {...args}>
            <Dropdown.Trigger>
                <Button>Trigger</Button>
            </Dropdown.Trigger>
            <Dropdown.Content>
                <Dropdown.Item asChild onSelect={() => {}}>
                    <a href="https://frontify.com">
                        Link 1
                        {/* <Dropdown.Slot name="right">
                            <IconIcon size={16} />
                        </Dropdown.Slot> */}
                    </a>
                </Dropdown.Item>
                <Dropdown.Item asChild onSelect={() => {}}>
                    <a href="https://frontify.com">
                        Link 2
                        <Dropdown.Slot name="left">
                            <IconIcon size={16} />
                        </Dropdown.Slot>
                    </a>
                </Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>
                    <span>Item 3</span>
                </Dropdown.Item>
            </Dropdown.Content>
        </Dropdown.Root>
    ),
};

export const DisabledItems: Story = {
    render: ({ ...args }) => (
        <Dropdown.Root {...args}>
            <Dropdown.Trigger>
                <Button>Trigger</Button>
            </Dropdown.Trigger>
            <Dropdown.Content>
                <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}} disabled>
                    Item 2
                </Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 3</Dropdown.Item>
            </Dropdown.Content>
        </Dropdown.Root>
    ),
};

export const DangerItems: Story = {
    render: ({ ...args }) => (
        <Dropdown.Root {...args}>
            <Dropdown.Trigger>
                <Button>Trigger</Button>
            </Dropdown.Trigger>
            <Dropdown.Content>
                <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}} emphasis="danger">
                    Item 2
                    <Dropdown.Slot name="right">
                        <IconIcon size={16} />
                    </Dropdown.Slot>
                </Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 3</Dropdown.Item>
            </Dropdown.Content>
        </Dropdown.Root>
    ),
};

export const ItemGroups: Story = {
    render: ({ ...args }) => (
        <Dropdown.Root {...args}>
            <Dropdown.Trigger>
                <Button>Trigger</Button>
            </Dropdown.Trigger>
            <Dropdown.Content>
                <Dropdown.Group>
                    <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>
                    <Dropdown.Item onSelect={() => {}}>Item 2</Dropdown.Item>
                    <Dropdown.Item onSelect={() => {}}>Item 3</Dropdown.Item>
                </Dropdown.Group>
                <Dropdown.Group>
                    <Dropdown.Item onSelect={() => {}}>Item 4</Dropdown.Item>
                </Dropdown.Group>
                <Dropdown.Group>
                    <Dropdown.Item onSelect={() => {}}>Item 5</Dropdown.Item>
                </Dropdown.Group>
                <Dropdown.Group heading="hello world">
                    <Dropdown.Item onSelect={() => {}}>Item 6</Dropdown.Item>
                    <Dropdown.Item onSelect={() => {}}>Item 7</Dropdown.Item>
                    <Dropdown.Item onSelect={() => {}}>Item 8</Dropdown.Item>
                </Dropdown.Group>
            </Dropdown.Content>
        </Dropdown.Root>
    ),
};

export const MultipleGroupsWithHeadings: Story = {
    render: ({ ...args }) => (
        <Dropdown.Root {...args}>
            <Dropdown.Trigger>
                <Button>Trigger</Button>
            </Dropdown.Trigger>
            <Dropdown.Content>
                <Dropdown.Group heading="File Actions">
                    <Dropdown.Item onSelect={() => {}}>New File</Dropdown.Item>
                    <Dropdown.Item onSelect={() => {}}>Open File</Dropdown.Item>
                    <Dropdown.Item onSelect={() => {}}>Save File</Dropdown.Item>
                </Dropdown.Group>
                <Dropdown.Group heading="Edit Actions">
                    <Dropdown.Item onSelect={() => {}}>Copy</Dropdown.Item>
                    <Dropdown.Item onSelect={() => {}}>Paste</Dropdown.Item>
                    <Dropdown.Item onSelect={() => {}}>Cut</Dropdown.Item>
                </Dropdown.Group>
                <Dropdown.Group heading="View Options">
                    <Dropdown.Item onSelect={() => {}}>Zoom In</Dropdown.Item>
                    <Dropdown.Item onSelect={() => {}}>Zoom Out</Dropdown.Item>
                    <Dropdown.Item onSelect={() => {}}>Reset Zoom</Dropdown.Item>
                </Dropdown.Group>
                <Dropdown.Group heading="Settings">
                    <Dropdown.Item onSelect={() => {}}>Preferences</Dropdown.Item>
                    <Dropdown.Item onSelect={() => {}}>About</Dropdown.Item>
                </Dropdown.Group>
            </Dropdown.Content>
        </Dropdown.Root>
    ),
};

export const SubMenus: Story = {
    render: ({ ...args }) => (
        <Dropdown.Root {...args}>
            <Dropdown.Trigger>
                <Button>Trigger</Button>
            </Dropdown.Trigger>
            <Dropdown.Content>
                <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 2</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 3</Dropdown.Item>
                <Dropdown.SubMenu>
                    <Dropdown.SubTrigger>Item 4</Dropdown.SubTrigger>
                    <Dropdown.SubContent>
                        <Dropdown.Item onSelect={() => {}}>Item 4.1</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 4.2</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 4.3</Dropdown.Item>
                    </Dropdown.SubContent>
                </Dropdown.SubMenu>
                <Dropdown.Item onSelect={() => {}}>Item 5</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 6</Dropdown.Item>
            </Dropdown.Content>
        </Dropdown.Root>
    ),
};

export const OverflowingText: Story = {
    render: ({ ...args }) => (
        <Dropdown.Root {...args}>
            <Dropdown.Trigger>
                <Button>Trigger</Button>
            </Dropdown.Trigger>
            <Dropdown.Content>
                <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>
                <Dropdown.Item asChild onSelect={() => {}}>
                    <a href="https://frontify.com">
                        Link 2 - This is a very long text that overflows the element it is contained in
                        <Dropdown.Slot name="right">
                            <IconIcon size={16} />
                        </Dropdown.Slot>
                    </a>
                </Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 3</Dropdown.Item>
                <Dropdown.SubMenu>
                    <Dropdown.SubTrigger>
                        Item 4 - This is a very long text that overflows the element it is contained in
                    </Dropdown.SubTrigger>
                    <Dropdown.SubContent>
                        <Dropdown.Item onSelect={() => {}}>Item 4.1</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>
                            Item 4.2 - This is a very long text that overflows the element it is contained in
                        </Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 4.3</Dropdown.Item>
                    </Dropdown.SubContent>
                </Dropdown.SubMenu>
                <Dropdown.Item onSelect={() => {}}>Item 5</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 6</Dropdown.Item>
            </Dropdown.Content>
        </Dropdown.Root>
    ),
};

export const Decorator: Story = {
    render: ({ ...args }) => (
        <Dropdown.Root {...args}>
            <Dropdown.Trigger>
                <Button>Trigger</Button>
            </Dropdown.Trigger>
            <Dropdown.Content>
                <Dropdown.Item onSelect={() => {}}>
                    <Dropdown.Slot name="left">
                        <IconIcon size={16} />
                    </Dropdown.Slot>
                    Left decorator
                </Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>
                    <Dropdown.Slot name="right">
                        <IconIcon size={16} />
                    </Dropdown.Slot>
                    Right decorator
                </Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>
                    <Dropdown.Slot>
                        <IconIcon size={16} />
                    </Dropdown.Slot>
                    Implicit placement left
                </Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>
                    <Dropdown.Slot>
                        <IconIcon size={16} />
                    </Dropdown.Slot>
                    <Dropdown.Slot>
                        <IconIcon size={16} />
                    </Dropdown.Slot>
                    Implicit placement both
                </Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 5</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 6</Dropdown.Item>
            </Dropdown.Content>
        </Dropdown.Root>
    ),
};

export const CustomItem: Story = {
    render: ({ ...args }) => (
        <Dropdown.Root {...args}>
            <Dropdown.Trigger>
                <Button>Trigger</Button>
            </Dropdown.Trigger>
            <Dropdown.Content>
                <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>
                    <div className="tw-bg-highlight">test bla</div>
                </Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 2</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 3</Dropdown.Item>
            </Dropdown.Content>
        </Dropdown.Root>
    ),
};

export const ControlledComponent: Story = {
    decorators: [
        (Story) => (
            <div className="tw-flex tw-flex-col tw-gap-2 tw-w-fit">
                <Story />
            </div>
        ),
    ],
    render: ({ ...args }) => {
        const [isOpen, setIsOpen] = useState(false);
        return (
            <>
                <Button onPress={() => setIsOpen(!isOpen)}>External Toggle Dropdown</Button>
                <Dropdown.Root {...args} open={isOpen} onOpenChange={setIsOpen}>
                    <Dropdown.Trigger>
                        <Button variant="loud">Trigger</Button>
                    </Dropdown.Trigger>
                    <Dropdown.Content>
                        <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 2</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 3</Dropdown.Item>
                    </Dropdown.Content>
                </Dropdown.Root>
            </>
        );
    },
};

export const Overflow: Story = {
    decorators: [
        (Story) => (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                <Story />
            </div>
        ),
    ],
    parameters: {
        viewport: {
            viewports: {
                mobile: {
                    name: 'Mobile',
                    styles: {
                        width: '300px',
                        height: '272px',
                    },
                },
            },
            defaultViewport: 'mobile',
        },
    },
    render: ({ ...args }) => (
        <>
            {Array.from({ length: 4 }).map((_, index) => (
                <Dropdown.Root {...args} key={index}>
                    <Dropdown.Trigger>
                        <Button variant="loud">Trigger 1</Button>
                    </Dropdown.Trigger>
                    <Dropdown.Content>
                        <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 2</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 3</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 4</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 5</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 6</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 7</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 8</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 9</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 10</Dropdown.Item>
                    </Dropdown.Content>
                </Dropdown.Root>
            ))}
        </>
    ),
};

export const RightSide: Story = {
    render: ({ ...args }) => (
        <Dropdown.Root {...args}>
            <Dropdown.Trigger>
                <Button>Trigger</Button>
            </Dropdown.Trigger>
            <Dropdown.Content side="right">
                <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 2</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 3</Dropdown.Item>
            </Dropdown.Content>
        </Dropdown.Root>
    ),
};

export const WithTooltip: Story = {
    render: ({ ...args }) => (
        <Dropdown.Root {...args}>
            <Tooltip.Root>
                <Tooltip.Trigger asChild>
                    <Dropdown.Trigger asChild>
                        <Button>Trigger</Button>
                    </Dropdown.Trigger>
                </Tooltip.Trigger>
                <Tooltip.Content>Dropdown tooltip</Tooltip.Content>
            </Tooltip.Root>

            <Dropdown.Content>
                <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 2</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 3</Dropdown.Item>
            </Dropdown.Content>
        </Dropdown.Root>
    ),
};

export const SpaciousTriggerOffset: Story = {
    render: ({ ...args }) => (
        <Dropdown.Root {...args}>
            <Dropdown.Trigger>
                <Button>Trigger</Button>
            </Dropdown.Trigger>
            <Dropdown.Content triggerOffset="spacious">
                <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 2</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 3</Dropdown.Item>
            </Dropdown.Content>
        </Dropdown.Root>
    ),
};

export const SpaciousViewportCollisionPadding: Story = {
    render: ({ ...args }) => (
        <Dropdown.Root {...args}>
            <Dropdown.Trigger>
                <Button>Trigger</Button>
            </Dropdown.Trigger>
            <Dropdown.Content viewportCollisionPadding="spacious">
                <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 2</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 3</Dropdown.Item>
            </Dropdown.Content>
        </Dropdown.Root>
    ),
};

export const OnEscapeKeyDown: Story = {
    render: ({ ...args }) => (
        <Dropdown.Root {...args}>
            <Dropdown.Trigger>
                <Button>Trigger</Button>
            </Dropdown.Trigger>
            <Dropdown.Content
                onEscapeKeyDown={() => {
                    alert('Escape key was pressed!');
                }}
            >
                <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 2</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 3</Dropdown.Item>
            </Dropdown.Content>
        </Dropdown.Root>
    ),
};

export const PreventCloseOnEscape: Story = {
    render: ({ ...args }) => (
        <Dropdown.Root {...args}>
            <Dropdown.Trigger>
                <Button>Trigger</Button>
            </Dropdown.Trigger>
            <Dropdown.Content
                onEscapeKeyDown={(event) => {
                    event.preventDefault();
                    alert('Escape key pressed, but dropdown will not close!');
                }}
            >
                <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 2</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 3</Dropdown.Item>
            </Dropdown.Content>
        </Dropdown.Root>
    ),
};
