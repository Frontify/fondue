/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import React from "react";
import { Tabs, TabSize, TabsPaddingX } from "@components/Tabs/Tabs";
import { data } from "./Tabs.stories";

describe("Tabs Component", () => {
    it("should render correctly", () => {
        mount(<Tabs content={data} paddingX={TabsPaddingX.Small} size={TabSize.Small} />);

        cy.get("[data-test-id=tabs]").as("Tabs");
        cy.get("@Tabs").should("be.visible");
    });
});
