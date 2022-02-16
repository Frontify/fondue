/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { mount } from "@cypress/react";
import { Card } from "./Card";

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
        cy.wrap(stubbedOnClick).should("have.been.called");
    });
});
