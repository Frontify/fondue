/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconFunnel, IconMagnifier, IconPen, IconTrashBin } from '@frontify/fondue-icons';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useMemo, useState, type FormEvent } from 'react';

import { Button } from '../Button/Button';
import { Checkbox } from '../Checkbox/Checkbox';
import { Dropdown } from '../Dropdown/Dropdown';
import { Flex } from '../Flex/Flex';
import { Switch } from '../Switch/Switch';
import { TextInput } from '../TextInput/TextInput';

import { Table, TableBody, TableHeader, TableHeaderCell, TableRoot, TableRow, TableRowCell } from './Table';

type Story = StoryObj<typeof TableRoot>;
const meta: Meta<typeof TableRoot> = {
    title: 'Components/Table',
    component: TableRoot,
    subcomponents: {
        'Table.Header': TableHeader,
        'Table.HeaderCell': TableHeaderCell,
        'Table.Body': TableBody,
        'Table.Row': TableRow,
        'Table.RowCell': TableRowCell,
    },
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'released',
        },
    },
    args: {
        'aria-label': 'User Management Table',
    },
    argTypes: {
        layout: {
            control: {
                type: 'select',
            },
            options: ['auto', 'fixed'],
            defaultValue: 'auto',
        },
        gutter: {
            control: {
                type: 'text',
            },
            description:
                'Spacing between table cells (horizontal gutter). Accepts any CSS length value (e.g., "16px", "1rem", "48px")',
            defaultValue: '0px',
        },
    },
};

export default meta;

const TABLE_DATA = [
    {
        id: 1,
        firstName: 'Chris',
        lastName: 'Glasser',
        name: 'Chris Glasser',
        age: 32,
        role: 'Senior Developer',
        email: 'c.a.glasser@outlook.com',
        invited: 'Rhonda Rhodes',
        lastSeen: 'Oct 23, 2024',
        initialLogin: 'SSO',
        lastLogin: 'SSO',
        twoFa: true,
    },
    {
        id: 2,
        firstName: 'David',
        lastName: 'Elson',
        name: 'David Elson',
        age: 28,
        role: 'Product Manager',
        email: 'david29@gmail.com',
        invited: 'Rodger Struck',
        lastSeen: 'Oct 21, 2024',
        initialLogin: 'SSO',
        lastLogin: 'SSO',
        twoFa: true,
    },
    {
        id: 3,
        firstName: 'Eddie',
        lastName: 'Lake',
        name: 'Eddie Lake',
        age: 35,
        role: 'UX Designer',
        email: 'eddie_lake@gmail.com',
        invited: 'Frances Swann',
        lastSeen: 'Nov 11, 2024',
        initialLogin: 'SSO',
        lastLogin: 'SSO',
        twoFa: true,
    },
    {
        id: 4,
        firstName: 'James',
        lastName: 'Hall',
        name: 'James Hall',
        age: 41,
        role: 'Technical Lead',
        email: 'james_hall@gmail.com',
        invited: 'Alex Buckmaster',
        lastSeen: 'Nov 12, 2024',
        initialLogin: 'SSO',
        lastLogin: 'SSO',
        twoFa: true,
    },
    {
        id: 5,
        firstName: 'Jerry',
        lastName: 'Helfer',
        name: 'Jerry Helfer',
        age: 39,
        role: 'Frontend Developer',
        email: 'jerry73@aol.com',
        invited: 'Bradley Lawlor',
        lastSeen: 'Nov 1, 2024',
        initialLogin: 'SSO',
        lastLogin: 'SSO',
        twoFa: true,
    },
];

