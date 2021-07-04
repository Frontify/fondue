/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import SidebarItemSearch from "./SidebarItemSearch";

const INPUT_TEXT = "Frontify";

describe("Sidebar Item Search component", () => {
    it("renders", () => {
        const onInputStub = cy.stub().as("onInputStub");

        mount(<SidebarItemSearch onInput={onInputStub} />);

        cy.get("[data-test-id=sidebar-item-search] [data-test-id=text-input]").type(INPUT_TEXT);

        cy.get("@onInputStub").should("have.been.called");
        cy.get("@onInputStub").should("to.have.always.been.callCount", INPUT_TEXT.length);
    });
});
