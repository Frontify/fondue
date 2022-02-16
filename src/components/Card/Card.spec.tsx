/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { mount } from "@cypress/react";
import { Card } from "./Card";
import { FOCUS_STYLE } from "@utilities/focusStyle";

const CARD_ID = "[data-test-id=card]";

const CARD_CHILDREN = <div>child</div>;

describe("Card Component", () => {
    it("should render children correctly", () => {
        mount(<Card>{CARD_CHILDREN}</Card>);

        cy.get(CARD_ID).contains("child");
    });

    it("should call onClick", () => {
        const stubbedOnClick = cy.stub();
        mount(<Card onClick={stubbedOnClick}>{CARD_CHILDREN}</Card>);

        cy.get(CARD_ID).click();
        cy.get(CARD_ID).invoke("attr", "tabIndex").should("equal", "0");
        cy.wrap(stubbedOnClick).should("have.been.called");
    });

    it("should be accessible", () => {
        const stubbedOnClick = cy.stub();
        mount(<Card onClick={stubbedOnClick}>{CARD_CHILDREN}</Card>);

        cy.window().focus();
        cy.get("body").realPress("Tab");
        cy.get(CARD_ID).should("have.class", FOCUS_STYLE);
        cy.get(CARD_ID).realPress("Enter");
        cy.wrap(stubbedOnClick).should("have.been.called");
    });

    it("should not be focusable/tabbable if no onClick supplied", () => {
        mount(<Card>{CARD_CHILDREN}</Card>);

        cy.get(CARD_ID).invoke("attr", "tabIndex").should("be.undefined");
    });
});
