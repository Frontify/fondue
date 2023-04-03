/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactElement, useState } from 'react';
import { Checkbox, CheckboxProps, CheckboxSize, CheckboxState } from './Checkbox';

const CHECKBOX_LABEL = 'Checkbox label';
const HELPER_TEXT = 'Note about this input';
const CHECKBOX_ID = '[data-test-id=checkbox]';
const TOOLTIP_ID = '[data-test-id=tooltip]';
const CHECKBOX_INPUT_ID = '[data-test-id=checkbox-input]';
const TOOLTIP_ICON_TRIGGER_ID = '[data-test-id=tooltip-icon-trigger]';
const CHECKBOX_VALUE = 'value';
const INPUT_LABEL_REQUIRED_ID = '[data-test-id=input-label-required]';
const CHECKBOX_HELPER_TEXT_ID = '[data-test-id=checkbox-helper-text]';
const CHECKBOX_ICON_BOX_ID = '[data-test-id=checkbox-icon-box]';
const CHECKBOX_LABEL_ID = '[data-test-id=checkbox-label]';

const CheckboxComponent = (props: CheckboxProps): ReactElement => {
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

    it('renders with default size when size is not defined', () => {
        cy.mount(<CheckboxComponent label={CHECKBOX_LABEL} />);

        cy.get(CHECKBOX_ICON_BOX_ID).should('have.class', 'tw-h-4').should('have.class', 'tw-w-4');
    });

    it('renders with default size', () => {
        cy.mount(<CheckboxComponent label={CHECKBOX_LABEL} size={CheckboxSize.Default} />);

        cy.get(CHECKBOX_ICON_BOX_ID).should('have.class', 'tw-h-4').should('have.class', 'tw-w-4');
    });

    it('renders with large size', () => {
        cy.mount(<CheckboxComponent label={CHECKBOX_LABEL} size={CheckboxSize.Large} />);

        cy.get(CHECKBOX_ICON_BOX_ID).should('have.class', 'tw-h-5').should('have.class', 'tw-w-5');
    });

    it('renders without a label when hideLabel is true', () => {
        cy.mount(<CheckboxComponent label={CHECKBOX_LABEL} hideLabel={true} />);

        cy.get(CHECKBOX_LABEL_ID).should('not.exist');
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
        cy.mount(<CheckboxComponent helperText={HELPER_TEXT} />);

        cy.get(CHECKBOX_HELPER_TEXT_ID).should('exist');
        cy.get(CHECKBOX_HELPER_TEXT_ID).should('contain', HELPER_TEXT);
    });

    it('should call onChange', () => {
        const onChangeStub = cy.stub().as('onChangeStub');
        cy.mount(<CheckboxComponent onChange={onChangeStub} />);

        cy.get(CHECKBOX_INPUT_ID).click({ force: true });
        cy.get('@onChangeStub').should('be.calledOnce');
    });
});
