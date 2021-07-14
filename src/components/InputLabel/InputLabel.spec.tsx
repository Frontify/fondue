/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";

import InputLabel from "./InputLabel";

const InputLabel_FOO = "bar";

describe("InputLabel Component", () => {
    it("should render foo text correctly", () => {
        mount(<InputLabel htmlFor="foo">{InputLabel_FOO}</InputLabel>);

        cy.get("[data-test-id=input-label]").as("InputLabel");

        cy.get("@InputLabel").contains(InputLabel_FOO);
    });
});
