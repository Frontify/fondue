/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { mount } from "@cypress/react";
import { OrderableList } from "./OrderableList";

const OrderableList_FOO = "bar";

describe("OrderableList Component", () => {
    it("should render foo text correctly", () => {
        mount(<OrderableList foo={OrderableList_FOO} />);

        cy.get("[data-test-id=test-drag]").as("OrderableList");

        cy.get("@OrderableList").contains(OrderableList_FOO);
    });
});
