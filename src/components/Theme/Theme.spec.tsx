/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { mount } from "@cypress/react";
import { Theme } from "./Theme";

const Theme_FOO = "bar";

describe("Theme Component", () => {
    it("should render foo text correctly", () => {
        mount(<Theme foo={Theme_FOO} />);

        cy.get("[data-test-id=theme]").as("Theme");

        cy.get("@Theme").contains(Theme_FOO);
    });
});
