/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import { Style, Theme } from "@utilities/enum";
import Checkbox, { CheckboxSelectionState } from "./Checkbox";
import css from "./Checkbox.module.css";

const CHECKBOX_LABEL = "Holà";

describe("Checkbox component", () => {
    it("renders", () => {
        mount(<Checkbox label={CHECKBOX_LABEL} />);

        cy.get("[data-test-id=checkbox]").as("checkbox");

        cy.get("[data-test-id=checkbox-wrapper]").contains(CHECKBOX_LABEL);

        cy.get("@checkbox").should("have.class", css.checkbox);
        cy.get("@checkbox").should("have.class", css.checkbox);
        cy.get("@checkbox").should("have.class", css.themeLight);
        cy.get("@checkbox").should("have.class", css.stylePrimary);
    });

    it("has the unselected state", () => {
        mount(<Checkbox value={CheckboxSelectionState.Unselected} />);

        cy.get("[data-test-id=checkbox]").as("checkbox");

        cy.get("@checkbox").should("not.have.class", css.selected);
        cy.get("@checkbox").should("not.have.class", css.indeterminate);
    });

    it("has the selected state", () => {
        mount(<Checkbox value={CheckboxSelectionState.Selected} />);

        cy.get("[data-test-id=checkbox]").as("checkbox");

        cy.get("@checkbox").should("have.class", css.selected);
        cy.get("@checkbox").should("not.have.class", css.indeterminate);
    });

    it("has the default state of indeterminate", () => {
        mount(<Checkbox value={CheckboxSelectionState.Indeterminate} />);

        cy.get("[data-test-id=checkbox]").as("checkbox");

        cy.get("@checkbox").should("have.class", css.indeterminate);
        cy.get("@checkbox").should("not.have.class", css.selected);
    });

    it("has a label", () => {
        mount(<Checkbox label={CHECKBOX_LABEL} />);

        cy.get("[data-test-id=checkbox-wrapper]").contains(CHECKBOX_LABEL);
        cy.get("[data-test-id=input-label]").should("have.length", 1);
    });

    it("has a disabled state", () => {
        mount(<Checkbox disabled={true} />);

        cy.get("[data-test-id=checkbox]").as("checkbox");

        cy.get("@checkbox").should("have.class", css.disabled);

        cy.get("@checkbox").click();

        cy.get("@checkbox").should("not.have.class", css.selected);
        cy.get("@checkbox").should("not.have.class", css.indeterminate);
    });

    it("cycle in the selection state on click", () => {
        mount(<Checkbox />);

        cy.get("[data-test-id=checkbox]").as("checkbox");

        cy.get("@checkbox").should("not.have.class", css.selected);
        cy.get("@checkbox").should("not.have.class", css.indeterminate);

        cy.get("@checkbox").click();

        cy.get("@checkbox").should("have.class", css.selected);
        cy.get("@checkbox").should("not.have.class", css.indeterminate);

        cy.get("@checkbox").click();

        cy.get("@checkbox").should("not.have.class", css.selected);
        cy.get("@checkbox").should("not.have.class", css.indeterminate);
    });

    it(`has the light theme with primary style`, () => {
        mount(<Checkbox theme={Theme.Light} style={Style.Primary} />);

        cy.get("[data-test-id=checkbox]").as("checkbox");

        cy.get("@checkbox").should("have.class", css.stylePrimary);

        cy.get("@checkbox").should("have.class", css.themeLight);
        cy.get("@checkbox").should("not.have.class", css.themeDark);
    });

    it(`has the dark theme with secondary style`, () => {
        mount(<Checkbox theme={Theme.Dark} style={Style.Secondary} />);

        cy.get("[data-test-id=checkbox]").as("checkbox");

        cy.get("@checkbox").should("have.class", css.styleSecondary);

        cy.get("@checkbox").should("have.class", css.themeDark);
        cy.get("@checkbox").should("not.have.class", css.themeLight);
    });
});
