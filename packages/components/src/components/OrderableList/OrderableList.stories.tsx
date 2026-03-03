/* (c) Copyright Frontify Ltd., all rights reserved. */

/* (c) Copyright Frontify Ltd., all rights reserved. */
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useRef } from 'storybook/internal/preview-api';

import { OrderableList, OrderableListItem, OrderableListRoot } from './OrderableList';

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
        return (
            <OrderableList.Root spacing="compact">
                <OrderableListItem id="1" ref={testRef}>
                    <div>Item 1</div>
                </OrderableListItem>
                <OrderableList.Item id="2">
                    <div>Item 2</div>
                </OrderableList.Item>
                <OrderableList.Item id="gaga">
                    <div>Item 3</div>
                </OrderableList.Item>
                <OrderableList.Item id="abc">
                    <div>Item 4</div>
                </OrderableList.Item>
                <OrderableList.Item id="5">
                    <div>Item 5</div>
                </OrderableList.Item>
            </OrderableList.Root>
        );
    },
};
