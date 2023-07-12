/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { DialogBody } from './DialogBody';

const DIALOG_BODY_SELECTOR = '[data-test-id=fondue-dialog-body]';

describe('DialogBody Component', () => {
    it('should render correctly', () => {
        cy.mount(
            <DialogBody>
                <p>Hello</p>
                <p>
                    Bacon ipsum dolor amet picanha ham porchetta doner meatball sausage. T-bone chuck shankle pig spare
                    ribs prosciutto. Leberkas buffalo chicken ball tip, beef ribs capicola turducken picanha. Turkey
                    kielbasa flank turducken ham fatback. Hamburger venison short ribs bacon pastrami.
                </p>
            </DialogBody>,
        );

        cy.get(DIALOG_BODY_SELECTOR).should('exist');
    });

    it('should render with maxHeight and overflow', () => {
        cy.mount(
            <DialogBody maxHeight={200}>
                <p>Hello</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam at, beatae blanditiis cupiditate
                    ducimus, excepturi magni mollitia nobis non nulla provident quibusdam veniam! Enim maxime nisi quo
                    reprehenderit tenetur ut? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium
                    aliquam aliquid, blanditiis, consectetur dignissimos doloremque dolorum esse eveniet explicabo
                    facere laudantium nobis quaerat quas quidem quis suscipit temporibus veritatis voluptates? Lorem
                    ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam consectetur corporis, cum
                    dignissimos dolores est impedit magnam minus nemo nobis perspiciatis quibusdam quis recusandae
                    similique tempora unde ut veniam!
                </p>

                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam at, beatae blanditiis cupiditate
                    ducimus, excepturi magni mollitia nobis non nulla provident quibusdam veniam! Enim maxime nisi quo
                    reprehenderit tenetur ut? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium
                    aliquam aliquid, blanditiis, consectetur dignissimos doloremque dolorum esse eveniet explicabo
                    facere laudantium nobis quaerat quas quidem quis suscipit temporibus veritatis voluptates? Lorem
                    ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam consectetur corporis, cum
                    dignissimos dolores est impedit magnam minus nemo nobis perspiciatis quibusdam quis recusandae
                    similique tempora unde ut veniam!
                </p>
            </DialogBody>,
        );

        cy.get(DIALOG_BODY_SELECTOR).should('exist');
        cy.get(DIALOG_BODY_SELECTOR).should('have.css', 'max-height', '200px');
        cy.get(DIALOG_BODY_SELECTOR).should('have.css', 'height', '200px');
    });
});
