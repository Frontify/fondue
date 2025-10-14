/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';

import { ScrollArea } from './ScrollArea';

type Story = StoryObj<typeof meta>;
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
    render: (args) => {
        return (
            <ScrollArea {...args} maxHeight={200} maxWidth={600}>
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
    render: (args) => {
        return (
            <ScrollArea {...args} maxWidth={300}>
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
    render: (args) => {
        return (
            <ScrollArea {...args} maxHeight={200} maxWidth={300}>
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
    render: (args) => {
        return (
            <ScrollArea {...args} type="always">
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
    render: (args) => {
        return (
            <ScrollArea {...args} type="auto" maxHeight={200} maxWidth={300}>
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
    render: (args) => {
        return (
            <ScrollArea {...args} type="scroll" maxHeight={200} maxWidth={300}>
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
    render: (args) => {
        return (
            <ScrollArea {...args} type="scroll" maxHeight={200} maxWidth={300} showShadow>
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

export const WithTightPadding: Story = {
    render: (args) => {
        return (
            <ScrollArea {...args} type="scroll" maxHeight={200} maxWidth={300} padding="tight">
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

export const WithCompactPadding: Story = {
    render: (args) => {
        return (
            <ScrollArea {...args} type="scroll" maxHeight={200} maxWidth={300} padding="compact">
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

export const WithComfortablePadding: Story = {
    render: (args) => {
        return (
            <ScrollArea {...args} type="scroll" maxHeight={200} maxWidth={300} padding="comfortable">
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

export const WithSpaciousPadding: Story = {
    render: (args) => {
        return (
            <ScrollArea {...args} type="scroll" maxHeight={200} maxWidth={300} padding="spacious">
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

export const WithStableGutter: Story = {
    render: (args) => {
        return (
            <ScrollArea {...args} maxHeight={200} maxWidth={600} scrollbarGutter="stable">
                <div style={{ height: '1000px', width: '100%' }}>Scrollable content</div>
            </ScrollArea>
        );
    },
};
