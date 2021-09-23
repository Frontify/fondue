/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FIELDSET_HEADER_ID } from "@compositions/FieldsetHeader/FieldsetHeader.spec";
import { mount } from "@cypress/react";
import { BADGE_ID } from "@elements/Badge/Badge.spec";
import { BUTTON_ID } from "@elements/Button/Button.spec";
import { TextInput } from "@elements/TextInput/TextInput";
import { TEXT_INPUT_ID } from "@elements/TextInput/TextInput.spec";
import React from "react";
import { Flyout } from "./Flyout";

const FLYOUT_TRIGGER_ID = "[data-test-id=flyout-trigger]";

describe("Flyout Component", () => {
    it("should render with header and badges", () => {
        const onCloseStub = cy.stub().as("onCloseStub");

        mount(
            <Flyout
                trigger="foobar"
                title="Header title"
                badges={[{ children: "Badge 1" }, { children: "Badge 2" }]}
                onClose={onCloseStub}
            >
                <TextInput value="" placeholder="placeholder" />
            </Flyout>,
        );

        cy.get(FLYOUT_TRIGGER_ID).click();
        cy.get(FIELDSET_HEADER_ID).should("contain", "Header title");
        cy.get(BADGE_ID).should("have.length", 2);
        cy.get(TEXT_INPUT_ID).should("have.attr", "placeholder").and("eq", "placeholder");
        cy.get(BUTTON_ID).click();
        cy.get("@onCloseStub").should("be.calledOnce");
    });
    it("should render with onClick action", () => {
        const onCloseStub = cy.stub().as("onCloseStub");
        const onClickStub = cy.stub().as("onClickStub");

        mount(
            <Flyout trigger="foobar" title="Header title" onClick={onClickStub} onClose={onCloseStub}>
                <TextInput placeholder="placeholder" />
            </Flyout>,
        );

        cy.get(FLYOUT_TRIGGER_ID).click();
        cy.get(BUTTON_ID).should("have.length", 2);
        cy.get(BUTTON_ID).eq(1).click();
        cy.get("@onClickStub").should("be.calledOnce");
    });
});
