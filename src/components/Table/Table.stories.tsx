/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, Story } from "@storybook/react";
import React from "react";
import { Column, Row, Table, TableProps } from "./Table";

export default {
    title: "Compositions/Table",
    component: Table,
} as Meta<TableProps>;

const columns: Column[] = [
    { name: "Name", key: "name" },
    { name: "Type", key: "type" },
    { name: "Date", key: "date" },
];

const rows: Row[] = [
    { id: 1, name: "test.pdf", date: "6/7/2020", type: "File" },
    { id: 2, name: "docs", date: "11/20/2010", type: "Folder" },
    { id: 3, name: "log", date: "1/18/2016", type: "Folder" },
];

const Template: Story<TableProps> = (args) => <Table {...args} columns={columns} rows={rows} />;

export const Default = Template.bind({});
