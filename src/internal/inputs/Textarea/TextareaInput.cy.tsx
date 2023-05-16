/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { TextareaInput, TextareaInputProps } from './TextareaInput';

const TEXTAREA_INPUT_ID = '[data-test-id="fondue-textarea-input"]';
const INPUT_LABEL_ID = '[data-test-id="input-label"]';
const INPUT_LABEL_EXTRA_TEXT = '[data-test-id="fondue-input-label-extra-text"]';
const INPUT_HELP_TEXT_ID = '[data-test-id="fondue-input-help-text"]';

const Component = (props: Omit<TextareaInputProps, 'label'>) => {
    return <TextareaInput label="Your name" {...props} />;
};

describe('TextareaInput', () => {
    it('renders the component with mandatory props', () => {
        cy.mount(<Component />);
        cy.get(TEXTAREA_INPUT_ID).should('exist');
        cy.get(INPUT_LABEL_ID).should('have.text', 'Your name');
    });

    it('renders with label extra text', () => {
        cy.mount(<Component labelExtraText="0/100" />);
        cy.get(INPUT_LABEL_EXTRA_TEXT).should('have.text', '0/100');
    });

    it('renders with help text', () => {
        cy.mount(<Component helpText="Type your name" />);
        cy.get(INPUT_HELP_TEXT_ID).should('have.text', 'Type your name');
        cy.get(INPUT_HELP_TEXT_ID).should('have.class', 'tw-text-text-weak');
    });
});
