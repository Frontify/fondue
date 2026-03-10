/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconTrashBin } from '@frontify/fondue-icons';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { type ReactNode } from 'react';
import { useState } from 'storybook/internal/preview-api';

import { Button } from '#/index';

import { OrderableList, OrderableListRoot } from './OrderableList';

type Story = StoryObj<typeof OrderableListRoot>;

const meta: Meta<typeof OrderableListRoot> = {
    title: 'Components/OrderableList',
    component: OrderableListRoot,
    subcomponents: {
        'OrderableList.Item': OrderableList.Item,
        'OrderableList.ItemTitle': OrderableList.ItemTitle,
        'OrderableList.ItemDescription': OrderableList.ItemDescription,
        'OrderableList.ItemAction': OrderableList.ItemAction,
        'OrderableList.ItemDecorator': OrderableList.ItemDecorator,
        'OrderableList.DragHandle': OrderableList.DragHandle,
        'OrderableList.CustomHandle': OrderableList.CustomHandle,
    },
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'released',
        },
    },
};
export default meta;

export const Default: Story = {
    render: () => {
        const [order, setOrder] = useState(['1', '2', '3', '4', '5']);

        return (
            <OrderableList.Root spacing="compact" order={order} onOrderChange={setOrder}>
                <OrderableList.Item id="1">
                    <OrderableList.ItemTitle>Item 1</OrderableList.ItemTitle>
                    <OrderableList.ItemDescription>Item 1 description</OrderableList.ItemDescription>
                    <OrderableList.DragHandle />
                </OrderableList.Item>
                <OrderableList.Item id="2">
                    <OrderableList.ItemTitle>Item 2</OrderableList.ItemTitle>
                    <OrderableList.ItemDescription>Item 2 description</OrderableList.ItemDescription>
                    <OrderableList.DragHandle />
                </OrderableList.Item>
                <OrderableList.Item id="3">
                    <OrderableList.ItemTitle>Item 3</OrderableList.ItemTitle>
                    <OrderableList.ItemDescription>Item 3 description</OrderableList.ItemDescription>
                    <OrderableList.DragHandle />
                </OrderableList.Item>
                <OrderableList.Item id="4">
                    <OrderableList.ItemTitle>Item 4</OrderableList.ItemTitle>
                    <OrderableList.ItemDescription>Item 4 description</OrderableList.ItemDescription>
                    <OrderableList.DragHandle />
                </OrderableList.Item>
                <OrderableList.Item id="5">
                    <OrderableList.ItemTitle>Item 5</OrderableList.ItemTitle>
                    <OrderableList.ItemDescription>Item 5 description</OrderableList.ItemDescription>
                    <OrderableList.DragHandle />
                </OrderableList.Item>
            </OrderableList.Root>
        );
    },
};

export const WithActions: Story = {
    render: () => {
        const [order, setOrder] = useState(['1', '2', '3']);

        return (
            <OrderableList.Root spacing="compact" order={order} onOrderChange={setOrder}>
                <OrderableList.Item id="1">
                    <OrderableList.ItemTitle>Item 1</OrderableList.ItemTitle>
                    <OrderableList.ItemDescription>Item 1 description</OrderableList.ItemDescription>
                    <OrderableList.ItemAction>
                        <Button aspect="square" emphasis="default" size="small">
                            <IconTrashBin size={16} />
                        </Button>
                    </OrderableList.ItemAction>
                    <OrderableList.DragHandle />
                </OrderableList.Item>
                <OrderableList.Item id="2">
                    <OrderableList.ItemTitle>Item 2</OrderableList.ItemTitle>
                    <OrderableList.ItemDescription>Item 2 description</OrderableList.ItemDescription>
                    <OrderableList.ItemAction>
                        <Button aspect="square" emphasis="default" size="small">
                            <IconTrashBin size={16} />
                        </Button>
                    </OrderableList.ItemAction>
                    <OrderableList.DragHandle />
                </OrderableList.Item>
                <OrderableList.Item id="3">
                    <OrderableList.ItemTitle>Item 3</OrderableList.ItemTitle>
                    <OrderableList.ItemDescription>Item 3 description</OrderableList.ItemDescription>
                    <OrderableList.ItemAction>
                        <Button aspect="square" emphasis="default" size="small">
                            <IconTrashBin size={16} />
                        </Button>
                    </OrderableList.ItemAction>
                    <OrderableList.DragHandle />
                </OrderableList.Item>
            </OrderableList.Root>
        );
    },
};

