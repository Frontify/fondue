/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { mount } from "@cypress/react";
import { RadioPill } from "./RadioPill";
import IconIcons from "@foundation/Icon/Generated/IconIcons";

const RADIOPILL_TEST_ID = "[data-test-id=radio-pill]";
const RADIOPILL_LABEL = "Label";
const RADIOPILL_ICON = <IconIcons />;
const RADIOPILL_ICON_CODE = "svg[name=IconIcons]";

describe("RadioPill Component", () => {
    it("should render inactive radio pill without icon", () => {
        mount(<RadioPill label={RADIOPILL_LABEL} active={false} />);

        cy.get(RADIOPILL_TEST_ID).contains(RADIOPILL_LABEL);
        cy.get(RADIOPILL_TEST_ID).get(RADIOPILL_ICON_CODE).should("not.exist");
        cy.get(RADIOPILL_TEST_ID).should("not.have.class", "tw-bg-black-100");
        cy.get(RADIOPILL_TEST_ID).should("not.have.class", "tw-text-white");
        cy.get(RADIOPILL_TEST_ID).should("have.class", "tw-text-black-80");
    });

    it("should render active radio pill without icon", () => {
        mount(<RadioPill label={RADIOPILL_LABEL} active={true} />);

        cy.get(RADIOPILL_TEST_ID).contains(RADIOPILL_LABEL);
        cy.get(RADIOPILL_TEST_ID).should("have.class", "tw-bg-black-100");
        cy.get(RADIOPILL_TEST_ID).should("have.class", "tw-text-white");
        cy.get(RADIOPILL_TEST_ID).should("not.have.class", "tw-text-black-80");
    });

    it("should render active radio pill with icon", () => {
        mount(<RadioPill label={RADIOPILL_LABEL} active={true} icon={RADIOPILL_ICON} />);

        cy.get(RADIOPILL_TEST_ID).contains(RADIOPILL_LABEL);
        cy.get(RADIOPILL_TEST_ID).get(RADIOPILL_ICON_CODE).should("exist");
        cy.get(RADIOPILL_TEST_ID).should("have.class", "tw-bg-black-100");
        cy.get(RADIOPILL_TEST_ID).should("have.class", "tw-text-white");
        cy.get(RADIOPILL_TEST_ID).should("not.have.class", "tw-text-black-80");
    });

    it("should render inactive radio pill with icon", () => {
        mount(<RadioPill label={RADIOPILL_LABEL} active={false} icon={RADIOPILL_ICON} />);

        cy.get(RADIOPILL_TEST_ID).contains(RADIOPILL_LABEL);
        cy.get(RADIOPILL_TEST_ID).should("not.have.class", "tw-bg-black-100");
        cy.get(RADIOPILL_TEST_ID).should("not.have.class", "tw-text-white");
        cy.get(RADIOPILL_TEST_ID).should("have.class", "tw-text-black-80");
    });
});
