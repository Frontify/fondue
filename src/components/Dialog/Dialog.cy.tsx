/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Dialog } from './Dialog';
import { Button } from '@components/Button';
import { DialogHeader } from '@components/DialogHeader';
import { DialogBody } from '@components/DialogBody';
import { InlineDialogProps } from '@components/InlineDialog';
import { useRef } from 'react';

const DIALOG_SELECTOR = '[data-test-id=fondue-dialog-content]';

const DialogComponent = ({ verticalAlignment }: Omit<InlineDialogProps, 'open' | 'anchor'>) => {
    const triggerRef = useRef<HTMLButtonElement | null>(null);

    return (
        <>
            <Button ref={triggerRef}>Open Dialog</Button>
            <Dialog anchor={triggerRef} verticalAlignment={verticalAlignment} open={true}>
                <DialogHeader title="Heading" size="large" />
                <DialogBody>Some Content</DialogBody>
            </Dialog>
        </>
    );
};
describe('Dialog Component', () => {
    it('should render correctly', () => {
        cy.mount(<DialogComponent />);

        cy.get(DIALOG_SELECTOR).should('exist');
    });

    it('should be top aligned', () => {
        cy.mount(<DialogComponent verticalAlignment="top" />);

        cy.get(DIALOG_SELECTOR).should('exist');
        cy.get(DIALOG_SELECTOR).parent().should('have.css', 'top', '100px');
    });

    it('should be responsive', () => {
        cy.mount(<DialogComponent />);

        cy.viewport(700, 900);
        cy.get(DIALOG_SELECTOR).should('exist');
        cy.get(DIALOG_SELECTOR).should('have.css', 'min-width', '600px'); // 600px default on larger screen
        cy.viewport(400, 745);
        cy.get(DIALOG_SELECTOR).should('have.css', 'min-width', '360px'); // 90vw on mobile view.
        cy.viewport(1200, 900);
        cy.get(DIALOG_SELECTOR).should('have.css', 'min-width', '600px'); // 600px default on larger screen
    });
});
