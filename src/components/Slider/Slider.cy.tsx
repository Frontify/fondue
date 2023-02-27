/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Slider } from './Slider';

const SLIDER_ID = '[data-test-id=slider]';

describe('Slider Component', () => {
    it('renders slider', () => {
        cy.mount(<Slider />);

        cy.get(SLIDER_ID).should('be.visible');
    });
});
