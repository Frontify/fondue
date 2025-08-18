/* (c) Copyright Frontify Ltd., all rights reserved. */

import { action } from '@storybook/addon-actions';
import { type Meta, type StoryFn } from '@storybook/react';
import { type ReactElement, useEffect, useState } from 'react';

import { Badge } from '@components/Badge/Badge';
import { Button, ButtonEmphasis, ButtonSize, ButtonStyle } from '@components/Button';
import { TextInput } from '@components/TextInput/TextInput';
import IconDotsVertical from '@foundation/Icon/Generated/IconDotsVertical';
import IconFaceHappy from '@foundation/Icon/Generated/IconFaceHappy';
import { IconSize } from '@foundation/Icon/IconSize';

import { type Column, type Row, SelectionMode, SortDirection, Table, type TableProps } from './Table';

export default {
    title: 'Components/Table',
    component: Table,
    tags: ['autodocs'],
    args: {
        selectionMode: SelectionMode.NoSelect,
    },
    argTypes: {
        type: {
            options: Object.keys(SelectionMode),
            control: { type: 'select' },
        },
    },
} as Meta<TableProps>;

const User = ({ name }: { name: string }): ReactElement => (
    <div className="tw-flex tw-gap-x-2 tw-items-center">
        <IconFaceHappy size={IconSize.Size32} />
        <div>
            <p>{name}</p>
            <p>mb@gmail.com</p>
        </div>
    </div>
);

const ActionButton = (): ReactElement => (
    <Button
        style={ButtonStyle.Default}
        emphasis={ButtonEmphasis.Default}
        aria-label="action menu"
        onClick={action('click')}
        size={ButtonSize.Small}
        icon={<IconDotsVertical />}
    />
);

const columns: Column[] = [
    { name: 'User', key: 'user' },
    { name: 'Active Sessions', key: 'activeSessions', sortable: true },
    { name: 'Last Active', key: 'lastActive' },
    { name: 'Regions', key: 'regions' },
    { name: 'Countries', key: 'countries' },
];

const columnsWithAlignment: Column[] = [
    { name: 'User', key: 'user' },
    { name: 'Active Sessions', key: 'activeSessions', sortable: true, align: 'right' },
    { name: 'Last Active', key: 'lastActive', align: 'right' },
    { name: 'Regions', key: 'regions', align: 'right' },
    { name: 'Countries', key: 'countries' },
];

const columnsWithTitleNode: Column[] = [
    { name: 'User', key: 'user', titleNode: <span className="tw-bg-green-20">user</span> },
    { name: 'Active Sessions', key: 'activeSessions', sortable: true },
    {
        name: 'Last Active',
        key: 'lastActive',
        titleNode: <span className="tw-bg-red-20">number - in %</span>,
    },
    { name: 'Regions', key: 'regions' },
    { name: 'Countries', key: 'countries' },
];

const rows: Row[] = [
    {
        key: 'row-1',
        actionElements: <ActionButton />,
        cells: {
            user: {
                sortId: 'anna',
                value: <User name="Anna" />,
            },
            activeSessions: {
                sortId: 108,
                value: <Badge>108</Badge>,
            },
            lastActive: {
                sortId: 12,
                value: '12 days ago',
            },
            regions: {
                sortId: 'europe',
                value: <Badge>Europe</Badge>,
            },
            countries: {
                sortId: 'france-spain',
                value: (
                    <div className="tw-flex tw-gap-x-2">
                        <Badge>France</Badge>
                        <Badge>Spain</Badge>
                    </div>
                ),
            },
        },
    },
    {
        key: 'row-2',
        actionElements: <ActionButton />,
        cells: {
            user: {
                sortId: 'bobby',
                value: <User name="Bobby" />,
            },
            activeSessions: {
                sortId: 125,
                value: <Badge>125</Badge>,
            },
            lastActive: {
                sortId: 14,
                value: '14 days ago',
            },
            regions: {
                sortId: 'south-america',
                value: <Badge>South America</Badge>,
            },
            countries: {
                sortId: 'brazil-chile',
                value: (
                    <div className="tw-flex tw-gap-x-2">
                        <Badge>Brazil</Badge>
                        <Badge>Chile</Badge>
                    </div>
                ),
            },
        },
    },
    {
        key: 'row-3',
        actionElements: <ActionButton />,
        cells: {
            user: {
                sortId: 'chris',
                value: <User name="Chris" />,
            },
            activeSessions: {
                sortId: 112,
                value: <Badge>112</Badge>,
            },
            lastActive: {
                sortId: 8,
                value: '8 days ago',
            },
            regions: {
                sortId: 'africa',
                value: <Badge>Africa</Badge>,
            },
            countries: {
                sortId: 'marocco-egypt',
                value: (
                    <div className="tw-flex tw-gap-x-2">
                        <Badge>Marocco</Badge>
                        <Badge>Egypt</Badge>
                    </div>
                ),
            },
        },
    },
    {
        key: 'row-4',
        actionElements: <ActionButton />,
        cells: {
            user: {
                sortId: 'david',
                value: <User name="David" />,
            },
            activeSessions: {
                sortId: 42,
                value: <Badge>42</Badge>,
            },
            lastActive: {
                sortId: 6,
                value: '6 days ago',
            },
            regions: {
                sortId: 'europe',
                value: <Badge>Europe</Badge>,
            },
            countries: {
                sortId: 'germany',
                value: (
                    <div className="tw-flex tw-gap-x-2">
                        <Badge>Germany</Badge>
                    </div>
                ),
            },
        },
    },
    {
        key: 'row-5',
        actionElements: <ActionButton />,
        cells: {
            user: {
                sortId: 'emily',
                value: <User name="Emily" />,
            },
            activeSessions: {
                sortId: 67,
                value: <Badge>67</Badge>,
            },
            lastActive: {
                sortId: 10,
                value: '10 days ago',
            },
            regions: {
                sortId: 'asia',
                value: <Badge>Asia</Badge>,
            },
            countries: {
                sortId: 'thailand',
                value: (
                    <div className="tw-flex tw-gap-x-2">
                        <Badge>Thailand</Badge>
                    </div>
                ),
            },
        },
    },
];

