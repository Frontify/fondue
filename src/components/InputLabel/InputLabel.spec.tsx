/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { mount } from "@cypress/react";
import { InputLabel } from "./InputLabel";
import { IconActivity } from "@foundation/Icon/Generated";

const LABEL_TEXT = "This is a fancy label.";
const LABEL_TOOLTIP = "This is a fancy tooltip.";

const INPUT_LABEL_ID = "[data-test-id=input-label]";
const INPUT_LABEL_CONTAINER_ID = "[data-test-id=input-label-container]";
const TOOLTIP_ICON_TRIGGER_ID = "[data-test-id=tooltip-icon-trigger]";
const TOOLTIP_ID = "[data-test-id=tooltip]";
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

    it("renders with a tooltip", () => {
        mount(
            <InputLabel htmlFor="input" tooltip={{ content: LABEL_TOOLTIP }}>
                {LABEL_TEXT}
            </InputLabel>,
        );

        cy.get(TOOLTIP_ICON_TRIGGER_ID).realHover({ position: "top" });
        cy.get(INPUT_LABEL_CONTAINER_ID).find(TOOLTIP_ID).should("exist");
    });

    it("renders with multiple tooltip triggers", () => {
        mount(
            <InputLabel
                htmlFor="input"
                tooltip={[
                    { content: LABEL_TOOLTIP, triggerStyle: "Danger" },
                    { content: LABEL_TOOLTIP, triggerIcon: <IconActivity /> },
                ]}
            >
                {LABEL_TEXT}
            </InputLabel>,
        );
        cy.get(TOOLTIP_ICON_TRIGGER_ID)
            .first()
            .should("have.class", "tw-text-box-negative-strong")
            .children("svg")
            .should("have.attr", "name", "IconQuestion");
        cy.get(TOOLTIP_ICON_TRIGGER_ID)
            .eq(1)
            .should("have.class", "tw-text-text-weak")
            .children("svg")
            .should("have.attr", "name", "IconActivity");
    });
});
