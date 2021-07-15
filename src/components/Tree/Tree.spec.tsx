/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";

import Tree from "./Tree";

const Tree_FOO = "bar";

describe("Tree Component", () => {
    it("should render foo text correctly", () => {
        mount(<Tree foo={Tree_FOO} />);

        cy.get("[data-test-id=Tree]").as("Tree");

        cy.get("@Tree").contains(Tree_FOO);
    });
});
