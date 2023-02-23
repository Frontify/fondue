/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Validation } from '@utilities/validation';
import React from 'react';
import { DatePicker } from './DatePicker';

export const TEXT_INPUT_ID = '[data-test-id=text-input]';
const OPEN_CLOSE_CLICK_AREA_ID = '[data-test-id=open-close-click-zone]';
export const DATE_PICKER_ID = '[data-test-id=date-picker]';
const EXCLAMATION_MARK_ICON_ID = '[data-test-id=error-state-exclamation-mark-icon]';
const CLEAR_ICON_ID = '[data-test-id=clear-icon]';

describe('DatePicker Component', () => {
    const onChangeStub = cy.stub().as('onChangeStub');
    it('renders text input as part of Datepicker component', () => {
        cy.mount(<DatePicker onChange={onChangeStub} />);

        cy.get(TEXT_INPUT_ID).should('have.length', 1);
    });

    it('renders calendar on text input click', () => {
        cy.mount(<DatePicker onChange={onChangeStub} />);

        cy.get(OPEN_CLOSE_CLICK_AREA_ID).click();
        cy.get(DATE_PICKER_ID).should('exist');
    });

    it('should render cancel icon if isClearable prop is true', () => {
        cy.mount(<DatePicker onChange={onChangeStub} isClearable={true} value={new Date()} />);

        cy.get(OPEN_CLOSE_CLICK_AREA_ID).click();
        cy.get('.react-datepicker__day').first().click();
        cy.get(CLEAR_ICON_ID).should('exist');
    });

    it('should clear the input if cancel icon is clicked', () => {
        cy.mount(<DatePicker isClearable={true} value={new Date()} onChange={onChangeStub} />);

        cy.get(OPEN_CLOSE_CLICK_AREA_ID).click();
        cy.get('.react-datepicker__close-icon').click();
        cy.get('@onChangeStub').should('be.calledOnce');
    });

    it('should close calendar if shouldCloseOnSelect is true, and date is selected', () => {
        cy.mount(<DatePicker onChange={onChangeStub} shouldCloseOnSelect={true} />);

        cy.get(OPEN_CLOSE_CLICK_AREA_ID).click();
        cy.get('.react-datepicker__day').first().click();
        cy.get('.react-datepicker-wrap').should('not.exist');
    });

    it('should close call onChange prop function, if date is selected', () => {
        const onChangeStub = cy.stub().as('onChangeStub');
        cy.mount(<DatePicker shouldCloseOnSelect={true} onChange={onChangeStub} />);

        cy.get(OPEN_CLOSE_CLICK_AREA_ID).click();
        cy.get('.react-datepicker__day').first().click();
        cy.get('@onChangeStub').should('be.calledOnce');
    });

    it('only error validation state should show the triangle warning icon', () => {
        for (const validationState of Object.values(Validation)) {
            if (validationState === Validation.Error) {
                cy.mount(<DatePicker onChange={onChangeStub} validation={validationState} />);
                cy.get(EXCLAMATION_MARK_ICON_ID).should('be.visible');
                return;
            }
            cy.mount(<DatePicker onChange={onChangeStub} validation={validationState} />);
            cy.get(TEXT_INPUT_ID).find(EXCLAMATION_MARK_ICON_ID).should('have.length', 0);
        }
    });
});
