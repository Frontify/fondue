/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { InputHelpText } from './InputHelpText';
import { Validation } from '@utilities/validation';

const INPUT_HELP_TEXT_ID = '[data-test-id="fondue-input-help-text"]';

describe('InputHelpText', () => {
    it('renders null when no text prop is provided', () => {
        cy.mount(<InputHelpText />);
        cy.get(INPUT_HELP_TEXT_ID).should('not.exist');
    });

    it('renders the help text', () => {
        cy.mount(<InputHelpText helpText="Type your name" />);
        cy.get(INPUT_HELP_TEXT_ID).should('exist');
        cy.get(INPUT_HELP_TEXT_ID).should('have.text', 'Type your name');
    });

    it('renders the disabled state', () => {
        cy.mount(<InputHelpText helpText="Type your name" disabled />);
        cy.get(INPUT_HELP_TEXT_ID).should('have.text', 'Type your name');
        cy.get(INPUT_HELP_TEXT_ID).should('have.class', 'tw-text-text-disabled');
    });

    it('renders error text if validation equals error', () => {
        cy.mount(<InputHelpText helpText="Type your name" errorText="Invalid name" validation={Validation.Error} />);
        cy.get(INPUT_HELP_TEXT_ID).should('have.text', 'Invalid name');
        cy.get(INPUT_HELP_TEXT_ID).should('have.class', 'tw-text-text-negative');
    });

    it('does not render error text if validation is different than error', () => {
        cy.mount(<InputHelpText helpText="Type your name" errorText="Invalid name" validation={Validation.Success} />);
        cy.get(INPUT_HELP_TEXT_ID).should('have.text', 'Type your name');
        cy.get(INPUT_HELP_TEXT_ID).should('have.class', 'tw-text-text-weak');
    });

    it('does not render help text if readOnly is true', () => {
        cy.mount(<InputHelpText helpText="Type your name" readOnly />);
        cy.get(INPUT_HELP_TEXT_ID).should('not.exist');
    });
});
