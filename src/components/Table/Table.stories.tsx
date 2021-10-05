/* (c) Copyright Frontify Ltd., all rights reserved. */

import IconIcons from "@elements/Icon/Generated/IconIcons";
import { Meta, Story } from "@storybook/react";
import React from "react";
import { Column, Row, Table, TableProps, TableType } from "./Table";

export default {
    title: "Compositions/Table",
    component: Table,
    args: {
        type: TableType.Default,
    },
    argTypes: {
        type: {
            options: Object.keys(TableType),
            control: { type: "select" },
        },
    },
} as Meta<TableProps>;

const columns: Column[] = [
    { name: "Name", key: "name" },
    { name: "Icon", key: "icon" },
    { name: "Date", key: "date" },
];

const rows: Row[] = [
    { id: 1, name: "test.pdf", date: "6/7/2020", icon: <IconIcons /> },
    { id: 2, name: "docs", date: "11/20/2010", icon: <IconIcons /> },
    { id: 3, name: "log", date: "1/18/2016", icon: <IconIcons /> },
];

const Template: Story<TableProps> = (args) => <Table {...args} columns={columns} rows={rows} />;

export const ReadOnly = Template.bind({});

export const SingleSelect = Template.bind({});
SingleSelect.args = {
    type: TableType.SingleSelect,
};

export const MultiSelect = Template.bind({});
MultiSelect.args = {
    type: TableType.MultiSelect,
};
