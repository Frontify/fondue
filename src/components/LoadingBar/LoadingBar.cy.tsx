/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    LoadingBar,
    LoadingBarSize,
    LoadingBarState,
    loadingBarSizeClasses,
    loadingBarStateClasses,
} from './LoadingBar';

const LOADING_BAR_INNER_ID = '[data-test-id=loading-bar-inner]';
const LOADING_BAR_OUTER_ID = '[data-test-id=loading-bar-outer]';

describe('LoadingCircle Component', () => {
    it('should render correctly', () => {
        cy.mount(<LoadingBar percentage={0} />);

        cy.get(LOADING_BAR_OUTER_ID).should('exist');
    });

    for (const state of Object.values(LoadingBarState)) {
        it(`should render in ${state} state`, () => {
            cy.mount(<LoadingBar state={LoadingBarState[state]} />);

            cy.get(LOADING_BAR_OUTER_ID).should('have.class', loadingBarStateClasses[state].outer);
            cy.get(LOADING_BAR_INNER_ID).should('have.class', loadingBarStateClasses[state].inner);
        });
    }

    for (const size of Object.values(LoadingBarSize)) {
        it(`should render in ${size} size`, () => {
            cy.mount(<LoadingBar size={LoadingBarSize[size]} />);

            cy.get(LOADING_BAR_OUTER_ID).should('have.class', loadingBarSizeClasses[size]);
        });
    }

    it('should be rounded', () => {
        cy.mount(<LoadingBar rounded />);
        cy.get(LOADING_BAR_OUTER_ID).should('have.css', 'border-radius', '4px');
    });

    it('should not be rounded', () => {
        cy.mount(<LoadingBar rounded />);
        cy.get(LOADING_BAR_OUTER_ID).should('have.css', 'border-radius', '4px');
    });

    it('should render with percentage width', () => {
        cy.mount(<LoadingBar rounded percentage={60} />);
        cy.get(LOADING_BAR_OUTER_ID).then(($outer) => {
            const { width: outerWidth } = $outer[0].getBoundingClientRect();

            cy.get(LOADING_BAR_INNER_ID).then(($inner) => {
                const { width: innerWidth } = $inner[0].getBoundingClientRect();
                expect(innerWidth).to.equal(outerWidth * 0.6);
            });
        });
    });
});
