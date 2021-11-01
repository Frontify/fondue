/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { mount } from "@cypress/react";
import { Panel } from "./Panel";

const Panel_FOO = "bar";

describe("Panel Component", () => {
    it("should render foo text correctly", () => {
        mount(<Panel foo={Panel_FOO} />);

        cy.get("[data-test-id=panel]").as("Panel");

        cy.get("@Panel").contains(Panel_FOO);
    });
});
