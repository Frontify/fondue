/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';

import { RouterProvider } from '../RouterProvider/RouterProvider';

import { Link, type LinkProps } from './Link';

const meta: Meta<LinkProps> = {
    title: 'Typography/Link',
    component: Link,
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'beta',
        },
    },
    decorators: [
        (Story) => (
            <RouterProvider
                navigate={(path: string) => alert(`Navigate to: ${path}`)}
                useHref={(path: string) => `/resolved${path}`}
            >
                <Story />
            </RouterProvider>
        ),
    ],
    argTypes: {
        href: {
            type: 'string',
            control: 'text',
        },
        weight: {
            type: 'string',
            control: 'select',
            options: [undefined, 'regular', 'medium', 'bold'],
        },
        size: {
            type: 'string',
            control: 'select',
            options: [undefined, 'xx-small', 'x-small', 'small', 'medium', 'large', 'x-large', 'xx-large'],
        },
        color: {
            type: 'string',
            control: 'select',
            options: [undefined, 'primary', 'secondary', 'error', 'success', 'warning', 'highlight'],
        },
        onContainer: {
            type: 'string',
            control: 'select',
            options: [undefined, 'secondary', 'disabled', 'error', 'success', 'warning', 'highlight'],
        },
        wrap: {
            type: 'string',
            control: 'select',
            options: [undefined, 'wrap', 'nowrap'],
        },
        underline: {
            type: 'string',
            control: 'select',
            options: [undefined, 'auto', 'always', 'hover', 'none'],
        },
        truncate: {
            type: 'boolean',
            control: 'boolean',
        },
        target: {
            type: 'string',
            control: 'text',
        },
        rel: {
            type: 'string',
            control: 'text',
        },
        className: {
            type: 'string',
            control: 'text',
        },
    },
};
export default meta;

type Story = StoryObj<typeof Link>;

export const Default: Story = {
    args: {
        children: 'Hello Link',
        href: '/hello',
    },
};

export const AllVariants: Story = {
    args: {
        children: 'All Variants Link',
        href: '/variants',
        size: 'large',
        weight: 'bold',
        color: 'success',
        onContainer: 'secondary',
        wrap: 'wrap',
        underline: 'always',
        truncate: false,
        target: '_blank',
        rel: 'noopener noreferrer',
    },
};

export const Truncated: Story = {
    args: {
        children: 'This is a very long link text that should be truncated if it overflows the container.',
        href: '/truncate',
        truncate: true,
        size: 'medium',
        weight: 'regular',
        color: 'primary',
    },
    render: (args) => (
        <div style={{ display: 'flex', width: 180, border: '1px dashed #ccc', padding: 8 }}>
            <Link {...args} />
        </div>
    ),
};
