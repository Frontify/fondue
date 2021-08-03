/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import { Checkbox, Style } from "@elements/Checkbox/Checkbox";

import { Checklist, Direction } from "./Checklist";

describe("Checklist Component", () => {
    it("should the Checklist horizontally", () => {
        mount(
            <Checklist direction={Direction.Horizontal}>
                <Checkbox checked="unchecked" style={Style.Primary} label="Checkbox label" />
                <Checkbox checked="mixed" label="Checkbox label" />
                <Checkbox checked="checked" label="Checkbox label" note="Note about this input" disabled />
            </Checklist>,
        );

        cy.get("[data-test-id=checklist]").as("Checklist").should("have.class", "flex-row");
    });

    it("should the Checklist vertically", () => {
        mount(
            <Checklist direction={Direction.Vertical}>
                <Checkbox checked="unchecked" style={Style.Primary} label="Checkbox label" />
                <Checkbox checked="mixed" label="Checkbox label" />
                <Checkbox checked="checked" label="Checkbox label" note="Note about this input" disabled />
            </Checklist>,
        );

        cy.get("[data-test-id=checklist]").as("Checklist").should("have.class", "flex-col");
    });
});
