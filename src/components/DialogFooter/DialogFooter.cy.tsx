/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { DialogFooter } from "./DialogFooter";

const DialogFooter_FOO = "bar";

describe("DialogFooter Component", () => {
    it("should render foo text correctly", () => {
        cy.mount(<DialogFooter foo={DialogFooter_FOO} />);

        cy.get("[data-test-id=dialog-footer]").as("DialogFooter");

        cy.get("@DialogFooter").contains(DialogFooter_FOO);
    });
});
