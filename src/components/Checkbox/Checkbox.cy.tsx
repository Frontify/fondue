/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC, useState } from 'react';
import { Checkbox, CheckboxProps, CheckboxState } from './Checkbox';

const CHECKBOX_LABEL = 'Checkbox label';
const NOTE_TEXT = 'Note about this input';
const CHECKBOX_ID = '[data-test-id=checkbox]';
const TOOLTIP_ID = '[data-test-id=tooltip]';
const CHECKBOX_INPUT_ID = '[data-test-id=checkbox-input]';
const TOOLTIP_ICON_TRIGGER_ID = '[data-test-id=tooltip-icon-trigger]';
const CHECKBOX_VALUE = 'value';
const INPUT_LABEL_REQUIRED_ID = '[data-test-id=input-label-required]';
const CHECKBOX_NOTE_ID = '[data-test-id=checkbox-note]';

const CheckboxComponent: FC<CheckboxProps> = (props) => {
    const [checked, setChecked] = useState(props.state);

    return (
        <Checkbox
            {...props}
            state={checked}
            onChange={(isChecked: boolean) => {
                setChecked(isChecked ? CheckboxState.Checked : CheckboxState.Unchecked);
                props.onChange && props.onChange(isChecked);
            }}
        />
    );
};

const verifyCheckboxExists = () => {
    cy.get(CHECKBOX_ID).get('svg').invoke('attr', 'name').should('eq', 'IconCheckMark16');
};

describe('Checkbox component', () => {
    it('renders', () => {
        cy.mount(<CheckboxComponent state={CheckboxState.Checked} />);

        verifyCheckboxExists();
    });

    it('renders with a checkbox icon if checked', () => {
        cy.mount(<CheckboxComponent state={CheckboxState.Checked} />);

        verifyCheckboxExists();
        cy.get(CHECKBOX_INPUT_ID).invoke('attr', 'checked').should('exist');
    });

    it('renders with a minus icon if indeterminate', () => {
        cy.mount(<CheckboxComponent state={CheckboxState.Mixed} />);

        cy.get(CHECKBOX_ID).get('svg').invoke('attr', 'name').should('eq', 'IconMinus16');
        cy.get(CHECKBOX_INPUT_ID).invoke('attr', 'checked').should('not.exist');
    });

    it('renders without an icon if unchecked', () => {
        cy.mount(<CheckboxComponent state={CheckboxState.Unchecked} />);

        cy.get(CHECKBOX_ID).get('svg').should('not.exist');
        cy.get(CHECKBOX_INPUT_ID).invoke('attr', 'checked').should('not.exist');
    });

    it('renders with a red asterisk if required', () => {
        cy.mount(<CheckboxComponent required={true} label={CHECKBOX_LABEL} />);

        cy.get(INPUT_LABEL_REQUIRED_ID).should('exist');
    });

    it('renders with required attribute', () => {
        cy.mount(<CheckboxComponent required={true} label={CHECKBOX_LABEL} />);

        cy.get(CHECKBOX_INPUT_ID).should('have.attr', 'required');
        cy.get(CHECKBOX_INPUT_ID).should('have.attr', 'aria-required');
    });

    it('renders with a label', () => {
        cy.mount(<CheckboxComponent label={CHECKBOX_LABEL} />);

        cy.get(CHECKBOX_ID).contains(CHECKBOX_LABEL);
    });

    it('renders with a tooltip', () => {
        cy.mount(<CheckboxComponent label={CHECKBOX_LABEL} tooltip={{ content: 'Checkbox tooltip' }} />);

        cy.get(TOOLTIP_ICON_TRIGGER_ID).should('exist');
    });

    it('renders as disabled', () => {
        cy.mount(<CheckboxComponent label={CHECKBOX_LABEL} disabled />);

        cy.get(CHECKBOX_INPUT_ID).invoke('attr', 'disabled').should('eq', 'disabled');
    });

    it('should check with keyboard', () => {
        cy.mount(<CheckboxComponent state={CheckboxState.Unchecked} />);

        cy.window().focus();
        cy.get('body').realPress('Tab');
        cy.get(CHECKBOX_INPUT_ID).should('be.focused');
        cy.get(CHECKBOX_ID).realPress('Space');
        cy.get(CHECKBOX_ID).get('svg').invoke('attr', 'name').should('eq', 'IconCheckMark16');
    });

    it('should focus the tooltip using the keyboard', () => {
        cy.mount(<CheckboxComponent label={CHECKBOX_LABEL} tooltip={{ content: 'Checkbox tooltip' }} />);

        cy.window().focus();
        cy.get('body').realPress('Tab');
        cy.get('body').realPress('Tab');
        cy.get(TOOLTIP_ICON_TRIGGER_ID).should('be.focused');
        cy.get(TOOLTIP_ID).should('contain', 'Checkbox tooltip');
    });

    it('should forward value to input', () => {
        cy.mount(<CheckboxComponent value={CHECKBOX_VALUE} />);

        cy.get(CHECKBOX_INPUT_ID).should('have.value', CHECKBOX_VALUE);
    });

    it('should render helper text', () => {
        cy.mount(<CheckboxComponent helperText={NOTE_TEXT} />);

        cy.get(CHECKBOX_NOTE_ID).should('exist');
        cy.get(CHECKBOX_NOTE_ID).should('contain', NOTE_TEXT);
    });

    it('should call onChange', () => {
        const onChangeStub = cy.stub().as('onChangeStub');
        cy.mount(<CheckboxComponent onChange={onChangeStub} />);

        cy.get(CHECKBOX_INPUT_ID).click({ force: true });
        cy.get('@onChangeStub').should('be.calledOnce');
    });
});
