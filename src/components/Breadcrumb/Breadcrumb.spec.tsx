/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MemoryRouter } from "react-router-dom";
import { mount } from "@cypress/react";
import Breadcrumb from "./Breadcrumb";

beforeEach("Getting the seperator", () => {
    cy.intercept("GET", "/img/diagonal-line.svg", "/public/img/diagonal-line.svg");
});

describe("Breadcrumb component", () => {
    it("has a unique item", () => {
        const breadcrumbItems = [{ label: "Some label", link: "/some-link" }];

        mount(
            <MemoryRouter>
                <Breadcrumb items={breadcrumbItems} />
            </MemoryRouter>,
        );

        cy.get("[data-test=breadcrumb-item]")
            .should("have.length", 1)
            .each(($el, index) => {
                cy.wrap($el).should("have.attr", "href", breadcrumbItems[index].link);
            });
    });

    it("has two items", () => {
        const breadcrumbItems = [
            { label: "Some first label", link: "/some-first-link" },
            { label: "Some second label", link: "/some-second-link" },
        ];

        mount(
            <MemoryRouter>
                <Breadcrumb items={breadcrumbItems} />
            </MemoryRouter>,
        );

        cy.get("[data-test=breadcrumb-item]")
            .should("have.length", 2)
            .each(($el, index) => {
                cy.wrap($el).should("have.attr", "href", breadcrumbItems[index].link);
            });
    });

    it("has three items", () => {
        const breadcrumbItems = [
            { label: "Some first label", link: "/some-first-link" },
            { label: "Some second label", link: "/some-second-link" },
            { label: "Some third label", link: "/some-third-link" },
        ];

        mount(
            <MemoryRouter>
                <Breadcrumb items={breadcrumbItems} />
            </MemoryRouter>,
        );

        cy.get("[data-test=breadcrumb-item]")
            .should("have.length", 3)
            .each(($el, index) => {
                cy.wrap($el).should("have.attr", "href", breadcrumbItems[index].link);
            });
    });
});
