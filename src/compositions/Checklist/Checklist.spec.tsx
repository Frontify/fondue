/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import { Checkbox, CheckboxState } from "@elements/Checkbox/Checkbox";
import React from "react";
import { Checklist, ChecklistDirection } from "./Checklist";

describe("Checklist Component", () => {
    it("should render the Checklist horizontally", () => {
        mount(
            <Checklist direction={ChecklistDirection.Horizontal}>
                <Checkbox state={CheckboxState.Unchecked} label="Checkbox label" />
                <Checkbox state={CheckboxState.Mixed} label="Checkbox label" />
                <Checkbox state={CheckboxState.Checked} label="Checkbox label" note="Note about this input" disabled />
            </Checklist>,
        );

        cy.get("[data-test-id=checklist]").as("Checklist").should("have.class", "tw-flex");
    });

    it("should render the Checklist vertically", () => {
        mount(
            <Checklist direction={ChecklistDirection.Vertical}>
                <Checkbox state={CheckboxState.Unchecked} label="Checkbox label" />
                <Checkbox state={CheckboxState.Mixed} label="Checkbox label" />
                <Checkbox state={CheckboxState.Checked} label="Checkbox label" note="Note about this input" disabled />
            </Checklist>,
        );

        cy.get("[data-test-id=checklist]").as("Checklist").should("have.class", "tw-grid");
    });

    it("should render the Checklist in two columns", () => {
        mount(
            <Checklist direction={ChecklistDirection.Vertical} columns={2}>
                <Checkbox state={CheckboxState.Unchecked} label="Checkbox label" />
                <Checkbox state={CheckboxState.Mixed} label="Checkbox label" />
                <Checkbox state={CheckboxState.Checked} label="Checkbox label" note="Note about this input" disabled />
            </Checklist>,
        );

        cy.get("[data-test-id=checklist]")
            .as("Checklist")
            .should("have.class", "tw-grid")
            .and("have.class", "tw-grid-cols-2");
    });
});
