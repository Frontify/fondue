import React from 'react';
import { EditableInput } from '@components/EditableInput/EditableInput';

const EDITABLE_CONTAINER = '[data-test-id=editable-node-container]';
const EDITABLE_LINK_NAME = '[data-test-id=node-link-name]';
const EDITABLE_NODE = '[data-test-id=node-editable]';

describe('EditableInput', () => {
    it('renders without error', () => {
        cy.mount(
            <EditableInput
                name={'This Input'}
                targetItemId={'id'}
                onEditableSave={() => console.log('edit')}
            ></EditableInput>,
        );

        cy.get(EDITABLE_CONTAINER).should('exist');
    });
    it('on double click changes to input', () => {
        cy.mount(
            <EditableInput
                name={'This Input'}
                targetItemId={'id'}
                onEditableSave={() => console.log('edit')}
            ></EditableInput>,
        );
        cy.get(EDITABLE_LINK_NAME).should('exist');
        cy.get(EDITABLE_LINK_NAME).dblclick();

        cy.get(EDITABLE_NODE).should('exist');
    });

    it('Event gets triggered when writing Hey in input form that nothing is sent and when clicking away that it sent an event', () => {
        const onChangeSpy = cy.spy().as('onChangeSpy');
        cy.mount(
            <EditableInput
                name={'This Input'}
                targetItemId={'id'}
                onEditableSave={(one: string, two: string) => onChangeSpy(two)}
            ></EditableInput>,
        );
        cy.get(EDITABLE_LINK_NAME).dblclick();

        cy.get(EDITABLE_NODE).type('Hey');

        cy.get('@onChangeSpy').should('have.not.been.called');
        cy.get(EDITABLE_CONTAINER).click();
        cy.get('@onChangeSpy').should('have.been.calledWith', 'This InputHey');
    });

    it('Event Triggers when hitting enter', () => {
        const onChangeSpy = cy.spy().as('onChangeSpy');
        cy.mount(
            <EditableInput
                name={'This Input'}
                targetItemId={'id'}
                onEditableSave={(one: string, two: string) => onChangeSpy(two)}
            ></EditableInput>,
        );
        cy.get(EDITABLE_LINK_NAME).dblclick();

        cy.get(EDITABLE_NODE).type('Hey');
        cy.get(EDITABLE_NODE).type('{enter}');
        cy.get('@onChangeSpy').should('have.been.called');
    });
});
