/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import Divider, { DividerStyle, DividerHeight } from "./Divider";

const DEFAULT_COLOR = "rgb(204, 204, 204)";
const COLOR_RGB = "rgb(64, 101, 174)";
const COLOR_HEX = "#4065AE";

describe("Divider component", () => {
    it("renders", () => {
        mount(<Divider />);

        cy.log("Do we have the correct height");
        cy.get("[data-test-id=divider]").should("have.css", "height", DividerHeight.Height50);

        cy.log("Get divider's hr");
        cy.get("[data-test-id=divider-hr]").as("hr");

        cy.log("Do we have the correct style");
        cy.get("@hr").should("have.css", "border-style", DividerStyle.Solid);

        cy.log("Do we have the correct color");
        cy.get("@hr").should("have.css", "border-top-color", DEFAULT_COLOR);
    });

    it("has the correct color code", () => {
        mount(<Divider color={COLOR_HEX} />);

        cy.log("Convert the color to rgb");
        cy.get("[data-test-id=divider-hr]").should("have.css", "border-top-color", COLOR_RGB);
    });

    Object.values(DividerHeight).forEach((height) => {
        it(`has the ${height} height`, () => {
            mount(<Divider height={height} />);

            cy.log("Do we have the correct height");
            cy.get("[data-test-id=divider]").should("have.css", "height", height);
        });
    });

    Object.values(DividerStyle).forEach((style) => {
        it(`has the ${style} style`, () => {
            const color = "rgb(64, 101, 174)";
            const colorTransparent = "rgba(0, 0, 0, 0)";

            mount(<Divider color={color} style={style} />);

            cy.log("Do we have the correct style");
            cy.get("[data-test-id=divider-hr]").should("have.css", "border-style", style === "noline" ? "none" : style);

            cy.log("Do we reflect the color correctly for each style");
            cy.get("[data-test-id=divider-hr]").should(
                "have.css",
                "border-top-color",
                style === "noline" ? colorTransparent : color,
            );
        });
    });
});
