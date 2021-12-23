/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { mount } from "@cypress/react";
import { Text } from "./Text";

describe("Text", () => {
    it("should render text as span by default", () => {
        mount(<Text>The fox jumps over the lazy dog</Text>);

        cy.get("[data-test-id=heading]").should((el) => el.attr("tagName") === "SPAN");
    });

    it("should render text as h1 p provided", () => {
        mount(<Text as="p">The fox jumps over the lazy dog</Text>);

        cy.get("[data-test-id=heading]").should((el) => el.attr("tagName") === "P");
    });
});
