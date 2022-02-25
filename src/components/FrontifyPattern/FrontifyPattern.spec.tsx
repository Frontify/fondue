/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { mount } from "@cypress/react";
import { FrontifyPattern } from "./FrontifyPattern";
import { PatternDesign } from "@foundation/Pattern";

const FRONTIFY_PATTERN = "[data-test-id=frontify-pattern]";

describe("FrontifyPattern Component", () => {
    it("should render a pattern", () => {
        mount(<FrontifyPattern pattern={PatternDesign.DigitalAssets} />);

        cy.get(FRONTIFY_PATTERN).should("exist");
    });
});
