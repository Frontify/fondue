/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import { useState } from "react";
import Slider from "./Slider";
import css from "./Slider.module.css";

const Slider_Items = ["abc", "def", "ghi"];

describe("Slider Component", () => {
    it("should render foo text correctly", () => {
        const Component = () => {
            const [active, setActive] = useState(Slider_Items[0]);

            return <Slider items={Slider_Items} activeItem={active} onChange={setActive} />;
        };

        mount(<Component />);

        cy.get("[data-test-id=Slider]").as("slider");
        cy.get("@slider").children().first().as("firstItem");
        cy.get("@slider").children().last().as("lastItem");

        cy.get("@slider").should("have.class", css.wrapper);
        cy.get("@slider").children().should("have.length", 3);
        cy.get("@firstItem").should("have.class", css.active);
        cy.get("@firstItem").contains(Slider_Items[0]);
        cy.get("@lastItem").click();
        cy.get("@lastItem").should("have.class", css.active);
        cy.get("@firstItem").should("not.have.class", css.active);
    });
});
