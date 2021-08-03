/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";

import { Checklist } from "./Checklist";

const Checklist_FOO = "bar";

describe("Checklist Component", () => {
    it("should render foo text correctly", () => {
        mount(<Checklist foo={Checklist_FOO} />);

        cy.get("[data-test-id=checklist]").as("Checklist");

        cy.get("@Checklist").contains(Checklist_FOO);
    });
});
