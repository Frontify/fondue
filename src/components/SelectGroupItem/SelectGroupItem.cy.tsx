/* (c) Copyright Frontify Ltd., all rights reserved. */

import { SelectGroupItems } from "./SelectGroupItems";

const SelectGroupItems_FOO = "bar";

describe("SelectGroupItems Component", () => {
    it("should render foo text correctly", () => {
        cy.mount(<SelectGroupItems foo={SelectGroupItems_FOO} />);

        cy.get("[data-test-id=select-group-items]").as("SelectGroupItems");

        cy.get("@SelectGroupItems").contains(SelectGroupItems_FOO);
    });
});
