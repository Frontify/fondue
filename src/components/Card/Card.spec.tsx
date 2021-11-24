/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { mount } from "@cypress/react";
import { Card } from "./Card";

const Card_FOO = "bar";

describe("Card Component", () => {
    it("should render foo text correctly", () => {
        mount(<Card foo={Card_FOO} />);

        cy.get("[data-test-id=card]").as("Card");

        cy.get("@Card").contains(Card_FOO);
    });
});
