/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Validation } from '@utilities/validation';

import { DatePicker } from './DatePicker';

export const TEXT_INPUT_ID = '[data-test-id=text-input]';
const OPEN_CLOSE_CLICK_AREA_ID = '[data-test-id=open-close-click-zone]';
export const DATE_PICKER_ID = '[data-test-id=date-picker]';
const EXCLAMATION_MARK_ICON_ID = '[data-test-id=error-state-exclamation-mark-icon]';
const CLEAR_ICON_ID = '[data-test-id=clear-icon]';
const DATEPICKER_HEADER_DATA_TEST_ID = '[data-test-id=date-picker-header]';

describe('DatePicker Component', () => {
    it('renders text input as part of Datepicker component', () => {
        const onChangeStub = cy.stub().as('onChangeStub');
        cy.mount(<DatePicker onChange={onChangeStub} />);

        cy.get(TEXT_INPUT_ID).should('have.length', 1);
    });

    it('renders calendar on text input click', () => {
        const onChangeStub = cy.stub().as('onChangeStub');
        cy.mount(<DatePicker onChange={onChangeStub} />);

        cy.get(OPEN_CLOSE_CLICK_AREA_ID).click();
        cy.get(DATE_PICKER_ID).should('exist');
    });

    it('should render cancel icon if isClearable prop is true', () => {
        const onChangeStub = cy.stub().as('onChangeStub');
        cy.mount(<DatePicker onChange={onChangeStub} isClearable={true} value={new Date()} />);

        cy.get(OPEN_CLOSE_CLICK_AREA_ID).click();
        cy.get('.react-datepicker__day').first().click();
        cy.get(CLEAR_ICON_ID).should('exist');
    });

    it('should clear the input if cancel icon is clicked', () => {
        const onChangeStub = cy.stub().as('onChangeStub');
        cy.mount(<DatePicker isClearable={true} value={new Date()} onChange={onChangeStub} />);

        cy.get(OPEN_CLOSE_CLICK_AREA_ID).click();
        cy.get('.react-datepicker__close-icon').click();
        cy.get('@onChangeStub').should('be.calledOnce');
    });

    it('should close calendar if shouldCloseOnSelect is true, and date is selected', () => {
        const onChangeStub = cy.stub().as('onChangeStub');
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

    it('should show triangle exclamation icon in case of error or warning validation states', () => {
        const onChangeStub = cy.stub().as('onChangeStub');
        for (const validationState of Object.values(Validation)) {
            if (validationState === Validation.Error || validationState === Validation.Warning) {
                cy.mount(<DatePicker onChange={onChangeStub} validation={validationState} />);
                cy.get(EXCLAMATION_MARK_ICON_ID).should('be.visible');
                return;
            }
            cy.mount(<DatePicker onChange={onChangeStub} validation={validationState} />);
            cy.get(TEXT_INPUT_ID).find(EXCLAMATION_MARK_ICON_ID).should('have.length', 0);
        }
    });

    it('should focus to the first header button when the calendar opens', () => {
        const onChangeStub = cy.stub().as('onChangeStub');
        cy.mount(<DatePicker isClearable value={new Date()} onChange={onChangeStub} />);

        cy.get(OPEN_CLOSE_CLICK_AREA_ID).click();

        cy.get(DATEPICKER_HEADER_DATA_TEST_ID).find('button').first().should('have.focus');
    });
});