export const Selectable: Story = {
    render: () => {
        const [order, setOrder] = useState(['1', '2', '3']);
        const [selectedId, setSelectedId] = useState<string | null>(null);

        return (
            <OrderableList.Root spacing="compact" order={order} onOrderChange={setOrder}>
                <OrderableList.Item
                    id="1"
                    selected={selectedId === '1'}
                    onSelect={() => setSelectedId(selectedId === '1' ? null : '1')}
                >
                    <OrderableList.ItemTitle>Item 1</OrderableList.ItemTitle>
                    <OrderableList.ItemDescription>Click to select</OrderableList.ItemDescription>
                    <OrderableList.DragHandle />
                </OrderableList.Item>
                <OrderableList.Item
                    id="2"
                    selected={selectedId === '2'}
                    onSelect={() => setSelectedId(selectedId === '2' ? null : '2')}
                >
                    <OrderableList.ItemTitle>Item 2</OrderableList.ItemTitle>
                    <OrderableList.ItemDescription>Click to select</OrderableList.ItemDescription>
                    <OrderableList.DragHandle />
                </OrderableList.Item>
                <OrderableList.Item
                    id="3"
                    selected={selectedId === '3'}
                    onSelect={() => setSelectedId(selectedId === '3' ? null : '3')}
                >
                    <OrderableList.ItemTitle>Item 3</OrderableList.ItemTitle>
                    <OrderableList.ItemDescription>Click to select</OrderableList.ItemDescription>
                    <OrderableList.DragHandle />
                </OrderableList.Item>
            </OrderableList.Root>
        );
    },
};

export const WithDecorator: Story = {
    render: () => {
        const [order, setOrder] = useState(['1', '2', '3']);

        return (
            <OrderableList.Root spacing="compact" order={order} onOrderChange={setOrder}>
                <OrderableList.Item id="1">
                    <OrderableList.ItemDecorator>A</OrderableList.ItemDecorator>
                    <OrderableList.ItemTitle>Item 1</OrderableList.ItemTitle>
                    <OrderableList.ItemDescription>Item 1 description</OrderableList.ItemDescription>
                    <OrderableList.DragHandle />
                </OrderableList.Item>
                <OrderableList.Item id="2">
                    <OrderableList.ItemDecorator>B</OrderableList.ItemDecorator>
                    <OrderableList.ItemTitle>Item 2</OrderableList.ItemTitle>
                    <OrderableList.ItemDescription>Item 2 description</OrderableList.ItemDescription>
                    <OrderableList.DragHandle />
                </OrderableList.Item>
                <OrderableList.Item id="3">
                    <OrderableList.ItemDecorator>C</OrderableList.ItemDecorator>
                    <OrderableList.ItemTitle>Item 3</OrderableList.ItemTitle>
                    <OrderableList.ItemDescription>Item 3 description</OrderableList.ItemDescription>
                    <OrderableList.DragHandle />
                </OrderableList.Item>
            </OrderableList.Root>
        );
    },
};

export const Horizontal: Story = {
    render: () => {
        const [order, setOrder] = useState(['1', '2', '3', '4', '5']);

        return (
            <OrderableList.Root spacing="compact" direction="horizontal" order={order} onOrderChange={setOrder}>
                <OrderableList.Item id="1">
                    <OrderableList.ItemTitle>Item 1</OrderableList.ItemTitle>
                    <OrderableList.ItemDescription>Item 1 description</OrderableList.ItemDescription>
                    <OrderableList.DragHandle />
                </OrderableList.Item>
                <OrderableList.Item id="2">
                    <OrderableList.ItemTitle>Item 2</OrderableList.ItemTitle>
                    <OrderableList.ItemDescription>Item 2 description</OrderableList.ItemDescription>
                    <OrderableList.DragHandle />
                </OrderableList.Item>
                <OrderableList.Item id="3">
                    <OrderableList.ItemTitle>Item 3</OrderableList.ItemTitle>
                    <OrderableList.ItemDescription>Item 3 description</OrderableList.ItemDescription>
                    <OrderableList.DragHandle />
                </OrderableList.Item>
                <OrderableList.Item id="4">
                    <OrderableList.ItemTitle>Item 4</OrderableList.ItemTitle>
                    <OrderableList.ItemDescription>Item 4 description</OrderableList.ItemDescription>
                    <OrderableList.DragHandle />
                </OrderableList.Item>
                <OrderableList.Item id="5">
                    <OrderableList.ItemTitle>Item 5</OrderableList.ItemTitle>
                    <OrderableList.ItemDescription>Item 5 description</OrderableList.ItemDescription>
                    <OrderableList.DragHandle />
                </OrderableList.Item>
            </OrderableList.Root>
        );
    },
};

