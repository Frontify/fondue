/* (c) Copyright Frontify Ltd., all rights reserved. */

/* (c) Copyright Frontify Ltd., all rights reserved. */
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useRef, useState } from 'storybook/internal/preview-api';

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
        const testRef = useRef<HTMLDivElement | null>(null);
        const [order, setOrder] = useState<string[]>(['1', '2', '3', '4', '5']);
        return (
            <div>
                <OrderableList.Root spacing="compact" order={order} onOrderChange={setOrder}>
                    <OrderableList.Item id="1" ref={testRef}>
                        <div>Item 1</div>
                    </OrderableList.Item>
                    <OrderableList.Item id="2">
                        <div>Item 2</div>
                    </OrderableList.Item>
                    <OrderableList.Item id="3">
                        <div>Item 3</div>
                    </OrderableList.Item>
                    <OrderableList.Item id="4">
                        <div>Item 4</div>
                    </OrderableList.Item>
                    <OrderableList.Item id="5">
                        <div>Item 5</div>
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
        const testRef = useRef<HTMLDivElement | null>(null);
        return (
            <OrderableList.Root spacing="compact" order={['1', '2', '3', '4', '5']}>
                <OrderableList.Item id="1" ref={testRef}>
                    <div>Item 1</div>
                </OrderableList.Item>
                <OrderableList.Item id="2">
                    <div>Item 2</div>
                </OrderableList.Item>
                <OrderableList.Item id="3">
                    <div>Item 3</div>
                </OrderableList.Item>
                <OrderableList.Item id="4">
                    <div>Item 4</div>
                </OrderableList.Item>
                <OrderableList.Item id="5">
                    <div>Item 5</div>
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
                    <div>Item 1</div>
                </OrderableList.Item>
                <OrderableList.Item id="2">
                    <div>Item 2</div>
                </OrderableList.Item>
                <OrderableList.Item id="3">
                    <div>Item 3</div>
                </OrderableList.Item>
                <OrderableList.Item id="4">
                    <div>Item 4</div>
                </OrderableList.Item>
                <OrderableList.Item id="5">
                    <div>Item 5</div>
                </OrderableList.Item>
            </OrderableList.Root>
        );
    },
};
