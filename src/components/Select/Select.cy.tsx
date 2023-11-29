/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Select } from "./Select";

const Select_FOO = "bar";

describe("Select Component", () => {
    it("should render foo text correctly", () => {
        cy.mount(<Select foo={Select_FOO} />);

        cy.get("[data-test-id=select]").as("Select");

        cy.get("@Select").contains(Select_FOO);
    });
});
