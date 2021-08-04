/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import { Checkbox, CheckboxState, CheckboxStyle } from "@elements/Checkbox/Checkbox";

import { Checklist, Direction } from "./Checklist";

describe("Checklist Component", () => {
    it("should the Checklist horizontally", () => {
        mount(
            <Checklist direction={Direction.Horizontal}>
                <Checkbox checked={CheckboxState.Unchecked} style={CheckboxStyle.Primary} label="Checkbox label" />
                <Checkbox checked={CheckboxState.Mixed} label="Checkbox label" />
                <Checkbox
                    checked={CheckboxState.Checked}
                    label="Checkbox label"
                    note="Note about this input"
                    disabled
                />
            </Checklist>,
        );

        cy.get("[data-test-id=checklist]").as("Checklist").should("have.class", "flex-row");
    });

    it("should the Checklist vertically", () => {
        mount(
            <Checklist direction={Direction.Vertical}>
                <Checkbox checked={CheckboxState.Unchecked} style={CheckboxStyle.Primary} label="Checkbox label" />
                <Checkbox checked={CheckboxState.Mixed} label="Checkbox label" />
                <Checkbox
                    checked={CheckboxState.Checked}
                    label="Checkbox label"
                    note="Note about this input"
                    disabled
                />
            </Checklist>,
        );

        cy.get("[data-test-id=checklist]").as("Checklist").should("have.class", "flex-col");
    });
});
