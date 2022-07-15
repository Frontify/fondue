/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from 'cypress/react';
import React from 'react';
import { Textarea } from './Textarea';

const DEFAULT_TEXT = 'A new text area';
const PLACEHOLDER = 'This is the placeholder';
const DECORATOR_TEXT = 'And also a decorator';
const DECORATOR = <span>{DECORATOR_TEXT}</span>;
const INPUT_TEXT = 'some text';
const ROW_HEIGHT = 16;
const TEXTAREA_ID = '[data-test-id=textarea]';

describe('Textarea component', () => {
    it('renders', () => {
        mount(<Textarea></Textarea>);
        cy.get(TEXTAREA_ID).should('not.have.attr', 'value');
        cy.get(TEXTAREA_ID).should('not.have.attr', 'required');
        cy.get(TEXTAREA_ID).should('not.have.attr', 'placeholder');
        cy.get(TEXTAREA_ID).should('not.have.attr', 'disabled');
        cy.get(TEXTAREA_ID).find('[data-test-id="decorator"]').should('have.length', 0);
    });

    it('sets and gets the value', () => {
        mount(<Textarea value={DEFAULT_TEXT}></Textarea>);
        cy.get(TEXTAREA_ID).should('have.value', DEFAULT_TEXT);
    });

    it('has the required attribute', () => {
        mount(<Textarea required={true}></Textarea>);
        cy.get(TEXTAREA_ID).should('have.attr', 'required');
    });

    it('does not have the required attribute', () => {
        mount(<Textarea required={false}></Textarea>);
        cy.get(TEXTAREA_ID).should('not.have.attr', 'required');
    });

    it('has the disabled attribute', () => {
        mount(<Textarea disabled={true}></Textarea>);
        cy.get(TEXTAREA_ID).should('have.attr', 'disabled');
    });

    it('does not have the disabled attribute', () => {
        mount(<Textarea disabled={false}></Textarea>);
        cy.get(TEXTAREA_ID).should('not.have.attr', 'disabled');
    });

    it('renders the placeholder', () => {
        mount(<Textarea placeholder={PLACEHOLDER}></Textarea>);
        cy.get(TEXTAREA_ID).should('have.attr', 'placeholder').and('eq', PLACEHOLDER);
    });

    it('renders the decorator', () => {
        mount(<Textarea decorator={DECORATOR}></Textarea>);
        cy.get('[data-test-id="decorator"]').should('be.visible').contains(DECORATOR_TEXT);
    });

    it('calls the onInput event', () => {
        const onInputStub = cy.stub().as('onInputStub');
        mount(<Textarea onInput={onInputStub}></Textarea>);
        cy.get(TEXTAREA_ID).type(INPUT_TEXT);
        cy.get('@onInputStub').should('to.have.always.been.callCount', INPUT_TEXT.length);
    });

    it('calls the onBlur event', () => {
        const onBlurStub = cy.stub().as('onBlurStub');
        mount(<Textarea onBlur={onBlurStub}></Textarea>);
        cy.get(TEXTAREA_ID).type(INPUT_TEXT).blur();
        cy.get('@onBlurStub').should('be.calledOnce');
    });

    it('starts with the minimum number of rows', () => {
        mount(<Textarea minRows={4} autosize />);
        cy.get(TEXTAREA_ID).should(($textarea) => {
            const height = $textarea.height() ?? 0;
            expect(Math.round(height)).to.equal(ROW_HEIGHT * 4);
        });
    });

    it('automatically grows in height', () => {
        mount(<Textarea minRows={1} autosize />);
        cy.get(TEXTAREA_ID).should(($textarea) => {
            const height = $textarea.height() ?? 0;
            expect(Math.round(height)).to.equal(ROW_HEIGHT);
        });
        cy.get(TEXTAREA_ID).type('{enter}{enter}');
        cy.get(TEXTAREA_ID).should(($textarea) => {
            const height = $textarea.height() ?? 0;
            expect(Math.round(height)).to.equal(ROW_HEIGHT * 3);
        });
    });

    it('does not grow more than max height', () => {
        mount(<Textarea minRows={1} maxRows={2} autosize />);
        cy.get(TEXTAREA_ID).should(($textarea) => {
            const height = $textarea.height() ?? 0;
            expect(Math.round(height)).to.equal(ROW_HEIGHT);
        });
        cy.get(TEXTAREA_ID).type('{enter}{enter}');
        cy.get(TEXTAREA_ID).should(($textarea) => {
            const height = $textarea.height() ?? 0;
            expect(Math.round(height)).to.equal(ROW_HEIGHT * 2);
        });
    });

    it('uses min-rows as rows if autosize is false', () => {
        mount(<Textarea minRows={10} />);
        cy.get(TEXTAREA_ID).should(($textarea) => {
            const height = $textarea.height() ?? 0;
            expect(Math.round(height)).to.equal(ROW_HEIGHT * 10);
        });
    });

    it('removes resize handler', () => {
        mount(<Textarea resizeable={false} />);
        cy.get(TEXTAREA_ID).should('have.css', 'resize', 'none');
    });
});
