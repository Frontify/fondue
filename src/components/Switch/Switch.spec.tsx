/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";

import Switch from "./Switch";

const Switch_FOO = "bar";

describe("Switch Component", () => {
    it("should render foo text correctly", () => {
        mount(<Switch foo={Switch_FOO} />);

        cy.get("[data-test-id=Switch]").as("Switch");

        cy.get("@Switch").contains(Switch_FOO);
    });
});
