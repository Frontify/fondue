/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import { Style } from "@utilities/enum";
import FormControl, { FormControlDirection, HelperPosition } from "./FormControl";
import css from "./FormControl.module.css";

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
        mount(<FormControl direction={FormControlDirection.Horizontal}>{FORM_CONTROL_CONTENT}</FormControl>);

        cy.get(FORM_CONTROL_ID).should("not.have.class", css.vertical);
    });

    it("should render a form control with an extra", () => {
        const EXTRA_TEXT = "Extra text";
        mount(<FormControl extra={EXTRA_TEXT}>{FORM_CONTROL_CONTENT}</FormControl>);

        cy.get(FORM_CONTROL_EXTRA_ID).should("contain", EXTRA_TEXT);
    });

    it("should render a form control with a label", () => {
        const LABEL_TEXT = "Label";
        mount(<FormControl label={{ children: LABEL_TEXT }}>{FORM_CONTROL_CONTENT}</FormControl>);

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

    it("should render a disabled form control", () => {
        mount(
            <FormControl
                label={{ children: "Label" }}
                helper={{
                    text: "Helper text",
                    position: HelperPosition.Before,
                }}
                disabled
            >
                {FORM_CONTROL_CONTENT}
            </FormControl>,
        );

        cy.get(FORM_CONTROL_ID).children().last().should("have.class", css.disabled);
    });

    it("should render an error helper text", () => {
        mount(
            <FormControl
                label={{ children: "Label" }}
                helper={{
                    text: "Helper text",
                    style: Style.Error,
                }}
            >
                {FORM_CONTROL_CONTENT}
            </FormControl>,
        );

        cy.get(FORM_CONTROL_ID).children().last().should("have.class", css.error);
    });

    it("should render an success helper text", () => {
        mount(
            <FormControl
                label={{ children: "Label" }}
                helper={{
                    text: "Helper text",
                    style: Style.Success,
                }}
            >
                {FORM_CONTROL_CONTENT}
            </FormControl>,
        );

        cy.get(FORM_CONTROL_ID).children().last().should("have.class", css.success);
    });
});
