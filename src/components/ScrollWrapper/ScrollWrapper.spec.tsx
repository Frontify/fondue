/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { mount } from "@cypress/react";
import { ScrollWrapper } from "./ScrollWrapper";

const SCROLL_WRAPPER_CONTAINER = "[data-test-id=scroll-wrapper-container]";

describe("ScrollWrapper Component", () => {
    it("should render foo text correctly", () => {
        mount(<ScrollWrapper />);

        cy.get(SCROLL_WRAPPER_CONTAINER).should("exist");
    });
});
