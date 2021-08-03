/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import { FC, useState } from "react";
import { Checkbox, CheckboxProps } from "./Checkbox";

const CHECKBOX_LABEL = "Checkbox label";

const Component: FC<CheckboxProps> = (props) => {
    const [checked, setChecked] = useState<"checked" | "unchecked" | "mixed" | undefined>(props.checked);

    return (
        <Checkbox
            {...props}
            checked={checked}
            onChange={(isChecked: boolean) => setChecked(isChecked ? "checked" : "unchecked")}
        />
    );
};

describe("Checkbox component", () => {
    it("renders with a checkbox icon if checked", () => {
        mount(<Component checked="checked" />);

        cy.get("[data-test-id=checkbox]").as("checkbox");
        cy.get("@checkbox").get("svg").invoke("attr", "name").should("eq", "IconCheck");
        cy.get("@checkbox").get("input").invoke("attr", "aria-checked").should("eq", "true");
    });

    it("renders with a minus icon if indeterminate", () => {
        mount(<Component checked="mixed" />);

        cy.get("[data-test-id=checkbox]").as("checkbox");
        cy.get("@checkbox").get("svg").invoke("attr", "name").should("eq", "IconMinus");
        cy.get("@checkbox").get("input").invoke("attr", "aria-checked").should("eq", "mixed");
    });

    it("renders without an icon if unchecked", () => {
        mount(<Component checked="unchecked" />);

        cy.get("[data-test-id=checkbox]").as("checkbox");
        cy.get("@checkbox").get("svg").should("not.exist");
        cy.get("@checkbox").get("input").invoke("attr", "aria-checked").should("eq", "false");
    });

    it("renders with a label", () => {
        mount(<Component label={CHECKBOX_LABEL} checked="checked" />);

        cy.get("[data-test-id=checkbox]").as("checkbox");
        cy.get("@checkbox").contains(CHECKBOX_LABEL);
    });

    it("renders as disabled if disabled", () => {
        mount(<Component label={CHECKBOX_LABEL} disabled checked="mixed" />);

        cy.get("[data-test-id=checkbox]").as("checkbox");
        cy.get("@checkbox").get("input").invoke("attr", "aria-checked").should("eq", "mixed");
        cy.get("@checkbox").get("input").invoke("attr", "disabled").should("eq", "disabled");
    });
});
