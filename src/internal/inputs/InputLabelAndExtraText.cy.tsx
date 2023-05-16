/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { InputLabelAndExtraText, InputLabelAndExtraTextProps } from './InputLabelAndExtraText';

const INPUT_LABEL_AND_EXTRA_TEXT_ID = '[data-test-id="fondue-input-label-and-extra-text"]';
// This data-test-id was not changed to avoid breaking changes now
// TODO: remove this comment when the test id is updated to fondue-*
const INPUT_LABEL_ID = '[data-test-id="input-label"]';
// This data-test-id was not changed to avoid breaking changes now
// TODO: remove this comment when the test id is updated to fondue-*
const INPUT_LABEL_CONTAINER_ID = '[data-test-id="input-label-container"]';
const INPUT_LABEL_EXTRA_TEXT_ID = '[data-test-id="fondue-input-label-extra-text"]';

const Component = (props: Omit<InputLabelAndExtraTextProps, 'htmlFor' | 'label'>) => {
    return <InputLabelAndExtraText htmlFor="input-id" label="Your name" {...props} />;
};

describe('InputLabelAndExtraText', () => {
    it('renders the component with mandatory props', () => {
        cy.mount(<Component />);
        cy.get(INPUT_LABEL_AND_EXTRA_TEXT_ID).should('exist');
        cy.get(INPUT_LABEL_ID).should('have.text', 'Your name');
        cy.get(INPUT_LABEL_ID).should('have.attr', 'for', 'input-id');
        cy.get(INPUT_LABEL_EXTRA_TEXT_ID).should('not.exist');
    });

    it('renders with label extra text', () => {
        cy.mount(<Component labelExtraText="0/100" />);
        cy.get(INPUT_LABEL_EXTRA_TEXT_ID).should('exist');
        cy.get(INPUT_LABEL_EXTRA_TEXT_ID).should('have.text', '0/100');
    });

    it('renders with extra text and disabled state', () => {
        cy.mount(<Component labelExtraText="0/100" disabled />);
        cy.get(INPUT_LABEL_EXTRA_TEXT_ID).should('exist');
        cy.get(INPUT_LABEL_CONTAINER_ID).should('have.class', 'tw-text-text-disabled');
        cy.get(INPUT_LABEL_EXTRA_TEXT_ID).should('have.class', 'tw-text-text-disabled');
    });
});
