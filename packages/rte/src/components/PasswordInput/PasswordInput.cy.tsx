/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Validation } from '@utilities/validation';

import { PasswordInput } from './PasswordInput';

const PASSWORD_INPUT = '[data-test-id=fondue-password-input]';
const PASSWORD_INPUT_ELEMENT = '[data-test-id=fondue-password-input-input]';
const PASSWORD_INPUT_VISIBILITY_ICON = '[data-test-id=fondue-password-input-visibility-icon]';
const PASSWORD_INPUT_STATUS_ICON = '[data-test-id=fondue-password-input-status-icon]';
const PASSWORD_INPUT_CLEAR_ICON = '[data-test-id=fondue-password-input-clear]';

describe('Password Input Component', () => {
    it('should render component', () => {
        cy.mount(<PasswordInput />);
        cy.get(PASSWORD_INPUT).should('exist');
    });

    it('should render visibility icon', () => {
        cy.mount(<PasswordInput />);
        cy.get(PASSWORD_INPUT_VISIBILITY_ICON).should('be.visible');
    });

    it('should render visibility icon as open eye', () => {
        cy.mount(<PasswordInput />);
        cy.get(PASSWORD_INPUT_VISIBILITY_ICON).find('svg').invoke('attr', 'name').should('contain', 'IconEye16');
    });

    it('should render visibility icon as closed eye', () => {
        cy.mount(<PasswordInput />);
        cy.get(PASSWORD_INPUT_VISIBILITY_ICON).realClick();
        cy.get(PASSWORD_INPUT_VISIBILITY_ICON).find('svg').invoke('attr', 'name').should('contain', 'IconEyeOff16');
    });

    it('should render input as type password (obfuscated)', () => {
        cy.mount(<PasswordInput />);
        cy.get(PASSWORD_INPUT_ELEMENT).type('password');
    });

    it('should render input as type text (not obfuscated)', () => {
        cy.mount(<PasswordInput />);
        cy.get(PASSWORD_INPUT_VISIBILITY_ICON).realClick();
        cy.get(PASSWORD_INPUT_ELEMENT).type('text');
    });

    it('should render clear icon', () => {
        cy.mount(<PasswordInput clearable />);
        cy.get(PASSWORD_INPUT_CLEAR_ICON).should('be.visible');
    });

    it('should clear entered value', () => {
        cy.mount(<PasswordInput clearable />);
        cy.get(PASSWORD_INPUT_ELEMENT).type('abcdefg');
        cy.get(PASSWORD_INPUT_ELEMENT).should('have.value', 'abcdefg');
        cy.get(PASSWORD_INPUT_CLEAR_ICON).realClick();
        cy.get(PASSWORD_INPUT_ELEMENT).should('not.have.value');
    });

    it('should render success status icon', () => {
        cy.mount(<PasswordInput status={Validation.Success} />);
        cy.get(PASSWORD_INPUT_STATUS_ICON).should('be.visible');
        cy.get(PASSWORD_INPUT_STATUS_ICON).find('svg').invoke('attr', 'name').should('contain', 'IconCheckMark16');
    });

    it('should render error status icon', () => {
        cy.mount(<PasswordInput status={Validation.Error} />);
        cy.get(PASSWORD_INPUT_STATUS_ICON).should('be.visible');
        cy.get(PASSWORD_INPUT_STATUS_ICON)
            .find('svg')
            .invoke('attr', 'name')
            .should('contain', 'IconExclamationMarkTriangle16');
    });

    it('should render focus ring on input when tab focused', () => {
        cy.mount(<PasswordInput />);
        cy.get(PASSWORD_INPUT).realPress('Tab');
        cy.get(PASSWORD_INPUT).should(
            'have.class',
            'tw-ring-4 tw-ring-blue tw-ring-offset-2 dark:tw-ring-offset-black tw-outline-none',
        );
    });

    it('should render focus ring only on obfuscated button when tab focused', () => {
        cy.mount(<PasswordInput />);
        cy.get(PASSWORD_INPUT).realPress('Tab').realPress('Tab');
        cy.get(PASSWORD_INPUT).should(
            'not.have.class',
            'tw-ring-4 tw-ring-blue tw-ring-offset-2 dark:tw-ring-offset-black tw-outline-none',
        );
        cy.get(PASSWORD_INPUT_VISIBILITY_ICON).should(
            'have.class',
            'focus-visible:tw-ring-4 focus-visible:tw-ring-blue focus-visible:tw-ring-offset-2 focus-visible:dark:tw-ring-offset-black focus-visible:tw-outline-none',
        );
    });

    it('should render focus ring only on clear button when tab focused', () => {
        cy.mount(<PasswordInput clearable />);
        cy.get(PASSWORD_INPUT).realPress('Tab').realPress('Tab').realPress('Tab');
        cy.get(PASSWORD_INPUT).should(
            'not.have.class',
            'tw-ring-4 tw-ring-blue tw-ring-offset-2 dark:tw-ring-offset-black tw-outline-none',
        );
        cy.get(PASSWORD_INPUT_VISIBILITY_ICON).should(
            'not.have.class',
            'focus-visible:tw-ring-4 focus-visible:tw-ring-blue focus-visible:tw-ring-offset-2 focus-visible:dark:tw-ring-offset-black focus-visible:tw-outline-none',
        );
        cy.get(PASSWORD_INPUT_CLEAR_ICON).should(
            'have.class',
            'focus-visible:tw-ring-4 focus-visible:tw-ring-blue focus-visible:tw-ring-offset-2 focus-visible:dark:tw-ring-offset-black focus-visible:tw-outline-none',
        );
    });
});
