/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import React from "react";
import { MultiInput, MultiInputLayout } from "./MultiInput";

describe("Multi Input Component", () => {
    it("should render the Multi Input", () => {
        mount(
            <MultiInput layout={MultiInputLayout.Spider}>
                <p>Hello</p>
            </MultiInput>,
        );

        cy.get("[data-test-id=multi-input]").as("Checklist").should("have.class", "tw-flex");
    });
});
