/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Validation, validationTextClassMap } from '@utilities/validation';
import { TextInput } from '..';
import { FormField, FormFieldProps } from './FormField';

const FORM_FIELD_LABEL = '[data-test-id=fondue-form-field-label]';
const FORM_FIELD_ERROR_TEXT = '[data-test-id=fondue-form-field-error-text]';
const FORM_FIELD_HELPER_TEXT = '[data-test-id=fondue-form-field-helper-text]';
const FORM_FIELD_TEXT_INPUT = "input[type='text']";

const defaultLabel: FormFieldProps['label'] = {
    text: 'I am a test label',
};
const helperText = 'This is a test of the helper text.';
const errorText = 'This is a test of the error text.';

const COMPONENT_BASE = (
    <FormField label={defaultLabel}>
        <TextInput />
    </FormField>
);

const COMPONENT_WITH_ERROR = (
    <FormField label={defaultLabel} error errorText={errorText} errorTextColor={Validation.Error}>
        <TextInput />
    </FormField>
);

const COMPONENT_WITH_HELPER_TEXT = (
    <FormField label={defaultLabel} helperText={helperText} helperTextColor={Validation.Warning}>
        <TextInput />
    </FormField>
);

describe('Form Field Component', () => {
    it('should mount', () => {
        cy.mount(COMPONENT_BASE);
        cy.get(FORM_FIELD_LABEL).should('exist');
    });

    it('should render label with correct text', () => {
        cy.mount(COMPONENT_BASE);
        cy.get(FORM_FIELD_LABEL).first().should('have.text', defaultLabel.text);
    });

    it('should render child input element', () => {
        cy.mount(COMPONENT_BASE);
        cy.get(FORM_FIELD_TEXT_INPUT).should('exist');
    });

    it('should render helper text', () => {
        cy.mount(COMPONENT_WITH_HELPER_TEXT);
        cy.get(FORM_FIELD_HELPER_TEXT).should('have.text', helperText);
    });

    it('should render helper text with correct color class', () => {
        cy.mount(COMPONENT_WITH_HELPER_TEXT);
        cy.get(FORM_FIELD_HELPER_TEXT).should('have.class', validationTextClassMap[Validation.Warning]);
    });

    it('should render error text', () => {
        cy.mount(COMPONENT_WITH_ERROR);
        cy.get(FORM_FIELD_ERROR_TEXT).should('have.text', errorText);
    });

    it('should render error text with correct color class', () => {
        cy.mount(COMPONENT_WITH_ERROR);
        cy.get(FORM_FIELD_ERROR_TEXT).should('have.class', validationTextClassMap[Validation.Error]);
    });
});
