/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import React from "react";
import { TextInput, TextInputType } from "./TextInput";

export const TEXT_INPUT_ID = "[data-test-id=text-input]";
const DECORATOR_TEXT = "decorator text";
const DECORATOR = <span>{DECORATOR_TEXT}</span>;
const INPUT_TEXT = "Hello test";
const PLACEHOLDER = "placeholder";
const PASSWORD = "SECRET password";
const CLEAR_ICON_ID = "[data-test-id=clear-icon]";
const DECORATOR_ID = "[data-test-id=decorator]";
const VISIBILITY_ICON_ID = "[data-test-id=visibility-icon]";

describe("Text Input component", () => {
    it("renders the text input", () => {
        mount(<TextInput />);
        cy.get(TEXT_INPUT_ID).should("have.attr", "type", "text");
        cy.get(TEXT_INPUT_ID).should("not.have.attr", "placeholder");
        cy.get(TEXT_INPUT_ID).find(CLEAR_ICON_ID).should("have.length", 0);
        cy.get(TEXT_INPUT_ID).find(DECORATOR_ID).should("have.length", 0);
    });

    it("set and get the value", () => {
        mount(<TextInput value={INPUT_TEXT} />);
        cy.get(TEXT_INPUT_ID).should("have.value", INPUT_TEXT);
    });

    it("uses passwords correctly", () => {
        mount(<TextInput type={TextInputType.Password} />);
        cy.get(TEXT_INPUT_ID).type(PASSWORD);
        cy.get(TEXT_INPUT_ID).should("have.attr", "type", "password");
        cy.get(TEXT_INPUT_ID).should("have.value", PASSWORD);
        cy.get(VISIBILITY_ICON_ID).should("have.length", 1);
        cy.get(VISIBILITY_ICON_ID).click();
        cy.get(TEXT_INPUT_ID).should("have.value", PASSWORD);
        cy.get(TEXT_INPUT_ID).should("have.attr", "type", "text");
    });

    it("renders the placeholder", () => {
        mount(<TextInput placeholder={PLACEHOLDER} />);
        cy.get("input").should("have.attr", "placeholder").and("eq", PLACEHOLDER);
    });

    it("renders the decorator", () => {
        mount(<TextInput decorator={DECORATOR} />);
        cy.get(DECORATOR_ID).should("be.visible").contains(DECORATOR_TEXT);
    });

    it("hides the clear icon when there is no text in the field", () => {
        mount(<TextInput clearable />);
        cy.get(CLEAR_ICON_ID).should("not.exist");
        cy.get(TEXT_INPUT_ID).type(INPUT_TEXT).should("have.value", INPUT_TEXT);
        cy.get(CLEAR_ICON_ID).should("exist");
    });

    it("clears the field when clicked on the clear icon", () => {
        mount(<TextInput clearable />);
        cy.get(TEXT_INPUT_ID).type(INPUT_TEXT).should("have.value", INPUT_TEXT);
        cy.get(CLEAR_ICON_ID).click();
        cy.get(TEXT_INPUT_ID).should("have.value", "").should("not.have.value", INPUT_TEXT);
    });

    it("remove the clean icon when pressing it", () => {
        mount(<TextInput clearable />);
        cy.get(TEXT_INPUT_ID).type(INPUT_TEXT).should("have.value", INPUT_TEXT);
        cy.get(CLEAR_ICON_ID).should("exist");
        cy.get(CLEAR_ICON_ID).click();
        cy.get(CLEAR_ICON_ID).should("not.exist");
    });

    it("calls the onInput event", () => {
        const onInputStub = cy.stub().as("onInputStub");
        mount(<TextInput onChange={onInputStub} />);
        cy.get(TEXT_INPUT_ID).type(INPUT_TEXT);
        cy.get("@onInputStub").should("to.have.always.been.callCount", INPUT_TEXT.length);
    });

    it("calls the onBlur event", () => {
        const onBlurStub = cy.stub().as("onBlurStub");
        mount(<TextInput onBlur={onBlurStub} />);
        cy.get(TEXT_INPUT_ID).type(INPUT_TEXT).blur();
        cy.get("@onBlurStub").should("be.calledOnce");
    });

    it("calls the onClear event", () => {
        const onClearStub = cy.stub().as("onClearStub");
        mount(<TextInput onClear={onClearStub} clearable />);
        cy.get(TEXT_INPUT_ID).type(INPUT_TEXT);
        cy.get(CLEAR_ICON_ID).click();
        cy.get(TEXT_INPUT_ID).should("have.value", "");
        cy.get("@onClearStub").should("be.calledOnce");
    });

    it("has the required attribute", () => {
        mount(<TextInput required={true} />);
        cy.get(TEXT_INPUT_ID).should("have.attr", "required");
    });

    it("does not have the required attribute", () => {
        mount(<TextInput required={false} />);
        cy.get(TEXT_INPUT_ID).should("not.have.attr", "required");
    });

    it("has the disabled attribute", () => {
        mount(<TextInput disabled={true} />);
        cy.get(TEXT_INPUT_ID).should("have.attr", "disabled");
    });

    it("does not have the disabled attribute", () => {
        mount(<TextInput disabled={false} />);
        cy.get(TEXT_INPUT_ID).should("not.have.attr", "disabled");
    });
});