export const NoDragHandle: Story = {
    render: () => {
        const [order, setOrder] = useState(['1', '2', '3']);

        return (
            <OrderableList.Root spacing="compact" order={order} onOrderChange={setOrder}>
                <OrderableList.Item id="1">
                    <OrderableList.ItemTitle>Item 1</OrderableList.ItemTitle>
                    <OrderableList.ItemDescription>Drag the entire item</OrderableList.ItemDescription>
                </OrderableList.Item>
                <OrderableList.Item id="2">
                    <OrderableList.ItemTitle>Item 2</OrderableList.ItemTitle>
                    <OrderableList.ItemDescription>Drag the entire item</OrderableList.ItemDescription>
                </OrderableList.Item>
                <OrderableList.Item id="3">
                    <OrderableList.ItemTitle>Item 3</OrderableList.ItemTitle>
                    <OrderableList.ItemDescription>Drag the entire item</OrderableList.ItemDescription>
                </OrderableList.Item>
            </OrderableList.Root>
        );
    },
};

export const WithDisabledItem: Story = {
    render: () => {
        const [order, setOrder] = useState(['1', '2', '3']);

        return (
            <OrderableList.Root spacing="compact" order={order} onOrderChange={setOrder}>
                <OrderableList.Item id="1">
                    <OrderableList.ItemTitle>Item 1</OrderableList.ItemTitle>
                    <OrderableList.ItemDescription>Draggable</OrderableList.ItemDescription>
                    <OrderableList.DragHandle />
                </OrderableList.Item>
                <OrderableList.Item id="2" disabled>
                    <OrderableList.ItemTitle>Item 2</OrderableList.ItemTitle>
                    <OrderableList.ItemDescription>Drag disabled</OrderableList.ItemDescription>
                    <OrderableList.DragHandle />
                </OrderableList.Item>
                <OrderableList.Item id="3">
                    <OrderableList.ItemTitle>Item 3</OrderableList.ItemTitle>
                    <OrderableList.ItemDescription>Draggable</OrderableList.ItemDescription>
                    <OrderableList.DragHandle />
                </OrderableList.Item>
            </OrderableList.Root>
        );
    },
};

export const ExternallyControlled: Story = {
    render: () => {
        const [order, setOrder] = useState(['1', '2', '3', '4', '5']);

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <OrderableList.Root spacing="compact" order={order} onOrderChange={setOrder}>
                    <OrderableList.Item id="1">
                        <OrderableList.ItemTitle>Item 1</OrderableList.ItemTitle>
                        <OrderableList.ItemDescription>Item 1 description</OrderableList.ItemDescription>
                        <OrderableList.DragHandle />
                    </OrderableList.Item>
                    <OrderableList.Item id="2">
                        <OrderableList.ItemTitle>Item 2</OrderableList.ItemTitle>
                        <OrderableList.ItemDescription>Item 2 description</OrderableList.ItemDescription>
                        <OrderableList.DragHandle />
                    </OrderableList.Item>
                    <OrderableList.Item id="3">
                        <OrderableList.ItemTitle>Item 3</OrderableList.ItemTitle>
                        <OrderableList.ItemDescription>Item 3 description</OrderableList.ItemDescription>
                        <OrderableList.DragHandle />
                    </OrderableList.Item>
                    <OrderableList.Item id="4">
                        <OrderableList.ItemTitle>Item 4</OrderableList.ItemTitle>
                        <OrderableList.ItemDescription>Item 4 description</OrderableList.ItemDescription>
                        <OrderableList.DragHandle />
                    </OrderableList.Item>
                    <OrderableList.Item id="5">
                        <OrderableList.ItemTitle>Item 5</OrderableList.ItemTitle>
                        <OrderableList.ItemDescription>Item 5 description</OrderableList.ItemDescription>
                        <OrderableList.DragHandle />
                    </OrderableList.Item>
                </OrderableList.Root>
                <div style={{ display: 'flex', gap: 8 }}>
                    <Button onPress={() => setOrder(['5', '4', '3', '2', '1'])}>Reverse order</Button>
                    <Button onPress={() => setOrder(['1', '2', '3', '4', '5'])}>Reset order</Button>
                </div>
                <span>Current order: {JSON.stringify(order)}</span>
            </div>
        );
    },
};

