/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Validation, validationTextClassMap } from '@utilities/validation';
import { TextInput } from '../TextInput/TextInput';
import { FormField, FormFieldProps } from './FormField';
import IconInfo from '@foundation/Icon/Generated/IconInfo';
import IconQuestionMark from '@foundation/Icon/Generated/IconQuestionMark';

const FORM_FIELD_LABEL = '[data-test-id=fondue-form-field-label]';
const FORM_FIELD_LABEL_TEXT = '[data-test-id=fondue-form-field-label-text]';
const FORM_FIELD_ERROR_TEXT = '[data-test-id=fondue-form-field-error-text]';
const FORM_FIELD_HELPER_TEXT = '[data-test-id=fondue-form-field-helper-text]';
const FORM_FIELD_TOOLTIP_ONE = '[data-test-id=fondue-form-field-tooltip-1-content]';
const FORM_FIELD_TOOLTIP_ONE_ICON = '[data-test-id=fondue-form-field-tooltip-1-button]';
const FORM_FIELD_TOOLTIP_TWO = '[data-test-id=fondue-form-field-tooltip-2-content]';
const FORM_FIELD_TOOLTIP_TWO_ICON = '[data-test-id=fondue-form-field-tooltip-2-button]';

const FORM_FIELD_TEXT_INPUT = "input[type='text']";

const defaultLabel: FormFieldProps['label'] = {
    text: 'I am a test label',
};
const labelWithTooltips: FormFieldProps['label'] = {
    text: 'I am a test label',
    tooltips: [
        {
            content: 'I am a tooltip',
            children: <IconInfo />,
            'data-test-id': 'fondue-form-field-tooltip-1',
        },
        {
            content: 'I am a tooltip number 2',
            children: <IconQuestionMark />,
            'data-test-id': 'fondue-form-field-tooltip-2',
        },
    ],
};
const helperText = 'This is a test of the helper text.';
const errorText = 'This is a test of the error text.';

const COMPONENT_BASE = (
    <FormField label={defaultLabel}>
        <TextInput />
    </FormField>
);

const COMPONENT_BASE_HIDDEN_LABEL = (
    <FormField label={defaultLabel} hiddenLabel>
        <TextInput />
    </FormField>
);

const COMPONENT_BASE_WITH_TOOLTIPS = (
    <FormField label={labelWithTooltips}>
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

    it('should render without label text', () => {
        cy.mount(COMPONENT_BASE_HIDDEN_LABEL);
        cy.get(FORM_FIELD_LABEL).should('exist');
        cy.get(FORM_FIELD_LABEL).should('have.length', 1);
        cy.get(FORM_FIELD_LABEL_TEXT).should('not.exist');
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

    it('should focus input when label is clicked', () => {
        cy.mount(COMPONENT_BASE);
        cy.get(FORM_FIELD_LABEL).click();
        cy.get(FORM_FIELD_TEXT_INPUT).focused();
    });

    describe('Tooltips', () => {
        it('should render', () => {
            cy.mount(COMPONENT_BASE_WITH_TOOLTIPS);
            cy.get(FORM_FIELD_TOOLTIP_ONE_ICON).should('exist');
        });

        it('should render multiple', () => {
            cy.mount(COMPONENT_BASE_WITH_TOOLTIPS);
            cy.get(FORM_FIELD_LABEL).children().should('have.length', 2);
            cy.get(FORM_FIELD_TOOLTIP_ONE_ICON).should('exist');
            cy.get(FORM_FIELD_TOOLTIP_TWO_ICON).should('exist');
        });

        it('should open 1st tooltip dialog on hover', () => {
            cy.mount(COMPONENT_BASE_WITH_TOOLTIPS);
            cy.get(FORM_FIELD_TOOLTIP_ONE_ICON).trigger('pointerover', {
                eventConstructor: 'MouseEvent',
                pointerType: 'mouse',
            });
            cy.get(FORM_FIELD_TOOLTIP_ONE).should('exist');
        });

        it('should open 2nd tooltip dialog on hover', () => {
            cy.mount(COMPONENT_BASE_WITH_TOOLTIPS);
            cy.get(FORM_FIELD_TOOLTIP_TWO_ICON).trigger('pointerover', {
                eventConstructor: 'MouseEvent',
                pointerType: 'mouse',
            });
            cy.get(FORM_FIELD_TOOLTIP_TWO).should('exist');
        });

        it('should not open 1st tooltip on touch event', () => {
            cy.mount(COMPONENT_BASE_WITH_TOOLTIPS);
            cy.get(FORM_FIELD_TOOLTIP_ONE_ICON).trigger('pointerover', {
                eventConstructor: 'MouseEvent',
                pointerType: 'touch',
            });
            cy.get(FORM_FIELD_TOOLTIP_ONE).should('not.exist');
        });
    });
});
