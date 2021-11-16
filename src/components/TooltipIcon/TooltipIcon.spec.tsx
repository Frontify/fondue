/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import React from "react";
import { TooltipIcon } from "./TooltipIcon";

const TOOLTIP_ICON_TEXT = "This is a tooltip icon";
const TOOLTIP_ICON_ID = "[data-test-id=tooltip-icon]";

describe("TooltipIcon Component", () => {
    it("should render a tooltip icon", () => {
        mount(<TooltipIcon content={TOOLTIP_ICON_TEXT} />);

        cy.get(TOOLTIP_ICON_ID).should("contain", TOOLTIP_ICON_TEXT);
    });
});
