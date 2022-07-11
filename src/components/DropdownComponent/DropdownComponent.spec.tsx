/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { mount } from "@cypress/react";
import { DropdownComponent } from "./DropdownComponent";

const DropdownComponent_FOO = "bar";

describe("DropdownComponent Component", () => {
    it("should render foo text correctly", () => {
        mount(<DropdownComponent foo={DropdownComponent_FOO} />);

        cy.get("[data-test-id=dropdown-component]").as("DropdownComponent");

        cy.get("@DropdownComponent").contains(DropdownComponent_FOO);
    });
});
