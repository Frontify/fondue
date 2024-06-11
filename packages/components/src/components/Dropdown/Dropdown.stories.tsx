/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconIcon } from '@frontify/fondue-icons';
import { type Meta, type StoryObj } from '@storybook/react';

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
    name: 'Text Label Only',
    args: {
        children: 'Hello World',
    },
    render: (args) => (
        <Dropdown.Root>
            <Dropdown.Trigger>
                <Button>Trigger</Button>
            </Dropdown.Trigger>
            <Dropdown.Content>
                <Dropdown.Item>
                    <Dropdown.Slot>
                        <IconIcon size={16} />
                    </Dropdown.Slot>
                    aaaa
                </Dropdown.Item>
                <Dropdown.Item>bbbb</Dropdown.Item>
                <Dropdown.Group>
                    <Dropdown.Item>
                        <Dropdown.Slot name="left">
                            <IconIcon size={16} />
                        </Dropdown.Slot>
                        <Dropdown.Slot name="right">
                            <IconIcon size={16} />
                        </Dropdown.Slot>
                        cccc
                    </Dropdown.Item>
                    <Dropdown.Item>dddd</Dropdown.Item>
                </Dropdown.Group>
                <Dropdown.Item disabled>eeee</Dropdown.Item>
                <Dropdown.SubMenu>
                    <Dropdown.SubTrigger>
                        <Dropdown.Slot name="left">
                            <IconIcon size={16} />
                        </Dropdown.Slot>
                        fffff
                    </Dropdown.SubTrigger>
                    <Dropdown.SubContent>
                        <Dropdown.Item>gggg</Dropdown.Item>
                        <Dropdown.Item>hhhhh</Dropdown.Item>
                    </Dropdown.SubContent>
                </Dropdown.SubMenu>
                <Dropdown.Item>iiii</Dropdown.Item>
            </Dropdown.Content>
        </Dropdown.Root>
    ),
};
