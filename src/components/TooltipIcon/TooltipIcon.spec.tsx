/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { mount } from "@cypress/react";
import { TooltipIcon } from "./TooltipIcon";
import { IconSize } from "@components/Icon/IconSize";

const TOOLTIP_PROPS = {
    content: "Lorem ipsum dolor sit amet.",
};
const TOOLTIP_ICON_ID = "[data-test-id=tooltip-icon]";
const TOOLTIP_ICON_TRIGGER_ID = "[data-test-id=tooltip-icon-trigger]";
const TOOLTIP_ID = "[data-test-id=tooltip]";

describe("TooltipIcon Component", () => {
    it("should render an icon with default size", () => {
        mount(<TooltipIcon tooltip={TOOLTIP_PROPS} />);

        cy.get(TOOLTIP_ICON_ID).find(TOOLTIP_ICON_TRIGGER_ID).children().should("have.class", "tw-h-4");
    });

    it("should render an icon with custom size", () => {
        mount(<TooltipIcon tooltip={TOOLTIP_PROPS} iconSize={IconSize.Size20} />);

        cy.get(TOOLTIP_ICON_ID).find(TOOLTIP_ICON_TRIGGER_ID).children().should("have.class", "tw-h-5");
    });

    it("should render a tooltip when the icon is hovered", () => {
        mount(<TooltipIcon tooltip={TOOLTIP_PROPS} />);

        cy.get("body").realClick();
        cy.get(TOOLTIP_ICON_TRIGGER_ID).realHover({ position: "top" });
        cy.get(TOOLTIP_ICON_ID).find(TOOLTIP_ID).should("exist");
    });
});
