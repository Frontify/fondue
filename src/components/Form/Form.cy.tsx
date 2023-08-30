/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Form } from '@components/Form/Form';
import { Button, ButtonType } from '@components/Button';
import { TextInput } from '@components/TextInput';

const FORM_ID = '[data-test-id=fondue-form]';
const BUTTON_ID = '[data-test-id=button]';

describe('Form', () => {
    it('should render correctly', () => {
        cy.mount(
            <Form>
                <TextInput id="label" value="some value" />
            </Form>,
        );

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
            >
                <TextInput id="label" value="some value" />
            </Form>,
        );

        cy.get(FORM_ID).should('have.attr', 'method', 'post');
        cy.get(FORM_ID).should('have.attr', 'target', '_blank');
        cy.get(FORM_ID).should('have.attr', 'name', 'some-name');
        cy.get(FORM_ID).should('have.attr', 'autocomplete', 'on');
        cy.get(FORM_ID).should('have.attr', 'enctype', 'text/plain');
        cy.get(FORM_ID).should('have.attr', 'novalidate');
    });

    it('should submit the form', () => {
        const onSubmitStub = cy.stub().as('onSubmitStub');

        cy.mount(
            <Form
                onSubmit={(event) => {
                    event.preventDefault();
                    onSubmitStub();
                }}
            >
                <TextInput id="label" value="some value" />
                <Button type={ButtonType.Submit}>Submit</Button>
            </Form>,
        );

        cy.get(BUTTON_ID).should('exist');
        cy.get(FORM_ID).should('exist');
        cy.get(BUTTON_ID).click();
        cy.wrap(onSubmitStub).should('have.been.calledOnce');
    });
});
