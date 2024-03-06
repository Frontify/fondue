/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Tag } from './Tag';

describe('<Tag />', () => {
    it('renders', () => {
        cy.mount(<Tag>Test</Tag>);

        cy.findByText('Test').should('be.visible');

        // These assertions should be handled by a Visual Regression tool, and not Percy
        cy.findByText('Test').should('have.css', 'background-color', 'rgb(240, 234, 250)');
        cy.findByText('Test').should('have.css', 'border-color', 'rgb(124, 87, 255)');
    });
});
