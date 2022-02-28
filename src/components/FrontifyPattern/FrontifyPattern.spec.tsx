/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { mount } from "@cypress/react";
import { FrontifyPattern } from "./FrontifyPattern";
import { PatternDesign, PatternTheme, patternThemes } from "@foundation/Pattern";

const FRONTIFY_PATTERN = "[data-test-id=frontify-pattern]";
const PATTERN_DIGITAL_ASSETS = "[data-test-id=pattern-digital-assets]";
const PATTERN_IMAGERY = "[data-test-id=pattern-imagery]";
const PATTERN_SOUND = "[data-test-id=pattern-sound]";
const PATTERN_TYPOGRAPHY = "[data-test-id=pattern-typography]";

describe("FrontifyPattern Component", () => {
    it("should render a pattern", () => {
        mount(<FrontifyPattern pattern={PatternDesign.DigitalAssets} />);

        cy.get(FRONTIFY_PATTERN).should("exist");
    });

    it("should render a pattern with design 'Digital Assets'", () => {
        mount(<FrontifyPattern pattern={PatternDesign.DigitalAssets} />);

        cy.get(PATTERN_DIGITAL_ASSETS).should("exist");
    });

    it("should render a pattern with design 'Imagery'", () => {
        mount(<FrontifyPattern pattern={PatternDesign.Imagery} />);

        cy.get(PATTERN_IMAGERY).should("exist");
    });

    it("should render a pattern with design 'Sound'", () => {
        mount(<FrontifyPattern pattern={PatternDesign.Sound} />);

        cy.get(PATTERN_SOUND).should("exist");
    });

    it("should render a pattern with design 'Typography'", () => {
        mount(<FrontifyPattern pattern={PatternDesign.Typography} />);

        cy.get(PATTERN_TYPOGRAPHY).should("exist");
    });

    Object.values(PatternTheme).forEach((theme) => {
        it(`should render a ${theme} pattern`, () => {
            mount(<FrontifyPattern pattern={PatternDesign.DigitalAssets} foregroundColor={theme} />);

            cy.get(FRONTIFY_PATTERN).should("have.class", patternThemes[theme]);
        });
    });
});
