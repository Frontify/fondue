/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import Image from "./Image";
import css from "./Image.module.css";

const IMAGE_URL = "/fake-image-call.jpg";

beforeEach("Getting the image", () => {
    cy.intercept("GET", `${IMAGE_URL}`, { fixture: "Hiking.jpg" });
});

describe("Image component", () => {
    it("renders", () => {
        mount(<Image src={IMAGE_URL} />);

        cy.get("[data-test-id=image-container]").as("container");
        cy.get("[data-test-id=image-container] img").as("image");

        cy.get("@container").should("have.class", css.container);
        cy.get("@image").should("have.class", css.image);
        cy.get("@image").should("have.class", css.roundedCorners);
        cy.get("[data-test-id=image-controls]").should("not.exist");

        cy.log("Make sure the asset (image) is visible and loaded");
        cy.get("@image")
            .should("be.visible")
            .then(($image) => {
                const image = $image.get(0) as HTMLImageElement;
                expect(image.naturalWidth).to.be.greaterThan(0);
            });
    });

    it("has no rounded corners", () => {
        mount(<Image src={IMAGE_URL} roundedCorners={false} />);

        cy.get("[data-test-id=image-container]").as("container");
        cy.get("[data-test-id=image-container] img").as("image");

        cy.get("@container").should("have.class", css.container);
        cy.get("@image").should("have.class", css.image);
        cy.get("@image").should("not.have.class", css.roundedCorners);
    });

    it("shows controls on hover if at least one action is allowed", () => {
        mount(<Image src={IMAGE_URL} onDeleteImage={() => console.log("delete")} />);

        cy.get("[data-test-id=image-controls]").as("controls");

        cy.get("@controls").should("not.be.visible");
        cy.get("@controls").invoke("show");
        cy.get("@controls").should("be.visible");
    });

    it("is replaceable", () => {
        mount(<Image src={IMAGE_URL} onReplaceImage={() => console.log("replace")} />);

        cy.get("[data-test-id=image-controls]").as("controls");
        cy.get("[data-test-id=image-controls] [data-test-id=button]").as("button");

        cy.get("@controls").invoke("show");
        cy.get("@button").should("be.visible");
        cy.get("@button").should("have.length", 1);
    });

    it("is replaceable and deleteable", () => {
        mount(
            <Image
                src={IMAGE_URL}
                onReplaceImage={() => console.log("replace")}
                onDeleteImage={() => console.log("delete")}
            />,
        );

        cy.get("[data-test-id=image-controls]").as("controls");
        cy.get("[data-test-id=image-controls] [data-test-id=button]").as("button");

        cy.get("@controls").invoke("show");
        cy.get("@button").should("be.visible");
        cy.get("@button").should("have.length", 2);
    });

    it("is replaceable, deleteable and configurable", () => {
        mount(
            <Image
                src={IMAGE_URL}
                onDeleteImage={() => console.log("delete")}
                onOpenSettings={() => console.log("settings")}
                onReplaceImage={() => console.log("replace")}
            />,
        );

        cy.get("[data-test-id=image-controls]").as("controls");
        cy.get("[data-test-id=image-controls] [data-test-id=button]").as("button");

        cy.get("@controls").invoke("show");
        cy.get("@button").should("be.visible");
        cy.get("@button").should("have.length", 3);
    });

    it("calls the onReplaceImageClick event", () => {
        const onReplaceImageStub = cy.stub().as("onReplaceImageClick");

        mount(<Image src={IMAGE_URL} onReplaceImage={onReplaceImageStub} />);
        cy.get("[data-test-id=image-controls]").as("controls");
        cy.get("@controls").invoke("show");
        cy.get("[data-test-id=image-controls] [data-test-id=button]").as("button").click();

        cy.get("@onReplaceImageClick").should("to.have.always.been.callCount", 1);
    });

    it("calls the onOpenSettingsClick event", () => {
        const onOpenSettingsStub = cy.stub().as("onOpenSettingsClick");

        mount(<Image src={IMAGE_URL} onOpenSettings={onOpenSettingsStub} />);
        cy.get("[data-test-id=image-controls]").as("controls");
        cy.get("@controls").invoke("show");
        cy.get("[data-test-id=image-controls] [data-test-id=button]").as("button").click();

        cy.get("@onOpenSettingsClick").should("to.have.always.been.callCount", 1);
    });

    it("calls the onHandleDeleteClick event", () => {
        const onHandleDeleteStub = cy.stub().as("onHandleDeleteClick");

        mount(<Image src={IMAGE_URL} onDeleteImage={onHandleDeleteStub} />);
        cy.get("[data-test-id=image-controls]").as("controls");
        cy.get("@controls").invoke("show");
        cy.get("[data-test-id=image-controls] [data-test-id=button]").as("button").click();

        cy.get("@onHandleDeleteClick").should("to.have.always.been.callCount", 1);
    });
});
