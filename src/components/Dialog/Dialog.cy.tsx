/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Dialog } from './Dialog';
import { Button } from '@components/Button';
import { DialogHeader } from '@components/DialogHeader';
import { DialogHeaderSize } from '../../types/dialog';
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
                    <DialogHeader title="Heading" size={DialogHeaderSize.Large} collapseBottom />
                    <DialogBody>Some Content</DialogBody>
                </Dialog.Content>
            </Dialog>,
        );

        cy.get(DIALOG_SELECTOR).should('exist');
    });
});
