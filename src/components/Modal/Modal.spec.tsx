/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { mount } from "@cypress/react";
import { Modal } from "./Modal";

describe("Modal Component", () => {
    it("should exist", () => {
        mount(<Modal />);

        cy.get("[data-test-id=modal-container]").as("Modal");

        cy.get("@Modal").should("exist");
    });
});
