/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { ScrollWrapper } from './ScrollWrapper';

const SCROLL_WRAPPER_CONTAINER = '[data-test-id=scroll-wrapper]';

const SCROLL_WRAPPER_CONTAINER_CUSTOM_ID = '[data-test-id=custom-data-test-id]';

describe('ScrollWrapper Component', () => {
    it('should render the ScrollWrapper component', () => {
        cy.mount(<ScrollWrapper />);

        cy.get(SCROLL_WRAPPER_CONTAINER).should('exist');
    });

    it('should render with custom data-test-id', () => {
        cy.mount(<ScrollWrapper data-test-id="custom-data-test-id" />);

        cy.get(SCROLL_WRAPPER_CONTAINER_CUSTOM_ID).should('exist');
    });

    it('should render with custom tabIndex', () => {
        cy.mount(<ScrollWrapper tabIndex={-1} />);

        cy.get(`${SCROLL_WRAPPER_CONTAINER} > div`).should('have.attr', 'tabindex', '-1');
    });
});
