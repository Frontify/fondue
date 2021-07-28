/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import Iframe, { IframeBorder, IframeHeight, IframePointerEvents } from "./Iframe";
import css from "./Iframe.module.css";

const src = "https://www.external-url.com";
const title = "External URL";

describe("Iframe component", () => {
    it("renders", () => {
        mount(<Iframe title={title} src={src} />);
        cy.get("iframe").should("have.class", css.iframe);
        cy.get("iframe").should("have.attr", "src").and("eq", src);
        cy.get("iframe").invoke("attr", "title").should("eq", title);
    });
    it("has borders", () => {
        mount(<Iframe title={title} src={src} border={IframeBorder.Default} />);
        cy.get("iframe").should("have.class", css.borderDefault);
        cy.get("iframe").invoke("attr", "title").should("eq", title);
    });
    it("has a small height", () => {
        mount(<Iframe title={title} src={src} height={IframeHeight.Small} />);
        cy.get("iframe").should("have.class", css.heightSmall);
        cy.get("iframe").invoke("attr", "title").should("eq", title);
    });
    it("has pointerEvents", () => {
        mount(<Iframe title={title} src={src} pointerEvents={IframePointerEvents.None} />);
        cy.get("iframe").should("have.class", css.pointerEventsNone);
        cy.get("iframe").invoke("attr", "title").should("eq", title);
    });
});
