/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { mount } from "@cypress/react";
import { TextInput, TextInputType } from "./TextInput";

const DECORATOR_TEXT = "decorator text";
const DECORATOR = <span>{DECORATOR_TEXT}</span>;
const INPUT_TEXT = "Hello test";
const PLACEHOLDER = "placeholder";
const PASSWORD = "SECRET password";

describe("Text Input component", () => {
    it("renders the text input", () => {
        mount(<TextInput />);
        cy.get("[data-test-id=text-input]").as("input");
        cy.get("@input").should("have.attr", "type", "text");
        cy.get("@input").should("not.have.attr", "placeholder");
        cy.get("@input").find('[data-test-id="clear-icon"]').should("have.length", 0);
        cy.get("@input").find('[data-test-id="decorator"]').should("have.length", 0);
    });

    it("set and get the value", () => {
        mount(<TextInput defaultValue={INPUT_TEXT} />);
        cy.get("[data-test-id=text-input]").as("input").should("have.value", INPUT_TEXT);
    });

    it("uses passwords correctly", () => {
        mount(<TextInput type={TextInputType.Password} />);
        cy.get("[data-test-id=text-input]").as("input");
        cy.get("[data-test-id=visibility-icon]").as("visibility-icon");
        cy.get("@input").type(PASSWORD);
        cy.get("@input").should("have.attr", "type", "password");
        cy.get("@input").should("have.value", PASSWORD);
        cy.get("@visibility-icon").should("have.length", 1);
        cy.get("@visibility-icon").click();
        cy.get("@input").should("have.value", PASSWORD);
        cy.get("@input").should("have.attr", "type", "text");
    });

    it("renders the placeholder", () => {
        mount(<TextInput placeholder={PLACEHOLDER} />);
        cy.get("input").should("have.attr", "placeholder").and("eq", PLACEHOLDER);
    });

    it("renders the decorator", () => {
        mount(<TextInput decorator={DECORATOR} />);
        cy.get('[data-test-id="decorator"]').should("be.visible").contains(DECORATOR_TEXT);
    });

    it("clears the field when clicked on the clear icon", () => {
        mount(<TextInput clearable />);
        cy.get('[data-test-id="clear-icon"]').as("clear-icon");
        cy.get("[data-test-id=text-input]").as("input").type(INPUT_TEXT).should("have.value", INPUT_TEXT);
        cy.get("@clear-icon").click();
        cy.get("@input").should("have.value", "").should("not.have.value", INPUT_TEXT);
    });

    it("calls the onInput event", () => {
        const onInputStub = cy.stub().as("onInputStub");
        mount(<TextInput onInput={onInputStub} />);
        cy.get("[data-test-id=text-input]").type(INPUT_TEXT);
        cy.get("@onInputStub").should("to.have.always.been.callCount", INPUT_TEXT.length);
    });

    it("calls the onBlur event", () => {
        const onBlurStub = cy.stub().as("onBlurStub");
        mount(<TextInput onBlur={onBlurStub} />);
        cy.get("[data-test-id=text-input]").type(INPUT_TEXT).blur();
        cy.get("@onBlurStub").should("be.calledOnce");
    });

    it("calls the onClear event", () => {
        const onClearStub = cy.stub().as("onClearStub");
        mount(<TextInput onClear={onClearStub} clearable />);
        cy.get("[data-test-id=text-input]").as("input");
        cy.get("@input").type(INPUT_TEXT);
        cy.get("[data-test-id=clear-icon]").click();
        cy.get("@input").should("have.value", "");
        cy.get("@onClearStub").should("be.calledOnce");
    });

    it("has the required attribute", () => {
        mount(<TextInput required={true} />);
        cy.get("[data-test-id=text-input]").should("have.attr", "required");
    });

    it("does not have the required attribute", () => {
        mount(<TextInput required={false} />);
        cy.get("[data-test-id=text-input]").should("not.have.attr", "required");
    });

    it("has the disabled attribute", () => {
        mount(<TextInput disabled={true} />);
        cy.get("[data-test-id=text-input]").should("have.attr", "disabled");
    });

    it("does not have the disabled attribute", () => {
        mount(<TextInput disabled={false} />);
        cy.get("[data-test-id=text-input]").should("not.have.attr", "disabled");
    });
});
