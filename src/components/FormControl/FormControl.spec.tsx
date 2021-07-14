/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";

import FormControl from "./FormControl";

const FormControl_FOO = "bar";

describe("FormControl Component", () => {
    it("should render foo text correctly", () => {
        mount(<FormControl foo={FormControl_FOO} />);

        cy.get("[data-test-id=FormControl]").as("FormControl");

        cy.get("@FormControl").contains(FormControl_FOO);
    });
});
