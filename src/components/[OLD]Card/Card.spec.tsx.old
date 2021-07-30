/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import Card from "./Card";
import { MemoryRouter } from "react-router-dom";
import css from "./Card.module.css";

const CARD_CONTENT = "Card content";

beforeEach("Getting the image", () => {
    cy.intercept("GET", "https://dev.frontify.test/img/authorize/companion.svg", { fixture: "Hiking.jpg" });
});

describe("Card", () => {
    it("renders", () => {
        mount(
            <MemoryRouter>
                <Card icon="https://dev.frontify.test/img/authorize/companion.svg" link="https://www.test.ch">
                    {CARD_CONTENT}
                </Card>
            </MemoryRouter>,
        );

        cy.get("[data-test-id=card-cover]").should("not.exist");
        cy.get("[data-test-id=card-icon]").should("exist");
        cy.get("[data-test-id=card-content]").contains(CARD_CONTENT);
        cy.get("[data-test-id=card-dropdown-button]").should("not.exist");
    });

    it("has a cover", () => {
        cy.intercept("GET", "https://dev.frontify.test/img/cover.svg", { fixture: "Hiking.jpg" });

        mount(
            <MemoryRouter>
                <Card
                    icon="https://dev.frontify.test/img/authorize/companion.svg"
                    cover="https://dev.frontify.test/img/cover.svg"
                    link="https://www.test.ch"
                >
                    {CARD_CONTENT}
                </Card>
            </MemoryRouter>,
        );

        cy.get("[data-test-id=card-cover]").should("exist");
    });

    it("opens the dropdown menu on click of the button", () => {
        mount(
            <MemoryRouter>
                <Card
                    icon="https://dev.frontify.test/img/authorize/companion.svg"
                    link="https://www.test.ch"
                    dropdown={<div>Test Dropdown</div>}
                >
                    {CARD_CONTENT}
                </Card>
            </MemoryRouter>,
        );

        cy.get("[data-test-id=card-dropdown-button]").should("exist");
        cy.get("[data-test-id=card-dropdown-button]").click();
        cy.get("[data-test-id=card-dropdown-button]").should("have.class", css.selected);
        cy.get("[data-test-id=card-dropdown]").should("exist");
    });
});
