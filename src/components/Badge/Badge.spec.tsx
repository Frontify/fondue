/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import IconDocument from "@components/Icon/Generated/IconDocument";
import { IconSize } from "@components/Icon/IconSize";
import React from "react";
import { Badge, BadgeStatus } from "./Badge";

const BADGE_TEXT = "Frontify";
export const BADGE_ID = "[data-test-id=badge]";
const BADGE_STATUS_ID = "[data-test-id=badge-status]";
const BADGE_ICON_ID = "[data-test-id=badge-icon]";

describe("Badge component", () => {
    it("renders", () => {
        mount(<Badge>{BADGE_TEXT}</Badge>);

        cy.get(BADGE_ID).should("exist");
        cy.get(BADGE_STATUS_ID).should("not.exist");
        cy.get(BADGE_ICON_ID).should("not.exist");
        cy.get(BADGE_ID).contains(BADGE_TEXT);
    });

    it(`renders the status dot`, () => {
        mount(<Badge status={BadgeStatus.Positive}>{BADGE_TEXT}</Badge>);

        cy.get(BADGE_STATUS_ID).should("exist");
    });

    it("should render badge with icon", () => {
        mount(<Badge icon={<IconDocument size={IconSize.Size8} />}>{BADGE_TEXT}</Badge>);

        cy.get(BADGE_ICON_ID).should("exist");
    });
});
