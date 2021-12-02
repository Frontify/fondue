/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { mount } from "@cypress/react";
import { Card } from "./Card";

const CARD_CHILDREN = <div>child</div>;

describe("Card Component", () => {
    it("should render children correctly", () => {
        mount(<Card>{CARD_CHILDREN}</Card>);

        cy.get("[data-test-id=card]").as("Card");
        cy.get("@Card").contains("child");
    });
});
