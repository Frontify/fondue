/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import TextInput from "../Form/TextInput/TextInput";
import FormControl from "./FormControl";
import css from "./FormControl.module.css";

describe("FormControl Component", () => {
    it("should render foo text correctly", () => {
        mount(
            <FormControl>
                <TextInput />
            </FormControl>,
        );

        cy.get("[data-test-id=form-control]").as("FormControl");

        cy.get("@FormControl").first().should("have.class", css.container);
    });
});
