/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { mount } from "@cypress/react";
import { FrontifyPattern } from "./FrontifyPattern";

const FrontifyPattern_FOO = "bar";

describe("FrontifyPattern Component", () => {
    it("should render foo text correctly", () => {
        mount(<FrontifyPattern foo={FrontifyPattern_FOO} />);

        cy.get("[data-test-id=frontify-pattern]").as("FrontifyPattern");

        cy.get("@FrontifyPattern").contains(FrontifyPattern_FOO);
    });
});
