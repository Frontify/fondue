/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { Modal } from "./Modal";
import { mount } from "@cypress/react";
import { ModalHeader } from "./ModalHeader";
import { IconIcons } from "@foundation/Icon";
import { ModalHeaderVariant } from "./types";
import { PatternDesign, PatternTheme } from "@foundation/Pattern";
import { ModalBody } from "./ModalBody";

const MODAL_CONTAINER = "[data-test-id=modal-container]";
const MODAL_VISUAL = "[data-test-id=modal-visual]";
const MODAL_HEADER = "[data-test-id=modal-header]";
const MODAL_BODY = "[data-test-id=modal-body]";
const MODAL_FOOTER = "[data-test-id=modal-footer]";
const MODAL_HEADER_DECORATOR = "[data-test-id=modal-header-decorator-container]";
const GENERIC_ICON_CODE = "svg[name=IconIcons]";
const SCROLL_WRAPPER_CONTAINER = "[data-test-id=scroll-wrapper]";

describe("Modal Component", () => {
    it("should render an empty modal", () => {
        mount(<Modal />);

        cy.get(MODAL_CONTAINER).should("exist");
        cy.get(MODAL_VISUAL).should("not.exist");
        cy.get(MODAL_HEADER).should("not.exist");
        cy.get(MODAL_BODY).should("not.exist");
        cy.get(MODAL_FOOTER).should("not.exist");
    });

    it("should render the modal with a visual", () => {
        mount(
            <Modal
                visual={{
                    pattern: PatternDesign.DigitalAssets,
                    foregroundColor: PatternTheme.Violet,
                }}
            />,
        );

        cy.get(MODAL_VISUAL).should("exist");
        cy.get(MODAL_VISUAL).should("have.class", "tw-text-violet-bright");
    });

    it("should render the modal with a header", () => {
        const title = "Modal header";
        const leadText = "The Home for Brand Management";

        mount(
            <Modal
                header={
                    <ModalHeader
                        title={title}
                        leadText={leadText}
                        decorator={<IconIcons />}
                        variant={ModalHeaderVariant.Informative}
                    />
                }
            />,
        );

        cy.get(MODAL_HEADER).should("exist");
        cy.get(MODAL_HEADER).should("contain.text", title).and("contain.text", leadText);
        cy.get(MODAL_HEADER_DECORATOR).should("be.visible").and("have.class", "tw-text-violet-bright");
        cy.get(GENERIC_ICON_CODE).should("be.visible").and("have.class", "tw-h-6 tw-w-6");
    });

    it("should render the modal with a body and implement the ScrollWrapper component", () => {
        mount(
            <Modal>
                <ModalBody>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
                </ModalBody>
            </Modal>,
        );

        cy.get(MODAL_BODY).should("exist");
        cy.get(SCROLL_WRAPPER_CONTAINER).should("exist");
    });
});
