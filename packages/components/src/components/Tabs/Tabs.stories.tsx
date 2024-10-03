/* (c) Copyright Frontify Ltd., all rights reserved. */

import { action } from '@storybook/addon-actions';
import { type Meta, type StoryObj } from '@storybook/react';

import { Tabs, TabsRoot, TabsTab } from './Tabs';

type Story = StoryObj<typeof meta>;

const meta: Meta<typeof TabsRoot> = {
    title: 'Components/Tabs',
    component: TabsRoot,
    subcomponents: {
        // @ts-expect-error Storybook types are incorrect
        'Tabs.Tab': TabsTab,
    },
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'released',
        },
    },
    args: {
        defaultActiveTab: 'third',
        onActiveTabChange: action('onActiveTabChange'),
    },
    decorators: [
        (Story) => (
            <div style={{ padding: '100px' }}>
                <Story />
            </div>
        ),
    ],
};

export const Default: Story = {
    render: (args) => (
        <Tabs.Root {...args}>
            <Tabs.Tab value="first">
                <Tabs.Trigger>
                    <span>First Tab</span>
                </Tabs.Trigger>
                <Tabs.Content>
                    <b>First Content</b>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
                </Tabs.Content>
            </Tabs.Tab>
            <Tabs.Tab value="second" disabled>
                <Tabs.Trigger>
                    <span>Second Tab</span>
                </Tabs.Trigger>
                <Tabs.Content>
                    <b>Second Content</b>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
                </Tabs.Content>
            </Tabs.Tab>
            <Tabs.Tab value="third">
                <Tabs.Trigger>
                    <span>Third Tab</span>
                </Tabs.Trigger>
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
