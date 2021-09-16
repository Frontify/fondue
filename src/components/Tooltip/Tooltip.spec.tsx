/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import React from "react";
import { Tooltip, TooltipButton } from "./Tooltip";
import IconIcons from "@elements/Icon/Generated/IconIcons";
import { BrightHeaderStyle } from "./BrightHeader";

const TOOLTIP_TEXT = "This is a tooltip";
const TOOLTIP_ICON_ID = "[data-test-id=tooltip-icon]";
const TOOLTIP_ID = "[data-test-id=tooltip]";
const TOOLTIP_LINK_ID = "[data-test-id=tooltip-link]";
const TOOLTIP_LINK_URL = "https://www.frontify.com";
const TOOLTIP_HEADING_TEXT = "I'm a heading";
const GENERIC_ICON = <IconIcons />;
const BRIGHT_HEADER_ID = "[data-test-id=bright-header]";

describe("Tooltip Component", () => {
    it("should render a tooltip", () => {
        mount(<Tooltip tooltip={TOOLTIP_TEXT} />);

        cy.get(TOOLTIP_ID).should("contain", TOOLTIP_TEXT);
    });

    it("should render an icon next to the tooltip", () => {
        mount(<Tooltip tooltip={TOOLTIP_TEXT} tooltipIcon={GENERIC_ICON} />);

        cy.get("svg[name=IconIcons]").should("be.visible");
    });

    it("should render a link", () => {
        mount(<Tooltip tooltip={TOOLTIP_TEXT} linkUrl={TOOLTIP_LINK_URL} />);

        cy.get(TOOLTIP_LINK_ID).should("be.visible").and("have.attr", "href").and("include", TOOLTIP_LINK_URL);
    });

    it("should render a link with custom text", () => {
        const linkLabel = "Upgrade your plan.";

        mount(<Tooltip tooltip={TOOLTIP_TEXT} linkUrl={TOOLTIP_LINK_URL} linkLabel={linkLabel} />);

        cy.get(TOOLTIP_LINK_ID).should("be.visible").and("contain", linkLabel);
    });

    it("should not render the heading if the heading icon is missing", () => {
        mount(<Tooltip tooltip={TOOLTIP_TEXT} heading={TOOLTIP_HEADING_TEXT} />);

        cy.get(TOOLTIP_ID).should("not.contain", TOOLTIP_HEADING_TEXT);
    });

    it("should not render the heading icon if the heading is missing", () => {
        mount(<Tooltip tooltip={TOOLTIP_TEXT} headingIcon={GENERIC_ICON} />);

        cy.get(TOOLTIP_ID).should("not.contain", GENERIC_ICON);
    });

    it("should render the heading and the heading icon when both are present", () => {
        mount(<Tooltip tooltip={TOOLTIP_TEXT} heading={TOOLTIP_HEADING_TEXT} headingIcon={GENERIC_ICON} />);

        cy.get(TOOLTIP_ID).should("contain.text", TOOLTIP_HEADING_TEXT);
        cy.get("svg[name=IconIcons]").should("be.visible");
    });

    it("should not render a bright header by default", () => {
        mount(<Tooltip tooltip={TOOLTIP_TEXT} />);

        cy.get(BRIGHT_HEADER_ID).should("not.exist");
    });

    Object.values(BrightHeaderStyle).forEach((brightHeaderStyle) => {
        it(`should render a bright header (${brightHeaderStyle})`, () => {
            mount(<Tooltip tooltip={TOOLTIP_TEXT} brightHeader={brightHeaderStyle} />);

            cy.get(BRIGHT_HEADER_ID).should("exist");
        });
    });

    it("should not render buttons by default", () => {
        mount(<Tooltip tooltip={TOOLTIP_TEXT} />);

        cy.get("button").should("not.exist");
    });

    it("should render two buttons", () => {
        const buttonsActions: [TooltipButton, TooltipButton] = [
            { label: "Secondary", action: () => null },
            { label: "Primary", action: () => null },
        ];

        mount(<Tooltip tooltip={TOOLTIP_TEXT} buttons={buttonsActions} />);

        cy.get("button").should("exist");
    });

    it.skip("should focus with keyboard", () => {
        mount(<Tooltip tooltip={TOOLTIP_TEXT} />);

        cy.get(TOOLTIP_ICON_ID).should("not.be.focused");
        cy.get(TOOLTIP_ID).should("not.exist");
        cy.get("body").tab();
        cy.get(TOOLTIP_ICON_ID).should("be.focused");
        cy.get(TOOLTIP_ID).should("exist");
    });
});
