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
        defaultValue: 'first',
        onValueChange: action('onValueChange'),
    },
};

export const Default: Story = {
    render: (args) => (
        <Tabs.Root {...args}>
            <Tabs.Tab value="first">
                <Tabs.Trigger>
                    <span>First trigger dsafds</span>
                </Tabs.Trigger>
                <Tabs.Content>FirstContent fdas sdaf</Tabs.Content>
            </Tabs.Tab>
            <Tabs.Tab value="second">
                <Tabs.Trigger>
                    <span>Second trigger fdsa sdaf</span>
                </Tabs.Trigger>
                <Tabs.Content>SecondContent fdas sdfa</Tabs.Content>
            </Tabs.Tab>
            <Tabs.Tab value="third">
                <Tabs.Trigger>
                    <span>Third trigger fdsa hudsiafhadsf a dsf gadszu </span>
                </Tabs.Trigger>
                <Tabs.Content>ThirdContent</Tabs.Content>
            </Tabs.Tab>
        </Tabs.Root>
    ),
};
export default meta;
