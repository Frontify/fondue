/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { mount } from "@cypress/react";

const OrderableList_FOO = "bar";

describe("OrderableList Component", () => {
    it("should render foo text correctly", () => {
        mount(<div>{OrderableList_FOO}</div>);

        cy.get("[data-test-id=test-drag]").as("OrderableList");

        cy.get("@OrderableList").contains(OrderableList_FOO);
    });
});
