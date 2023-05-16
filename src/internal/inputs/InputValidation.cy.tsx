/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { InputValidation } from './InputValidation';
import { Validation } from '@utilities/validation';

const INPUT_VALIDATION_LOADING_ID = '[data-test-id="fondue-input-valdiation-loading-state"]';
// This data-test-id was not changed to avoid breaking changes now
// TODO: remove this comment when the test id is updated to fondue-*
const INPUT_VALIDATION_ERROR_ID = '[data-test-id="error-state-exclamation-mark-icon"]';
const INPUT_VALIDATION_SUCCESS_ID = '[data-test-id="fondue-input-valdiation-success-state"]';

describe('InputValidation', () => {
    it('renders empty component with default validation value', () => {
        cy.mount(<InputValidation value={Validation.Default} />);
        cy.get(INPUT_VALIDATION_LOADING_ID).should('not.exist');
        cy.get(INPUT_VALIDATION_ERROR_ID).should('not.exist');
        cy.get(INPUT_VALIDATION_SUCCESS_ID).should('not.exist');
    });

    it('renders loading state', () => {
        cy.mount(<InputValidation value={Validation.Loading} />);
        cy.get(INPUT_VALIDATION_LOADING_ID).should('exist');
    });

    it('renders success state', () => {
        cy.mount(<InputValidation value={Validation.Success} />);
        cy.get(INPUT_VALIDATION_SUCCESS_ID).should('exist');
    });

    it('renders error state', () => {
        cy.mount(<InputValidation value={Validation.Error} />);
        cy.get(INPUT_VALIDATION_ERROR_ID).should('exist');
        cy.get(INPUT_VALIDATION_ERROR_ID).should('have.class', 'tw-text-text-negative');
    });

    it('renders warning state', () => {
        cy.mount(<InputValidation value={Validation.Warning} />);
        cy.get(INPUT_VALIDATION_ERROR_ID).should('exist');
        cy.get(INPUT_VALIDATION_ERROR_ID).should('have.class', 'tw-text-text-warning');
    });
});
