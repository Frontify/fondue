/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconIcon } from '@frontify/fondue-icons';
import { type Meta, type StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Button } from '../Button/Button';

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
    component: DropdownRoot,
    subcomponents: {
        // @ts-expect-error Storybook types are incorrect
        'Dropdown.Trigger': DropdownTrigger,
        // @ts-expect-error Storybook types are incorrect
        'Dropdown.Content': DropdownContent,
        // @ts-expect-error Storybook types are incorrect
        'Dropdown.Item': DropdownItem,
        // @ts-expect-error Storybook types are incorrect
        'Dropdown.Group': DropdownGroup,
        // @ts-expect-error Storybook types are incorrect
        'Dropdown.SubMenu': DropdownSubMenu,
        // @ts-expect-error Storybook types are incorrect
        'Dropdown.SubTrigger': DropdownSubTrigger,
        // @ts-expect-error Storybook types are incorrect
        'Dropdown.SubContent': DropdownSubContent,
    },
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'in_progress',
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

export const ItemGroups: Story = {
    render: ({ ...args }) => (
        <Dropdown.Root {...args}>
            <Dropdown.Trigger>
                <Button>Trigger</Button>
            </Dropdown.Trigger>
            <Dropdown.Content>
                <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>
                <Dropdown.Group>
                    <Dropdown.Item onSelect={() => {}}>Item 2</Dropdown.Item>
                    <Dropdown.Item onSelect={() => {}}>Item 3</Dropdown.Item>
                    <Dropdown.Item onSelect={() => {}}>Item 4</Dropdown.Item>
                </Dropdown.Group>
                <Dropdown.Item onSelect={() => {}}>Item 5</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 6</Dropdown.Item>
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
                    <div className="tw-bg-red-50">test bla</div>
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
