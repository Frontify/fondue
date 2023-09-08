/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PatternDesign, PatternScale, PatternTheme, patternScales, patternThemes } from '@foundation/Pattern';
import { FrontifyPattern } from './FrontifyPattern';

const FRONTIFY_PATTERN = '[data-test-id=frontify-pattern]';
const PATTERN_IDS = Array.from([
    '[data-test-id=pattern-digital-assets]',
    '[data-test-id=pattern-imagery]',
    '[data-test-id=pattern-sound]',
    '[data-test-id=pattern-typography]',
]);

const designTypesToIdsMap = new Map();
for (const [index, design] of Object.values(PatternDesign).entries()) {
    designTypesToIdsMap.set(design, PATTERN_IDS[index]);
}

describe('FrontifyPattern Component', () => {
    it('should render a pattern', () => {
        cy.mount(<FrontifyPattern pattern={PatternDesign.DigitalAssets} />);

        cy.get(FRONTIFY_PATTERN).should('exist');
    });

    for (const design of Object.values(PatternDesign)) {
        it(`should render a pattern with the '${design}' design`, () => {
            cy.mount(<FrontifyPattern pattern={design} />);

            cy.get(designTypesToIdsMap.get(design)).should('exist');
        });
    }

    for (const theme of Object.values(PatternTheme)) {
        it(`should render a ${theme.toLowerCase()} themed pattern`, () => {
            cy.mount(<FrontifyPattern pattern={PatternDesign.DigitalAssets} foregroundColor={theme} />);

            cy.get(FRONTIFY_PATTERN).should('have.class', patternThemes[theme]);
        });
    }

    for (const scale of Object.values(PatternScale)) {
        it(`should render a pattern scaled ${patternScales[scale]}x`, () => {
            cy.mount(<FrontifyPattern pattern={PatternDesign.DigitalAssets} scale={scale} />);

            cy.get(FRONTIFY_PATTERN)
                .should('have.attr', 'style')
                .and('contain', `transform: scale(${patternScales[scale]});`);
        });
    }

    it('should render a pattern with an origin of top and left', () => {
        cy.mount(<FrontifyPattern pattern={PatternDesign.DigitalAssets} scaleOrigin={['top', 'left']} />);

        cy.get(FRONTIFY_PATTERN).should('have.attr', 'style').and('contain', 'transform-origin: left top');
    });
});
