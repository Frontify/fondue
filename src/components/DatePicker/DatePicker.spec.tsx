/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { mount } from "@cypress/react";
import { DatePicker } from "./DatePicker";

export const TEXT_INPUT_ID = "[data-test-id=text-input]";
export const DATE_PICKER_ID = "[data-test-id=date-picker]";

describe("DatePicker Component", () => {
    it("renders text input as part of Datepicker component", () => {
        mount(<DatePicker />);

        cy.get(TEXT_INPUT_ID).should("have.length", 1);
    });

    it("renders calendar on text input click", () => {
        mount(<DatePicker />);

        cy.get(TEXT_INPUT_ID).click();
        cy.get(DATE_PICKER_ID).should("exist");
    });

    it("should render cancel icon if isClearable prop is true", () => {
        mount(<DatePicker isClearable={true} value={new Date()} />);

        cy.get(TEXT_INPUT_ID).click();
        cy.get(".react-datepicker__day").first().click();
        cy.get(".react-datepicker__close-icon").should("exist");
    });

    it("should clear the input if cancel icon is clicked", () => {
        const onChangeStub = cy.stub().as("onChangeStub");
        mount(<DatePicker isClearable={true} value={new Date()} onChange={onChangeStub} />);

        cy.get(TEXT_INPUT_ID).click();
        cy.get(".react-datepicker__close-icon").click();
        cy.get("@onChangeStub").should("be.calledOnce");
    });

    it("should close calendar if shouldCloseOnSelect is true, and date is selected", () => {
        mount(<DatePicker shouldCloseOnSelect={true} />);

        cy.get(TEXT_INPUT_ID).click();
        cy.get(".react-datepicker__day").first().click();
        cy.get(".react-datepicker-wrap").should("not.exist");
    });

    it("should close call onChange prop function, if date is selected", () => {
        const onChangeStub = cy.stub().as("onChangeStub");
        mount(<DatePicker shouldCloseOnSelect={true} onChange={onChangeStub} />);

        cy.get(TEXT_INPUT_ID).click();
        cy.get(".react-datepicker__day").first().click();
        cy.get("@onChangeStub").should("be.calledOnce");
    });
});
