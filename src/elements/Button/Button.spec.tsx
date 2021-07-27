/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import Button, { Size, Style } from "./Button";
import { ReactComponent as Icons } from "@elements/Icon/Svg/Icons.svg";

const BUTTON_TEXT = "Frontify";
const BUTTON_ID = "[data-test-id=button]";

const styles = Object.values(Style);
const sizes = Object.values(Size);
const solids = [true, false];

describe("Button component", () => {
    styles.map((style) => {
        sizes.map((size) => {
            solids.map((solid) => {
                it(`renders in ${style} ${size} and ${solid ? "solid" : "translucent"} with only text.`, () => {
                    mount(
                        <Button style={style} size={size} solid={solid}>
                            {BUTTON_TEXT}
                        </Button>,
                    );

                    cy.get(BUTTON_ID).should("be.visible");
                    cy.get(BUTTON_ID).contains(BUTTON_TEXT);
                });

                it(`renders in ${style} ${size} and ${solid ? "solid" : "translucent"} with only an icon.`, () => {
                    mount(<Button style={style} size={size} solid={solid} icon={<Icons />} />);

                    cy.get(BUTTON_ID).children("svg").should("be.visible");
                    cy.get(BUTTON_ID).should("not.contain", BUTTON_TEXT);
                });

                it(`renders in ${style} ${size} and ${solid ? "solid" : "translucent"} with an icon and text.`, () => {
                    mount(
                        <Button style={style} size={size} solid={solid} icon={<Icons />}>
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
