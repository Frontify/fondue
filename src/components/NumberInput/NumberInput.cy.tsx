/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { NumberInput } from './NumberInput';
import { IconNook16 } from '@foundation/Icon';
import { Validation, validationClassMap } from '@utilities/validation';

const NUMBER_INPUT_COMPONENT = '[data-test-id=fondue-number-input]';
const NUMBER_INPUT_ELEMENT = '[data-test-id=fondue-number-input-input]';
const NUMBER_INPUT_DECORATOR = '[data-test-id=fondue-number-input-decorator]';
const NUMBER_INPUT_INCREMENT = '[data-test-id=fondue-number-input-increment]';
const NUMBER_INPUT_DECREMENT = '[data-test-id=fondue-number-input-decrement]';
const NUMBER_INPUT_ERROR_ICON = '[data-test-id=fondue-number-input-error-icon]';

describe('Number Input Component', () => {
    it('should mount', () => {
        cy.mount(<NumberInput />);
        cy.get(NUMBER_INPUT_COMPONENT).should('be.visible');
    });

    it('should render input with default value', () => {
        cy.mount(<NumberInput value="2" />);
        cy.get(NUMBER_INPUT_ELEMENT).should('have.value', '2');
    });

    it('should render decorator', () => {
        cy.mount(<NumberInput decorator={<IconNook16 />} />);
        cy.get(NUMBER_INPUT_DECORATOR).should('be.visible');
    });

    it('should render increment buttons', () => {
        cy.mount(<NumberInput incrementable />);
        cy.get(NUMBER_INPUT_DECREMENT).should('be.visible');
        cy.get(NUMBER_INPUT_INCREMENT).should('be.visible');
    });

    it('should increase value by 1', () => {
        cy.mount(<NumberInput incrementable />);
        cy.get(NUMBER_INPUT_INCREMENT).click();
        cy.get(NUMBER_INPUT_ELEMENT).should('have.value', '1');
    });

    it('should increase value by 10', () => {
        cy.mount(<NumberInput incrementable />);
        cy.get(NUMBER_INPUT_INCREMENT).click({ shiftKey: true });
        cy.get(NUMBER_INPUT_ELEMENT).should('have.value', '10');
    });

    it('should decrease value by 1', () => {
        cy.mount(<NumberInput incrementable />);
        cy.get(NUMBER_INPUT_DECREMENT).click();
        cy.get(NUMBER_INPUT_ELEMENT).should('have.value', '-1');
    });

    it('should decrease value by 10', () => {
        cy.mount(<NumberInput incrementable />);
        cy.get(NUMBER_INPUT_DECREMENT).click({ shiftKey: true });
        cy.get(NUMBER_INPUT_ELEMENT).should('have.value', '-10');
    });

    it('should render error icon and text', () => {
        cy.mount(<NumberInput error errorText="Test Error Text" validation={Validation.Error} />);
        cy.get(NUMBER_INPUT_ERROR_ICON)
            .should('be.visible')
            .parent()
            .should('have.class', validationClassMap[Validation.Error]);
        cy.get(NUMBER_INPUT_COMPONENT)
            .children()
            .last()
            .contains('Test Error Text')
            .should('have.class', validationClassMap[Validation.Error]);
    });
});
