/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { mount } from "@cypress/react";
import { Heading } from "./Heading";

describe("Heading", () => {
    it("should render headings as span by default", () => {
        mount(<Heading>The fox jumps over the lazy dog</Heading>);

        cy.get("[data-test-id=heading]").should((el) => el.attr("tagName") === "SPAN");
    });

    it("should render headings as h1 if provided", () => {
        mount(<Heading as="h1">The fox jumps over the lazy dog</Heading>);

        cy.get("[data-test-id=heading]").should((el) => el.attr("tagName") === "H1");
    });
});
