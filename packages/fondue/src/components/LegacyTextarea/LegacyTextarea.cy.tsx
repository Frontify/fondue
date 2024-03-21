/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Validation } from '@utilities/validation';
import { LegacyTextarea } from './LegacyTextarea';

const DEFAULT_TEXT = 'A new text area';
const PLACEHOLDER = 'This is the placeholder';
const DECORATOR_TEXT = 'And also a decorator';
const DECORATOR = <span>{DECORATOR_TEXT}</span>;
const INPUT_TEXT = 'some text';
const ROW_HEIGHT = 16;
const TEXTAREA_ID = '[data-test-id=textarea]';
const EXCLAMATION_MARK_ICON_ID = '[data-test-id=error-state-exclamation-mark-icon]';

describe('LegacyTextarea component', () => {
    it('renders', () => {
        cy.mount(<LegacyTextarea></LegacyTextarea>);
        cy.get(TEXTAREA_ID).should('not.have.attr', 'value');
        cy.get(TEXTAREA_ID).should('not.have.attr', 'required');
        cy.get(TEXTAREA_ID).should('not.have.attr', 'placeholder');
        cy.get(TEXTAREA_ID).should('not.have.attr', 'disabled');
        cy.get(TEXTAREA_ID).find('[data-test-id="decorator"]').should('have.length', 0);
        cy.get(TEXTAREA_ID).find(EXCLAMATION_MARK_ICON_ID).should('have.length', 0);
    });

    it('sets and gets the value', () => {
        cy.mount(<LegacyTextarea value={DEFAULT_TEXT}></LegacyTextarea>);
        cy.get(TEXTAREA_ID).should('have.value', DEFAULT_TEXT);
    });

    it('has the required attribute', () => {
        cy.mount(<LegacyTextarea required={true}></LegacyTextarea>);
        cy.get(TEXTAREA_ID).should('have.attr', 'required');
    });

    it('does not have the required attribute', () => {
        cy.mount(<LegacyTextarea required={false}></LegacyTextarea>);
        cy.get(TEXTAREA_ID).should('not.have.attr', 'required');
    });

    it('has the disabled attribute', () => {
        cy.mount(<LegacyTextarea disabled={true}></LegacyTextarea>);
        cy.get(TEXTAREA_ID).should('have.attr', 'disabled');
    });

    it('does not have the disabled attribute', () => {
        cy.mount(<LegacyTextarea disabled={false}></LegacyTextarea>);
        cy.get(TEXTAREA_ID).should('not.have.attr', 'disabled');
    });

    it('renders the placeholder', () => {
        cy.mount(<LegacyTextarea placeholder={PLACEHOLDER}></LegacyTextarea>);
        cy.get(TEXTAREA_ID).should('have.attr', 'placeholder').and('eq', PLACEHOLDER);
    });

    it('renders the decorator', () => {
        cy.mount(<LegacyTextarea decorator={DECORATOR}></LegacyTextarea>);
        cy.get('[data-test-id="decorator"]').should('be.visible').contains(DECORATOR_TEXT);
    });

    it('focuses on mount', () => {
        cy.mount(<LegacyTextarea focusOnMount />);
        cy.get(TEXTAREA_ID).should('have.focus');
    });

    it('calls the onInput event', () => {
        const onInputStub = cy.stub().as('onInputStub');
        cy.mount(<LegacyTextarea onInput={onInputStub}></LegacyTextarea>);
        cy.get(TEXTAREA_ID).type(INPUT_TEXT);
        cy.get('@onInputStub').should('to.have.always.been.callCount', INPUT_TEXT.length);
    });

    it('calls the onBlur event', () => {
        const onBlurStub = cy.stub().as('onBlurStub');
        cy.mount(<LegacyTextarea onBlur={onBlurStub}></LegacyTextarea>);
        cy.get(TEXTAREA_ID).type(INPUT_TEXT).blur();
        cy.get('@onBlurStub').should('be.calledOnce');
    });

    it('calls the onEnterPressed event', () => {
        const onEnterPressedStub = cy.stub().as('onEnterPressedStub');
        cy.mount(<LegacyTextarea onEnterPressed={onEnterPressedStub}></LegacyTextarea>);
        cy.get(TEXTAREA_ID).type('{enter}');
        cy.get('@onEnterPressedStub').should('to.have.always.been.callCount', 1);
    });

    it('starts with the minimum number of rows', () => {
        cy.mount(<LegacyTextarea minRows={4} autosize />);
        cy.get(TEXTAREA_ID).should(($textarea) => {
            const height = $textarea.height() ?? 0;
            expect(Math.round(height)).to.equal(ROW_HEIGHT * 4);
        });
    });

    it('automatically grows in height', () => {
        cy.mount(<LegacyTextarea minRows={1} autosize />);
        cy.get(TEXTAREA_ID).should(($textarea) => {
            const height = $textarea.height() ?? 0;
            expect(Math.round(height)).to.equal(ROW_HEIGHT);
        });
        cy.get(TEXTAREA_ID).type('{enter}{enter}');
        cy.get(TEXTAREA_ID).should(($textarea) => {
            const height = $textarea.height() ?? 0;
            expect(Math.round(height)).to.equal(ROW_HEIGHT * 3);
        });
    });

    it('does not grow more than max height', () => {
        cy.mount(<LegacyTextarea minRows={1} maxRows={2} autosize />);
        cy.get(TEXTAREA_ID).should(($textarea) => {
            const height = $textarea.height() ?? 0;
            expect(Math.round(height)).to.equal(ROW_HEIGHT);
        });
        cy.get(TEXTAREA_ID).type('{enter}{enter}');
        cy.get(TEXTAREA_ID).should(($textarea) => {
            const height = $textarea.height() ?? 0;
            expect(Math.round(height)).to.equal(ROW_HEIGHT * 2);
        });
    });

    it('uses min-rows as rows if autosize is false', () => {
        cy.mount(<LegacyTextarea minRows={10} />);
        cy.get(TEXTAREA_ID).should(($textarea) => {
            const height = $textarea.height() ?? 0;
            expect(Math.round(height)).to.equal(ROW_HEIGHT * 10);
        });
    });

    it('removes resize handler', () => {
        cy.mount(<LegacyTextarea resizeable={false} />);
        cy.get(TEXTAREA_ID).should('have.css', 'resize', 'none');
    });

    it('shows error validation triangle icon in case of error validation state', () => {
        cy.mount(<LegacyTextarea validation={Validation.Error} />);
        cy.get(EXCLAMATION_MARK_ICON_ID).should('have.class', 'tw-text-text-negative');
    });

    it('shows warning validation triangle icon in case of warning validation state', () => {
        cy.mount(<LegacyTextarea validation={Validation.Warning} />);
        cy.get(EXCLAMATION_MARK_ICON_ID).should('have.class', 'tw-text-text-warning');
    });
});
