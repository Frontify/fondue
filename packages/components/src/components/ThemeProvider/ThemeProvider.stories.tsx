/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';

import { deDE } from '../../locales';
import { Accordion } from '../Accordion/Accordion';
import { Button } from '../Button/Button';
import { DatePicker } from '../DatePicker/DatePicker';
import { Flex } from '../Flex/Flex';

import { ThemeProvider } from './ThemeProvider';
import ThemeProviderDocs from './ThemeProvider.mdx';

type Story = StoryObj<typeof ThemeProvider>;

const meta: Meta<typeof ThemeProvider> = {
    title: 'Utilities/ThemeProvider',
    component: ThemeProvider,
    tags: ['autodocs'],
    parameters: {
        status: { type: 'released' },
        docs: { page: ThemeProviderDocs },
    },
    render: ({ children, ...args }) => (
        <ThemeProvider {...args}>
            <Flex direction="column" gap={4} p={4} align="flex-start">
                {children ?? (
                    <Button hugWidth emphasis="default">
                        Wrapped by ThemeProvider
                    </Button>
                )}
            </Flex>
        </ThemeProvider>
    ),
};

export default meta;

export const LightTheme: Story = {
    parameters: {
        manifest: { canonical: true },
    },
    args: {
        theme: 'light',
    },
};

export const DarkTheme: Story = {
    args: {
        theme: 'dark',
    },
};

export const RightToLeft: Story = {
    args: { dir: 'rtl' },
    render: (args) => (
        <ThemeProvider {...args}>
            <Flex direction="column" gap={4} p={4}>
                <Accordion.Root defaultValue={[]}>
                    <Accordion.Item value="item-1">
                        <Accordion.Header>General settings</Accordion.Header>
                        <Accordion.Content>
                            The chevron sits on the opposite edge in RTL, and content text aligns to the right.
                        </Accordion.Content>
                    </Accordion.Item>
                    <Accordion.Item value="item-2">
                        <Accordion.Header>Notifications</Accordion.Header>
                        <Accordion.Content>
                            Choose how and when you want to be notified about activity.
                        </Accordion.Content>
                    </Accordion.Item>
                    <Accordion.Item value="item-3">
                        <Accordion.Header>Privacy</Accordion.Header>
                        <Accordion.Content>
                            Manage who can see your profile and how your data is used.
                        </Accordion.Content>
                    </Accordion.Item>
                    <Accordion.Item value="item-4">
                        <Accordion.Header>Integrations</Accordion.Header>
                        <Accordion.Content>Connect third-party services to extend your workspace.</Accordion.Content>
                    </Accordion.Item>
                </Accordion.Root>
            </Flex>
        </ThemeProvider>
    ),
};

export const WithLocale: Story = {
    args: { locale: deDE, children: <DatePicker /> },
};
