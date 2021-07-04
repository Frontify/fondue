/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MemoryRouter } from "react-router-dom";
import { mount } from "@cypress/react";
import SidebarItemLink from "./SidebarItemLink";
import css from "./SidebarItemLink.module.css";

const SIDEBAR_ITEM_LABEL = "Frontify";
const SIDEBAR_ITEM_URL = "/abc";

describe("Sidebar Item Link component", () => {
    it("renders", () => {
        mount(
            <MemoryRouter>
                <SidebarItemLink label={SIDEBAR_ITEM_LABEL} link={SIDEBAR_ITEM_URL} />
            </MemoryRouter>,
        );

        cy.get("[data-test-id=sidebar-item-link]").as("sidebar-item-link");

        cy.get("@sidebar-item-link").contains(SIDEBAR_ITEM_LABEL);
        cy.get("@sidebar-item-link").should("have.attr", "href").and("eq", SIDEBAR_ITEM_URL);
        cy.get("@sidebar-item-link").should("have.class", css.groupRow);
        cy.get("@sidebar-item-link").should("not.have.class", css.groupRowSelected);
    });

    it("has an unselected state", () => {
        mount(
            <MemoryRouter>
                <SidebarItemLink label={SIDEBAR_ITEM_LABEL} link={SIDEBAR_ITEM_URL} />
            </MemoryRouter>,
        );

        cy.get("[data-test-id=sidebar-item-link]").as("sidebar-item-link");

        cy.get("@sidebar-item-link").contains(SIDEBAR_ITEM_LABEL);
        cy.get("@sidebar-item-link").should("have.attr", "href").and("eq", SIDEBAR_ITEM_URL);
        cy.get("@sidebar-item-link").should("have.class", css.groupRow);
        cy.get("@sidebar-item-link").should("not.have.class", css.groupRowSelected);
    });
});
