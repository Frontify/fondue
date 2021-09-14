/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import React from "react";
import { Tooltip } from "./Tooltip";

const TOOLTIP_TEXT = "This is a tooltip";
const TOOLTIP_ICON_ID = "[data-test-id=tooltip-icon]";
const TOOLTIP_ID = "[data-test-id=tooltip]";

describe("Tooltip Component", () => {
    it("should render a tooltip", () => {
        mount(<Tooltip tooltip={TOOLTIP_TEXT} />);

        cy.get(TOOLTIP_ID).should("contain", TOOLTIP_TEXT);
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
