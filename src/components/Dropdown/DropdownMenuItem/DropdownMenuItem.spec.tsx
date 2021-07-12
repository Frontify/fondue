/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";

import DropdownMenuItem from "./DropdownMenuItem";

const DropdownMenuItem_FOO = "bar";

describe("DropdownMenuItem Component", () => {
    it("should render foo text correctly", () => {
        mount(<DropdownMenuItem foo={DropdownMenuItem_FOO} />);

        cy.get("[data-test-id=DropdownMenuItem]").as("DropdownMenuItem");

        cy.get("@DropdownMenuItem").contains(DropdownMenuItem_FOO);
    });
});
