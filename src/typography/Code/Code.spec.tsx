/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { mount } from "@cypress/react";
import { Code } from "./Code";

describe("Code", () => {
    it("should render code as span by default", () => {
        mount(<Code>The fox jumps over the lazy dog</Code>);

        cy.get("[data-test-id=heading]").should((el) => el.attr("tagName") === "SPAN");
    });

    it("should render code as code if provided", () => {
        mount(<Code as="code">The fox jumps over the lazy dog</Code>);

        cy.get("[data-test-id=heading]").should((el) => el.attr("tagName") === "CODE");
    });
});
