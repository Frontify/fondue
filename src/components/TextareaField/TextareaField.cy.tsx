/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Validation } from '@utilities/validation';
import React from 'react';
import { TextareaField } from './TextareaField';
import { IconIcon16 } from '@foundation/Icon/Generated';

const DEFAULT_TEXT = 'A new text area';
const PLACEHOLDER = 'This is the placeholder';
const DECORATOR_TEXT = 'And also a decorator';
const DECORATOR = <span>{DECORATOR_TEXT}</span>;
const INPUT_TEXT = 'some text';
const ROW_HEIGHT = 16;
const TEXTAREA_FIELD_ID = '[data-test-id=textarea]';
const ERROR_STATE_EXCLAMATION_MARK_ICON_ID = '[data-test-id=error-state-exclamation-mark-icon]';
const INPUT_EXTRA_ACTION_BUTTON_ID = '[data-test-id="fondue-input-extra-action-button"]';

describe('TextareaField component', () => {
    it('renders', () => {
        cy.mount(<TextareaField></TextareaField>);
        cy.get(TEXTAREA_FIELD_ID).should('not.have.attr', 'value');
        cy.get(TEXTAREA_FIELD_ID).should('not.have.attr', 'required');
        cy.get(TEXTAREA_FIELD_ID).should('not.have.attr', 'placeholder');
        cy.get(TEXTAREA_FIELD_ID).should('not.have.attr', 'disabled');
        cy.get(TEXTAREA_FIELD_ID).find('[data-test-id="decorator"]').should('have.length', 0);
        cy.get(TEXTAREA_FIELD_ID).find(ERROR_STATE_EXCLAMATION_MARK_ICON_ID).should('have.length', 0);
    });

    it('sets and gets the value', () => {
        cy.mount(<TextareaField value={DEFAULT_TEXT}></TextareaField>);
        cy.get(TEXTAREA_FIELD_ID).should('have.value', DEFAULT_TEXT);
    });

    it('has the required attribute', () => {
        cy.mount(<TextareaField required={true}></TextareaField>);
        cy.get(TEXTAREA_FIELD_ID).should('have.attr', 'required');
    });

    it('does not have the required attribute', () => {
        cy.mount(<TextareaField required={false}></TextareaField>);
        cy.get(TEXTAREA_FIELD_ID).should('not.have.attr', 'required');
    });

    it('has the disabled attribute', () => {
        cy.mount(<TextareaField disabled={true}></TextareaField>);
        cy.get(TEXTAREA_FIELD_ID).should('have.attr', 'disabled');
    });

    it('does not have the disabled attribute', () => {
        cy.mount(<TextareaField disabled={false}></TextareaField>);
        cy.get(TEXTAREA_FIELD_ID).should('not.have.attr', 'disabled');
    });

    it('renders the placeholder', () => {
        cy.mount(<TextareaField placeholder={PLACEHOLDER}></TextareaField>);
        cy.get(TEXTAREA_FIELD_ID).should('have.attr', 'placeholder').and('eq', PLACEHOLDER);
    });

    it('renders the decorator', () => {
        cy.mount(<TextareaField decorator={DECORATOR}></TextareaField>);
        cy.get('[data-test-id="decorator"]').should('be.visible').contains(DECORATOR_TEXT);
    });

    it('calls the onInput event', () => {
        const onInputStub = cy.stub().as('onInputStub');
        cy.mount(<TextareaField onInput={onInputStub}></TextareaField>);
        cy.get(TEXTAREA_FIELD_ID).type(INPUT_TEXT);
        cy.get('@onInputStub').should('to.have.always.been.callCount', INPUT_TEXT.length);
    });

    it('calls the onBlur event', () => {
        const onBlurStub = cy.stub().as('onBlurStub');
        cy.mount(<TextareaField onBlur={onBlurStub}></TextareaField>);
        cy.get(TEXTAREA_FIELD_ID).type(INPUT_TEXT).blur();
        cy.get('@onBlurStub').should('be.calledOnce');
    });

    it('starts with the minimum number of rows', () => {
        cy.mount(<TextareaField minRows={4} autosize />);
        cy.get(TEXTAREA_FIELD_ID).should(($textarea) => {
            const height = $textarea.height() ?? 0;
            expect(Math.round(height)).to.equal(ROW_HEIGHT * 4);
        });
    });

    it('automatically grows in height', () => {
        cy.mount(<TextareaField minRows={1} autosize />);
        cy.get(TEXTAREA_FIELD_ID).should(($textarea) => {
            const height = $textarea.height() ?? 0;
            expect(Math.round(height)).to.equal(ROW_HEIGHT);
        });
        cy.get(TEXTAREA_FIELD_ID).type('{enter}{enter}');
        cy.get(TEXTAREA_FIELD_ID).should(($textarea) => {
            const height = $textarea.height() ?? 0;
            expect(Math.round(height)).to.equal(ROW_HEIGHT * 3);
        });
    });

    it('does not grow more than max height', () => {
        cy.mount(<TextareaField minRows={1} maxRows={2} autosize />);
        cy.get(TEXTAREA_FIELD_ID).should(($textarea) => {
            const height = $textarea.height() ?? 0;
            expect(Math.round(height)).to.equal(ROW_HEIGHT);
        });
        cy.get(TEXTAREA_FIELD_ID).type('{enter}{enter}');
        cy.get(TEXTAREA_FIELD_ID).should(($textarea) => {
            const height = $textarea.height() ?? 0;
            expect(Math.round(height)).to.equal(ROW_HEIGHT * 2);
        });
    });

    it('uses min-rows as rows if autosize is false', () => {
        cy.mount(<TextareaField minRows={10} />);
        cy.get(TEXTAREA_FIELD_ID).should(($textarea) => {
            const height = $textarea.height() ?? 0;
            expect(Math.round(height)).to.equal(ROW_HEIGHT * 10);
        });
    });

    it('removes resize handler', () => {
        cy.mount(<TextareaField resizeable={false} />);
        cy.get(TEXTAREA_FIELD_ID).should('have.css', 'resize', 'none');
    });

    it('shows error validation triangle icon in case of error validation state', () => {
        cy.mount(<TextareaField validation={Validation.Error} />);
        cy.get(ERROR_STATE_EXCLAMATION_MARK_ICON_ID).should('have.class', 'tw-text-text-negative');
    });

    it('shows extra actions and add right padding to the field', () => {
        const stub1 = cy.stub().as('onClickExtraAction1');
        const stub2 = cy.stub().as('onClickExtraAction2');
        cy.mount(
            <TextareaField
                extraActions={[
                    {
                        onClick: stub1,
                        icon: <IconIcon16 />,
                        title: 'Extra Action 1',
                    },
                    {
                        onClick: stub2,
                        icon: <IconIcon16 />,
                        title: 'Extra Action 2',
                    },
                ]}
            />,
        );
        cy.get(INPUT_EXTRA_ACTION_BUTTON_ID).should('have.length', 2);
        cy.get(TEXTAREA_FIELD_ID).should('have.css', 'padding-right', `${(2 * 1.5 + 0.5) * 16}px`); //calc(${paddingMultiplier} * 1.5rem + 0.5rem)
    });

    it('shows validation icon, extra actions and add right padding to the field', () => {
        const stub1 = cy.stub().as('onClickExtraAction1');
        const stub2 = cy.stub().as('onClickExtraAction2');
        cy.mount(
            <TextareaField
                validation={Validation.Success}
                extraActions={[
                    {
                        onClick: stub1,
                        icon: <IconIcon16 />,
                        title: 'Extra Action 1',
                    },
                    {
                        onClick: stub2,
                        icon: <IconIcon16 />,
                        title: 'Extra Action 2',
                    },
                ]}
            />,
        );
        cy.get(INPUT_EXTRA_ACTION_BUTTON_ID).should('have.length', 2);
        cy.get(TEXTAREA_FIELD_ID).should('have.css', 'padding-right', `${(3 * 1.5 + 0.5) * 16}px`); //calc(${paddingMultiplier} * 1.5rem + 0.5rem)
    });

    it('shows loading circle, extra actions and add right padding to the field', () => {
        const stub1 = cy.stub().as('onClickExtraAction1');
        const stub2 = cy.stub().as('onClickExtraAction2');
        cy.mount(
            <TextareaField
                validation={Validation.Loading}
                extraActions={[
                    {
                        onClick: stub1,
                        icon: <IconIcon16 />,
                        title: 'Extra Action 1',
                    },
                    {
                        onClick: stub2,
                        icon: <IconIcon16 />,
                        title: 'Extra Action 2',
                    },
                ]}
            />,
        );
        cy.get(INPUT_EXTRA_ACTION_BUTTON_ID).should('have.length', 2);
        cy.get(TEXTAREA_FIELD_ID).should('have.css', 'padding-right', `${(2 * 1.5 + 0.5) * 16}px`); //calc(${paddingMultiplier} * 1.5rem + 0.5rem)
    });

    it('creates a random memoized id if no id provided', () => {
        cy.mount(<TextareaField />);
        cy.get(TEXTAREA_FIELD_ID).should('have.attr', 'id');
    });

    it('uses provided custom id', () => {
        cy.mount(<TextareaField id="textarea-field" />);
        cy.get(TEXTAREA_FIELD_ID).should('have.attr', 'id', 'textarea-field');
    });

    it('uses provided custom data-test-id', () => {
        cy.mount(<TextareaField data-test-id="fondue-textarea-field" />);
        cy.get('[data-test-id="fondue-textarea-field"]').should('exist');
    });
});