const CustomItemContent = ({ children }: { children: ReactNode }) => {
    return (
        <div style={{ backgroundColor: 'var(--color-surface-dim)', padding: 12 }}>
            {children}
            <div style={{ marginTop: 8 }}>
                <OrderableList.CustomHandle asChild>
                    <span
                        style={{
                            display: 'inline-block',
                            padding: '4px 8px',
                            backgroundColor: 'var(--color-container-secondary-default)',
                            borderRadius: 4,
                            cursor: 'grab',
                        }}
                    >
                        Drag here
                    </span>
                </OrderableList.CustomHandle>
            </div>
        </div>
    );
};

export const CustomContent: Story = {
    render: () => {
        const [order, setOrder] = useState(['1', '2', '3']);

        return (
            <OrderableList.Root spacing="compact" order={order} onOrderChange={setOrder}>
                <OrderableList.Item padding="none" id="1">
                    <CustomItemContent>Item 1</CustomItemContent>
                </OrderableList.Item>
                <OrderableList.Item padding="none" id="2">
                    <CustomItemContent>Item 2</CustomItemContent>
                </OrderableList.Item>
                <OrderableList.Item padding="none" id="3">
                    <CustomItemContent>Item 3</CustomItemContent>
                </OrderableList.Item>
            </OrderableList.Root>
        );
    },
};

export const Spacing: Story = {
    render: () => {
        const [order, setOrder] = useState(['1', '2', '3']);

        return (
            <div style={{ display: 'flex', gap: 48 }}>
                <div>
                    <h4 style={{ marginBottom: 8 }}>Tight</h4>
                    <OrderableList.Root spacing="tight" order={order} onOrderChange={setOrder}>
                        <OrderableList.Item id="1">
                            <OrderableList.ItemTitle>Item 1</OrderableList.ItemTitle>
                            <OrderableList.DragHandle />
                        </OrderableList.Item>
                        <OrderableList.Item id="2">
                            <OrderableList.ItemTitle>Item 2</OrderableList.ItemTitle>
                            <OrderableList.DragHandle />
                        </OrderableList.Item>
                        <OrderableList.Item id="3">
                            <OrderableList.ItemTitle>Item 3</OrderableList.ItemTitle>
                            <OrderableList.DragHandle />
                        </OrderableList.Item>
                    </OrderableList.Root>
                </div>
                <div>
                    <h4 style={{ marginBottom: 8 }}>Compact</h4>
                    <OrderableList.Root spacing="compact" order={order} onOrderChange={setOrder}>
                        <OrderableList.Item id="1">
                            <OrderableList.ItemTitle>Item 1</OrderableList.ItemTitle>
                            <OrderableList.DragHandle />
                        </OrderableList.Item>
                        <OrderableList.Item id="2">
                            <OrderableList.ItemTitle>Item 2</OrderableList.ItemTitle>
                            <OrderableList.DragHandle />
                        </OrderableList.Item>
                        <OrderableList.Item id="3">
                            <OrderableList.ItemTitle>Item 3</OrderableList.ItemTitle>
                            <OrderableList.DragHandle />
                        </OrderableList.Item>
                    </OrderableList.Root>
                </div>
                <div>
                    <h4 style={{ marginBottom: 8 }}>Comfortable</h4>
                    <OrderableList.Root spacing="comfortable" order={order} onOrderChange={setOrder}>
                        <OrderableList.Item id="1">
                            <OrderableList.ItemTitle>Item 1</OrderableList.ItemTitle>
                            <OrderableList.DragHandle />
                        </OrderableList.Item>
                        <OrderableList.Item id="2">
                            <OrderableList.ItemTitle>Item 2</OrderableList.ItemTitle>
                            <OrderableList.DragHandle />
                        </OrderableList.Item>
                        <OrderableList.Item id="3">
                            <OrderableList.ItemTitle>Item 3</OrderableList.ItemTitle>
                            <OrderableList.DragHandle />
                        </OrderableList.Item>
                    </OrderableList.Root>
                </div>
            </div>
        );
    },
};
