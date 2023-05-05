/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { DialogFooter } from './DialogFooter';
import { ButtonEmphasis } from '@components/Button';

const DIALOG_FOOTER_SELECTOR = '[data-test-id=fondue-dialog-footer]';
const CONFIRM_BUTTON = '[data-test-id=confirm]';
const CANCEL_BUTTON = '[data-test-id=cancel]';

describe('DialogHeader Component', () => {
    it('should render with one button', () => {
        cy.mount(
            <DialogFooter
                buttons={[{ children: 'Confirm', onClick: () => console.log('confirm'), 'data-test-id': 'confirm' }]}
            />,
        );

        cy.get(DIALOG_FOOTER_SELECTOR).should('exist');
        cy.get(CONFIRM_BUTTON).should('exist');
    });

    it('should render two buttons', () => {
        cy.mount(
            <DialogFooter
                buttons={[
                    { children: 'Cancel', 'data-test-id': 'cancel', emphasis: ButtonEmphasis.Default },
                    { children: 'Confirm', 'data-test-id': 'confirm' },
                ]}
            />,
        );
        cy.get(CONFIRM_BUTTON).should('exist');
        cy.get(CANCEL_BUTTON).should('exist');
    });

    it('should call button action', () => {
        const onActionStub = cy.stub();
        cy.mount(
            <DialogFooter buttons={[{ children: 'Confirm', onClick: onActionStub, 'data-test-id': 'confirm' }]} />,
        );

        cy.get(CONFIRM_BUTTON).click();
        cy.wrap(onActionStub).should('have.been.calledOnce');
    });
});
