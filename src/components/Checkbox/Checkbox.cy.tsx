/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC, useState } from 'react';
import { Checkbox, CheckboxProps, CheckboxState } from './Checkbox';

const CHECKBOX_LABEL = 'Checkbox label';
const CHECKBOX_ID = '[data-test-id=checkbox]';
const TOOLTIP_ID = '[data-test-id=tooltip]';
const CHECKBOX_INPUT_ID = '[data-test-id=checkbox-input]';
const TOOLTIP_ICON_TRIGGER_ID = '[data-test-id=tooltip-icon-trigger]';
const CHECKBOX_VALUE = 'value';

const CheckboxComponent: FC<CheckboxProps> = (props) => {
    const [checked, setChecked] = useState(props.state);

    return (
        <Checkbox
            {...props}
            state={checked}
            onChange={(isChecked: boolean) => setChecked(isChecked ? CheckboxState.Checked : CheckboxState.Unchecked)}
        />
    );
};

describe('Checkbox component', () => {
    it('renders with a checkbox icon if checked', () => {
        cy.mount(<CheckboxComponent state={CheckboxState.Checked} />);

        cy.get(CHECKBOX_ID).get('svg').invoke('attr', 'name').should('eq', 'IconCheckMark16');
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

    it('renders with a label', () => {
        cy.mount(<CheckboxComponent label={CHECKBOX_LABEL} state={CheckboxState.Checked} />);

        cy.get(CHECKBOX_ID).contains(CHECKBOX_LABEL);
    });

    it('renders with a tooltip', () => {
        cy.mount(<CheckboxComponent label={CHECKBOX_LABEL} tooltip={{ content: 'Checkbox tooltip' }} />);

        cy.get(TOOLTIP_ICON_TRIGGER_ID).should('exist');
    });

    it('renders as disabled', () => {
        cy.mount(<CheckboxComponent label={CHECKBOX_LABEL} disabled state={CheckboxState.Mixed} />);

        cy.get(CHECKBOX_INPUT_ID).invoke('attr', 'checked').should('not.exist');
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
});
