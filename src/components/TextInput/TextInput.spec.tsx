/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from '@cypress/react';
import React, { FC, useEffect, useState } from 'react';
import { TextInput, TextInputProps, TextInputType } from './TextInput';

const TEXT_INPUT_ID = '[data-test-id=text-input]';
const DECORATOR_TEXT = 'decorator text';
const DECORATOR = <span>{DECORATOR_TEXT}</span>;
const INPUT_TEXT = 'Hello test';
const PLACEHOLDER = 'placeholder';
const PASSWORD = 'SECRET password';
const CLEAR_ICON_ID = '[data-test-id=clear-icon]';
const COPY_ICON_ID = '[data-test-id=copy-icon]';
const DECORATOR_ID = '[data-test-id=decorator]';
const VISIBILITY_ICON_ID = '[data-test-id=visibility-icon]';

const StatefulInput: FC<TextInputProps> = (props) => {
    const [input, setInput] = useState<string>('');

    useEffect(() => {
        setInput(props.value || '');
    }, [props.value]);

    return <TextInput {...props} value={input} onChange={setInput} />;
};

describe('Text Input component', () => {
    it('renders the text input', () => {
        mount(<StatefulInput />);
        cy.get(TEXT_INPUT_ID).should('have.attr', 'type', 'text');
        cy.get(TEXT_INPUT_ID).should('not.have.attr', 'placeholder');
        cy.get(TEXT_INPUT_ID).find(CLEAR_ICON_ID).should('have.length', 0);
        cy.get(TEXT_INPUT_ID).find(DECORATOR_ID).should('have.length', 0);
    });

    it('set and get the value', () => {
        mount(<StatefulInput value={INPUT_TEXT} />);
        cy.get(TEXT_INPUT_ID).should('have.value', INPUT_TEXT);
    });

    it('uses passwords correctly', () => {
        mount(<StatefulInput type={TextInputType.Password} />);
        cy.get(TEXT_INPUT_ID).type(PASSWORD);
        cy.get(TEXT_INPUT_ID).should('have.attr', 'type', 'password');
        cy.get(TEXT_INPUT_ID).should('have.value', PASSWORD);
        cy.get(VISIBILITY_ICON_ID).should('have.length', 1);
        cy.get(VISIBILITY_ICON_ID).click();
        cy.get(TEXT_INPUT_ID).should('have.value', PASSWORD);
        cy.get(TEXT_INPUT_ID).should('have.attr', 'type', 'text');
    });

    it('renders the placeholder', () => {
        mount(<StatefulInput placeholder={PLACEHOLDER} />);
        cy.get('input').should('have.attr', 'placeholder').and('eq', PLACEHOLDER);
    });

    it('renders the decorator', () => {
        mount(<StatefulInput decorator={DECORATOR} />);
        cy.get(DECORATOR_ID).should('be.visible').contains(DECORATOR_TEXT);
    });

    it('hides the clear icon when there is no text in the field', () => {
        mount(<StatefulInput clearable />);
        cy.get(CLEAR_ICON_ID).should('not.exist');
        cy.get(TEXT_INPUT_ID).type(INPUT_TEXT).should('have.value', INPUT_TEXT);
        cy.get(CLEAR_ICON_ID).should('exist');
    });

    it('clears the field when clicked on the clear icon', () => {
        mount(<StatefulInput clearable />);
        cy.get(TEXT_INPUT_ID).type(INPUT_TEXT).should('have.value', INPUT_TEXT);
        cy.get(CLEAR_ICON_ID).click();
        cy.get(TEXT_INPUT_ID).should('have.value', '').should('not.have.value', INPUT_TEXT);
    });

    it('remove the clean icon when pressing it', () => {
        mount(<StatefulInput clearable />);
        cy.get(TEXT_INPUT_ID).type(INPUT_TEXT).should('have.value', INPUT_TEXT);
        cy.get(CLEAR_ICON_ID).should('exist');
        cy.get(CLEAR_ICON_ID).click();
        cy.get(CLEAR_ICON_ID).should('not.exist');
    });

    it('calls the onChange event', () => {
        const onChangeStub = cy.stub().as('onChangeStub');
        mount(<TextInput value="" onChange={onChangeStub} />);
        cy.get(TEXT_INPUT_ID).type(INPUT_TEXT);
        cy.get('@onChangeStub').should('to.have.always.been.callCount', INPUT_TEXT.length);
    });

    it('calls the onBlur event', () => {
        const onBlurStub = cy.stub().as('onBlurStub');
        mount(<StatefulInput onBlur={onBlurStub} />);
        cy.get(TEXT_INPUT_ID).type(INPUT_TEXT).blur();
        cy.get('@onBlurStub').should('be.calledOnce');
    });

    it('calls the onClear event', () => {
        const onClearStub = cy.stub().as('onClearStub');
        mount(<StatefulInput onClear={onClearStub} clearable />);
        cy.get(TEXT_INPUT_ID).type(INPUT_TEXT);
        cy.get(CLEAR_ICON_ID).click();
        cy.get(TEXT_INPUT_ID).should('have.value', '');
        cy.get('@onClearStub').should('be.calledOnce');
    });

    it('has the required attribute', () => {
        mount(<StatefulInput required={true} />);
        cy.get(TEXT_INPUT_ID).should('have.attr', 'required');
    });

    it('does not have the required attribute', () => {
        mount(<StatefulInput required={false} />);
        cy.get(TEXT_INPUT_ID).should('not.have.attr', 'required');
    });

    it('has the disabled attribute', () => {
        mount(<StatefulInput disabled={true} />);
        cy.get(TEXT_INPUT_ID).should('have.attr', 'disabled');
    });

    it('does not have the disabled attribute', () => {
        mount(<StatefulInput disabled={false} />);
        cy.get(TEXT_INPUT_ID).should('not.have.attr', 'disabled');
    });

    it('has the autoComplete turned on', () => {
        mount(<StatefulInput autocomplete={true} />);
        cy.get(TEXT_INPUT_ID).should('have.attr', 'autoComplete', 'on');
    });

    it('has the autoComplete turned off', () => {
        mount(<StatefulInput autocomplete={false} />);
        cy.get(TEXT_INPUT_ID).should('have.attr', 'autoComplete', 'off');
    });

    it('has the autoComplete turned off by default', () => {
        mount(<StatefulInput />);
        cy.get(TEXT_INPUT_ID).should('have.attr', 'autoComplete', 'off');
    });

    it('has the readonly prop turned off by default', () => {
        mount(<StatefulInput />);
        cy.get(TEXT_INPUT_ID).should('not.have.attr', 'readonly');
    });

    it('still allows buttons to be pressed if readonly', () => {
        mount(<StatefulInput readonly obfuscated copyable type={TextInputType.Password} value={PASSWORD} />);
        cy.window().then((win) => {
            cy.stub(win.navigator.clipboard, 'writeText')
                .as('copy')
                .callsFake(() => PASSWORD);
        });
        cy.get(TEXT_INPUT_ID).should('have.attr', 'readonly', 'readonly');
        cy.get(COPY_ICON_ID).realClick();
        cy.get(VISIBILITY_ICON_ID).click();
        cy.get('@copy').should('be.calledWithExactly', PASSWORD);
        cy.get(TEXT_INPUT_ID).should('have.value', PASSWORD);
        cy.get(TEXT_INPUT_ID).should('have.attr', 'type', 'text');
    });

    it('calls the copy event', () => {
        mount(<StatefulInput copyable={true} value={INPUT_TEXT} />);
        cy.window().then((win) => {
            cy.stub(win.navigator.clipboard, 'writeText')
                .as('copy')
                .callsFake(() => INPUT_TEXT);
        });
        cy.get(COPY_ICON_ID).find('svg').should('have.attr', 'name', 'IconClipboard16');
        cy.get(COPY_ICON_ID).realClick();
        cy.get('@copy').should('be.calledWithExactly', INPUT_TEXT);
        cy.get(COPY_ICON_ID).find('svg').should('have.attr', 'name', 'IconCheckMark16');
    });

    it('has the copy turned off by default', () => {
        mount(<StatefulInput />);
        cy.get(COPY_ICON_ID).should('not.exist');
    });

    it('copyable should have a type definition', () => {
        mount(<StatefulInput copyable={true} />);

        cy.get(COPY_ICON_ID).should('have.attr', 'type', 'button');
    });

    it('clearable should have a type definition', () => {
        mount(<StatefulInput clearable={true} />);

        cy.get(TEXT_INPUT_ID).type(INPUT_TEXT).should('have.value', INPUT_TEXT);
        cy.get(CLEAR_ICON_ID).should('have.attr', 'type', 'button');
    });
});
