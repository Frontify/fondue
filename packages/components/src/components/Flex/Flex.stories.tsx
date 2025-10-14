/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';
import { type ComponentProps } from 'react';

import { DecorativeContent } from '#storybook/components/DecorativeContent';

import { Box } from '../Box/Box';

import { Flex } from './Flex';

const DecorativeBox = (props: ComponentProps<typeof Box>) => (
    <Box width="100px" height="100px" {...props}>
        <DecorativeContent />
    </Box>
);
DecorativeBox.displayName = 'DecorativeBox';

type Story = StoryObj<typeof Flex>;
const meta: Meta<typeof Flex> = {
    title: 'Layout/Flex',
    component: Flex,
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'released',
        },
    },
    args: {
        gap: 4,
        direction: 'column',
    },
};
export default meta;

export const Default: Story = {
    render: (args) => {
        return (
            <Flex {...args}>
                <Flex gapX={3}>
                    <DecorativeBox />
                    <DecorativeBox />
                    <DecorativeBox />
                    <DecorativeBox />
                    <DecorativeBox />
                </Flex>
                <Flex gapX={3}>
                    <DecorativeBox />
                    <DecorativeBox />
                    <DecorativeBox />
                    <DecorativeBox />
                    <DecorativeBox />
                </Flex>
            </Flex>
        );
    },
};

export const PixelValues: Story = {
    render: (args) => {
        return (
            <Flex {...args}>
                <Flex gapX="12px">
                    <DecorativeBox />
                    <DecorativeBox />
                    <DecorativeBox />
                    <DecorativeBox />
                    <DecorativeBox />
                </Flex>
                <Flex gapX="12px">
                    <DecorativeBox />
                    <DecorativeBox />
                    <DecorativeBox />
                    <DecorativeBox />
                    <DecorativeBox />
                </Flex>
            </Flex>
        );
    },
    args: {
        gap: '16px',
    },
};

export const Nested: Story = {
    render: (args) => {
        return (
            <Flex {...args}>
                <Flex gapX={3}>
                    <DecorativeBox />
                    <DecorativeBox />
                    <DecorativeBox />
                    <DecorativeBox />
                    <DecorativeBox />
                    <Flex>
                        <DecorativeBox />
                        <DecorativeBox />
                        <DecorativeBox />
                        <DecorativeBox />
                        <DecorativeBox />
                    </Flex>
                </Flex>
                <Flex p={5}>
                    <DecorativeBox />
                    <DecorativeBox />
                    <DecorativeBox />
                    <DecorativeBox />
                    <DecorativeBox />
                    <Flex gapX={3}>
                        <DecorativeBox />
                        <DecorativeBox />
                        <DecorativeBox />
                        <DecorativeBox />
                        <DecorativeBox />
                    </Flex>
                </Flex>
            </Flex>
        );
    },
};

export const Responsive: Story = {
    render: (args) => {
        return (
            <Flex
                {...args}
                direction={{
                    base: 'row',
                    sm: 'column',
                }}
            >
                <Flex
                    gapX={{ sm: '10px' }}
                    gapY={{ base: '10px', sm: 0 }}
                    direction={{
                        base: 'column',
                        sm: 'row',
                    }}
                >
                    <DecorativeBox />
                    <DecorativeBox />
                    <DecorativeBox />
                    <DecorativeBox />
                    <DecorativeBox />
                </Flex>

                <Flex
                    gapX={{ sm: '10px' }}
                    gapY={{ base: '10px', sm: 0 }}
                    direction={{
                        base: 'column',
                        sm: 'row',
                    }}
                >
                    <DecorativeBox />
                    <DecorativeBox />
                    <DecorativeBox />
                    <DecorativeBox />
                    <DecorativeBox />
                </Flex>
            </Flex>
        );
    },
};

export const WithSizeToken: Story = {
    render: (args) => {
        return (
            <Flex {...args}>
                <Flex px={36} gapX={12}>
                    <DecorativeBox />
                    <DecorativeBox />
                </Flex>
                <Flex p={5}>
                    <DecorativeBox />
                    <DecorativeBox />
                    <DecorativeBox />
                    <DecorativeBox />
                    <DecorativeBox />
                </Flex>
            </Flex>
        );
    },
};
