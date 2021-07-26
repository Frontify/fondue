/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import Button from "./Button";

const BUTTON_TEXT = "Frontify";
const BUTTON_ID = "[data-test-id=button]";

describe("Button component", () => {
    it("renders", () => {
        mount(<Button>{BUTTON_TEXT}</Button>);

        cy.get(BUTTON_ID).should("be.visible");
        cy.get(BUTTON_ID).contains(BUTTON_TEXT);
    });

    it("reacts on click", () => {
        const onClickStub = cy.stub().as("onClickStub");

        mount(<Button onClick={onClickStub}>{BUTTON_TEXT}</Button>);

        cy.get("@onClickStub").should("not.be.called");
        cy.get(BUTTON_ID).click();
        cy.get("@onClickStub").should("be.calledOnce");
    });

    it("does not react on click when disabled", () => {
        mount(<Button disabled>{BUTTON_TEXT}</Button>);
        cy.get(BUTTON_ID).invoke("attr", "disabled").should("eq", "disabled");
    });
});
