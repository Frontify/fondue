/* (c) Copyright Frontify Ltd., all rights reserved. */

import { NumberInput } from './NumberInput';
import { IconNook16 } from '@foundation/Icon';
import { Validation, validationClassMap, validationTextClassMap } from '@utilities/validation';

const NUMBER_INPUT_COMPONENT = '[data-test-id=fondue-number-input]';
const NUMBER_INPUT_ELEMENT = '[data-test-id=fondue-number-input-input]';
const NUMBER_INPUT_DECORATOR = '[data-test-id=fondue-number-input-decorator]';
const NUMBER_INPUT_INCREMENT = '[data-test-id=fondue-number-input-increment]';
const NUMBER_INPUT_DECREMENT = '[data-test-id=fondue-number-input-decrement]';
const NUMBER_INPUT_STATUS_ICON = '[data-test-id=fondue-number-input-status-icon]';
const NUMBER_INPUT_CLEAR_BTN = '[data-test-id=fondue-number-input-clear]';

describe('Number Input Component', () => {
    it('should mount', () => {
        cy.mount(<NumberInput />);
        cy.get(NUMBER_INPUT_COMPONENT).should('be.visible');
    });

    it('should render input with default value', () => {
        cy.mount(<NumberInput defaultValue={2} />);
        cy.get(NUMBER_INPUT_ELEMENT).should('have.value', 2);
    });

    it('should render decorator', () => {
        cy.mount(<NumberInput decorator={<IconNook16 />} />);
        cy.get(NUMBER_INPUT_DECORATOR).should('be.visible');
    });

    it('should increase value by 1 on arrow right', () => {
        cy.mount(<NumberInput />);
        cy.get(NUMBER_INPUT_ELEMENT).type('{rightarrow}');
        cy.get(NUMBER_INPUT_ELEMENT).should('have.value', 1);
    });

    it('should increase value by 10 on shift + arrow right', () => {
        cy.mount(<NumberInput />);
        cy.get(NUMBER_INPUT_ELEMENT).type('{shift}{rightarrow}');
        cy.get(NUMBER_INPUT_ELEMENT).should('have.value', 10);
    });

    it('should increase value by 1 on arrow up', () => {
        cy.mount(<NumberInput />);
        cy.get(NUMBER_INPUT_ELEMENT).type('{uparrow}');
        cy.get(NUMBER_INPUT_ELEMENT).should('have.value', 1);
    });

    it('should increase value by 10 on shift + arrow up', () => {
        cy.mount(<NumberInput />);
        cy.get(NUMBER_INPUT_ELEMENT).type('{shift}{uparrow}');
        cy.get(NUMBER_INPUT_ELEMENT).should('have.value', 10);
    });

    it('should decrease value by 1 on arrow left', () => {
        cy.mount(<NumberInput />);
        cy.get(NUMBER_INPUT_ELEMENT).type('{leftarrow}');
        cy.get(NUMBER_INPUT_ELEMENT).should('have.value', -1);
    });

    it('should decrease value by 10 on shift + arrow left', () => {
        cy.mount(<NumberInput />);
        cy.get(NUMBER_INPUT_ELEMENT).type('{shift}{leftarrow}');
        cy.get(NUMBER_INPUT_ELEMENT).should('have.value', -10);
    });

    it('should decrease value by 1 on arrow down', () => {
        cy.mount(<NumberInput />);
        cy.get(NUMBER_INPUT_ELEMENT).type('{downarrow}');
        cy.get(NUMBER_INPUT_ELEMENT).should('have.value', -1);
    });

    it('should decrease value by 10 on shift + arrow down', () => {
        cy.mount(<NumberInput />);
        cy.get(NUMBER_INPUT_ELEMENT).type('{shift}{downarrow}');
        cy.get(NUMBER_INPUT_ELEMENT).should('have.value', -10);
    });

    it('should render increment buttons', () => {
        cy.mount(<NumberInput controls />);
        cy.get(NUMBER_INPUT_DECREMENT).should('be.visible');
        cy.get(NUMBER_INPUT_INCREMENT).should('be.visible');
    });

    it('should increase value by 1 on increment button click', () => {
        cy.mount(<NumberInput controls />);
        cy.get(NUMBER_INPUT_INCREMENT).click();
        cy.get(NUMBER_INPUT_ELEMENT).should('have.value', 1);
    });

    it('should increase value by 10 on increment button shift + click', () => {
        cy.mount(<NumberInput controls />);
        cy.get(NUMBER_INPUT_COMPONENT).type('{shift}', { release: false });
        cy.get(NUMBER_INPUT_INCREMENT).click();
        cy.get(NUMBER_INPUT_ELEMENT).should('have.value', 10);
    });

    it('should decrease value by 1 on decrement button click', () => {
        cy.mount(<NumberInput controls />);
        cy.get(NUMBER_INPUT_DECREMENT).click();
        cy.get(NUMBER_INPUT_ELEMENT).should('have.value', -1);
    });

    it('should decrease value by 10 on decrement button shift + click', () => {
        cy.mount(<NumberInput controls />);
        cy.get(NUMBER_INPUT_COMPONENT).type('{shift}', { release: false });
        cy.get(NUMBER_INPUT_DECREMENT).click();
        cy.get(NUMBER_INPUT_ELEMENT).should('have.value', -10);
    });

    it('should sequential increase value on shift + increment button hold', () => {
        cy.mount(<NumberInput controls />);
        cy.get(NUMBER_INPUT_INCREMENT).trigger('keydown', { keyCode: 16, release: false });
        cy.get(NUMBER_INPUT_INCREMENT).trigger('mousedown', { release: false });
        cy.wait(2000);
        cy.get(NUMBER_INPUT_INCREMENT).trigger('mouseup');
        cy.get(NUMBER_INPUT_INCREMENT).trigger('keyup', { keyCode: 16 });
        cy.get(NUMBER_INPUT_ELEMENT)
            .invoke('val')
            .should('be.a', 'string')
            .then((value) => {
                if (typeof value === 'string') {
                    return parseInt(value);
                }
            })
            .should('be.a', 'number')
            .and('be.within', 7, 9);
    });

    it('should sequential decrease value on shift + decrement button hold', () => {
        cy.mount(<NumberInput controls />);
        cy.get(NUMBER_INPUT_DECREMENT).trigger('keydown', { keyCode: 16, release: false });
        cy.get(NUMBER_INPUT_DECREMENT).trigger('mousedown', { release: false });
        cy.wait(2000);
        cy.get(NUMBER_INPUT_DECREMENT).trigger('mouseup');
        cy.get(NUMBER_INPUT_DECREMENT).trigger('keyup', { keyCode: 16 });
        cy.get(NUMBER_INPUT_ELEMENT)
            .invoke('val')
            .should('be.a', 'string')
            .then((value) => {
                if (typeof value === 'string') {
                    return parseInt(value);
                }
            })
            .should('be.a', 'number')
            .and('be.within', -9, -7);
    });

    it('should render success icon', () => {
        cy.mount(<NumberInput status={Validation.Success} />);
        cy.get(NUMBER_INPUT_COMPONENT).should('have.class', validationClassMap[Validation.Success]);
        cy.get(NUMBER_INPUT_STATUS_ICON).should('be.visible');
        cy.get(NUMBER_INPUT_STATUS_ICON).should('have.class', validationTextClassMap[Validation.Success]);
    });

    it('should render error icon', () => {
        cy.mount(<NumberInput status={Validation.Error} />);
        cy.get(NUMBER_INPUT_COMPONENT).should('have.class', validationClassMap[Validation.Error]);
        cy.get(NUMBER_INPUT_STATUS_ICON).should('be.visible');
        cy.get(NUMBER_INPUT_STATUS_ICON).should('have.class', validationTextClassMap[Validation.Error]);
    });

    it('should not revert to previous state when clear method used on negative value', () => {
        cy.mount(<NumberInput controls clearable />);
        cy.get(NUMBER_INPUT_DECREMENT).trigger('keydown', { keyCode: 16, release: false });
        cy.get(NUMBER_INPUT_DECREMENT).trigger('mousedown', { release: false });
        cy.wait(2000);
        cy.get(NUMBER_INPUT_DECREMENT).trigger('mouseup');
        cy.get(NUMBER_INPUT_DECREMENT).trigger('keyup', { keyCode: 16 });
        cy.get(NUMBER_INPUT_CLEAR_BTN).click();
        cy.get(NUMBER_INPUT_ELEMENT).should('have.value', '');
    });

    it('should not revert to previous state when backspace used on negative value', () => {
        cy.mount(<NumberInput suffix="px" clearable controls />);
        cy.get(NUMBER_INPUT_DECREMENT).trigger('keydown', { keyCode: 16, release: false });
        cy.get(NUMBER_INPUT_DECREMENT).trigger('mousedown', { release: false });
        cy.wait(2000);
        cy.get(NUMBER_INPUT_DECREMENT).trigger('mouseup');
        cy.get(NUMBER_INPUT_DECREMENT).trigger('keyup', { keyCode: 16 });
        cy.get(NUMBER_INPUT_ELEMENT).trigger('keydown', { keyCode: 8, repeat: true });
        cy.get(NUMBER_INPUT_ELEMENT).should('have.value', '');
    });

    it('should not revert to previous state when clear method used on negative value and suffix present', () => {
        cy.mount(<NumberInput suffix="px" clearable controls />);
        cy.get(NUMBER_INPUT_DECREMENT).trigger('keydown', { keyCode: 16, release: false });
        cy.get(NUMBER_INPUT_DECREMENT).trigger('mousedown', { release: false });
        cy.wait(2000);
        cy.get(NUMBER_INPUT_DECREMENT).trigger('mouseup');
        cy.get(NUMBER_INPUT_DECREMENT).trigger('keyup', { keyCode: 16 });
        cy.get(NUMBER_INPUT_CLEAR_BTN).click();
        cy.get(NUMBER_INPUT_ELEMENT).should('have.value', '');
    });

    it('should not revert to previous state when backspace used on negative value and suffix present', () => {
        cy.mount(<NumberInput suffix="px" clearable controls />);
        cy.get(NUMBER_INPUT_DECREMENT).trigger('keydown', { keyCode: 16, release: false });
        cy.get(NUMBER_INPUT_DECREMENT).trigger('mousedown', { release: false });
        cy.wait(2000);
        cy.get(NUMBER_INPUT_DECREMENT).trigger('mouseup');
        cy.get(NUMBER_INPUT_DECREMENT).trigger('keyup', { keyCode: 16 });
        cy.get(NUMBER_INPUT_ELEMENT).trigger('keydown', { keyCode: 8, repeat: true });
        cy.get(NUMBER_INPUT_ELEMENT).should('have.value', '');
    });
});
