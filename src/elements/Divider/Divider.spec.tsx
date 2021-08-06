/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { mount } from "@cypress/react";
import { Divider } from "./Divider";

const DEFAULT_COLOR = "rgb(204, 204, 204)";
const COLOR_RGB = "rgb(64, 101, 174)";
const COLOR_HEX = "#4065AE";

describe("Divider component", () => {
    it("renders", () => {
        mount(<Divider />);

        cy.get("[data-test-id=divider]").should("exist");
        cy.get("[data-test-id=divider-hr]").should("exist").and("have.css", "tw-border-top-color", DEFAULT_COLOR);
    });

    it("has the correct color code", () => {
        mount(<Divider color={COLOR_HEX} />);

        cy.get("[data-test-id=divider-hr]").should("exist").and("have.css", "tw-border-top-color", COLOR_RGB);
    });
});
