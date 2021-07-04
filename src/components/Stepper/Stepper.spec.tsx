/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import Stepper from "./Stepper";

describe("Stepper component", () => {
    it("renders", () => {
        mount(<Stepper initialStep={2} totalSteps={5}></Stepper>);

        cy.log("has next");
        cy.get("[data-test-id=stepper-control-next]").click();

        cy.get("[data-test-id=stepper-count]").contains(3);
    });

    it("has the step input", () => {
        mount(<Stepper initialStep={2} totalSteps={5} hasStepInput={true}></Stepper>);

        cy.log("has next");
        cy.get("[data-test-id=stepper-control-next]").click();

        cy.get("[data-test-id=stepper-count-input]").should("have.value", 3);
    });
});
