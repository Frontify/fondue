/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Form } from '@components/Form/Form';
import { Button } from '@components/Button';

const FORM_ID = '[data-test-id=fondue-form]';
const BUTTON_ID = '[data-test-id=button]';
describe('Form', () => {
    it('should render', () => {
        cy.mount(<Form />);

        cy.get(FORM_ID).should('exist');
    });

    it('should render correct attributes', () => {
        cy.mount(
            <Form
                method="post"
                target="_blank"
                name="some-name"
                autoComplete="on"
                encType="text/plain"
                noValidate={true}
            />,
        );

        cy.get(FORM_ID).should('have.attr', 'method', 'post');
        cy.get(FORM_ID).should('have.attr', 'target', '_blank');
        cy.get(FORM_ID).should('have.attr', 'name', 'some-name');
        cy.get(FORM_ID).should('have.attr', 'autocomplete', 'on');
        cy.get(FORM_ID).should('have.attr', 'enctype', 'text/plain');
        cy.get(FORM_ID).should('have.attr', 'novalidate');
    });

    it('should render with children', () => {
        cy.mount(
            <Form>
                <Button>Submit</Button>
            </Form>,
        );

        cy.get(BUTTON_ID).should('exist');
        cy.get(BUTTON_ID).parent().should('have.attr', 'data-test-id', 'fondue-form');
    });
});
