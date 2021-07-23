/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import Badge, { BadgeStatus, statusClasses } from "./Badge";

const BADGE_TEXT = "Frontify";
const BADGE_ID = "[data-test-id=badge]";
const BADGE_STATUS_ID = "[data-test-id=badge-status]";

describe("Badge component", () => {
    it("renders", () => {
        mount(<Badge>{BADGE_TEXT}</Badge>);

        cy.get(BADGE_ID).should("be.visible");
        cy.get(BADGE_ID).contains(BADGE_TEXT);
    });

    Object.values(BadgeStatus).forEach((status) => {
        status !== BadgeStatus.Custom &&
            it(`has the ${status} status`, () => {
                mount(<Badge status={status}>{BADGE_TEXT}</Badge>);

                cy.get(BADGE_STATUS_ID).should("have.class", statusClasses[status]);
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

        cy.get(BADGE_STATUS_ID).should("have.css", "background-color", colorRgb);
    });
});
