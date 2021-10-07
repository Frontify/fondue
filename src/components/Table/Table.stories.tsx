/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Badge } from "@elements/Badge/Badge";
import IconEmojiHappy from "@elements/Icon/Generated/IconEmojiHappy";
import { IconSize } from "@elements/Icon/IconSize";
import { Meta, Story } from "@storybook/react";
import React, { useState } from "react";
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

const User = () => (
    <div className="tw-flex tw-gap-x-2 tw-items-center">
        <IconEmojiHappy size={IconSize.Size32} />
        <div>
            <p>Michael Bolton</p>
            <p>mb@gmail.com</p>
        </div>
    </div>
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
        id: 1,
        user: <User />,
        activeSessions: <Badge>112</Badge>,
        lastActive: "12 days ago",
        regions: <Badge>Europe</Badge>,
        countries: (
            <div className="tw-flex tw-gap-x-2">
                <Badge>Switzerland</Badge>
                <Badge>France</Badge>
            </div>
        ),
    },
    {
        id: "2",
        user: <User />,
        activeSessions: <Badge>112</Badge>,
        lastActive: "12 days ago",
        regions: <Badge>Europe</Badge>,
        countries: (
            <div className="tw-flex tw-gap-x-2">
                <Badge>Switzerland</Badge>
                <Badge>France</Badge>
            </div>
        ),
    },
    {
        id: 3,
        user: <User />,
        activeSessions: <Badge>112</Badge>,
        lastActive: "12 days ago",
        regions: <Badge>Europe</Badge>,
        countries: (
            <div className="tw-flex tw-flex-wrap tw-gap-x-2">
                <Badge>Switzerland</Badge>
                <Badge>France</Badge>
            </div>
        ),
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
