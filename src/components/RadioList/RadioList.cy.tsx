/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { RadioButton } from './RadioButton';
import { RadioList, RadioListDirection } from './RadioList';

const RADIO_LIST_WRAPPER = '[data-test-id=radio-list-wrapper]';
const RADIO_INPUT = '[data-test-id=radio-input]';
const RADIO_LABEL = '[data-test-id=radio-label]';

describe('RadioList Component', () => {
    it('should disable radio input if disabled prop is passed', () => {
        cy.mount(
            <RadioList defaultValue="Val 1">
                <RadioButton value="Val 1" />
                <RadioButton value="Val 2" disabled />
                <RadioButton value="Val 3" />
            </RadioList>,
        );

        cy.get(RADIO_INPUT).eq(1).should('have.attr', 'disabled');
    });

    it('should call onChange if radio button is clicked', () => {
        const onChangeStub = cy.stub().as('onChangeStub');
        cy.mount(
            <RadioList defaultValue="Val 3" onChange={onChangeStub}>
                <RadioButton value="Val 1" />
                <RadioButton value="Val 2" />
                <RadioButton value="Val 3" />
            </RadioList>,
        );

        cy.get(RADIO_INPUT).first().click();
        cy.get('@onChangeStub').should('have.been.calledWith', 'Val 1');
    });

    it('should not display label if hideLabel prop is passed', () => {
        const onChangeStub = cy.stub().as('onChangeStub');
        cy.mount(
            <RadioList defaultValue="Val 3" onChange={onChangeStub}>
                <RadioButton value="Val 1" />
                <RadioButton value="Val 2" />
                <RadioButton value="Val 3" hideLabel />
            </RadioList>,
        );

        cy.get(RADIO_LABEL).eq(2).should('not.exist');
    });

    it('should display radio buttons vertically if prop direction="Vertical" is passed', () => {
        cy.mount(
            <RadioList defaultValue="Val 3" direction={RadioListDirection.Vertical}>
                <RadioButton value="Val 1" />
                <RadioButton value="Val 2" />
                <RadioButton value="Val 3" />
            </RadioList>,
        );

        cy.get(RADIO_LIST_WRAPPER).should('have.class', 'tw-flex-col');
    });
});
