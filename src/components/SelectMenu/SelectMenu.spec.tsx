/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { mount } from "@cypress/react";
import { SelectMenu } from "./SelectMenu";

const SelectMenu_FOO = "bar";

describe("SelectMenu Component", () => {
    it("should render foo text correctly", () => {
        mount(<SelectMenu foo={SelectMenu_FOO} />);

        cy.get("[data-test-id=select-menu]").as("SelectMenu");

        cy.get("@SelectMenu").contains(SelectMenu_FOO);
    });
});
