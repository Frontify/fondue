/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import Iframe, { IframeBorder, IframeHeight, IframePointerEvents } from "./Iframe";
import css from "./Iframe.module.css";

const src = "https://www.external-url.com";

describe("Iframe component", () => {
    it("renders", () => {
        mount(<Iframe src={src} />);
        cy.get("iframe").should("have.class", css.iframe);
        cy.get("iframe").should("have.attr", "src").and("eq", src);
    });
    it("has borders", () => {
        mount(<Iframe src={src} border={IframeBorder.Default} />);
        cy.get("iframe").should("have.class", css.borderDefault);
    });
    it("has a small height", () => {
        mount(<Iframe src={src} height={IframeHeight.Small} />);
        cy.get("iframe").should("have.class", css.heightSmall);
    });
    it("has pointerEvents", () => {
        mount(<Iframe src={src} pointerEvents={IframePointerEvents.None} />);
        cy.get("iframe").should("have.class", css.pointerEventsNone);
    });
});
