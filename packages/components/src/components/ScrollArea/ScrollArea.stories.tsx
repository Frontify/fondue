/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react';

import { ScrollArea } from './ScrollArea';

type Story = StoryObj<typeof ScrollArea>;
const meta: Meta<typeof ScrollArea> = {
    title: 'Components/Scroll Area',
    component: ScrollArea,
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
    render: () => {
        return (
            <ScrollArea maxHeight={200} maxWidth={600}>
                <p style={{ width: 500 }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec dui in nunc ultricies ornare.
                    Quisque auctor, nunc nec aliquam fermentum, odio turpis ultricies elit, in ultricies nunc justo
                    vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo, vel ultricies
                    nunc justo vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo,
                    vel ultricies nunc justo vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero
                    posuere justo, vel ultricies nunc justo vitae purus. Integer auctor, libero in ultricies tincidunt,
                    odio libero posuere justo, vel ultricies nunc justo vitae purus. Integer auctor, libero in ultricies
                    tincidunt, odio libero posuere justo, vel ultricies nunc justo vitae purus. Integer auctor, libero
                    in ultricies tincidunt, odio libero posuere justo, vel ultricies nunc justo vitae purus. Integer
                    auctor, libero in ultricies tincidunt, odio libero posuere justo, vel ultricies nunc justo vitae
                    purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo, vel ultricies nunc
                    justo vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo, vel
                    ultricies nunc justo vitae purus.
                </p>
            </ScrollArea>
        );
    },
};

export const Horizontal: Story = {
    render: () => {
        return (
            <ScrollArea maxWidth={300}>
                <p style={{ width: 500 }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec dui in nunc ultricies ornare.
                    Quisque auctor, nunc nec aliquam fermentum, odio turpis ultricies elit, in ultricies nunc justo
                    vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo, vel ultricies
                    nunc justo vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo,
                    vel ultricies nunc justo vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero
                    posuere justo, vel ultricies nunc justo vitae purus. Integer auctor, libero in ultricies tincidunt,
                    odio libero posuere justo, vel ultricies nunc justo vitae purus. Integer auctor, libero in ultricies
                    tincidunt, odio libero posuere justo, vel ultricies nunc justo vitae purus. Integer auctor, libero
                    in ultricies tincidunt, odio libero posuere justo, vel ultricies nunc justo vitae purus. Integer
                    auctor, libero in ultricies tincidunt, odio libero posuere justo, vel ultricies nunc justo vitae
                    purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo, vel ultricies nunc
                    justo vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo, vel
                    ultricies nunc justo vitae purus.
                </p>
            </ScrollArea>
        );
    },
};

export const TwoDimensions: Story = {
    render: () => {
        return (
            <ScrollArea maxHeight={200} maxWidth={300}>
                <p style={{ width: 500 }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec dui in nunc ultricies ornare.
                    Quisque auctor, nunc nec aliquam fermentum, odio turpis ultricies elit, in ultricies nunc justo
                    vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo, vel ultricies
                    nunc justo vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo,
                    vel ultricies nunc justo vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero
                    posuere justo, vel ultricies nunc justo vitae purus. Integer auctor, libero in ultricies tincidunt,
                    odio libero posuere justo, vel ultricies nunc justo vitae purus. Integer auctor, libero in ultricies
                    tincidunt, odio libero posuere justo, vel ultricies nunc justo vitae purus. Integer auctor, libero
                    in ultricies tincidunt, odio libero posuere justo, vel ultricies nunc justo vitae purus. Integer
                    auctor, libero in ultricies tincidunt, odio libero posuere justo, vel ultricies nunc justo vitae
                    purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo, vel ultricies nunc
                    justo vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo, vel
                    ultricies nunc justo vitae purus.
                </p>
            </ScrollArea>
        );
    },
};

export const AlwaysVisible: Story = {
    render: () => {
        return (
            <ScrollArea type="always">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec dui in nunc ultricies ornare.
                    Quisque auctor, nunc nec aliquam fermentum, odio turpis ultricies elit, in ultricies nunc justo
                    vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo, vel ultricies
                    nunc justo vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo,
                    vel ultricies nunc justo vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero
                    posuere justo, vel ultricies nunc justo vitae purus. Integer auctor, libero in ultricies tincidunt,
                    odio libero posuere justo, vel ultricies nunc justo vitae purus. Integer auctor, libero in ultricies
                    tincidunt, odio libero posuere justo, vel ultricies nunc justo vitae purus. Integer auctor, libero
                    in ultricies tincidunt, odio libero posuere justo, vel ultricies nunc justo vitae purus. Integer
                    auctor, libero in ultricies tincidunt, odio libero posuere justo, vel ultricies nunc justo vitae
                    purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo, vel ultricies nunc
                    justo vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo, vel
                    ultricies nunc justo vitae purus.
                </p>
            </ScrollArea>
        );
    },
};

export const VisibleWhenOverflowing: Story = {
    render: () => {
        return (
            <ScrollArea type="auto" maxHeight={200} maxWidth={300}>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec dui in nunc ultricies ornare.
                    Quisque auctor, nunc nec aliquam fermentum, odio turpis ultricies elit, in ultricies nunc justo
                    vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo, vel ultricies
                    nunc justo vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo,
                    vel ultricies nunc justo vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero
                    posuere justo, vel ultricies nunc justo vitae purus. Integer auctor, libero in ultricies tincidunt,
                    odio libero posuere justo, vel ultricies nunc justo vitae purus. Integer auctor, libero in ultricies
                    tincidunt, odio libero posuere justo, vel ultricies nunc justo vitae purus. Integer auctor, libero
                    in ultricies tincidunt, odio libero posuere justo, vel ultricies nunc justo vitae purus. Integer
                    auctor, libero in ultricies tincidunt, odio libero posuere justo, vel ultricies nunc justo vitae
                    purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo, vel ultricies nunc
                    justo vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo, vel
                    ultricies nunc justo vitae purus.
                </p>
            </ScrollArea>
        );
    },
};

export const VisibleWhenScrolling: Story = {
    render: () => {
        return (
            <ScrollArea type="scroll" maxHeight={200} maxWidth={300}>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec dui in nunc ultricies ornare.
                    Quisque auctor, nunc nec aliquam fermentum, odio turpis ultricies elit, in ultricies nunc justo
                    vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo, vel ultricies
                    nunc justo vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo,
                    vel ultricies nunc justo vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero
                    posuere justo, vel ultricies nunc justo vitae purus. Integer auctor, libero in ultricies tincidunt,
                    odio libero posuere justo, vel ultricies nunc justo vitae purus. Integer auctor, libero in ultricies
                    tincidunt, odio libero posuere justo, vel ultricies nunc justo vitae purus. Integer auctor, libero
                    in ultricies tincidunt, odio libero posuere justo, vel ultricies nunc justo vitae purus. Integer
                    auctor, libero in ultricies tincidunt, odio libero posuere justo, vel ultricies nunc justo vitae
                    purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo, vel ultricies nunc
                    justo vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo, vel
                    ultricies nunc justo vitae purus.
                </p>
            </ScrollArea>
        );
    },
};

export const WithShadow: Story = {
    render: () => {
        return (
            <ScrollArea type="scroll" maxHeight={200} maxWidth={300} showShadow>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec dui in nunc ultricies ornare.
                    Quisque auctor, nunc nec aliquam fermentum, odio turpis ultricies elit, in ultricies nunc justo
                    vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo, vel ultricies
                    nunc justo vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo,
                    vel ultricies nunc justo vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero
                    posuere justo, vel ultricies nunc justo vitae purus. Integer auctor, libero in ultricies tincidunt,
                    odio libero posuere justo, vel ultricies nunc justo vitae purus. Integer auctor, libero in ultricies
                    tincidunt, odio libero posuere justo, vel ultricies nunc justo vitae purus. Integer auctor, libero
                    in ultricies tincidunt, odio libero posuere justo, vel ultricies nunc justo vitae purus. Integer
                    auctor, libero in ultricies tincidunt, odio libero posuere justo, vel ultricies nunc justo vitae
                    purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo, vel ultricies nunc
                    justo vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo, vel
                    ultricies nunc justo vitae purus.
                </p>
            </ScrollArea>
        );
    },
};
