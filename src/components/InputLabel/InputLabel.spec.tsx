/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";

import InputLabel from "./InputLabel";

const InputLabel_FOO = "bar";

describe("InputLabel Component", () => {
    it("should render foo text correctly", () => {
        mount(<InputLabel foo={InputLabel_FOO} />);

        cy.get("[data-test-id=InputLabel]").as("InputLabel");

        cy.get("@InputLabel").contains(InputLabel_FOO);
    });
});
