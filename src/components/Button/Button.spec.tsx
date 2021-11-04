/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import IconIcons from "@foundation/Icon/Generated/IconIcons";
import React from "react";
import { Button, ButtonSize, ButtonStyle } from "./Button";

const BUTTON_TEXT = "Frontify";
export const BUTTON_ID = "[data-test-id=button]";

const styles = Object.values(ButtonStyle);
const sizes = Object.values(ButtonSize);
const solids = [true, false];

describe("Button component", () => {
    styles.forEach((style) => {
        sizes.forEach((size) => {
            solids.forEach((solid) => {
                it(`renders in ${style} ${size} and ${solid ? "solid" : "translucent"} with only text.`, () => {
                    mount(
                        <Button style={style} size={size} solid={solid}>
                            {BUTTON_TEXT}
                        </Button>,
                    );

                    cy.get(BUTTON_ID).should("be.visible");
                    cy.get(BUTTON_ID).contains(BUTTON_TEXT);
                });

                it(`renders in ${style} ${size} and ${
                    solid ? "solid" : "translucent"
                } and inverted with only text.`, () => {
                    mount(
                        <Button style={style} size={size} solid={solid} inverted>
                            {BUTTON_TEXT}
                        </Button>,
                    );

                    cy.get(BUTTON_ID).should("be.visible");
                    cy.get(BUTTON_ID).contains(BUTTON_TEXT);
                });

                it(`renders in ${style} ${size} and ${solid ? "solid" : "translucent"} with only an icon.`, () => {
                    mount(<Button style={style} size={size} solid={solid} icon={<IconIcons />} />);

                    cy.get(BUTTON_ID).children("svg").should("be.visible");
                    cy.get(BUTTON_ID).should("not.contain", BUTTON_TEXT);
                });

                it(`renders in ${style} ${size} and ${solid ? "solid" : "translucent"} with an icon and text.`, () => {
                    mount(
                        <Button style={style} size={size} solid={solid} icon={<IconIcons />}>
                            {BUTTON_TEXT}
                        </Button>,
                    );

                    cy.get(BUTTON_ID).should("be.visible");
                    cy.get(BUTTON_ID).contains(BUTTON_TEXT);

                    cy.get(BUTTON_ID).children("span").children("svg").should("be.visible");
                    cy.get(BUTTON_ID).contains(BUTTON_TEXT);
                });
            });
        });
    });

    it("reacts on click", () => {
        const onClickStub = cy.stub().as("onClickStub");

        mount(<Button onClick={onClickStub}>{BUTTON_TEXT}</Button>);

        cy.get("@onClickStub").should("not.be.called");
        cy.get(BUTTON_ID).click();
        cy.get("@onClickStub").should("be.calledOnce");
    });

    it("does not react on click when disabled", () => {
        mount(<Button disabled>{BUTTON_TEXT}</Button>);
        cy.get(BUTTON_ID).invoke("attr", "disabled").should("eq", "disabled");
    });
});
