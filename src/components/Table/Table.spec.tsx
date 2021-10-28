/* (c) Copyright Frontify Ltd., all rights reserved. */
import { mount } from "@cypress/react";
import { Button } from "@components/Button/Button";
import { CHECKBOX_ID, CHECKBOX_INPUT_ID } from "@components/Checkbox/Checkbox.spec";
import React from "react";
import { Column, Row, SelectionMode, Table } from "./Table";

const TABLE_COLUMNS: Column[] = [
    { name: "User", key: "user" },
    { name: "Active Sessions", key: "activeSessions" },
    { name: "Regions", key: "regions" },
];

const TABLE_ROWS: Row[] = [
    {
        key: "row-1",
        cells: {
            user: {
                sortId: "anna",
                value: "Anna",
            },
            activeSessions: {
                sortId: 108,
                value: 108,
            },
            regions: {
                sortId: "europe",
                value: "Europe",
            },
        },
    },
    {
        key: "row-2",
        cells: {
            user: {
                sortId: "bobby",
                value: "Bobby",
            },
            activeSessions: {
                sortId: 125,
                value: 125,
            },
            regions: {
                sortId: "asia",
                value: "Asia",
            },
        },
    },
    {
        key: "row-3",
        cells: {
            user: {
                sortId: "chris",
                value: "Chris",
            },
            activeSessions: {
                sortId: 112,
                value: 112,
            },
            regions: {
                sortId: "africa",
                value: "Africa",
            },
        },
    },
];

const TABLE_ROW_ID = "[data-test-id=table-row]";
const TABLE_COLUMN_ID = "[data-test-id=table-column";
const TABLE_SELECT_CELL_ID = "[data-test-id=table-select-cell]";
const TABLE_ACTIONS_ID = "[data-test-id=table-actions]";

describe("Table Component", () => {
    it("should render read only table", () => {
        mount(<Table columns={TABLE_COLUMNS} rows={TABLE_ROWS} />);

        cy.get(TABLE_SELECT_CELL_ID).should("not.exist");
        cy.get(TABLE_COLUMN_ID).should("have.length", 3);
        TABLE_COLUMNS.forEach(({ name }) => cy.get(TABLE_COLUMN_ID).contains(name));
        cy.get(TABLE_ROW_ID).should("have.length", 3);
        TABLE_ROWS.forEach(({ cells }) =>
            Object.values(cells).forEach(({ value }) => cy.get(TABLE_ROW_ID).should("contain", value)),
        );
    });

    it("should render single-select table", () => {
        mount(<Table columns={TABLE_COLUMNS} rows={TABLE_ROWS} selectionMode={SelectionMode.SingleSelect} />);
        cy.get(CHECKBOX_INPUT_ID).first().as("firstCheckbox");

        cy.get(TABLE_SELECT_CELL_ID).children(CHECKBOX_ID).should("have.length", 3);
        cy.get(TABLE_ROW_ID).first().click();
        cy.get("@firstCheckbox").invoke("attr", "aria-checked").should("eq", "true");
        cy.get(TABLE_ROW_ID).last().click();
        cy.get("@firstCheckbox").invoke("attr", "aria-checked").should("eq", "false");
        cy.get(CHECKBOX_INPUT_ID).last().invoke("attr", "aria-checked").should("eq", "true");
    });

    it("should render multi-select table", () => {
        mount(<Table columns={TABLE_COLUMNS} rows={TABLE_ROWS} selectionMode={SelectionMode.MultiSelect} />);
        cy.get(CHECKBOX_INPUT_ID).first().as("headerCheckbox");

        cy.get(TABLE_SELECT_CELL_ID).children(CHECKBOX_ID).should("have.length", 4);
        cy.get(TABLE_ROW_ID).first().click();
        cy.get("@headerCheckbox").invoke("attr", "aria-checked").should("eq", "mixed");
        cy.get(TABLE_SELECT_CELL_ID).first().click();
        cy.get(CHECKBOX_INPUT_ID).each(($el) => cy.wrap($el).invoke("attr", "aria-checked").should("eq", "true"));
        cy.get(TABLE_SELECT_CELL_ID).first().click();
        cy.get(CHECKBOX_INPUT_ID).each(($el) => cy.wrap($el).invoke("attr", "aria-checked").should("eq", "false"));
    });

    it("should render table with actions", () => {
        const onClickStub = cy.stub().as("onClickStub");
        const ROWS_WITH_ACTIONS = TABLE_ROWS.map((row) => ({
            ...row,
            actions: <Button onClick={onClickStub} />,
        }));

        mount(<Table columns={TABLE_COLUMNS} rows={ROWS_WITH_ACTIONS} />);

        cy.get(TABLE_ACTIONS_ID).should("have.length", 3);
        cy.get("@onClickStub").should("not.be.called");
        cy.get(TABLE_ACTIONS_ID).first().click();
        cy.get("@onClickStub").should("be.calledOnce");
    });

    it.only("should sort table", () => {
        mount(<Table columns={TABLE_COLUMNS} rows={TABLE_ROWS} />);

        cy.get(TABLE_ROW_ID).first().get("td").contains("Anna");
        cy.get(TABLE_COLUMN_ID).first().click();
        cy.get(TABLE_ROW_ID).first().get("td").contains("Chris");
        cy.get(TABLE_COLUMN_ID).eq(1).click();
        cy.get(TABLE_ROW_ID).eq(1).get("td").contains(108);
        cy.get(TABLE_COLUMN_ID).eq(1).click();
        cy.get(TABLE_ROW_ID).eq(1).get("td").contains(125);
        cy.get(TABLE_ROW_ID).first().get("td").contains("Bobby");
    });
});
