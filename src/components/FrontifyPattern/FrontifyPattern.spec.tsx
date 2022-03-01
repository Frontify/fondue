/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { mount } from "@cypress/react";
import { FrontifyPattern } from "./FrontifyPattern";
import { PatternDesign, PatternScale, patternScales, PatternTheme, patternThemes } from "@foundation/Pattern";

const FRONTIFY_PATTERN = "[data-test-id=frontify-pattern]";
const PATTERN_IDS = Array.from([
    "[data-test-id=pattern-digital-assets]",
    "[data-test-id=pattern-imagery]",
    "[data-test-id=pattern-sound]",
    "[data-test-id=pattern-typography]",
]);

const designTypesToIdsMap = new Map();
Object.values(PatternDesign).forEach((design, index) => designTypesToIdsMap.set(design, PATTERN_IDS[index]));

describe("FrontifyPattern Component", () => {
    it("should render a pattern", () => {
        mount(<FrontifyPattern pattern={PatternDesign.DigitalAssets} />);

        cy.get(FRONTIFY_PATTERN).should("exist");
    });

    Object.values(PatternDesign).forEach((design) => {
        it(`should render a pattern with the '${design}' design`, () => {
            mount(<FrontifyPattern pattern={design} />);

            cy.get(designTypesToIdsMap.get(design)).should("exist");
        });
    });

    Object.values(PatternTheme).forEach((theme) => {
        it(`should render a ${theme.toLowerCase()} themed pattern`, () => {
            mount(<FrontifyPattern pattern={PatternDesign.DigitalAssets} foregroundColor={theme} />);

            cy.get(FRONTIFY_PATTERN).should("have.class", patternThemes[theme]);
        });
    });

    Object.values(PatternScale).forEach((scale) => {
        it(`should render a pattern scaled ${patternScales[scale]}x`, () => {
            mount(<FrontifyPattern pattern={PatternDesign.DigitalAssets} scale={scale} />);

            cy.get(FRONTIFY_PATTERN).should("have.attr", "style", `transform: scale(${patternScales[scale]});`);
        });
    });
});
