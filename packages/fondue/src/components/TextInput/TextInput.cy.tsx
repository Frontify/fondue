/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactElement, useEffect, useState } from 'react';

import IconIcon from '@foundation/Icon/Generated/IconIcon';
import { Validation } from '@utilities/validation';

import { TextInput, type TextInputProps, TextInputType } from './TextInput';

const TEXT_INPUT_COMPONENT = '[data-test-id=fondue-text-input-component]';
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
const EXCLAMATION_MARK_ICON_ID = '[data-test-id=error-state-exclamation-mark-icon]';
const EXTRA_ACTION_ID = '[data-test-id=fondue-extra-action-icon]';
const EXTRA_ACTION = {
    icon: <IconIcon />,
    onClick: () => {},
    title: 'extra action',
};

const StatefulInput = (props: TextInputProps): ReactElement => {
    const [input, setInput] = useState<string>('');

    useEffect(() => {
        setInput(props.value ?? '');
    }, [props.value]);

    return <TextInput {...props} value={input} onChange={setInput} />;
};

describe('Text Input component', () => {
    it('renders the text input', () => {
        cy.mount(<StatefulInput />);
        cy.get(TEXT_INPUT_ID).should('have.attr', 'type', 'text');
        cy.get(TEXT_INPUT_ID).should('not.have.attr', 'placeholder');
        cy.get(TEXT_INPUT_ID).find(CLEAR_ICON_ID).should('have.length', 0);
        cy.get(TEXT_INPUT_ID).find(DECORATOR_ID).should('have.length', 0);
        cy.get(TEXT_INPUT_ID).find(EXCLAMATION_MARK_ICON_ID).should('have.length', 0);
        cy.get(TEXT_INPUT_ID).find(EXTRA_ACTION_ID).should('have.length', 0);
    });

    it('set and get the value', () => {
        cy.mount(<StatefulInput value={INPUT_TEXT} />);
        cy.get(TEXT_INPUT_ID).should('have.value', INPUT_TEXT);
    });

    it('uses passwords correctly', () => {
        cy.mount(<StatefulInput type={TextInputType.Password} />);
        cy.get(TEXT_INPUT_ID).type(PASSWORD);
        cy.get(TEXT_INPUT_ID).should('have.attr', 'type', 'password');
        cy.get(TEXT_INPUT_ID).should('have.value', PASSWORD);
        cy.get(VISIBILITY_ICON_ID).should('have.length', 1);
        cy.get(VISIBILITY_ICON_ID).click();
        cy.get(TEXT_INPUT_ID).should('have.value', PASSWORD);
        cy.get(TEXT_INPUT_ID).should('have.attr', 'type', 'text');
    });

    it('limits entry to the maxLength', () => {
        cy.mount(<StatefulInput maxLength={5} />);
        cy.get(TEXT_INPUT_ID).type(INPUT_TEXT);
        cy.get(TEXT_INPUT_ID).should('have.value', INPUT_TEXT.substring(0, 5));
    });

    it('renders the placeholder', () => {
        cy.mount(<StatefulInput placeholder={PLACEHOLDER} />);
        cy.get('input').should('have.attr', 'placeholder').and('eq', PLACEHOLDER);
    });

    it('renders the decorator', () => {
        cy.mount(<StatefulInput decorator={DECORATOR} />);
        cy.get(DECORATOR_ID).should('be.visible').contains(DECORATOR_TEXT);
    });

    it('hides the clear icon when there is no text in the field', () => {
        cy.mount(<StatefulInput clearable />);
        cy.get(CLEAR_ICON_ID).should('not.exist');
        cy.get(TEXT_INPUT_ID).type(INPUT_TEXT).should('have.value', INPUT_TEXT);
        cy.get(CLEAR_ICON_ID).should('exist');
    });

    it('clears the field when clicked on the clear icon', () => {
        cy.mount(<StatefulInput clearable />);
        cy.get(TEXT_INPUT_ID).type(INPUT_TEXT).should('have.value', INPUT_TEXT);
        cy.get(CLEAR_ICON_ID).click();
        cy.get(TEXT_INPUT_ID).should('have.value', '').should('not.have.value', INPUT_TEXT);
    });

    it('remove the clean icon when pressing it', () => {
        cy.mount(<StatefulInput clearable />);
        cy.get(TEXT_INPUT_ID).type(INPUT_TEXT).should('have.value', INPUT_TEXT);
        cy.get(CLEAR_ICON_ID).should('exist');
        cy.get(CLEAR_ICON_ID).click();
        cy.get(CLEAR_ICON_ID).should('not.exist');
    });

    it('renders the extra action', () => {
        cy.mount(<TextInput extraActions={[EXTRA_ACTION]} />);
        cy.get(EXTRA_ACTION_ID).should('be.visible');
    });

    it('renders three extra actions', () => {
        cy.mount(<TextInput extraActions={[EXTRA_ACTION, EXTRA_ACTION, EXTRA_ACTION]} />);
        cy.get(EXTRA_ACTION_ID).should('have.length', 3);
    });

    it('renders the extra action with tooltip', () => {
        const TOOLTIP_CONTENT = 'tooltip content';
        cy.mount(
            <TextInput
                extraActions={[
                    {
                        ...EXTRA_ACTION,
                        tooltip: {
                            content: TOOLTIP_CONTENT,
                        },
                    },
                ]}
            />,
        );
        cy.get(EXTRA_ACTION_ID).should('be.visible');
        cy.get(EXTRA_ACTION_ID).parent().parent().next().should('have.attr', 'data-test-id', 'tooltip');
        cy.get(EXTRA_ACTION_ID).parent().parent().next().find('span').first().should('have.text', TOOLTIP_CONTENT);
    });

    it('calls extra action onClick event', () => {
        const onClickStub = cy.stub().as('onClickStub');
        cy.mount(<TextInput extraActions={[{ ...EXTRA_ACTION, onClick: onClickStub }]} />);
        cy.get(EXTRA_ACTION_ID).click();
        cy.get('@onClickStub').should('be.calledOnce');
    });

    it('does not call extra action onClick event when input disabled', () => {
        const onClickStub = cy.stub().as('onClickStub');
        cy.mount(<TextInput disabled extraActions={[{ ...EXTRA_ACTION, onClick: onClickStub }]} />);
        cy.get(EXTRA_ACTION_ID).should('be.disabled');
    });

    it('does not call extra action onClick event when extra action disabled', () => {
        const onClickStub = cy.stub().as('onClickStub');
        cy.mount(<TextInput extraActions={[{ ...EXTRA_ACTION, onClick: onClickStub, disabled: true }]} />);
        cy.get(EXTRA_ACTION_ID).should('be.disabled');
    });

    it('calls the onChange event', () => {
        const onChangeStub = cy.stub().as('onChangeStub');
        cy.mount(<TextInput value="" onChange={onChangeStub} />);
        cy.get(TEXT_INPUT_ID).type(INPUT_TEXT);
        cy.get('@onChangeStub').should('to.have.always.been.callCount', INPUT_TEXT.length);
    });

    it('calls the onBlur event', () => {
        const onBlurStub = cy.stub().as('onBlurStub');
        cy.mount(<StatefulInput onBlur={onBlurStub} />);
        cy.get(TEXT_INPUT_ID).type(INPUT_TEXT).blur();
        cy.get('@onBlurStub').should('be.calledOnce');
    });

    it('calls the onClear event', () => {
        const onClearStub = cy.stub().as('onClearStub');
        cy.mount(<StatefulInput onClear={onClearStub} clearable />);
        cy.get(TEXT_INPUT_ID).type(INPUT_TEXT);
        cy.get(CLEAR_ICON_ID).click();
        cy.get(TEXT_INPUT_ID).should('have.value', '');
        cy.get('@onClearStub').should('be.calledOnce');
    });

    it('has the required attribute', () => {
        cy.mount(<StatefulInput required />);
        cy.get(TEXT_INPUT_ID).should('have.attr', 'required');
    });

    it('does not have the required attribute', () => {
        cy.mount(<StatefulInput required={false} />);
        cy.get(TEXT_INPUT_ID).should('not.have.attr', 'required');
    });

    it('has the disabled attribute', () => {
        cy.mount(<StatefulInput disabled />);
        cy.get(TEXT_INPUT_ID).should('have.attr', 'disabled');
    });

    it('does not have the disabled attribute', () => {
        cy.mount(<StatefulInput disabled={false} />);
        cy.get(TEXT_INPUT_ID).should('not.have.attr', 'disabled');
    });

    it('has the autoComplete turned on', () => {
        cy.mount(<StatefulInput autocomplete />);
        cy.get(TEXT_INPUT_ID).should('have.attr', 'autoComplete', 'on');
    });

    it('has the autoComplete turned off', () => {
        cy.mount(<StatefulInput autocomplete={false} />);
        cy.get(TEXT_INPUT_ID).should('have.attr', 'autoComplete', 'off');
    });

    it('has the autoComplete turned off by default', () => {
        cy.mount(<StatefulInput />);
        cy.get(TEXT_INPUT_ID).should('have.attr', 'autoComplete', 'off');
    });

    it('has the readonly prop turned off by default', () => {
        cy.mount(<StatefulInput />);
        cy.get(TEXT_INPUT_ID).should('not.have.attr', 'readonly');
    });

    it('still allows buttons to be pressed if readonly', () => {
        cy.mount(<StatefulInput readonly obfuscated copyable type={TextInputType.Password} value={PASSWORD} />);
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
        cy.mount(<StatefulInput copyable value={INPUT_TEXT} />);
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
        cy.mount(<StatefulInput />);
        cy.get(COPY_ICON_ID).should('not.exist');
    });

    it('copyable should have a type definition', () => {
        cy.mount(<StatefulInput copyable />);

        cy.get(COPY_ICON_ID).should('have.attr', 'type', 'button');
    });

    it('clearable should have a type definition', () => {
        cy.mount(<StatefulInput clearable />);

        cy.get(TEXT_INPUT_ID).type(INPUT_TEXT).should('have.value', INPUT_TEXT);
        cy.get(CLEAR_ICON_ID).should('have.attr', 'type', 'button');
    });

    it('Error validation state should show the triangle warning icon', () => {
        cy.mount(<StatefulInput validation={Validation.Error} />);
        cy.get(EXCLAMATION_MARK_ICON_ID).should('be.visible');
        cy.get(TEXT_INPUT_COMPONENT).should('have.class', 'tw-border-text-negative');
    });

    it('Warning validation state should show the triangle warning icon', () => {
        cy.mount(<StatefulInput validation={Validation.Warning} />);
        cy.get(EXCLAMATION_MARK_ICON_ID).should('be.visible');
        cy.get(TEXT_INPUT_COMPONENT).should('have.class', 'tw-border-text-warning');
    });

    it('clearable should have a type definition', () => {
        cy.mount(<StatefulInput clearable />);

        cy.get(TEXT_INPUT_ID).type(INPUT_TEXT).should('have.value', INPUT_TEXT);
        cy.get(CLEAR_ICON_ID).should('have.attr', 'type', 'button');
    });

    it('shows an outline around the input field on first tab', () => {
        cy.mount(<StatefulInput clearable />);

        cy.get('body').realPress('Tab');

        cy.get(TEXT_INPUT_COMPONENT).should('have.class', 'tw-ring-blue');
    });

    it('shows an outline around the clear button after the user has typed text and pressed the tab key', () => {
        cy.mount(<StatefulInput clearable />);

        cy.get(TEXT_INPUT_ID).type(INPUT_TEXT).focus().realPress('Tab');

        cy.get(TEXT_INPUT_ID).parent().should('not.have.class', 'tw-ring-blue');

        cy.get(CLEAR_ICON_ID).should('have.class', 'tw-ring-blue');
    });

    it('shows an outline around the copy button after the user has typed text and pressed the tab key', () => {
        cy.mount(<StatefulInput copyable />);

        cy.get(TEXT_INPUT_ID).type(INPUT_TEXT).focus().realPress('Tab');

        cy.get(TEXT_INPUT_ID).parent().should('not.have.class', 'tw-ring-blue');

        cy.get(COPY_ICON_ID).should('have.class', 'tw-ring-blue');
    });

    it('shows an outline around the visibility button after the user has typed a password and pressed the tab key', () => {
        cy.mount(<StatefulInput type={TextInputType.Password} />);

        cy.get(TEXT_INPUT_ID).type(PASSWORD).focus().realPress('Tab');

        cy.get(TEXT_INPUT_ID).parent().should('not.have.class', 'tw-ring-blue');

        cy.get(VISIBILITY_ICON_ID).should('have.class', 'tw-ring-blue');
    });
});
