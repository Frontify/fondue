/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import ModalPortal from "./ModalPortal";

describe("Portal", () => {
    it("renders", () => {
        const modalRoot = document.createElement("div");
        modalRoot.setAttribute("id", "react-modal");
        document.body.appendChild(modalRoot);
        mount(<ModalPortal title="Mein Modal" content="test" actions="test" />);

        cy.get("[data-test-id=modal-container]").should("exist");
    });
});
