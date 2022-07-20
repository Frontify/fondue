/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { ScrollWrapper } from './ScrollWrapper';

const SCROLL_WRAPPER_CONTAINER = '[data-test-id=scroll-wrapper]';

describe('ScrollWrapper Component', () => {
    it('should render the ScrollWrapper component', () => {
        cy.mount(<ScrollWrapper />);

        cy.get(SCROLL_WRAPPER_CONTAINER).should('exist');
    });
});
