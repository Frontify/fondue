/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { mount } from "@cypress/react";
import { Stack } from "./Stack";

describe("Stack Layout", () => {
    it("should render a row layout", () => {
        mount(
            <Stack padding="none" spacing="none">
                <div>1</div>
                <div>2</div>
                <div>3</div>
            </Stack>,
        );

        cy.get("[data-test-id=stack]").as("Stack");
        cy.get("@Stack").should("have.class", "tw-flex-row");
    });

    it("should render a column layout", () => {
        mount(
            <Stack direction="column" padding="none" spacing="none">
                <div>1</div>
                <div>2</div>
                <div>3</div>
            </Stack>,
        );

        cy.get("[data-test-id=stack]").as("Stack");
        cy.get("@Stack").should("have.class", "tw-flex-col");
    });

    it("should render a spacing in a stack", () => {
        mount(
            <Stack padding="medium" spacing="medium">
                <div>1</div>
                <div>2</div>
                <div>3</div>
            </Stack>,
        );

        cy.get("[data-test-id=stack]").as("Stack");
        cy.get("@Stack").should("have.class", "tw-p-medium");
        cy.get("@Stack").should("have.class", "tw-gap-medium");
    });
});
