/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { mount } from '@cypress/react';
import { Textarea } from './Textarea';

const DEFAULT_TEXT = 'A new text area';
const PLACEHOLDER = 'This is the placeholder';
const DECORATOR_TEXT = 'And also a decorator';
const DECORATOR = <span>{DECORATOR_TEXT}</span>;
const INPUT_TEXT = 'some text';

describe('Textarea component', () => {
    it('renders', () => {
        mount(<Textarea></Textarea>);
        cy.get('textarea').as('textarea');
        cy.get('@textarea').should('not.have.attr', 'value');
        cy.get('@textarea').should('not.have.attr', 'required');
        cy.get('@textarea').should('not.have.attr', 'placeholder');
        cy.get('@textarea').should('not.have.attr', 'disabled');
        cy.get('@textarea').find('[data-test-id="decorator"]').should('have.length', 0);
    });

    it('sets and gets the value', () => {
        mount(<Textarea value={DEFAULT_TEXT}></Textarea>);
        cy.get('textarea').should('have.value', DEFAULT_TEXT);
    });

    it('has the required attribute', () => {
        mount(<Textarea required={true}></Textarea>);
        cy.get('textarea').should('have.attr', 'required');
    });

    it('does not have the required attribute', () => {
        mount(<Textarea required={false}></Textarea>);
        cy.get('textarea').should('not.have.attr', 'required');
    });

    it('has the disabled attribute', () => {
        mount(<Textarea disabled={true}></Textarea>);
        cy.get('textarea').should('have.attr', 'disabled');
    });

    it('does not have the disabled attribute', () => {
        mount(<Textarea disabled={false}></Textarea>);
        cy.get('textarea').should('not.have.attr', 'disabled');
    });

    it('renders the placeholder', () => {
        mount(<Textarea placeholder={PLACEHOLDER}></Textarea>);
        cy.get('textarea').should('have.attr', 'placeholder').and('eq', PLACEHOLDER);
    });

    it('renders the decorator', () => {
        mount(<Textarea decorator={DECORATOR}></Textarea>);
        cy.get('[data-test-id="decorator"]').should('be.visible').contains(DECORATOR_TEXT);
    });

    it('calls the onInput event', () => {
        const onInputStub = cy.stub().as('onInputStub');
        mount(<Textarea onInput={onInputStub}></Textarea>);
        cy.get('textarea').type(INPUT_TEXT);
        cy.get('@onInputStub').should('to.have.always.been.callCount', INPUT_TEXT.length);
    });

    it('calls the onBlur event', () => {
        const onBlurStub = cy.stub().as('onBlurStub');
        mount(<Textarea onBlur={onBlurStub}></Textarea>);
        cy.get('textarea').type(INPUT_TEXT).blur();
        cy.get('@onBlurStub').should('be.calledOnce');
    });
});
