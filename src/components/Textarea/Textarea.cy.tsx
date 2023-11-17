/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconNook16 } from '@foundation/Icon';
import { Textarea } from './Textarea';
import { Validation } from '@utilities/validation';

const TEXTAREA_ID = '[data-test-id=fondue-textarea]';
const TEXTAREA_DECORATOR_ID = '[data-test-id=fondue-textarea-decorator]';
const TEXTAREA_CLEARABLE_ID = '[data-test-id=fondue-textarea-clear]';
const TEXTAREA_STATUS_ICON_ID = '[data-test-id=fondue-textarea-status-icon]';
const DEFAULT_TEXT = 'I am some text text.';
const PLACEHOLDER = 'Enter some text in the textarea';
const INPUT_TEXT = 'I am some input text';
const ROW_HEIGHT = 20;

describe('Textarea Unit tests', () => {
    it('renders default textarea', () => {
        cy.mount(<Textarea />);
        cy.get(TEXTAREA_ID).should('exist');
        cy.get(TEXTAREA_ID).should('be.visible');
        cy.get(TEXTAREA_ID).should('not.have.attr', 'defaultValue');
        cy.get(TEXTAREA_ID).should('not.have.attr', 'value');
        cy.get(TEXTAREA_ID).should('not.have.attr', 'required');
        cy.get(TEXTAREA_ID).should('not.have.attr', 'placeholder');
        cy.get(TEXTAREA_ID).should('not.have.attr', 'disabled');
        cy.get(TEXTAREA_ID).should('not.have.attr', 'readOnly');
        cy.get(TEXTAREA_ID).find(TEXTAREA_DECORATOR_ID).should('not.exist');
        cy.get(TEXTAREA_ID).find(TEXTAREA_STATUS_ICON_ID).should('not.exist');
    });

    it('sets and gets the value', () => {
        cy.mount(<Textarea value={DEFAULT_TEXT} />);
        cy.get(TEXTAREA_ID).should('have.value', DEFAULT_TEXT);
    });

    it('should allow for text to be typed', () => {
        cy.mount(<Textarea />);
        cy.get(TEXTAREA_ID).type(INPUT_TEXT);
        cy.get(TEXTAREA_ID).should('have.value', INPUT_TEXT);
    });

    it('should allow for text to be typed with default text', () => {
        cy.mount(<Textarea defaultValue={INPUT_TEXT} />);
        cy.get(TEXTAREA_ID).type(INPUT_TEXT);
        cy.get(TEXTAREA_ID).should('have.value', INPUT_TEXT + INPUT_TEXT);
    });

    it('should render decorator', () => {
        cy.mount(<Textarea decorator={<IconNook16 />} />);
        cy.get(TEXTAREA_DECORATOR_ID).should('be.visible');
    });

    it('should render status icon', () => {
        cy.mount(<Textarea status={Validation.Error} />);
        cy.get(TEXTAREA_STATUS_ICON_ID).should('be.visible');
    });

    it('has the required attribute', () => {
        cy.mount(<Textarea required={true} />);
        cy.get(TEXTAREA_ID).should('have.attr', 'required');
    });

    it('does not have the required attribute', () => {
        cy.mount(<Textarea required={false} />);
        cy.get(TEXTAREA_ID).should('not.have.attr', 'required');
    });

    it('has the disabled attribute', () => {
        cy.mount(<Textarea disabled={true} />);
        cy.get(TEXTAREA_ID).should('have.attr', 'disabled');
    });

    it('does not have the disabled attribute', () => {
        cy.mount(<Textarea disabled={false} />);
        cy.get(TEXTAREA_ID).should('not.have.attr', 'disabled');
    });

    it('has the readOnly attribute', () => {
        cy.mount(<Textarea readOnly={true} />);
        cy.get(TEXTAREA_ID).should('have.attr', 'readOnly');
    });

    it('does not have the readOnly attribute', () => {
        cy.mount(<Textarea readOnly={false} />);
        cy.get(TEXTAREA_ID).should('not.have.attr', 'readOnly');
    });

    it('renders the placeholder', () => {
        cy.mount(<Textarea placeholder={PLACEHOLDER} />);
        cy.get(TEXTAREA_ID).should('have.attr', 'placeholder').and('eq', PLACEHOLDER);
    });

    it('has resize handler', () => {
        cy.mount(<Textarea resizable />);
        cy.get(TEXTAREA_ID).should('have.css', 'resize');
    });

    it('removes resize handler', () => {
        cy.mount(<Textarea resizable={false} />);
        cy.get(TEXTAREA_ID).should('have.css', 'resize', 'none');
    });

    it('focuses on mount', () => {
        cy.mount(<Textarea focusOnMount />);
        cy.get(TEXTAREA_ID).should('have.focus');
    });

    it('renders focus ring when tab focused', () => {
        cy.mount(<Textarea />);
        cy.get(TEXTAREA_ID).focus().should('have.class', 'tw-ring-4');
    });

    it('calls the onChange event (debounce event)', () => {
        const onChangeStub = cy.stub().as('onChangeStub');
        cy.mount(<Textarea onChange={onChangeStub} />);
        cy.get(TEXTAREA_ID).type(INPUT_TEXT);
        cy.get(TEXTAREA_ID).type(INPUT_TEXT);
        cy.get(TEXTAREA_ID).type(INPUT_TEXT);
        cy.wait(500);
        cy.get('@onChangeStub').should('be.calledOnce');
    });

    it('calls the onBlur event', () => {
        const onBlurStub = cy.stub().as('onBlurStub');
        cy.mount(<Textarea onBlur={onBlurStub} />);
        cy.get(TEXTAREA_ID).type(INPUT_TEXT).blur();
        cy.get('@onBlurStub').should('be.calledOnce');
    });

    it('calls the onEnterPressed event', () => {
        const onEnterPressedStub = cy.stub().as('onEnterPressedStub');
        cy.mount(<Textarea onEnterPressed={onEnterPressedStub} />);
        cy.get(TEXTAREA_ID).type('{enter}');
        cy.get('@onEnterPressedStub').should('to.have.always.been.callCount', 1);
    });

    it('starts with the minimum number of rows', () => {
        cy.mount(<Textarea minRows={4} autosize />);
        cy.get(TEXTAREA_ID).should(($textarea) => {
            const height = $textarea.height() ?? 0;
            expect(Math.round(height)).to.equal(ROW_HEIGHT * 4);
        });
    });

    it('automatically grows in height', () => {
        cy.mount(<Textarea minRows={1} autosize />);
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
        cy.mount(<Textarea minRows={1} maxRows={2} autosize />);
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
        cy.mount(<Textarea minRows={10} />);
        cy.get(TEXTAREA_ID).should(($textarea) => {
            const height = $textarea.height() ?? 0;
            expect(Math.round(height)).to.equal(ROW_HEIGHT * 10);
        });
    });

    it('should clear the textarea when clearable button clicked', () => {
        cy.mount(<Textarea clearable />);
        cy.get(TEXTAREA_ID).type(INPUT_TEXT);
        cy.get(TEXTAREA_ID).should('have.value', INPUT_TEXT);
        cy.get(TEXTAREA_CLEARABLE_ID).realClick();
        cy.get(TEXTAREA_ID).should('not.have.value');
    });
});
