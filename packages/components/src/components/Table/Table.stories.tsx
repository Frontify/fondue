/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconMagnifier, IconPen, IconTrashBin } from '@frontify/fondue-icons';
import { type Meta, type StoryObj } from '@storybook/react';
import { useState, useMemo } from 'react';

import { Button } from '../Button/Button';
import { Flex } from '../Flex/Flex';
import { TextInput } from '../TextInput/TextInput';

import { Table } from './Table';
import { Checkbox } from '../Checkbox/Checkbox';

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

type SortDirection = 'asc' | 'desc' | null;

type SortConfig = {
    column: string | null;
    direction: SortDirection;
};

interface TableRow {
    id: string;
    firstName: string;
    lastName: string;
    age: number;
}

const TABLE_HEADERS = [
    { key: 'firstName', label: 'First name' },
    { key: 'lastName', label: 'Last name' },
    { key: 'age', label: 'Age' },
    { key: 'actions', label: 'Actions' },
];

// Data
const TABLE_DATA: TableRow[] = [
    { id: '1', firstName: 'Dave', lastName: 'McDaveman', age: 42 },
    { id: '2', firstName: 'John', lastName: 'Doe', age: 23 },
    { id: '3', firstName: 'Chris', lastName: 'Christman', age: 35 },
    { id: '4', firstName: 'Tod', lastName: 'Hunter', age: 12 },
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
                        <Table.HeaderCell key={header.key}>{header.label}</Table.HeaderCell>
                    ))}
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {TABLE_DATA.map((row) => (
                    <Table.Row key={row.id}>
                        <Table.RowCell>{row.firstName}</Table.RowCell>
                        <Table.RowCell>{row.lastName}</Table.RowCell>
                        <Table.RowCell>{row.age}</Table.RowCell>
                        <Table.RowCell>
                            <Flex gap=".5rem">{TABLE_ACTIONS}</Flex>
                        </Table.RowCell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    ),
};

export const WithSearchFilterSort: Story = {
    render: () => {
        const [searchTerm, setSearchTerm] = useState('');
        const [ageFilter, setAgeFilter] = useState<'all' | 'young' | 'old'>('all');
        const [sortConfig, setSortConfig] = useState<SortConfig>({
            column: null,
            direction: null,
        });

        const filteredAndSortedData = useMemo(() => {
            let result = [...TABLE_DATA];

            if (searchTerm) {
                result = result.filter(
                    (row) =>
                        row.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        row.lastName.toLowerCase().includes(searchTerm.toLowerCase()),
                );
            }

            if (ageFilter !== 'all') {
                result = result.filter((row) => (ageFilter === 'young' ? row.age < 30 : row.age >= 30));
            }

            if (sortConfig.column && sortConfig.direction) {
                result.sort((a, b) => {
                    const key = sortConfig.column as keyof TableRow;
                    if (a[key] < b[key]) {
                        return sortConfig.direction === 'asc' ? -1 : 1;
                    }
                    if (a[key] > b[key]) {
                        return sortConfig.direction === 'asc' ? 1 : -1;
                    }
                    return 0;
                });
            }

            return result;
        }, [searchTerm, ageFilter, sortConfig]);

        const handleSort = (column: string) => {
            setSortConfig((current) => ({
                column,
                direction: current.column === column && current.direction === 'asc' ? 'desc' : 'asc',
            }));
        };

        return (
            <Flex direction="column" gap="1rem">
                <Flex gap="1rem">
                    <TextInput
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Flex>

                <Table.Root>
                    <Table.Header>
                        <Table.Row>
                            {TABLE_HEADERS.map(({ key, label }) => (
                                <Table.HeaderCell
                                    key={key}
                                    onClick={() => key !== 'actions' && handleSort(key)}
                                    style={{
                                        cursor: key !== 'actions' ? 'pointer' : 'default',
                                        position: 'relative',
                                    }}
                                >
                                    {label}
                                    {sortConfig.column === key && (
                                        <span style={{ marginLeft: '4px' }}>
                                            {sortConfig.direction === 'asc' ? '↑' : '↓'}
                                        </span>
                                    )}
                                </Table.HeaderCell>
                            ))}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {filteredAndSortedData.map((row) => (
                            <Table.Row key={row.id}>
                                <Table.RowCell>{row.firstName}</Table.RowCell>
                                <Table.RowCell>{row.lastName}</Table.RowCell>
                                <Table.RowCell>{row.age}</Table.RowCell>
                                <Table.RowCell>
                                    <Flex gap=".5rem">{TABLE_ACTIONS}</Flex>
                                </Table.RowCell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            </Flex>
        );
    },
};

export const WithSelection: Story = {
    render: () => {
        const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

        const handleSelectAll = () => {
            if (selectedRows.size === TABLE_DATA.length) {
                setSelectedRows(new Set());
            } else {
                setSelectedRows(new Set(TABLE_DATA.map((row) => row.id)));
            }
        };

        const handleSelectRow = (id: string) => {
            const newSelection = new Set(selectedRows);
            if (newSelection.has(id)) {
                newSelection.delete(id);
            } else {
                newSelection.add(id);
            }
            setSelectedRows(newSelection);
        };

        const isAllSelected = selectedRows.size === TABLE_DATA.length;
        const isPartiallySelected = selectedRows.size > 0 && selectedRows.size < TABLE_DATA.length;

        return (
            <Table.Root>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>
                            <Checkbox
                                value={isPartiallySelected ? 'indeterminate' : isAllSelected}
                                onChange={handleSelectAll}
                            />
                        </Table.HeaderCell>
                        {TABLE_HEADERS.map(({ key, label }) => (
                            <Table.HeaderCell key={key}>{label}</Table.HeaderCell>
                        ))}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {TABLE_DATA.map((row) => (
                        <Table.Row key={row.id} selected={selectedRows.has(row.id)}>
                            <Table.RowCell>
                                <Checkbox value={selectedRows.has(row.id)} onChange={() => handleSelectRow(row.id)} />
                            </Table.RowCell>
                            <Table.RowCell>{row.firstName}</Table.RowCell>
                            <Table.RowCell>{row.lastName}</Table.RowCell>
                            <Table.RowCell>{row.age}</Table.RowCell>
                            <Table.RowCell>
                                <Flex gap=".5rem">
                                    <Button size="small" aspect="square" emphasis="weak">
                                        <IconPen size="16" />
                                    </Button>
                                    <Button size="small" aspect="square" emphasis="weak" variant="danger">
                                        <IconTrashBin size="16" />
                                    </Button>
                                </Flex>
                            </Table.RowCell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        );
    },
};
