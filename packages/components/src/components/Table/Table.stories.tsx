/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconPen, IconTrashBin } from '@frontify/fondue-icons';
import { type Meta, type StoryObj } from '@storybook/react';

import { Button } from '../Button/Button';

import { Table } from './Table';
import { Flex } from '../Flex/Flex';

type Story = StoryObj<typeof meta>;
const meta: Meta<typeof Table.Root> = {
    component: Table.Root,
    subcomponents: {
        // @ts-expect-error Storybook types are incorrect
        'Table.Header': Table.Header,
        // @ts-expect-error Storybook types are incorrect
        'Table.HeaderCell': Table.HeaderCell,
        // @ts-expect-error Storybook types are incorrect
        'Table.Body': Table.Body,
        // @ts-expect-error Storybook types are incorrect
        'Table.Row': Table.Row,
        // @ts-expect-error Storybook types are incorrect
        'Table.RowCell': Table.RowCell,
    },
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'released',
        },
    },
    args: {},
};
export default meta;

const TABLE_HEADERS = ['First name', 'Last name', 'Age', 'Actions'];

const TABLE_ROWS = [
    ['Dave', 'McDaveman', '42'],
    ['John', 'Doe', '23'],
    ['Chris', 'Christman', '35'],
    ['Tod', 'Hunter', '12'],
];

const TABLE_ACTIONS = [
    <Button size="small" aspect="square" emphasis="weak" key="edit">
        <IconPen size="16" />
    </Button>,
    <Button size="small" aspect="square" emphasis="weak" variant="danger" key="delete">
        <IconTrashBin size="16" />
    </Button>,
];

export const Default: Story = {
    render: ({ ...args }) => (
        <Table.Root {...args}>
            <Table.Header>
                <Table.Row>
                    {TABLE_HEADERS.map((header) => (
                        <Table.HeaderCell key={header}>{header}</Table.HeaderCell>
                    ))}
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {TABLE_ROWS.map((row, index) => (
                    <Table.Row key={index}>
                        {row.map((cell) => (
                            <Table.RowCell key={cell}>{cell}</Table.RowCell>
                        ))}
                        <Table.RowCell>
                            <Flex gap=".5rem">{TABLE_ACTIONS} </Flex>
                        </Table.RowCell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    ),
};
