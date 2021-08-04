/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import { FieldsetHeader, FieldsetHeaderType } from "./FieldsetHeader";

const HEADING = "bar";

describe("FieldsetHeader Composition", () => {
    it("should no fire click handler if disabled", () => {
        const onClick = cy.stub().as("onClickStub");

        mount(
            <FieldsetHeader type={FieldsetHeaderType.Switch} onClick={onClick} disabled>
                {HEADING}
            </FieldsetHeader>,
        );

        cy.get("[data-test-id=fieldset-header]").as("FieldsetHeader");

        cy.get("@onClickStub").should("not.be.called");
    });
});
