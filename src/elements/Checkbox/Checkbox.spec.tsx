/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC, useState } from "react";
import { mount } from "@cypress/react";
import { Checkbox, CheckboxProps, CheckboxSelectionState } from "./Checkbox";

const CHECKBOX_LABEL = "Holà";

const Component: FC<CheckboxProps> = (props) => {
    const [checkboxValue, setCheckboxValue] = useState(props.checked);

    return <Checkbox {...props} checked={checkboxValue} onChange={(value) => setCheckboxValue(value)} />;
};

describe("Checkbox component", () => {
    it("renders", () => {
        mount(<Component label={CHECKBOX_LABEL} />);

        cy.get("[data-test-id=checkbox]").as("checkbox");
        cy.get("[data-test-id=checkbox-wrapper]").contains(CHECKBOX_LABEL);
    });

    it("has the unselected state", () => {
        mount(<Component checked={CheckboxSelectionState.Unselected} />);

        cy.get("[data-test-id=checkbox]").as("checkbox");
        cy.get("@checkbox").should("have.attr", "aria-checked", "false");
    });

    it("has the selected state", () => {
        mount(<Component checked={CheckboxSelectionState.Selected} />);

        cy.get("[data-test-id=checkbox]").as("checkbox");
        cy.get("@checkbox").should("have.attr", "aria-checked", "true");
    });

    it("has the default state of indeterminate", () => {
        mount(<Component checked={CheckboxSelectionState.Indeterminate} />);

        cy.get("[data-test-id=checkbox]").as("checkbox");
        cy.get("@checkbox").should("have.attr", "aria-checked", "mixed");
    });

    it("has a disabled state", () => {
        mount(<Component disabled={true} />);

        cy.get("[data-test-id=checkbox]").as("checkbox");

        cy.get("@checkbox").should("have.attr", "aria-disabled", "true");

        cy.get("@checkbox").click({ force: true });

        cy.get("@checkbox").should("have.attr", "aria-checked", "false");
    });

    it("cycle in the selection state on click", () => {
        mount(<Component />);

        cy.get("[data-test-id=checkbox]").as("checkbox");

        cy.get("@checkbox").should("have.attr", "aria-checked", "false");

        cy.get("@checkbox").click({ force: true });

        cy.get("@checkbox").should("have.attr", "aria-checked", "true");

        cy.get("@checkbox").click({ force: true });

        cy.get("@checkbox").should("have.attr", "aria-checked", "false");
    });
});
