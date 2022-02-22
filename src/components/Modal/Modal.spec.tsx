/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { mount } from "@cypress/react";
import { Modal } from "./Modal";

const Modal_FOO = "bar";

describe("Modal Component", () => {
    it("should render foo text correctly", () => {
        mount(<Modal foo={Modal_FOO} />);

        cy.get("[data-test-id=modal]").as("Modal");

        cy.get("@Modal").contains(Modal_FOO);
    });
});
