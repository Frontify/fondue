/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Code } from './Code';

describe('Code', () => {
    it('should render code as span by default', () => {
        cy.mount(<Code>The fox jumps over the lazy dog</Code>);

        cy.get('[data-test-id=heading]').should((el) => el.attr('tagName') === 'SPAN');
    });

    it('should render code as code if provided', () => {
        cy.mount(<Code as="code">The fox jumps over the lazy dog</Code>);

        cy.get('[data-test-id=heading]').should((el) => el.attr('tagName') === 'CODE');
    });
});