export const Basic: Story = {
    render: ({ ...args }) => (
        <Table.Root {...args}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Admin</Table.HeaderCell>
                    <Table.HeaderCell>Invited by</Table.HeaderCell>
                    <Table.HeaderCell>Last seen</Table.HeaderCell>
                    <Table.HeaderCell>Initial login</Table.HeaderCell>
                    <Table.HeaderCell>Last login</Table.HeaderCell>
                    <Table.HeaderCell>2FA</Table.HeaderCell>
                    <Table.HeaderCell>Analytics access</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {TABLE_DATA.map((user) => (
                    <Table.Row key={user.email}>
                        <Table.RowCell>
                            <div className="tw-flex tw-items-center tw-gap-2">
                                <div>
                                    <div className="tw-font-medium">{user.name}</div>
                                    <div className="tw-body-small tw-text-secondary">{user.email}</div>
                                </div>
                            </div>
                        </Table.RowCell>
                        <Table.RowCell>
                            <Switch size="small" aria-label="Admin" />
                        </Table.RowCell>
                        <Table.RowCell>{user.invited}</Table.RowCell>
                        <Table.RowCell>{user.lastSeen}</Table.RowCell>
                        <Table.RowCell>{user.initialLogin}</Table.RowCell>
                        <Table.RowCell>{user.lastLogin}</Table.RowCell>
                        <Table.RowCell>{user.twoFa ? 'Yes' : 'No'}</Table.RowCell>
                        <Table.RowCell>
                            <Switch size="small" aria-label="Analytics" />
                        </Table.RowCell>

                        <Table.RowCell>
                            <Flex gap="0.25rem">
                                <Button size="small" aspect="square" emphasis="weak">
                                    <IconPen size={16} />
                                </Button>
                                <Button variant="danger" size="small" aspect="square" emphasis="weak">
                                    <IconTrashBin size={16} />
                                </Button>
                            </Flex>
                        </Table.RowCell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    ),
};

export const SmallText: Story = {
    render: ({ ...args }) => (
        <Table.Root {...args} fontSize="small">
            <Table.Header>
                <tr>
                    <Table.HeaderCell width="100px">Name</Table.HeaderCell>
                    <Table.HeaderCell>Role</Table.HeaderCell>
                    <Table.HeaderCell>Last Seen</Table.HeaderCell>
                </tr>
            </Table.Header>
            <Table.Body>
                {TABLE_DATA.map((user) => (
                    <Table.Row key={user.id}>
                        <Table.RowCell>{user.name}</Table.RowCell>
                        <Table.RowCell>{user.role}</Table.RowCell>
                        <Table.RowCell>{user.lastSeen}</Table.RowCell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    ),
};

export const AutoLayout: Story = {
    render: ({ ...args }) => (
        <Table.Root {...args}>
            <Table.Header>
                <tr>
                    <Table.HeaderCell width="100px">Name</Table.HeaderCell>
                    <Table.HeaderCell>Role</Table.HeaderCell>
                    <Table.HeaderCell>Last Seen</Table.HeaderCell>
                </tr>
            </Table.Header>
            <Table.Body>
                {TABLE_DATA.map((user) => (
                    <Table.Row key={user.id}>
                        <Table.RowCell>{user.name}</Table.RowCell>
                        <Table.RowCell>{user.role}</Table.RowCell>
                        <Table.RowCell>{user.lastSeen}</Table.RowCell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    ),
};

export const FixedLayout: Story = {
    render: ({ ...args }) => (
        <Table.Root {...args} layout="fixed">
            <Table.Header>
                <tr>
                    <Table.HeaderCell width="100px">Name</Table.HeaderCell>
                    <Table.HeaderCell>Role</Table.HeaderCell>
                    <Table.HeaderCell>Last Seen</Table.HeaderCell>
                </tr>
            </Table.Header>
            <Table.Body>
                {TABLE_DATA.map((user) => (
                    <Table.Row key={user.id}>
                        <Table.RowCell>{user.name}</Table.RowCell>
                        <Table.RowCell>{user.role}</Table.RowCell>
                        <Table.RowCell>{user.lastSeen}</Table.RowCell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    ),
};

export const Sortable: Story = {
    render: ({ ...args }) => {
        const [sortField, setSortField] = useState<string | null>(null);
        const [sortDirection, setSortDirection] = useState<'ascending' | 'descending'>();

        const sortedUsers = [...TABLE_DATA].sort((a, b) => {
            if (!sortField || !sortDirection) {
                return 0;
            }

            const aValue = a[sortField as keyof typeof a];
            const bValue = b[sortField as keyof typeof b];

            if (sortDirection === 'ascending') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

        return (
            <Table.Root {...args}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell
                            sortDirection={sortField === 'name' ? sortDirection : undefined}
                            onSortChange={(direction) => {
                                setSortField('name');
                                setSortDirection(direction);
                            }}
                        >
                            Name
                        </Table.HeaderCell>
                        <Table.HeaderCell
                            truncate
                            sortDirection={sortField === 'invited' ? sortDirection : undefined}
                            onSortChange={(direction) => {
                                setSortField('invited');
                                setSortDirection(direction);
                            }}
                            state="loading"
                            loadingStateAriaLabel="Loading Data"
                        >
                            Invited by
                        </Table.HeaderCell>
                        <Table.HeaderCell
                            sortDirection={sortField === 'lastSeen' ? sortDirection : undefined}
                            onSortChange={(direction) => {
                                setSortField('lastSeen');
                                setSortDirection(direction);
                            }}
                        >
                            Last seen
                        </Table.HeaderCell>
                        {/* Other columns without sorting */}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {sortedUsers.map((user) => (
                        <Table.Row key={user.email}>
                            <Table.RowCell>
                                <div className="tw-flex tw-items-center tw-gap-2">
                                    <div>
                                        <div className="tw-font-medium">{user.name}</div>
                                        <div className="tw-body-small tw-text-secondary">{user.email}</div>
                                    </div>
                                </div>
                            </Table.RowCell>
                            <Table.RowCell truncate>{user.invited}</Table.RowCell>
                            <Table.RowCell>{user.lastSeen}</Table.RowCell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        );
    },
};

export const StickyHead: Story = {
    render: ({ ...args }) => (
        <Table.Root {...args}>
            <Table.Header sticky>
                <Table.Row>
                    <Table.HeaderCell width="250px">Name</Table.HeaderCell>
                    <Table.HeaderCell width="150px">Invited by</Table.HeaderCell>
                    <Table.HeaderCell width="120px">Last seen</Table.HeaderCell>
                    <Table.HeaderCell width="120px">Initial login</Table.HeaderCell>
                    <Table.HeaderCell width="120px">Last login</Table.HeaderCell>
                    <Table.HeaderCell width="80px">2FA</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {[...TABLE_DATA, ...TABLE_DATA, ...TABLE_DATA, ...TABLE_DATA, ...TABLE_DATA, ...TABLE_DATA].map(
                    (user, index) => (
                        <Table.Row key={`${user.email}-${index}`}>
                            <Table.RowCell>
                                <div className="tw-flex tw-items-center tw-gap-2">
                                    <div>
                                        <div className="tw-font-medium">{user.name}</div>
                                        <div className="tw-body-small tw-text-secondary">{user.email}</div>
                                    </div>
                                </div>
                            </Table.RowCell>
                            <Table.RowCell>{user.invited}</Table.RowCell>
                            <Table.RowCell>{user.lastSeen}</Table.RowCell>
                            <Table.RowCell>{user.initialLogin}</Table.RowCell>
                            <Table.RowCell>{user.lastLogin}</Table.RowCell>
                            <Table.RowCell>{user.twoFa ? 'Yes' : 'No'}</Table.RowCell>
                        </Table.Row>
                    ),
                )}
            </Table.Body>
        </Table.Root>
    ),
};

export const StickyFirstColumn: Story = {
    parameters: {
        viewport: {
            viewports: {
                mobile: {
                    name: 'Mobile',
                    styles: {
                        width: '320px',
                        height: '600px',
                    },
                },
            },
            defaultViewport: 'mobile',
        },
    },
    render: ({ ...args }) => (
        <Table.Root {...args}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Invited by</Table.HeaderCell>
                    <Table.HeaderCell>Last seen</Table.HeaderCell>
                    <Table.HeaderCell>Initial login</Table.HeaderCell>
                    <Table.HeaderCell>Last login</Table.HeaderCell>
                    <Table.HeaderCell>2FA</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body firstColumnSticky>
                {TABLE_DATA.map((user) => (
                    <Table.Row key={user.email}>
                        <Table.RowCell>
                            <div className="tw-flex tw-items-center tw-gap-2">
                                <div>
                                    <div className="tw-font-medium">{user.name}</div>
                                    <div className="tw-body-small tw-text-secondary">{user.email}</div>
                                </div>
                            </div>
                        </Table.RowCell>
                        <Table.RowCell>{user.invited}</Table.RowCell>
                        <Table.RowCell>{user.lastSeen}</Table.RowCell>
                        <Table.RowCell>{user.initialLogin}</Table.RowCell>
                        <Table.RowCell>{user.lastLogin}</Table.RowCell>
                        <Table.RowCell>{user.twoFa ? 'Yes' : 'No'}</Table.RowCell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    ),
};

export const StickyHeadAndCol: Story = {
    parameters: {
        viewport: {
            viewports: {
                mobile: {
                    name: 'Mobile',
                    styles: {
                        width: '320px',
                        height: '600px',
                    },
                },
            },
            defaultViewport: 'mobile',
        },
    },
    render: ({ ...args }) => (
        <Table.Root {...args}>
            <Table.Header sticky>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Invited by</Table.HeaderCell>
                    <Table.HeaderCell>Last seen</Table.HeaderCell>
                    <Table.HeaderCell>Initial login</Table.HeaderCell>
                    <Table.HeaderCell>Last login</Table.HeaderCell>
                    <Table.HeaderCell>2FA</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body firstColumnSticky>
                {[...TABLE_DATA, ...TABLE_DATA, ...TABLE_DATA].map((user) => (
                    <Table.Row key={user.email}>
                        <Table.RowCell>
                            <div className="tw-flex tw-items-center tw-gap-2">
                                <div>
                                    <div className="tw-font-medium">{user.name}</div>
                                    <div className="tw-body-small tw-text-secondary">{user.email}</div>
                                </div>
                            </div>
                        </Table.RowCell>
                        <Table.RowCell>{user.invited}</Table.RowCell>
                        <Table.RowCell>{user.lastSeen}</Table.RowCell>
                        <Table.RowCell>{user.initialLogin}</Table.RowCell>
                        <Table.RowCell>{user.lastLogin}</Table.RowCell>
                        <Table.RowCell>{user.twoFa ? 'Yes' : 'No'}</Table.RowCell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    ),
};

export const StickyRightColumn: Story = {
    parameters: {
        viewport: {
            viewports: {
                mobile: {
                    name: 'Mobile',
                    styles: {
                        width: '320px',
                        height: '600px',
                    },
                },
            },
            defaultViewport: 'mobile',
        },
    },
    render: ({ ...args }) => (
        <Table.Root {...args}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Invited by</Table.HeaderCell>
                    <Table.HeaderCell>Last seen</Table.HeaderCell>
                    <Table.HeaderCell>Initial login</Table.HeaderCell>
                    <Table.HeaderCell>Last login</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body lastColumnSticky>
                {TABLE_DATA.map((user) => (
                    <Table.Row key={user.email}>
                        <Table.RowCell>
                            <div className="tw-flex tw-items-center tw-gap-2">
                                <div>
                                    <div className="tw-font-medium">{user.name}</div>
                                    <div className="tw-text-small tw-text-primary-on-primary">{user.email}</div>
                                </div>
                            </div>
                        </Table.RowCell>
                        <Table.RowCell>{user.invited}</Table.RowCell>
                        <Table.RowCell>{user.lastSeen}</Table.RowCell>
                        <Table.RowCell>{user.initialLogin}</Table.RowCell>
                        <Table.RowCell>{user.lastLogin}</Table.RowCell>
                        <Table.RowCell>
                            <Flex gap="0.25rem">
                                <Button size="small" aspect="square" emphasis="weak">
                                    <IconPen size={16} />
                                </Button>
                                <Button variant="danger" size="small" aspect="square" emphasis="weak">
                                    <IconTrashBin size={16} />
                                </Button>
                            </Flex>
                        </Table.RowCell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    ),
};

export const StickyHeaderAndRightColumn: Story = {
    parameters: {
        viewport: {
            viewports: {
                mobile: {
                    name: 'Mobile',
                    styles: {
                        width: '320px',
                        height: '600px',
                    },
                },
            },
            defaultViewport: 'mobile',
        },
    },
    render: ({ ...args }) => (
        <Table.Root {...args}>
            <Table.Header sticky>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Invited by</Table.HeaderCell>
                    <Table.HeaderCell>Last seen</Table.HeaderCell>
                    <Table.HeaderCell>Initial login</Table.HeaderCell>
                    <Table.HeaderCell>Last login</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body lastColumnSticky>
                {[...TABLE_DATA, ...TABLE_DATA, ...TABLE_DATA].map((user, index) => (
                    <Table.Row key={`${user.email}-${index}`}>
                        <Table.RowCell>
                            <div className="tw-flex tw-items-center tw-gap-2">
                                <div>
                                    <div className="tw-font-medium">{user.name}</div>
                                    <div className="tw-text-small tw-text-primary-on-primary">{user.email}</div>
                                </div>
                            </div>
                        </Table.RowCell>
                        <Table.RowCell>{user.invited}</Table.RowCell>
                        <Table.RowCell>{user.lastSeen}</Table.RowCell>
                        <Table.RowCell>{user.initialLogin}</Table.RowCell>
                        <Table.RowCell>{user.lastLogin}</Table.RowCell>
                        <Table.RowCell>
                            <Flex gap="0.25rem">
                                <Button size="small" aspect="square" emphasis="weak">
                                    <IconPen size={16} />
                                </Button>
                                <Button variant="danger" size="small" aspect="square" emphasis="weak">
                                    <IconTrashBin size={16} />
                                </Button>
                            </Flex>
                        </Table.RowCell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    ),
};

export const StickyAllDirections: Story = {
    name: 'Sticky Header, Left & Right Columns',
    parameters: {
        viewport: {
            viewports: {
                mobile: {
                    name: 'Mobile',
                    styles: {
                        width: '320px',
                        height: '600px',
                    },
                },
            },
            defaultViewport: 'mobile',
        },
    },
    render: ({ ...args }) => (
        <Table.Root {...args}>
            <Table.Header sticky>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Invited by</Table.HeaderCell>
                    <Table.HeaderCell>Last seen</Table.HeaderCell>
                    <Table.HeaderCell>Initial login</Table.HeaderCell>
                    <Table.HeaderCell>Last login</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body firstColumnSticky lastColumnSticky>
                {[...TABLE_DATA, ...TABLE_DATA, ...TABLE_DATA].map((user, index) => (
                    <Table.Row key={`${user.email}-${index}`}>
                        <Table.RowCell>
                            <div className="tw-flex tw-items-center tw-gap-2">
                                <div>
                                    <div className="tw-font-medium">{user.name}</div>
                                    <div className="tw-text-small tw-text-primary-on-primary">{user.email}</div>
                                </div>
                            </div>
                        </Table.RowCell>
                        <Table.RowCell>{user.invited}</Table.RowCell>
                        <Table.RowCell>{user.lastSeen}</Table.RowCell>
                        <Table.RowCell>{user.initialLogin}</Table.RowCell>
                        <Table.RowCell>{user.lastLogin}</Table.RowCell>
                        <Table.RowCell>
                            <Flex gap="0.25rem">
                                <Button size="small" aspect="square" emphasis="weak">
                                    <IconPen size={16} />
                                </Button>
                                <Button variant="danger" size="small" aspect="square" emphasis="weak">
                                    <IconTrashBin size={16} />
                                </Button>
                            </Flex>
                        </Table.RowCell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    ),
};

export const Interactive: Story = {
    render: ({ ...args }) => (
        <Table.Root {...args}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Invited by</Table.HeaderCell>
                    <Table.HeaderCell>Last seen</Table.HeaderCell>
                    <Table.HeaderCell>Action</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {TABLE_DATA.map((user) => (
                    <Table.Row key={user.email} onClick={() => alert(`Clicked on ${user.name}`)}>
                        <Table.RowCell>
                            <div className="tw-flex tw-items-center tw-gap-2">
                                <div>
                                    <div className="tw-font-medium">{user.name}</div>
                                    <div className="tw-body-small tw-text-secondary">{user.email}</div>
                                </div>
                            </div>
                        </Table.RowCell>
                        <Table.RowCell>{user.invited}</Table.RowCell>
                        <Table.RowCell>{user.lastSeen}</Table.RowCell>
                        <Table.RowCell>
                            <Button onPress={() => alert('Button pressed — this does NOT trigger row click')}>
                                <span>Press me</span>
                            </Button>
                        </Table.RowCell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    ),
};

export const Disabled: Story = {
    render: ({ ...args }) => (
        <Table.Root {...args}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Invited by</Table.HeaderCell>
                    <Table.HeaderCell>Last seen</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {TABLE_DATA.map((user, index) => (
                    <Table.Row
                        key={user.email}
                        onClick={() => alert(`Clicked on ${user.name}`)}
                        disabled={index % 3 === 0}
                    >
                        <Table.RowCell>
                            <div className="tw-flex tw-items-center tw-gap-2">
                                <div>
                                    <div className="tw-font-medium">{user.name}</div>
                                    <div className="tw-body-small tw-text-secondary">{user.email}</div>
                                </div>
                            </div>
                        </Table.RowCell>
                        <Table.RowCell>{user.invited}</Table.RowCell>
                        <Table.RowCell>{user.lastSeen}</Table.RowCell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    ),
};

export const WithCaption: Story = {
    render: ({ ...args }) => (
        <Table.Root {...args}>
            <Table.Caption>User Management Dashboard</Table.Caption>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Invited by</Table.HeaderCell>
                    <Table.HeaderCell>Last seen</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {TABLE_DATA.slice(0, 5).map((user) => (
                    <Table.Row key={user.email}>
                        <Table.RowCell>
                            <div className="tw-flex tw-items-center tw-gap-2">
                                <div>
                                    <div className="tw-font-medium">{user.name}</div>
                                    <div className="tw-body-small tw-text-secondary">{user.email}</div>
                                </div>
                            </div>
                        </Table.RowCell>
                        <Table.RowCell>{user.invited}</Table.RowCell>
                        <Table.RowCell>{user.lastSeen}</Table.RowCell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    ),
};

export const TruncatedContent: Story = {
    render: ({ ...args }) => (
        <div style={{ width: '500px' }}>
            <Table.Root {...args}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell truncate>Name</Table.HeaderCell>
                        <Table.HeaderCell>Invited by</Table.HeaderCell>
                        <Table.HeaderCell truncate>Last seen</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {TABLE_DATA.slice(0, 5).map((user) => (
                        <Table.Row key={user.email}>
                            <Table.RowCell truncate>{user.name}</Table.RowCell>
                            <Table.RowCell>{user.invited}</Table.RowCell>
                            <Table.RowCell truncate>{user.lastSeen}</Table.RowCell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </div>
    ),
};

export const WithSearchAndFilters: Story = {
    render: ({ ...args }) => {
        const [searchTerm, setSearchTerm] = useState('');
        const [ageFilter, setAgeFilter] = useState<'all' | 'young' | 'old'>('all');

        const filteredAndSortedData = useMemo(() => {
            let result = [...TABLE_DATA];

            if (searchTerm) {
                result = result.filter(
                    (user) =>
                        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()),
                );
            }

            if (ageFilter !== 'all') {
                result = result.filter((user) => (ageFilter === 'young' ? user.age < 30 : user.age >= 30));
            }

            return result;
        }, [searchTerm, ageFilter]);

        return (
            <Flex direction="column" gap="1rem">
                <Flex gap="1rem">
                    <TextInput
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    >
                        <TextInput.Slot>
                            <IconMagnifier size="16" />
                        </TextInput.Slot>
                    </TextInput>
                    <Dropdown.Root>
                        <Dropdown.Trigger>
                            <Button emphasis="default">
                                <IconFunnel size="16" />
                                Filter by age
                            </Button>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            <Dropdown.Item onSelect={() => setAgeFilter('all')}>All</Dropdown.Item>
                            <Dropdown.Item onSelect={() => setAgeFilter('young')}>Young</Dropdown.Item>
                            <Dropdown.Item onSelect={() => setAgeFilter('old')}>Old</Dropdown.Item>
                        </Dropdown.Content>
                    </Dropdown.Root>
                </Flex>

                <Table.Root {...args}>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Age</Table.HeaderCell>
                            <Table.HeaderCell>Role</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {filteredAndSortedData.map((user) => (
                            <Table.Row key={user.id} onClick={() => console.log(`View details for ${user.firstName}`)}>
                                <Table.RowCell>{user.name}</Table.RowCell>
                                <Table.RowCell>{user.age}</Table.RowCell>
                                <Table.RowCell>{user.role}</Table.RowCell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            </Flex>
        );
    },
};

export const WithSelection: Story = {
    render: ({ ...args }) => {
        const [selectedRows, setSelectedRows] = useState<Set<number>>(() => new Set());

        const handleSelectAll = () => {
            if (selectedRows.size === TABLE_DATA.length) {
                setSelectedRows(new Set());
            } else {
                setSelectedRows(new Set(TABLE_DATA.map((user) => user.id)));
            }
        };

        const handleSelectRow = (event: FormEvent<HTMLButtonElement>, id: number) => {
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
            <Table.Root {...args} aria-multiselectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>
                            <Checkbox
                                value={isPartiallySelected ? 'indeterminate' : isAllSelected}
                                onChange={handleSelectAll}
                            />
                        </Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Age</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {TABLE_DATA.map((user) => (
                        <Table.Row
                            key={user.id}
                            selected={selectedRows.has(user.id)}
                            onClick={() => console.log(`View details for ${user.firstName}`)}
                        >
                            <Table.RowCell>
                                <Checkbox
                                    value={selectedRows.has(user.id)}
                                    onChange={(event) => handleSelectRow(event, user.id)}
                                />
                            </Table.RowCell>
                            <Table.RowCell>{user.name}</Table.RowCell>
                            <Table.RowCell>{user.age}</Table.RowCell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        );
    },
};

export const CellAlignments: Story = {
    name: 'Cell Alignment Options',
    render: ({ ...args }) => (
        <Table.Root {...args}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell align="left">Left Header</Table.HeaderCell>
                    <Table.HeaderCell align="center">Centered Header</Table.HeaderCell>
                    <Table.HeaderCell align="right">Right Header</Table.HeaderCell>
                    <Table.HeaderCell align="left">Mixed Alignment</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {TABLE_DATA.map((user) => (
                    <Table.Row key={user.id}>
                        <Table.RowCell align="left">{user.firstName}</Table.RowCell>
                        <Table.RowCell align="center">{user.role}</Table.RowCell>
                        <Table.RowCell align="right">{user.age}</Table.RowCell>
                        <Table.RowCell>
                            <Flex justify="space-between" align="center">
                                <span>{user.invited}</span>
                                <span>{user.lastLogin}</span>
                            </Flex>
                        </Table.RowCell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    ),
};

export const WidthControl: Story = {
    render: ({ ...args }) => (
        <div style={{ width: '800px' }}>
            <Table.Root {...args} layout="fixed">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width="100px">Fixed Width & No Shrink</Table.HeaderCell>
                        <Table.HeaderCell width="100px" truncate>
                            Truncated Very Long Header Title That Should Be Cut Off
                        </Table.HeaderCell>
                        <Table.HeaderCell width="50%">Percentage Width</Table.HeaderCell>
                        <Table.HeaderCell>Auto Width</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {TABLE_DATA.map((user) => (
                        <Table.Row key={user.id}>
                            <Table.RowCell>Fixed Width Content</Table.RowCell>
                            <Table.RowCell truncate>
                                {`${user.firstName} ${user.lastName} - ${user.role} - ${user.lastLogin}`}
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

export const NoBorder: Story = {
    name: 'No Border (Within Container)',
    render: ({ ...args }) => (
        <Flex direction="column" gap="2rem">
            <div>
                <h3 style={{ marginBottom: '0.5rem' }}>Without noBorder (default)</h3>
                <div style={{ border: '1px solid var(--color-line-mid)', borderRadius: '8px', padding: '0 1rem' }}>
                    <Table.Root {...args}>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Role</Table.HeaderCell>
                                <Table.HeaderCell>Last Seen</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {TABLE_DATA.slice(0, 3).map((user) => (
                                <Table.Row key={user.id}>
                                    <Table.RowCell>{user.name}</Table.RowCell>
                                    <Table.RowCell>{user.role}</Table.RowCell>
                                    <Table.RowCell>{user.lastSeen}</Table.RowCell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Root>
                </div>
            </div>
            <div>
                <h3 style={{ marginBottom: '0.5rem' }}>With noBorder=true</h3>
                <div style={{ border: '1px solid var(--color-line-mid)', borderRadius: '8px', padding: '0 1rem' }}>
                    <Table.Root {...args} noBorder>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Role</Table.HeaderCell>
                                <Table.HeaderCell>Last Seen</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {TABLE_DATA.slice(0, 3).map((user) => (
                                <Table.Row key={user.id}>
                                    <Table.RowCell>{user.name}</Table.RowCell>
                                    <Table.RowCell>{user.role}</Table.RowCell>
                                    <Table.RowCell>{user.lastSeen}</Table.RowCell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Root>
                </div>
            </div>
        </Flex>
    ),
};

export const CustomGutter: Story = {
    name: 'Custom Gutter Spacing',
    render: ({ ...args }) => (
        <Flex direction="column" gap="2rem">
            <div>
                <h3 style={{ marginBottom: '0.5rem' }}>Default (no extra gutter)</h3>
                <Table.Root {...args}>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Role</Table.HeaderCell>
                            <Table.HeaderCell>Last Seen</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {TABLE_DATA.slice(0, 3).map((user) => (
                            <Table.Row key={user.id}>
                                <Table.RowCell>{user.name}</Table.RowCell>
                                <Table.RowCell>{user.role}</Table.RowCell>
                                <Table.RowCell>{user.lastSeen}</Table.RowCell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            </div>
            <div>
                <h3 style={{ marginBottom: '0.5rem' }}>16px gutter</h3>
                <Table.Root {...args} gutter="16px">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Role</Table.HeaderCell>
                            <Table.HeaderCell>Last Seen</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {TABLE_DATA.slice(0, 3).map((user) => (
                            <Table.Row key={user.id}>
                                <Table.RowCell>{user.name}</Table.RowCell>
                                <Table.RowCell>{user.role}</Table.RowCell>
                                <Table.RowCell>{user.lastSeen}</Table.RowCell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            </div>
            <div>
                <h3 style={{ marginBottom: '0.5rem' }}>48px gutter</h3>
                <Table.Root {...args} gutter="48px">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Role</Table.HeaderCell>
                            <Table.HeaderCell>Last Seen</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {TABLE_DATA.slice(0, 3).map((user) => (
                            <Table.Row key={user.id}>
                                <Table.RowCell>{user.name}</Table.RowCell>
                                <Table.RowCell>{user.role}</Table.RowCell>
                                <Table.RowCell>{user.lastSeen}</Table.RowCell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            </div>
        </Flex>
    ),
};

export const MinimumWidthColumnsWithExpandingLast: Story = {
    name: 'Minimum Width Columns (Last Expands)',
    render: ({ ...args }) => (
        <Table.Root {...args}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell noShrink>Name</Table.HeaderCell>
                    <Table.HeaderCell noShrink>Role</Table.HeaderCell>
                    <Table.HeaderCell>Last Seen (Expands)</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {TABLE_DATA.slice(0, 3).map((user) => (
                    <Table.Row key={user.id}>
                        <Table.RowCell>{user.name}</Table.RowCell>
                        <Table.RowCell>{user.role}</Table.RowCell>
                        <Table.RowCell>{user.lastSeen}</Table.RowCell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    ),
};
