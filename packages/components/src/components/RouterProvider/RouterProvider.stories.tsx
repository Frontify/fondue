/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import { Flex } from '../Flex/Flex';
import { Link } from '../Link/Link';

import { RouterProvider } from './RouterProvider';

type Story = StoryObj<typeof RouterProvider>;

const meta: Meta<typeof RouterProvider> = {
    title: 'Utilities/RouterProvider',
    component: RouterProvider,
    tags: ['autodocs'],
    parameters: {
        status: { type: 'released' },
    },
    args: {
        navigate: action('navigate'),
        // eslint-disable-next-line @eslint-react/no-unnecessary-use-prefix
        useHref: (path: string) => path,
    },
    render: ({ children, ...args }) => (
        <RouterProvider {...args}>
            <Flex direction="column" gap={4} p={4} align="flex-start">
                {children ?? <Link href="/some/route">Navigates through the app router</Link>}
            </Flex>
        </RouterProvider>
    ),
};

export default meta;

export const Default: Story = {
    parameters: {
        manifest: { canonical: true },
    },
};
