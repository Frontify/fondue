/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import FrontifyImage, { ImageSize } from "./FrontifyImage";

const IMAGE_URL = "/fake-image-call.jpg";

beforeEach("Getting the image", () => {
    for (const size in ImageSize) {
        cy.intercept("GET", `${IMAGE_URL}?format=webp&width=${size}`, { fixture: "Hiking.jpg" });
        cy.intercept("GET", `${IMAGE_URL}?width=${size}`, { fixture: "Hiking.jpg" });
    }
});

describe("FrontifyImage component", () => {
    it("renders", () => {
        mount(<FrontifyImage src={IMAGE_URL} />);

        cy.get("[data-test-id=image-container] img").as("image");

        cy.log("Make sure the asset (image) is visible and loaded");
        cy.get("@image").should("be.visible");
        cy.get("@image").should("not.have.prop", "naturalWidth", 0);
    });
});
