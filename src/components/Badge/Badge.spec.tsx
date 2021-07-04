/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import Badge, { BadgeStatus, BadgeTheme } from "./Badge";
import css from "./Badge.module.css";

const BADGE_TEXT = "Frontify";

describe("Badge component", () => {
    it("renders", () => {
        mount(<Badge>{BADGE_TEXT}</Badge>);

        cy.get("[data-test-id=badge]").as("badge");

        cy.get("@badge").contains(BADGE_TEXT);

        cy.get("@badge").should("have.class", css.badge);
        cy.get("@badge").should("have.class", css.themeLight);
    });

    it("has the light theme", () => {
        mount(<Badge theme={BadgeTheme.Light}>{BADGE_TEXT}</Badge>);

        cy.get("[data-test-id=badge]").as("badge");

        cy.get("@badge").contains(BADGE_TEXT);

        cy.get("@badge").should("have.class", css.badge);
        cy.get("@badge").should("have.class", css.themeLight);
    });

    it("has the dark theme", () => {
        mount(<Badge theme={BadgeTheme.Dark}>{BADGE_TEXT}</Badge>);

        cy.get("[data-test-id=badge]").as("badge");

        cy.get("@badge").contains(BADGE_TEXT);

        cy.get("@badge").should("have.class", css.badge);
        cy.get("@badge").should("have.class", css.themeDark);
    });

    Object.values(BadgeStatus).forEach((status) => {
        it(`has the ${status} status`, () => {
            mount(<Badge status={status}>{BADGE_TEXT}</Badge>);

            cy.get("[data-test-id=badge]").as("badge");

            cy.get("@badge").should("have.class", css.badge);
            cy.get("@badge").should("have.class", css.themeLight);

            if (status === BadgeStatus.Custom) {
                cy.get("[data-test-id=badge] i").should("not.exist");
            } else {
                cy.get("[data-test-id=badge] i").as("icon");
                cy.get("@icon").should("have.class", css.bubble);
                cy.get("@icon").should("have.class", css[`status${status}`]);
                cy.get("@icon").should("have.css", "background-color");
            }
        });
    });

    it("has a custom status with color", () => {
        const colorHex = "#FF00FF";
        const colorRgb = "rgb(255, 0, 255)";

        mount(
            <Badge status={BadgeStatus.Custom} customColor={colorHex}>
                {BADGE_TEXT}
            </Badge>,
        );

        cy.get("[data-test-id=badge]").as("badge");
        cy.get("[data-test-id=badge] i").as("icon");

        cy.get("@badge").contains(BADGE_TEXT);

        cy.get("@badge").should("have.class", css.badge);
        cy.get("@badge").should("have.class", css.themeLight);
        cy.get("@icon").should("have.class", css.bubble);
        cy.get("@icon").should("have.css", "background-color", colorRgb);
    });
});
