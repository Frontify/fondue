/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { mount } from "@cypress/react";
import { Modal } from "./Modal";

describe("Modal Component", () => {
    it("should render foo text correctly", () => {
        mount(<Modal />);

        cy.get("[data-test-id=modal]").as("Modal");

        cy.get("@Modal").should("exist");
    });
});
