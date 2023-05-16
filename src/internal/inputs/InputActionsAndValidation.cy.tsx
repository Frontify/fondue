/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { InputActionsAndValidation } from './InputActionsAndValidation';
import { Validation } from '@utilities/validation';
import { IconIcon16 } from '@foundation/Icon/Generated';

const INPUT_EXTRA_ACTION_BUTTON_ID = '[data-test-id="fondue-input-extra-action-button"]';
const INPUT_VALIDATION_SUCCESS_ID = '[data-test-id="fondue-input-valdiation-success-state"]';

describe('InputActionsAndValidation', () => {
    it('renders with extra actions and validation', () => {
        const stub = cy.stub().as('onClickStub');
        cy.mount(
            <InputActionsAndValidation
                validation={Validation.Success}
                extraActions={[
                    {
                        onClick: stub,
                        title: 'Extra action',
                        icon: <IconIcon16 />,
                    },
                ]}
            />,
        );

        cy.get(INPUT_VALIDATION_SUCCESS_ID).should('exist');
        cy.get(INPUT_EXTRA_ACTION_BUTTON_ID).should('have.length', 1);
        cy.get(INPUT_EXTRA_ACTION_BUTTON_ID).first().click();
        cy.get('@onClickStub').should('have.been.called');
    });

    it('renders only extra actions when validation is default', () => {
        const stub = cy.stub().as('onClickStub');
        cy.mount(
            <InputActionsAndValidation
                validation={Validation.Default}
                extraActions={[
                    {
                        onClick: stub,
                        title: 'Extra action 1',
                        icon: <IconIcon16 />,
                    },
                ]}
            />,
        );

        cy.get(INPUT_VALIDATION_SUCCESS_ID).should('not.exist');
        cy.get(INPUT_EXTRA_ACTION_BUTTON_ID).should('have.length', 1);
    });

    it('renders only validation when no extra actions', () => {
        cy.mount(<InputActionsAndValidation validation={Validation.Success} extraActions={[]} />);

        cy.get(INPUT_VALIDATION_SUCCESS_ID).should('exist');
        cy.get(INPUT_EXTRA_ACTION_BUTTON_ID).should('not.exist');
    });

    it('renders empty component when validation is default and no extra actions', () => {
        cy.mount(<InputActionsAndValidation validation={Validation.Default} extraActions={[]} />);

        cy.get(INPUT_VALIDATION_SUCCESS_ID).should('not.exist');
        cy.get(INPUT_EXTRA_ACTION_BUTTON_ID).should('not.exist');
    });
});
