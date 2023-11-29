/* (c) Copyright Frontify Ltd., all rights reserved. */

import { SelectItem } from "./SelectItem";

const SelectItem_FOO = "bar";

describe("SelectItem Component", () => {
    it("should render foo text correctly", () => {
        cy.mount(<SelectItem foo={SelectItem_FOO} />);

        cy.get("[data-test-id=select-item]").as("SelectItem");

        cy.get("@SelectItem").contains(SelectItem_FOO);
    });
});
