/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import Modal, { ModalPatternColor } from "./Modal";
import css from "./Modal.module.css";

const MODAL_TITLE = "Modal title";
const MODAL_CONTENT = "Modal content";
const MODAL_ACTIONS = "Modal actions";

describe("Modal", () => {
    it("renders without pattern", () => {
        mount(<Modal title={MODAL_TITLE} content={MODAL_CONTENT} pattern={false} actions={MODAL_ACTIONS} />);

        cy.get("[data-test-id=modal-container]").as("container");
        cy.get("[data-test-id=modal]").as("modal");
        cy.get("@container").should("have.class", css.container);
        cy.get("@modal").should("have.class", css.modal);

        cy.get("@modal").should("not.have.class", css.withPattern);
        cy.get("[data-test-id=modal-title]").should("have.class", css.title);
        cy.get("[data-test-id=modal-title]").contains(MODAL_TITLE);

        cy.get("[data-test-id=modal-content]").should("have.class", css.content);
        cy.get("[data-test-id=modal-content]").contains(MODAL_CONTENT);

        cy.get("[data-test-id=modal-actions]").should("have.class", css.actions);
        cy.get("[data-test-id=modal-actions]").contains(MODAL_ACTIONS);
    });

    it("renders with default pattern", () => {
        mount(<Modal title={MODAL_TITLE} content={MODAL_CONTENT} actions={MODAL_ACTIONS} />);

        cy.get("[data-test-id=modal]").as("modal");
        cy.get("[data-test-id=modal-pattern]").as("pattern");

        cy.get("@modal").should("have.class", css.withPattern);
        cy.get("@pattern").should("have.class", css.pattern);
        cy.get("@pattern").should("have.class", css.patternColorViolet);
    });

    Object.values(ModalPatternColor).forEach((patternColor) => {
        it(`has ${patternColor} pattern color `, () => {
            mount(
                <Modal
                    title={MODAL_TITLE}
                    content={MODAL_CONTENT}
                    actions={MODAL_ACTIONS}
                    pattern
                    patternColor={ModalPatternColor[patternColor]}
                />,
            );

            cy.get("[data-test-id=modal]").as("modal");
            cy.get("[data-test-id=modal-pattern]").as("pattern");

            cy.get("@modal").should("have.class", css.withPattern);
            cy.get("@pattern").should("have.class", css.pattern);
            cy.get("@pattern").should("have.class", css[`patternColor${patternColor}`]);
        });
    });
});
