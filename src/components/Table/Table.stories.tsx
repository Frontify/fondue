/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Badge } from "@elements/Badge/Badge";
import { Button, ButtonSize, ButtonStyle } from "@elements/Button/Button";
import IconActions from "@elements/Icon/Generated/IconActions";
import IconEmojiHappy from "@elements/Icon/Generated/IconEmojiHappy";
import { IconSize } from "@elements/Icon/IconSize";
import { action } from "@storybook/addon-actions";
import { Meta, Story } from "@storybook/react";
import React, { FC, useState } from "react";
import { Column, Row, SelectionMode, Table, TableProps } from "./Table";

export default {
    title: "Compositions/Table",
    component: Table,
    args: {
        selectionMode: SelectionMode.NoSelect,
    },
    argTypes: {
        type: {
            options: Object.keys(SelectionMode),
            control: { type: "select" },
        },
    },
} as Meta<TableProps>;

const User: FC<{ name: string }> = ({ name }) => (
    <div className="tw-flex tw-gap-x-2 tw-items-center">
        <IconEmojiHappy size={IconSize.Size32} />
        <div>
            <p>{name}</p>
            <p>mb@gmail.com</p>
        </div>
    </div>
);

const ActionButton: FC = () => (
    <Button onClick={action("click")} size={ButtonSize.Small} style={ButtonStyle.Secondary} icon={<IconActions />} />
);

const columns: Column[] = [
    { name: "User", key: "user" },
    { name: "Active Sessions", key: "activeSessions" },
    { name: "Last Active", key: "lastActive" },
    { name: "Regions", key: "regions" },
    { name: "Countries", key: "countries" },
];

const rows: Row[] = [
    {
        key: "row-1",
        actions: <ActionButton />,
        cells: {
            user: {
                sortId: "anna",
                value: <User name="Anna" />,
            },
            activeSessions: {
                sortId: 108,
                value: <Badge>108</Badge>,
            },
            lastActive: {
                sortId: 12,
                value: "12 days ago",
            },
            regions: {
                sortId: "europe",
                value: <Badge>Europe</Badge>,
            },
            countries: {
                sortId: "france-spain",
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
        key: "row-2",
        actions: <ActionButton />,
        cells: {
            user: {
                sortId: "bobby",
                value: <User name="Bobby" />,
            },
            activeSessions: {
                sortId: 125,
                value: <Badge>125</Badge>,
            },
            lastActive: {
                sortId: 14,
                value: "14 days ago",
            },
            regions: {
                sortId: "south-america",
                value: <Badge>South America</Badge>,
            },
            countries: {
                sortId: "brazil-chile",
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
        key: "row-3",
        actions: <ActionButton />,
        cells: {
            user: {
                sortId: "chris",
                value: <User name="Chris" />,
            },
            activeSessions: {
                sortId: 112,
                value: <Badge>112</Badge>,
            },
            lastActive: {
                sortId: 8,
                value: "8 days ago",
            },
            regions: {
                sortId: "africa",
                value: <Badge>Africa</Badge>,
            },
            countries: {
                sortId: "marocco-egypt",
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
        key: "row-4",
        actions: <ActionButton />,
        cells: {
            user: {
                sortId: "david",
                value: <User name="David" />,
            },
            activeSessions: {
                sortId: 42,
                value: <Badge>42</Badge>,
            },
            lastActive: {
                sortId: 6,
                value: "6 days ago",
            },
            regions: {
                sortId: "europe",
                value: <Badge>Europe</Badge>,
            },
            countries: {
                sortId: "germany",
                value: (
                    <div className="tw-flex tw-gap-x-2">
                        <Badge>Germany</Badge>
                    </div>
                ),
            },
        },
    },
    {
        key: "row-5",
        actions: <ActionButton />,
        cells: {
            user: {
                sortId: "emily",
                value: <User name="Emily" />,
            },
            activeSessions: {
                sortId: 67,
                value: <Badge>67</Badge>,
            },
            lastActive: {
                sortId: 10,
                value: "10 days ago",
            },
            regions: {
                sortId: "asia",
                value: <Badge>Asia</Badge>,
            },
            countries: {
                sortId: "thailand",
                value: (
                    <div className="tw-flex tw-gap-x-2">
                        <Badge>Thailand</Badge>
                    </div>
                ),
            },
        },
    },
];

const Template: Story<TableProps> = (args) => {
    const [selectedRows, setSelectedRows] = useState<(string | number)[]>([]);

    return (
        <Table
            {...args}
            columns={columns}
            rows={rows}
            selectedRowIds={selectedRows}
            onSelectionChange={(ids) => setSelectedRows(ids || [])}
        />
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
