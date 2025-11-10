/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ButtonEmphasis } from '@components/Button';

import { DialogFooter } from './DialogFooter';

const DIALOG_FOOTER_SELECTOR = '[data-test-id=fondue-dialog-footer]';
const DIALOG_FOOTER_SELECTOR_BACK_BUTTON = '[data-test-id=fondue-dialog-footer-back-button]';
const DIALOG_FOOTER_SELECTOR_CONTENT = '[data-test-id=fondue-dialog-footer-content]';
const DIALOG_FOOTER_SELECTOR_ACTIONBUTTONS = '[data-test-id=fondue-dialog-footer-action-buttons]';
const CONFIRM_BUTTON = '[data-test-id=confirm]';
const CANCEL_BUTTON = '[data-test-id=cancel]';

describe('DialogHeader Component', () => {
    it('should render with one button', () => {
        cy.mount(
            <DialogFooter
                actionButtons={[
                    { children: 'Confirm', onClick: () => console.log('confirm'), 'data-test-id': 'confirm' },
                ]}
            />,
        );

        cy.get(DIALOG_FOOTER_SELECTOR).should('exist');
        cy.get(CONFIRM_BUTTON).should('exist');
    });

    it('should render two buttons', () => {
        cy.mount(
            <DialogFooter
                actionButtons={[
                    { children: 'Cancel', 'data-test-id': 'cancel', emphasis: ButtonEmphasis.Default },
                    { children: 'Confirm', 'data-test-id': 'confirm' },
                ]}
            />,
        );
        cy.get(CONFIRM_BUTTON).should('exist');
        cy.get(CANCEL_BUTTON).should('exist');
    });

    it('should render with back button', () => {
        cy.mount(
            <DialogFooter
                backButton={{ children: 'Back' }}
                actionButtons={[
                    { children: 'Cancel', 'data-test-id': 'cancel', emphasis: ButtonEmphasis.Default },
                    { children: 'Confirm', 'data-test-id': 'confirm' },
                ]}
            />,
        );
        cy.get(DIALOG_FOOTER_SELECTOR_ACTIONBUTTONS).should('exist');
        cy.get(DIALOG_FOOTER_SELECTOR_BACK_BUTTON).should('exist');
    });

    it('should render with back button and extra content', () => {
        cy.mount(
            <DialogFooter
                backButton={{ children: 'Back' }}
                actionButtons={[
                    { children: 'Cancel', 'data-test-id': 'cancel', emphasis: ButtonEmphasis.Default },
                    { children: 'Confirm', 'data-test-id': 'confirm' },
                ]}
            >
                <p>Some extra important information.</p>
            </DialogFooter>,
        );

        cy.get(DIALOG_FOOTER_SELECTOR_ACTIONBUTTONS).should('exist');
        cy.get(DIALOG_FOOTER_SELECTOR_BACK_BUTTON).should('exist');
        cy.get(DIALOG_FOOTER_SELECTOR_CONTENT).should('exist');
        cy.get(DIALOG_FOOTER_SELECTOR_CONTENT).should('have.text', 'Some extra important information.');
    });

    it('should call button action', () => {
        const onActionStub = cy.stub();
        cy.mount(
            <DialogFooter
                actionButtons={[{ children: 'Confirm', onClick: onActionStub, 'data-test-id': 'confirm' }]}
            />,
        );

        cy.get(CONFIRM_BUTTON).click();
        cy.wrap(onActionStub).should('have.been.calledOnce');
    });
});
