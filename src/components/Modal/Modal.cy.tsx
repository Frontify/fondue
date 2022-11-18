/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconIcon } from '@foundation/Icon';
import { PatternDesign, PatternTheme } from '@foundation/Pattern';
import { OverlayProvider } from '@react-aria/overlays';
import React from 'react';
import { Modal } from './Modal';
import { ModalHeader } from './ModalHeader';
import { ModalHeaderVariant } from './types';

const MODAL_CONTAINER = '[data-test-id=modal-container]';
const MODAL_VISUAL = '[data-test-id=modal-visual]';
const MODAL_HEADER = '[data-test-id=modal-header]';
const MODAL_BODY = '[data-test-id=modal-body]';
const MODAL_FOOTER = '[data-test-id=modal-footer]';
const MODAL_HEADER_DECORATOR = '[data-test-id=modal-header-decorator-container]';
const GENERIC_ICON_CODE = 'svg[name=IconIcon24]';
const SCROLL_WRAPPER_CONTAINER = '[data-test-id=scroll-wrapper]';

describe('Modal Component', () => {
    it('should render an empty modal', () => {
        cy.mount(
            <OverlayProvider>
                <Modal isOpen={true}>
                    {/*children are required in new version react-aria overlays -> To Refactor*/}
                </Modal>
            </OverlayProvider>,
        );

        cy.get(MODAL_CONTAINER).should('exist');
        cy.get(MODAL_VISUAL).should('not.exist');
        cy.get(MODAL_HEADER).should('not.exist');
        cy.get(MODAL_BODY).should('not.exist');
        cy.get(MODAL_FOOTER).should('not.exist');
    });

    it('should render the modal with a visual', () => {
        cy.mount(
            <OverlayProvider>
                <Modal
                    isOpen={true}
                    visual={{
                        pattern: PatternDesign.DigitalAssets,
                        foregroundColor: PatternTheme.Violet,
                    }}
                >
                    {}
                </Modal>
            </OverlayProvider>,
        );

        cy.get(MODAL_VISUAL).should('exist');
        cy.get(MODAL_VISUAL).should('have.class', 'tw-text-violet-60');
    });

    it('should render the modal with a header', () => {
        const title = 'Modal header';
        const leadText = 'The Home for Brand Management';

        cy.mount(
            <OverlayProvider>
                <Modal isOpen={true}>
                    <ModalHeader
                        title={title}
                        leadText={leadText}
                        decorator={<IconIcon />}
                        variant={ModalHeaderVariant.Informative}
                    />
                </Modal>
            </OverlayProvider>,
        );

        cy.get(MODAL_HEADER).should('exist');
        cy.get(MODAL_HEADER).should('contain.text', title).and('contain.text', leadText);
        cy.get(MODAL_HEADER_DECORATOR).should('be.visible').and('have.class', 'tw-text-violet-60');
        cy.get(GENERIC_ICON_CODE).should('be.visible').and('have.css', 'width').and('eq', '24px');
        cy.get(GENERIC_ICON_CODE).should('be.visible').and('have.css', 'height').and('eq', '24px');
    });

    it('should render the modal with a body and implement the ScrollWrapper component', () => {
        cy.mount(
            <OverlayProvider>
                <Modal isOpen={true}>
                    <Modal.Body>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </Modal.Body>
                </Modal>
            </OverlayProvider>,
        );

        cy.get(MODAL_BODY).should('exist');
        cy.get(SCROLL_WRAPPER_CONTAINER).should('exist');
    });
});
