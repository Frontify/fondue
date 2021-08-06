/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { mount } from "@cypress/react";
import { Checkbox, CheckboxState, CheckboxStyle } from "@elements/Checkbox/Checkbox";
import { Checklist, ChecklistDirection } from "./Checklist";

describe("Checklist Component", () => {
    it("should render the Checklist horizontally", () => {
        mount(
            <Checklist direction={ChecklistDirection.Horizontal}>
                <Checkbox state={CheckboxState.Unchecked} style={CheckboxStyle.Primary} label="Checkbox label" />
                <Checkbox state={CheckboxState.Mixed} label="Checkbox label" />
                <Checkbox state={CheckboxState.Checked} label="Checkbox label" note="Note about this input" disabled />
            </Checklist>,
        );

        cy.get("[data-test-id=checklist]").as("Checklist").should("have.class", "tw-flex-row");
    });

    it("should render the Checklist vertically", () => {
        mount(
            <Checklist direction={ChecklistDirection.Vertical}>
                <Checkbox state={CheckboxState.Unchecked} style={CheckboxStyle.Primary} label="Checkbox label" />
                <Checkbox state={CheckboxState.Mixed} label="Checkbox label" />
                <Checkbox state={CheckboxState.Checked} label="Checkbox label" note="Note about this input" disabled />
            </Checklist>,
        );

        cy.get("[data-test-id=checklist]").as("Checklist").should("have.class", "tw-flex-col");
    });
});
