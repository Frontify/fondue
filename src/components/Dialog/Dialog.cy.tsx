/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { Dialog } from "./Dialog";

const Dialog_FOO = "bar";

describe("Dialog Component", () => {
    it("should render foo text correctly", () => {
        cy.mount(<Dialog foo={Dialog_FOO} />);

        cy.get("[data-test-id=dialog]").as("Dialog");

        cy.get("@Dialog").contains(Dialog_FOO);
    });
});
