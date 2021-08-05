/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { mount } from "@cypress/react";
import { Orientation } from "@utilities/enum";
import { FormControl, HelperPosition } from "./FormControl";

const FORM_CONTROL_ID = "[data-test-id=form-control]";
const FORM_CONTROL_EXTRA_ID = "[data-test-id=form-control-extra]";
const FORM_CONTROL_HELPER_TEXT_ID = "[data-test-id=form-control-helper-text]";
const FORM_CONTROL_CONTENT = "Control Input could be anything...";

describe("FormControl Component", () => {
    it("should render a form control", () => {
        mount(<FormControl>{FORM_CONTROL_CONTENT}</FormControl>);

        cy.get(FORM_CONTROL_ID).should("be.visible").and("contain", FORM_CONTROL_CONTENT);
    });

    it("should render a horizontal form control", () => {
        mount(<FormControl orientation={Orientation.Horizontal}>{FORM_CONTROL_CONTENT}</FormControl>);

        cy.get(FORM_CONTROL_ID).should("have.css", "flex-direction", "row");
    });

    it("should render a form control with an extra", () => {
        const EXTRA_TEXT = "Extra text";
        mount(<FormControl extra={EXTRA_TEXT}>{FORM_CONTROL_CONTENT}</FormControl>);

        cy.get(FORM_CONTROL_EXTRA_ID).should("contain", EXTRA_TEXT);
    });

    it("should render a form control with a label", () => {
        const LABEL_TEXT = "Label";
        mount(<FormControl label={{ htmlFor: "foo", children: LABEL_TEXT }}>{FORM_CONTROL_CONTENT}</FormControl>);

        cy.get(FORM_CONTROL_ID).should("contain", LABEL_TEXT);
    });

    it("should render a helper text before the control content", () => {
        const HELPER_TEXT = "Helper text";
        mount(
            <FormControl
                helper={{
                    text: HELPER_TEXT,
                    position: HelperPosition.Before,
                }}
            >
                {FORM_CONTROL_CONTENT}
            </FormControl>,
        );

        cy.get(FORM_CONTROL_HELPER_TEXT_ID).should("be.visible");
        // check if the helper text is only present once
        cy.get(FORM_CONTROL_HELPER_TEXT_ID).should("have.length", 1);
        cy.get(FORM_CONTROL_ID)
            .children()
            .first()
            .should("contain", HELPER_TEXT)
            .and("not.contain", FORM_CONTROL_CONTENT);
    });

    it("should render a helper text after the control content", () => {
        const HELPER_TEXT = "Helper text";
        mount(<FormControl helper={{ text: HELPER_TEXT }}>{FORM_CONTROL_CONTENT}</FormControl>);

        cy.get(FORM_CONTROL_HELPER_TEXT_ID).should("be.visible");
        cy.get(FORM_CONTROL_ID)
            .children()
            .first()
            .should("contain", FORM_CONTROL_CONTENT)
            .next()
            .and("contain", HELPER_TEXT);
    });
});
