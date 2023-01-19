/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { DialogHeader } from "./DialogHeader";

const DialogHeader_FOO = "bar";

describe("DialogHeader Component", () => {
    it("should render foo text correctly", () => {
        cy.mount(<DialogHeader foo={DialogHeader_FOO} />);

        cy.get("[data-test-id=dialog-header]").as("DialogHeader");

        cy.get("@DialogHeader").contains(DialogHeader_FOO);
    });
});
