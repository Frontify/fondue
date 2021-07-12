/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";

import Dropdown from "./Dropdown";

const Dropdown_FOO = "bar";

describe("Dropdown Component", () => {
    it("should render foo text correctly", () => {
        mount(<Dropdown foo={Dropdown_FOO} />);

        cy.get("[data-test-id=Dropdown]").as("Dropdown");

        cy.get("@Dropdown").contains(Dropdown_FOO);
    });
});
