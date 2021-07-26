/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import { FC, useState } from "react";
import Checkbox, { CheckboxProps, CheckboxSelectionState } from "./Checkbox";

const CHECKBOX_LABEL = "Holà";

const Component: FC<CheckboxProps> = (props: CheckboxProps) => {
    const [checkboxValue, setCheckboxValue] = useState(props.value);

    return <Checkbox {...props} value={checkboxValue} onChange={(value) => setCheckboxValue(value)} />;
};

describe("Checkbox component", () => {
    it("renders", () => {
        mount(<Component label={CHECKBOX_LABEL} />);

        cy.get("[data-test-id=checkbox]").as("checkbox");
        cy.get("[data-test-id=checkbox-wrapper]").contains(CHECKBOX_LABEL);
    });

    it("has the unselected state", () => {
        mount(<Component value={CheckboxSelectionState.Unselected} />);

        cy.get("[data-test-id=checkbox]").as("checkbox");
        cy.get("@checkbox").should("have.attr", "aria-checked", "false");
    });

    it("has the selected state", () => {
        mount(<Component value={CheckboxSelectionState.Selected} />);

        cy.get("[data-test-id=checkbox]").as("checkbox");
        cy.get("@checkbox").should("have.attr", "aria-checked", "true");
    });

    it("has the default state of indeterminate", () => {
        mount(<Component value={CheckboxSelectionState.Indeterminate} />);

        cy.get("[data-test-id=checkbox]").as("checkbox");
        cy.get("@checkbox").should("have.attr", "aria-checked", "mixed");
    });

    it("has a label", () => {
        mount(<Component label={CHECKBOX_LABEL} />);

        cy.get("[data-test-id=checkbox-wrapper]").contains(CHECKBOX_LABEL);
        cy.get("[data-test-id=input-label]").should("have.length", 1);
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
