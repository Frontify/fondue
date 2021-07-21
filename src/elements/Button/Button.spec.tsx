/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import { Size, Style, Theme } from "@utilities/enum";
import Button from "./Button";
import css from "./Button.module.css";

const BUTTON_TEXT = "Frontify";

describe("Button component", () => {
    it("renders", () => {
        mount(<Button>{BUTTON_TEXT}</Button>);

        cy.get("[data-test-id=button]").as("button");

        cy.get("@button").contains(BUTTON_TEXT);

        cy.get("@button").should("have.class", css.button);
        cy.get("@button").should("have.class", css.themeLight);
        cy.get("@button").should("have.class", css.sizeSmall);
        cy.get("@button").should("have.class", css.stylePrimary);
        cy.get("@button").should("not.have.class", css.disabled);
    });

    it("has light theme", () => {
        mount(<Button theme={Theme.Light}>{BUTTON_TEXT}</Button>);

        cy.get("[data-test-id=button]").as("button");

        cy.get("@button").contains(BUTTON_TEXT);

        cy.get("@button").should("have.class", css.button);
        cy.get("@button").should("have.class", css.themeLight);
        cy.get("@button").should("have.class", css.sizeSmall);
        cy.get("@button").should("have.class", css.stylePrimary);
        cy.get("@button").should("not.have.class", css.disabled);
    });

    it("has dark theme", () => {
        mount(<Button theme={Theme.Dark}>{BUTTON_TEXT}</Button>);

        cy.get("[data-test-id=button]").as("button");

        cy.get("@button").contains(BUTTON_TEXT);

        cy.get("@button").should("have.class", css.button);
        cy.get("@button").should("have.class", css.themeDark);
        cy.get("@button").should("have.class", css.sizeSmall);
        cy.get("@button").should("have.class", css.stylePrimary);
        cy.get("@button").should("not.have.class", css.disabled);
    });

    it("is disabled", () => {
        mount(<Button disabled={true}>{BUTTON_TEXT}</Button>);

        cy.get("[data-test-id=button]").as("button");

        cy.get("@button").should("have.class", css.button);
        cy.get("@button").should("have.class", css.themeLight);
        cy.get("@button").should("have.class", css.sizeSmall);
        cy.get("@button").should("have.class", css.disabled);
        cy.get("@button").should("not.have.class", css.stylePrimary);
    });

    [Style.Primary, Style.Secondary, Style.Danger].forEach((style) =>
        it(`has ${style} style`, () => {
            mount(<Button style={style as Style.Primary | Style.Secondary | Style.Danger}>{BUTTON_TEXT}</Button>);

            cy.get("[data-test-id=button]").as("button");

            cy.get("@button").should("have.class", css.button);
            cy.get("@button").should("have.class", css.themeLight);
            cy.get("@button").should("have.class", css.sizeSmall);
            cy.get("@button").should("have.class", css[`style${style}`]);
            cy.get("@button").should("not.have.class", css.disabled);
        }),
    );

    Object.values(Size).forEach((size) => {
        it(`has the ${size} size`, () => {
            mount(<Button size={size}>{BUTTON_TEXT}</Button>);

            cy.get("[data-test-id=button]").as("button");

            cy.get("@button").should("have.class", css.button);
            cy.get("@button").should("have.class", css.themeLight);
            cy.get("@button").should("have.class", css.stylePrimary);
            cy.get("@button").should("have.class", css[`size${size}`]);
            cy.get("@button").should("not.have.class", css.disabled);
        });
    });

    it("react on click", () => {
        const onClickStub = cy.stub().as("onClickStub");
        mount(<Button onClick={onClickStub}>{BUTTON_TEXT}</Button>);

        cy.get("[data-test-id=button]").as("button");
        cy.get("@onClickStub").should("not.be.called");
        cy.get("@button").click();
        cy.get("@onClickStub").should("be.calledOnce");
    });
});
