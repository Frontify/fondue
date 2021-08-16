/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import React, { FC, useState } from "react";
import { Checkbox, CheckboxProps, CheckboxState } from "./Checkbox";

const CHECKBOX_LABEL = "Checkbox label";
const CHECKBOX_ID = "[data-test-id=checkbox]";
const CHECKBOX_INPUT_ID = "[data-test-id=checkbox-input]";

const Component: FC<CheckboxProps> = (props) => {
    const [checked, setChecked] = useState<CheckboxState | undefined>(props.state);

    return (
        <Checkbox
            {...props}
            state={checked}
            onChange={(isChecked: boolean) => setChecked(isChecked ? CheckboxState.Checked : CheckboxState.Unchecked)}
        />
    );
};

describe("Checkbox component", () => {
    it("renders with a checkbox icon if checked", () => {
        mount(<Component state={CheckboxState.Checked} />);

        cy.get(CHECKBOX_ID).get("svg").invoke("attr", "name").should("eq", "IconCheck");
        cy.get(CHECKBOX_INPUT_ID).invoke("attr", "aria-checked").should("eq", "true");
    });

    it("renders with a minus icon if indeterminate", () => {
        mount(<Component state={CheckboxState.Mixed} />);

        cy.get(CHECKBOX_ID).get("svg").invoke("attr", "name").should("eq", "IconMinus");
        cy.get(CHECKBOX_INPUT_ID).invoke("attr", "aria-checked").should("eq", "mixed");
    });

    it("renders without an icon if unchecked", () => {
        mount(<Component state={CheckboxState.Unchecked} />);

        cy.get(CHECKBOX_ID).get("svg").should("not.exist");
        cy.get(CHECKBOX_INPUT_ID).invoke("attr", "aria-checked").should("eq", "false");
    });

    it("renders with a label", () => {
        mount(<Component label={CHECKBOX_LABEL} state={CheckboxState.Checked} />);

        cy.get(CHECKBOX_ID).contains(CHECKBOX_LABEL);
    });

    it("renders as disabled", () => {
        mount(<Component label={CHECKBOX_LABEL} disabled state={CheckboxState.Mixed} />);

        cy.get(CHECKBOX_INPUT_ID).invoke("attr", "aria-checked").should("eq", "mixed");
        cy.get(CHECKBOX_INPUT_ID).invoke("attr", "disabled").should("eq", "disabled");
    });

    it("should check with keyboard", () => {
        mount(<Component state={CheckboxState.Unchecked} />);

        cy.get("body").tab();
        cy.get(CHECKBOX_INPUT_ID).should("be.focused");
        cy.get(CHECKBOX_ID).type(" ");
        cy.get(CHECKBOX_INPUT_ID).invoke("attr", "aria-checked").should("eq", "true");
    });
});