const Template: StoryFn<TableProps> = (args) => {
    const [selectedRows, setSelectedRows] = useState<(string | number)[]>([]);
    const [sortedRows, setSortedRows] = useState<Row[]>(args.rows || rows);

    const onSortChange = (key: string, direction?: SortDirection) => {
        const sortRows = () => {
            const clonedRows = [...sortedRows];

            clonedRows.sort((a, b) => {
                const keyA = a.cells[key].sortId;
                const keyB = b.cells[key].sortId;

                if (direction === SortDirection.Descending) {
                    return keyA < keyB ? -1 : 1;
                } else {
                    return keyA < keyB ? 1 : -1;
                }
            });
            setSortedRows(clonedRows);
        };
        sortRows();
    };

    return (
        <Table
            {...args}
            columns={args.columns ?? columns}
            rows={sortedRows}
            selectedRowIds={selectedRows}
            onSelectionChange={(ids) => setSelectedRows((ids as (string | number)[]) || [])}
            onSortChange={onSortChange}
        />
    );
};

const TemplateWithSearch: StoryFn<TableProps> = (args) => {
    const [filteredRows, setFilteredRows] = useState<Row[]>(rows);
    const [selectedRows, setSelectedRows] = useState<(string | number)[]>([]);

    const [filter, setFilter] = useState('');

    useEffect(() => {
        if (filter === '') {
            setFilteredRows(rows);
        }
        const newFilteredRowsValue = rows.filter((row) => {
            const cells = Object.values(row.cells);
            return cells.some((cell) => String(cell.sortId).includes(filter));
        });
        setFilteredRows(newFilteredRowsValue);
    }, [filter]);

    const onSortChange = (key: string, direction?: SortDirection) => {
        const sortRows = () => {
            const clonedRows = [...filteredRows];

            clonedRows.sort((a, b) => {
                const keyA = a.cells[key].sortId;
                const keyB = b.cells[key].sortId;

                if (direction === SortDirection.Descending) {
                    return keyA < keyB ? -1 : 1;
                } else {
                    return keyA < keyB ? 1 : -1;
                }
            });
            setFilteredRows(clonedRows);
        };
        sortRows();
    };

    return (
        <>
            <TextInput
                value={filter}
                onChange={(val) => setFilter(val)}
                placeholder={'Filter rows by "sortId" value'}
            />
            <Table
                {...args}
                columns={columns}
                rows={filteredRows}
                selectedRowIds={selectedRows}
                onSelectionChange={(ids) => setSelectedRows((ids as (string | number)[]) || [])}
                onSortChange={onSortChange}
            />
        </>
    );
};

export const ReadOnly = Template.bind({});

export const SingleSelect = Template.bind({});
SingleSelect.args = {
    selectionMode: SelectionMode.SingleSelect,
};

export const MultiSelect = Template.bind({});
MultiSelect.args = {
    selectionMode: SelectionMode.MultiSelect,
};

export const FilterRows = TemplateWithSearch.bind({});

export const ColumnAlignment = Template.bind({});
ColumnAlignment.args = {
    columns: columnsWithAlignment,
};

export const ColumnTitleNodes = Template.bind({});
ColumnTitleNodes.args = {
    columns: columnsWithTitleNode,
};
