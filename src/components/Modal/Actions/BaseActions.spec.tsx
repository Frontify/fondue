/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import BaseActions from "./BaseActions";
import css from "./BaseActions.module.css";

describe("Base Actions", () => {
    it("renders", () => {
        const ON_HANDLE_CANCEL_STUB = cy.stub().as("onHandleCancelClick");
        const ON_HANDLE_CONFIRM_STUB = cy.stub().as("onHandleConfirmClick");

        mount(<BaseActions onCancel={ON_HANDLE_CANCEL_STUB} onConfirm={ON_HANDLE_CONFIRM_STUB} />);

        cy.get("[data-test-id=modal-base-actions]").as("base-actions");
        cy.get("@base-actions").should("have.class", css.actions);
        cy.get("[data-test-id=modal-base-actions] [data-test-id=button]").should("have.length", 2);
        cy.get("[data-test-id=modal-base-actions] [data-test-id=button]").first().contains("Cancel");
        cy.get("[data-test-id=modal-base-actions] [data-test-id=button]").last().contains("Confirm");
    });

    it("has custom cancelText and confirmText", () => {
        const ON_HANDLE_CANCEL_STUB = cy.stub().as("onHandleCancelClick");
        const ON_HANDLE_CONFIRM_STUB = cy.stub().as("onHandleConfirmClick");

        mount(
            <BaseActions
                onCancel={ON_HANDLE_CANCEL_STUB}
                onConfirm={ON_HANDLE_CONFIRM_STUB}
                cancelText="Cancel here"
                confirmText="Confirm here"
            />,
        );

        cy.get("[data-test-id=modal-base-actions]").as("base-actions");
        cy.get("@base-actions").should("have.class", css.actions);
        cy.get("[data-test-id=modal-base-actions] [data-test-id=button]").should("have.length", 2);
        cy.get("[data-test-id=modal-base-actions] [data-test-id=button]").first().contains("Cancel here");
        cy.get("[data-test-id=modal-base-actions] [data-test-id=button]").last().contains("Confirm here");
    });

    it("calls the onCancel event", () => {
        const ON_HANDLE_CANCEL_STUB = cy.stub().as("onHandleCancelClick");
        const ON_HANDLE_CONFIRM_STUB = cy.stub().as("onHandleConfirmClick");

        mount(<BaseActions onCancel={ON_HANDLE_CANCEL_STUB} onConfirm={ON_HANDLE_CONFIRM_STUB} />);

        cy.get("[data-test-id=modal-base-actions] [data-test-id=button]").should("have.length", 2);
        cy.get("[data-test-id=modal-base-actions] [data-test-id=button]").first().as("button-cancel").click();
        cy.get("@onHandleCancelClick").should("to.have.always.been.callCount", 1);
    });

    it("calls the onConfirm event", () => {
        const ON_HANDLE_CANCEL_STUB = cy.stub().as("onHandleCancelClick");
        const ON_HANDLE_CONFIRM_STUB = cy.stub().as("onHandleConfirmClick");

        mount(<BaseActions onCancel={ON_HANDLE_CANCEL_STUB} onConfirm={ON_HANDLE_CONFIRM_STUB} />);

        cy.get("[data-test-id=modal-base-actions] [data-test-id=button]").should("have.length", 2);
        cy.get("[data-test-id=modal-base-actions] [data-test-id=button]").last().as("button-confirm").click();
        cy.get("@onHandleConfirmClick").should("to.have.always.been.callCount", 1);
    });
});
