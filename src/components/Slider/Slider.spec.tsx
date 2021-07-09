/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import { useState } from "react";
import Slider from "./Slider";
import css from "./Slider.module.css";

const SLIDER_ITEMS = [
    { id: "a", name: "abc" },
    { id: "b", name: "def" },
    { id: "c", name: "ghi" },
];

describe("Slider Component", () => {
    it("should render foo text correctly", () => {
        const Component = () => {
            const [active, setActive] = useState(SLIDER_ITEMS[0].id);

            return <Slider items={SLIDER_ITEMS} activeItemId={active} onChange={setActive} />;
        };

        mount(<Component />);

        cy.get("[data-test-id=Slider]").as("slider");
        cy.get("@slider").children().first().as("firstItem");
        cy.get("@slider").children().last().as("lastItem");

        cy.get("@slider").should("have.class", css.wrapper);
        cy.get("@slider").children().should("have.length", 3);
        cy.get("@firstItem").should("have.class", css.active);
        cy.get("@firstItem").contains(SLIDER_ITEMS[0].name);
        cy.get("@lastItem").click();
        cy.get("@lastItem").should("have.class", css.active);
        cy.get("@firstItem").should("not.have.class", css.active);
    });
});
