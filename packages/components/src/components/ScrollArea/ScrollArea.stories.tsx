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
            type: 'in_progress',
        },
    },
    args: {},
};
export default meta;

export const Default: Story = {
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

export const WithWrapper: Story = {
    render: () => {
        return (
            <div style={{ width: 300, height: 200 }}>
                <ScrollArea>
                    <p style={{ width: 500 }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec dui in nunc ultricies
                        ornare. Quisque auctor, nunc nec aliquam fermentum, odio turpis ultricies elit, in ultricies
                        nunc justo vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere
                        justo, vel ultricies nunc justo vitae purus. Integer auctor, libero in ultricies tincidunt, odio
                        libero posuere justo, vel ultricies nunc justo vitae purus. Integer auctor, libero in ultricies
                        tincidunt, odio libero posuere justo, vel ultricies nunc justo vitae purus. Integer auctor,
                        libero in ultricies tincidunt, odio libero posuere justo, vel ultricies nunc justo vitae purus.
                        Integer auctor, libero in ultricies tincidunt, odio libero posuere justo, vel ultricies nunc
                        justo vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo, vel
                        ultricies nunc justo vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero
                        posuere justo, vel ultricies nunc justo vitae purus. Integer auctor, libero in ultricies
                        tincidunt, odio libero posuere justo, vel ultricies nunc justo vitae purus. Integer auctor,
                        libero in ultricies tincidunt, odio libero posuere justo, vel ultricies nunc justo vitae purus.
                    </p>
                </ScrollArea>
            </div>
        );
    },
};
