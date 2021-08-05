/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { mount } from "@cypress/react";
import { MemoryRouter } from "react-router-dom";
import { Breadcrumbs } from "./Breadcrumbs";

beforeEach("Getting the seperator", () => {
    cy.intercept("GET", "/img/diagonal-line.svg", "/public/img/diagonal-line.svg");
});

const BREADCRUMB_ITEM_ID = "[data-test-id=breadcrumb-item]";
describe("Breadcrumb component", () => {
    it("should render single item as current", () => {
        const breadcrumbItems = [{ label: "Some label", link: "/some-link" }];

        mount(
            <MemoryRouter>
                <Breadcrumbs items={breadcrumbItems} />
            </MemoryRouter>,
        );

        cy.get(BREADCRUMB_ITEM_ID).should("have.length", 1);
        cy.get(BREADCRUMB_ITEM_ID).find("a").should("have.attr", "aria-current", "page");
    });

    it("should render the last item as current", () => {
        const breadcrumbItems = [
            { label: "Some first label", link: "/some-first-link" },
            { label: "Some second label", link: "/some-second-link" },
            { label: "Some third label", link: "/some-third-link" },
        ];

        mount(
            <MemoryRouter>
                <Breadcrumbs items={breadcrumbItems} />
            </MemoryRouter>,
        );

        cy.get(BREADCRUMB_ITEM_ID).should("have.length", 3);
        cy.get(BREADCRUMB_ITEM_ID).eq(2).find("a").should("have.attr", "aria-current", "page");
    });
});
