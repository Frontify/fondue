/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { mount } from "@cypress/react";
import { InputLabel } from "./InputLabel";

const LABEL_TEXT = "This is a fancy label.";

const INPUT_LABEL_ID = "[data-test-id=input-label]";
const INPUT_LABEL_REQUIRED_ID = "[data-test-id=input-label-required]";

describe("InputLabel Component", () => {
    it("should render label text correctly", () => {
        mount(<InputLabel htmlFor="input">{LABEL_TEXT}</InputLabel>);

        cy.get(INPUT_LABEL_ID).should("contain", LABEL_TEXT);
    });

    it("should render a required label", () => {
        mount(
            <InputLabel htmlFor="input" required>
                {LABEL_TEXT}
            </InputLabel>,
        );

        cy.get(INPUT_LABEL_REQUIRED_ID).should("be.visible").and("contain", "*");
    });
});
