/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconIcon } from '@frontify/fondue-icons';
import { action } from '@storybook/addon-actions';
import { type Meta, type StoryObj } from '@storybook/react';

import { Tabs, TabsContent, TabsRoot, TabsTab, TabsTrigger } from './Tabs';

type Story = StoryObj<typeof meta>;

const meta: Meta<typeof TabsRoot> = {
    title: 'Components/Tabs',
    component: TabsRoot,
    subcomponents: {
        // @ts-expect-error Storybook types are incorrect
        'Tabs.Tab': TabsTab,
        // @ts-expect-error Storybook types are incorrect
        'Tabs.Trigger': TabsTrigger,
        // @ts-expect-error Storybook types are incorrect
        'Tabs.Content': TabsContent,
    },
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'released',
        },
    },
    args: {
        onActiveTabChange: action('onActiveTabChange'),
    },
};

export const Default: Story = {
    render: (args) => (
        <Tabs.Root {...args}>
            <Tabs.Tab value="first">
                <Tabs.Trigger>First Tab</Tabs.Trigger>
                <Tabs.Content>
                    <b>First Content</b>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
                </Tabs.Content>
            </Tabs.Tab>
            <Tabs.Tab value="second">
                <Tabs.Trigger>Second Tab</Tabs.Trigger>
                <Tabs.Content>
                    <b>Second Content</b>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
                </Tabs.Content>
            </Tabs.Tab>
            <Tabs.Tab value="third">
                <Tabs.Trigger>Third Tab</Tabs.Trigger>
                <Tabs.Content>
                    <b>Third Content</b>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
                </Tabs.Content>
            </Tabs.Tab>
        </Tabs.Root>
    ),
};

export const DisabledTabs: Story = {
    render: (args) => (
        <Tabs.Root {...args}>
            <Tabs.Tab value="first">
                <Tabs.Trigger>
                    <span>First Tab</span>
                </Tabs.Trigger>
                <Tabs.Content>
                    First Content Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </Tabs.Content>
            </Tabs.Tab>
            <Tabs.Tab value="second" disabled>
                <Tabs.Trigger>Second Tab</Tabs.Trigger>
                <Tabs.Content>
                    <b>Second Content</b>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
                </Tabs.Content>
            </Tabs.Tab>
            <Tabs.Tab value="third" disabled>
                <Tabs.Trigger>Third Tab</Tabs.Trigger>
                <Tabs.Content>
                    <b>Third Content</b>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
                </Tabs.Content>
            </Tabs.Tab>
        </Tabs.Root>
    ),
};

export const WithDecorator: Story = {
    render: (args) => (
        <Tabs.Root {...args}>
            <Tabs.Tab value="first">
                <Tabs.Trigger>
                    <IconIcon size={20} />
                    First Tab
                </Tabs.Trigger>
                <Tabs.Content>
                    <b>First Content</b>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
                </Tabs.Content>
            </Tabs.Tab>
            <Tabs.Tab value="second">
                <Tabs.Trigger>
                    Second Tab
                    <IconIcon size={20} />
                </Tabs.Trigger>
                <Tabs.Content>
                    <b>Second Content</b>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
                </Tabs.Content>
            </Tabs.Tab>
            <Tabs.Tab value="third" disabled>
                <Tabs.Trigger>Third Tab</Tabs.Trigger>
                <Tabs.Content>
                    <b>Third Content</b>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
                </Tabs.Content>
            </Tabs.Tab>
        </Tabs.Root>
    ),
};
export default meta;
