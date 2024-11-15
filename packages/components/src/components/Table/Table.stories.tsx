/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconMagnifier, IconPen, IconTrashBin } from '@frontify/fondue-icons';
import { type Meta, type StoryObj } from '@storybook/react';
import { useState, useMemo, type FormEvent } from 'react';

import { Button } from '../Button/Button';
import { Checkbox } from '../Checkbox/Checkbox';
import { Dropdown } from '../Dropdown/Dropdown';
import { Flex } from '../Flex/Flex';
import { TextInput } from '../TextInput/TextInput';

import { Table } from './Table';

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

type SortDirection = 'ascending' | 'descending' | 'other' | undefined;

type TableRow = {
    id: string;
    firstName: string;
    lastName: string;
    age: number;
    status: 'active' | 'inactive' | 'pending';
    lastLogin: string;
    role: string;
};

const TABLE_HEADERS = [
    { key: 'firstName', label: 'First name' },
    { key: 'lastName', label: 'Last name' },
    { key: 'age', label: 'Age' },
    { key: 'actions', label: 'Actions' },
];

const TABLE_DATA: TableRow[] = [
    {
        id: '1',
        firstName: 'Dave',
        lastName: 'McDaveman',
        age: 42,
        status: 'active',
        lastLogin: '2024-03-15',
        role: 'Admin',
    },
    { id: '2', firstName: 'John', lastName: 'Doe', age: 23, status: 'pending', lastLogin: '2024-03-14', role: 'User' },
    {
        id: '3',
        firstName: 'Chris',
        lastName: 'Christman',
        age: 35,
        status: 'inactive',
        lastLogin: '2024-03-01',
        role: 'Editor',
    },
    {
        id: '4',
        firstName: 'Tod',
        lastName: 'Hunter',
        age: 12,
        status: 'active',
        lastLogin: '2024-03-15',
        role: 'Viewer',
    },
    {
        id: '5',
        firstName: 'Alice',
        lastName: 'Johnson',
        age: 28,
        status: 'active',
        lastLogin: '2024-03-16',
        role: 'Admin',
    },
    {
        id: '6',
        firstName: 'Bob',
        lastName: 'Smith',
        age: 45,
        status: 'inactive',
        lastLogin: '2024-02-28',
        role: 'Editor',
    },
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
    render: () => {
        const handleRowClick = (id: string) => {
            console.log(`Row ${id} clicked`);
        };

        return (
            <Table.Root>
                <Table.Header>
                    <Table.Row>
                        {TABLE_HEADERS.map((header) => (
                            <Table.HeaderCell key={header.key}>{header.label}</Table.HeaderCell>
                        ))}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {TABLE_DATA.map((row) => (
                        <Table.Row
                            key={row.id}
                            onClick={() => handleRowClick(row.id)}
                            aria-label={`${row.firstName} ${row.lastName}'s details`}
                        >
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
        );
    },
};

export const WithSearchFilterSort: Story = {
    render: () => {
        const [searchTerm, setSearchTerm] = useState('');
        const [ageFilter, setAgeFilter] = useState<'all' | 'young' | 'old'>('all');
        const [sortStates, setSortStates] = useState<Record<string, SortDirection>>({});

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

            if (Object.keys(sortStates).length > 0) {
                result.sort((a, b) => {
                    for (const [key, direction] of Object.entries(sortStates)) {
                        if (direction === undefined) {
                            continue;
                        }
                        const valueA = key === 'name' ? `${a.firstName} ${a.lastName}` : a[key as keyof TableRow];
                        const valueB = key === 'name' ? `${b.firstName} ${b.lastName}` : b[key as keyof TableRow];

                        if (valueA < valueB) {
                            return direction === 'ascending' ? -1 : 1;
                        }
                        if (valueA > valueB) {
                            return direction === 'ascending' ? 1 : -1;
                        }
                    }
                    return 0;
                });
            }

            return result;
        }, [searchTerm, ageFilter, sortStates]);

        const handleSortChange = (column: string, direction: SortDirection) => {
            setSortStates((prev) => ({
                ...prev,
                [column]: direction,
            }));
        };

        return (
            <Flex direction="column" gap="1rem">
                <Flex gap="1rem">
                    <TextInput
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    >
                        <TextInput.Slot>
                            <IconMagnifier />
                        </TextInput.Slot>
                    </TextInput>
                    <Dropdown.Root>
                        <Dropdown.Trigger>
                            <Button>Filter by age</Button>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            <Dropdown.Item onSelect={() => setAgeFilter('all')}>All</Dropdown.Item>
                            <Dropdown.Item onSelect={() => setAgeFilter('young')}>Young</Dropdown.Item>
                            <Dropdown.Item onSelect={() => setAgeFilter('old')}>Old</Dropdown.Item>
                        </Dropdown.Content>
                    </Dropdown.Root>
                </Flex>

                <Table.Root>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell
                                sortable
                                sortDirection={sortStates.name}
                                onSortChange={(direction) => handleSortChange('name', direction)}
                            >
                                Name
                            </Table.HeaderCell>
                            <Table.HeaderCell
                                sortable
                                sortDirection={sortStates.age}
                                onSortChange={(direction) => handleSortChange('age', direction)}
                            >
                                Age
                            </Table.HeaderCell>
                            <Table.HeaderCell
                                sortable
                                sortDirection={sortStates.role}
                                onSortChange={(direction) => handleSortChange('role', direction)}
                            >
                                Role
                            </Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {filteredAndSortedData.map((row) => (
                            <Table.Row key={row.id} onClick={() => console.log(`View details for ${row.firstName}`)}>
                                <Table.RowCell>{`${row.firstName} ${row.lastName}`}</Table.RowCell>
                                <Table.RowCell>{row.age}</Table.RowCell>
                                <Table.RowCell>{row.role}</Table.RowCell>
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

        const handleSelectRow = (event: FormEvent<HTMLButtonElement>, id: string) => {
            event.stopPropagation();
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
                        <Table.Row
                            key={row.id}
                            selected={selectedRows.has(row.id)}
                            onClick={() => console.log(`View details for ${row.firstName}`)}
                        >
                            <Table.RowCell>
                                <Checkbox
                                    value={selectedRows.has(row.id)}
                                    onChange={(event) => handleSelectRow(event, row.id)}
                                />
                            </Table.RowCell>
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
        );
    },
};

export const TableStyles: Story = {
    name: 'Style Variations',
    render: () => (
        <Flex direction="column" gap="2rem">
            <Table.Root striped caption="Striped Table">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Default Borders</Table.HeaderCell>
                        <Table.HeaderCell>Normal Row</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {TABLE_DATA.map((row) => (
                        <Table.Row key={row.id} onClick={() => console.log(`Clicked ${row.firstName}`)}>
                            <Table.RowCell>{row.firstName}</Table.RowCell>
                            <Table.RowCell>{row.role}</Table.RowCell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>

            <Table.Root bordered={false} caption="Borderless">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Interactive Rows</Table.HeaderCell>
                        <Table.HeaderCell>No Borders</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {TABLE_DATA.map((row) => (
                        <Table.Row key={row.id} onClick={() => console.log(`Clicked ${row.firstName}`)}>
                            <Table.RowCell>{row.firstName}</Table.RowCell>
                            <Table.RowCell>{row.role}</Table.RowCell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>

            <Table.Root striped fullWidth={false} caption="Compact Width">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Auto Width</Table.HeaderCell>
                        <Table.HeaderCell>With Stripes</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {TABLE_DATA.slice(0, 3).map((row) => (
                        <Table.Row key={row.id} onClick={() => console.log(`Clicked ${row.firstName}`)}>
                            <Table.RowCell>{row.firstName}</Table.RowCell>
                            <Table.RowCell>{row.role}</Table.RowCell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </Flex>
    ),
};

export const CellAlignments: Story = {
    name: 'Cell Alignment Options',
    render: () => (
        <Table.Root>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell align="left">Left Header</Table.HeaderCell>
                    <Table.HeaderCell align="center">Centered Header</Table.HeaderCell>
                    <Table.HeaderCell align="right">Right Header</Table.HeaderCell>
                    <Table.HeaderCell align="left">Mixed Alignment</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {TABLE_DATA.map((row) => (
                    <Table.Row key={row.id} onClick={() => console.log(`Clicked ${row.firstName}'s row`)}>
                        <Table.RowCell align="left">{row.firstName}</Table.RowCell>
                        <Table.RowCell align="center">{row.role}</Table.RowCell>
                        <Table.RowCell align="right">{row.age}</Table.RowCell>
                        <Table.RowCell>
                            <Flex justify="space-between" align="center">
                                <span>{row.status}</span>
                                <span>{row.lastLogin}</span>
                            </Flex>
                        </Table.RowCell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    ),
};

export const ContentTruncation: Story = {
    name: 'Truncation & Width Control',
    render: () => (
        <div style={{ width: '800px' }}>
            <Table.Root>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width="100px" truncate noShrink>
                            Fixed Width & No Shrink
                        </Table.HeaderCell>
                        <Table.HeaderCell width="200px" truncate>
                            Truncated Very Long Header Title That Should Be Cut Off
                        </Table.HeaderCell>
                        <Table.HeaderCell width="30%">Percentage Width</Table.HeaderCell>
                        <Table.HeaderCell>Auto Width</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {TABLE_DATA.map((row) => (
                        <Table.Row key={row.id} onClick={() => console.log(`Clicked ${row.firstName}'s row`)}>
                            <Table.RowCell truncate>Fixed Width Content</Table.RowCell>
                            <Table.RowCell truncate>
                                {`${row.firstName} ${row.lastName} - ${row.role} - ${row.status}`}
                            </Table.RowCell>
                            <Table.RowCell>Normal Cell</Table.RowCell>
                            <Table.RowCell>Auto Width Content</Table.RowCell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </div>
    ),
};

export const ScrollBehavior: Story = {
    name: 'Sticky Header & Column',
    render: () => (
        <div style={{ height: '400px', width: '800px', overflow: 'auto', border: '1px solid #ccc' }}>
            <Table.Root>
                <Table.Header sticky>
                    <Table.Row>
                        <Table.HeaderCell noShrink>ID</Table.HeaderCell>
                        <Table.HeaderCell width="200px">Name</Table.HeaderCell>
                        <Table.HeaderCell width="150px">Role</Table.HeaderCell>
                        <Table.HeaderCell width="150px">Status</Table.HeaderCell>
                        <Table.HeaderCell width="150px">Last Login</Table.HeaderCell>
                        <Table.HeaderCell width="200px">Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body stickyFirstColumn>
                    {Array.from({ length: 20 }).map((_, index) => (
                        <Table.Row key={index} onClick={() => console.log(`Clicked row ${index + 1}`)}>
                            <Table.RowCell>{index + 1}</Table.RowCell>
                            <Table.RowCell truncate>
                                {`${TABLE_DATA[index % 6]?.firstName} ${TABLE_DATA[index % 6]?.lastName}`}
                            </Table.RowCell>
                            <Table.RowCell>{TABLE_DATA[index % 6]?.role}</Table.RowCell>
                            <Table.RowCell>{TABLE_DATA[index % 6]?.status}</Table.RowCell>
                            <Table.RowCell>{TABLE_DATA[index % 6]?.lastLogin}</Table.RowCell>
                            <Table.RowCell>
                                <div onClick={(e) => e.stopPropagation()}>
                                    <Flex gap="0.5rem">
                                        <Button size="small">Edit</Button>
                                        <Button size="small" variant="danger">
                                            Delete
                                        </Button>
                                    </Flex>
                                </div>
                            </Table.RowCell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </div>
    ),
};

export const RowStates: Story = {
    name: 'Row States & Interactions',
    render: () => (
        <Table.Root>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>State</Table.HeaderCell>
                    <Table.HeaderCell>Description</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                <Table.Row onClick={() => console.log('Regular click')}>
                    <Table.RowCell>Interactive Row</Table.RowCell>
                    <Table.RowCell>Default state with hover effect and click handler</Table.RowCell>
                </Table.Row>
                <Table.Row selected onClick={() => console.log('Selected click')}>
                    <Table.RowCell>Selected Row</Table.RowCell>
                    <Table.RowCell>Selected state with interaction</Table.RowCell>
                </Table.Row>
                <Table.Row disabled>
                    <Table.RowCell>Disabled Row</Table.RowCell>
                    <Table.RowCell>Non-interactive state</Table.RowCell>
                </Table.Row>
                <Table.Row selected disabled>
                    <Table.RowCell>Selected & Disabled</Table.RowCell>
                    <Table.RowCell>Selected but non-interactive</Table.RowCell>
                </Table.Row>
                <Table.Row>
                    <Table.RowCell>Non-interactive Row</Table.RowCell>
                    <Table.RowCell>No click handler, no hover effect</Table.RowCell>
                </Table.Row>
            </Table.Body>
        </Table.Root>
    ),
};
