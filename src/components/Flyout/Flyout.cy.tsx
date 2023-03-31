/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ButtonEmphasis, ButtonStyle } from '@components/Button';
import { TextInput } from '@components/TextInput/TextInput';
import React, { ReactElement, useState } from 'react';
import { Flyout, FlyoutProps } from './Flyout';
import { FlyoutFooter } from './FlyoutFooter';

const FLYOUT_TRIGGER_ID = '[data-test-id=flyout-trigger]';
const BADGE_ID = '[data-test-id=badge]';
const BUTTON_ID = '[data-test-id=button]';
const FIELDSET_HEADER_ID = '[data-test-id=fieldset-header]';
const TEXT_INPUT_ID = '[data-test-id=text-input]';

const Component = ({
    onConfirm,
    onCancel,
    badges,
    legacyFooter,
}: Pick<FlyoutProps, 'onConfirm' | 'onCancel' | 'badges' | 'legacyFooter'>): ReactElement => {
    const [open, setOpen] = useState(false);
    return (
        <Flyout
            isOpen={open}
            onOpenChange={(isOpen) => setOpen(isOpen)}
            trigger="foobar"
            title="Header title"
            badges={badges}
            onConfirm={onConfirm}
            onCancel={onCancel}
            legacyFooter={legacyFooter}
        >
            <TextInput placeholder="placeholder" />
            {legacyFooter === false && (
                <FlyoutFooter
                    buttons={[
                        {
                            style: ButtonStyle.Default,
                            emphasis: ButtonEmphasis.Default,
                            children: 'Cancel',
                            onClick: cy.stub().as('onCloseStub'),
                        },
                        {
                            style: ButtonStyle.Default,
                            emphasis: ButtonEmphasis.Strong,
                            children: 'Add',
                            onClick: cy.stub().as('onClickStub'),
                        },
                    ]}
                />
            )}
        </Flyout>
    );
};

describe('Flyout Component', () => {
    it('should render with header and badges', () => {
        const onCloseStub = cy.stub().as('onCloseStub');

        cy.mount(<Component badges={[{ children: 'Badge 1' }, { children: 'Badge 2' }]} onCancel={onCloseStub} />);

        cy.get(FLYOUT_TRIGGER_ID).click();
        cy.get(FIELDSET_HEADER_ID).should('contain', 'Header title');
        cy.get(BADGE_ID).should('have.length', 2);
        cy.get(TEXT_INPUT_ID).should('have.attr', 'placeholder').and('eq', 'placeholder');
        cy.get(BUTTON_ID).click();
        cy.get('@onCloseStub').should('be.calledOnce');
    });
    it('should render with onClick action', () => {
        const onCloseStub = cy.stub().as('onCloseStub');
        const onClickStub = cy.stub().as('onClickStub');

        cy.mount(<Component onConfirm={onClickStub} onCancel={onCloseStub} />);

        cy.get(FLYOUT_TRIGGER_ID).click();
        cy.get(BUTTON_ID).should('have.length', 2);
        cy.get(BUTTON_ID).eq(1).click();
        cy.get('@onClickStub').should('be.calledOnce');
    });
    it('should render with custom footer buttons', () => {
        cy.mount(<Component legacyFooter={false} />);

        cy.get(FLYOUT_TRIGGER_ID).click();
        cy.get(BUTTON_ID).should('have.length', 2);
        cy.get(BUTTON_ID).eq(0).click();
        cy.get('@onCloseStub').should('be.calledOnce');
        cy.get(BUTTON_ID).eq(1).click();
        cy.get('@onClickStub').should('be.calledOnce');
    });
});
