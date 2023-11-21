/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Dialog } from './Dialog';
import { Button } from '@components/Button';
import { DialogHeader } from '@components/DialogHeader';
import { DialogBody } from '@components/DialogBody';

const DIALOG_SELECTOR = '[data-test-id=fondue-dialog-content]';
describe('Dialog Component', () => {
    it('should render correctly', () => {
        cy.mount(
            <Dialog open={true}>
                <Dialog.Trigger>
                    <Button>Open Dialog</Button>
                </Dialog.Trigger>
                <Dialog.Content>
                    <DialogHeader title="Heading" size="large" />
                    <DialogBody>Some Content</DialogBody>
                </Dialog.Content>
            </Dialog>,
        );

        cy.get(DIALOG_SELECTOR).should('exist');
    });

    it('should be top aligned', () => {
        cy.mount(
            <Dialog verticalAlignment="top" open={true}>
                <Dialog.Trigger>
                    <Button>Open Dialog</Button>
                </Dialog.Trigger>
                <Dialog.Content>
                    <DialogHeader title="Heading" size="large" />
                    <DialogBody>Some Content</DialogBody>
                </Dialog.Content>
            </Dialog>,
        );

        cy.get(DIALOG_SELECTOR).should('exist');
        cy.get(DIALOG_SELECTOR).parent().should('have.css', 'top', '100px');
    });

    it('should be responsive', () => {
        cy.mount(
            <Dialog open={true}>
                <Dialog.Trigger>
                    <Button>Open Dialog</Button>
                </Dialog.Trigger>
                <Dialog.Content>
                    <DialogHeader title="Heading" size="large" />
                    <DialogBody>Some Content</DialogBody>
                </Dialog.Content>
            </Dialog>,
        );

        cy.viewport(700, 900);
        cy.get(DIALOG_SELECTOR).should('exist');
        cy.get(DIALOG_SELECTOR).should('have.css', 'min-width', '600px'); // 600px default on larger screen
        cy.viewport(400, 745);
        cy.get(DIALOG_SELECTOR).should('have.css', 'min-width', '360px'); // 90vw on mobile view.
        cy.viewport(1200, 900);
        cy.get(DIALOG_SELECTOR).should('have.css', 'min-width', '600px'); // 600px default on larger screen
    });
});
