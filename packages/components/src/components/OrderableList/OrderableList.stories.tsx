/* (c) Copyright Frontify Ltd., all rights reserved. */
import { IconTrashBin } from '@frontify/fondue-icons';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { type ReactNode } from 'react';
import { useRef, useState } from 'storybook/internal/preview-api';

import { Button } from '#/index';

import { OrderableList, OrderableListRoot } from './OrderableList';

type Story = StoryObj<typeof OrderableListRoot>;
const meta: Meta<typeof OrderableListRoot> = {
    title: 'Components/OrderableList',
    component: OrderableListRoot,
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'in_progress',
        },
    },
};
export default meta;

export const Default: Story = {
    render: () => {
        const testRef = useRef<HTMLLIElement | null>(null);
        const [order, setOrder] = useState<string[]>(['1', '2', '3', '4', '5']);
        return (
            <div>
                <OrderableList.Root spacing="compact" order={order} onOrderChange={setOrder}>
                    <OrderableList.Item id="1" ref={testRef}>
                        <OrderableList.ItemTitle>Item 1</OrderableList.ItemTitle>
                        <OrderableList.ItemDescription>Item 1 description</OrderableList.ItemDescription>
                        <OrderableList.ItemAction>
                            <IconTrashBin size={16} />
                        </OrderableList.ItemAction>
                        <OrderableList.DragHandle />
                    </OrderableList.Item>
                    <OrderableList.Item onSelect={() => console.log('selected')} id="2">
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
                        <OrderableList.DragHandle />
                    </OrderableList.Item>
                    <OrderableList.Item selected onSelect={() => console.log('selected')} id="4">
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
                <button onClick={() => setOrder(['5', '2', '3', '4', '1'])}>Move Item 1 to end</button>
                <span>{JSON.stringify(order)}</span>
            </div>
        );
    },
};

export const NoDragHandle: Story = {
    render: () => {
        const testRef = useRef<HTMLLIElement | null>(null);
        return (
            <OrderableList.Root spacing="compact" order={['1', '2', '3', '4', '5']}>
                <OrderableList.Item id="1" ref={testRef}>
                    <OrderableList.ItemTitle>Item 1</OrderableList.ItemTitle>
                    <OrderableList.ItemDescription>Item 1 description</OrderableList.ItemDescription>
                </OrderableList.Item>
                <OrderableList.Item id="2">
                    <OrderableList.ItemTitle>Item 2</OrderableList.ItemTitle>
                    <OrderableList.ItemDescription>Item 2 description</OrderableList.ItemDescription>
                </OrderableList.Item>
                <OrderableList.Item id="3">
                    <OrderableList.ItemTitle>Item 3</OrderableList.ItemTitle>
                    <OrderableList.ItemDescription>Item 3 description</OrderableList.ItemDescription>
                </OrderableList.Item>
                <OrderableList.Item id="4">
                    <OrderableList.ItemTitle>Item 4</OrderableList.ItemTitle>
                    <OrderableList.ItemDescription>Item 4 description</OrderableList.ItemDescription>
                </OrderableList.Item>
                <OrderableList.Item id="5">
                    <OrderableList.ItemTitle>Item 5</OrderableList.ItemTitle>
                    <OrderableList.ItemDescription>Item 5 description</OrderableList.ItemDescription>
                </OrderableList.Item>
            </OrderableList.Root>
        );
    },
};

const CustomItemContent = ({ children }: { children: ReactNode }) => {
    return (
        <div style={{ backgroundColor: 'red' }}>
            {children}

            <div style={{ backgroundColor: 'blue', height: '100px' }}>
                Background color
                <OrderableList.CustomHandle asChild>
                    <span style={{ backgroundColor: 'green' }}>Drag handle</span>
                </OrderableList.CustomHandle>
            </div>
        </div>
    );
};

export const CustomItem: Story = {
    render: () => {
        const testRef = useRef<HTMLLIElement | null>(null);
        return (
            <OrderableList.Root spacing="compact" order={['1', '2', '3', '4', '5']}>
                <OrderableList.Item padding="none" id="1" ref={testRef}>
                    <CustomItemContent>Item 1</CustomItemContent>
                </OrderableList.Item>
                <OrderableList.Item padding="none" id="2">
                    <CustomItemContent>Item 2</CustomItemContent>
                </OrderableList.Item>
                <OrderableList.Item padding="none" id="3">
                    <CustomItemContent>Item 3</CustomItemContent>
                </OrderableList.Item>
                <OrderableList.Item padding="none" id="4">
                    <CustomItemContent>Item 4</CustomItemContent>
                </OrderableList.Item>
                <OrderableList.Item padding="none" id="5">
                    <CustomItemContent>Item 5</CustomItemContent>
                </OrderableList.Item>
            </OrderableList.Root>
        );
    },
};

export const Horizontal: Story = {
    render: () => {
        return (
            <OrderableList.Root spacing="compact" direction="horizontal" order={['1', '2', '3', '4', '5']}>
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

export const DecoratedItem: Story = {
    render: () => {
        return (
            <OrderableList.Root spacing="compact" order={['1', '2', '3']}>
                <OrderableList.Item id="1">
                    <OrderableList.ItemDecorator>Item 1</OrderableList.ItemDecorator>
                    <OrderableList.ItemTitle>Item 1</OrderableList.ItemTitle>
                    <OrderableList.ItemDescription>Item 1 description</OrderableList.ItemDescription>
                    <OrderableList.ItemAction>
                        <Button aspect="square" emphasis="default" size="small">
                            <IconTrashBin size={16} />
                        </Button>
                    </OrderableList.ItemAction>
                </OrderableList.Item>
                <OrderableList.Item id="2">
                    <OrderableList.ItemDecorator>Item 2</OrderableList.ItemDecorator>
                    <OrderableList.ItemTitle>Item 2</OrderableList.ItemTitle>
                    <OrderableList.ItemDescription>Item 2 description</OrderableList.ItemDescription>
                    <OrderableList.ItemAction>
                        <Button aspect="square" emphasis="default" size="small">
                            <IconTrashBin size={16} />
                        </Button>
                    </OrderableList.ItemAction>
                </OrderableList.Item>
                <OrderableList.Item id="3">
                    <OrderableList.ItemDecorator>Item 3</OrderableList.ItemDecorator>
                    <OrderableList.ItemTitle>Item 3</OrderableList.ItemTitle>
                    <OrderableList.ItemDescription>Item 3 description</OrderableList.ItemDescription>
                    <OrderableList.DragHandle />
                </OrderableList.Item>
            </OrderableList.Root>
        );
    },
};
