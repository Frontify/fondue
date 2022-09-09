import React from 'react';
import { EditableInput } from '@components/EditableInput/EditableInput';

const EDITABLE_CONTAINER = '[data-test-id=editable-node-container]';
const EDITABLE_LINK_NAME = '[data-test-id=node-link-name]';
const EDITABLE_NODE = '[data-test-id=editable-input]';

describe('EditableInput', () => {
    beforeEach('Setup component', () => {
        const onEditableSaveSpy = cy.spy().as('onEditableSaveSpy');
        cy.mount(
            <EditableInput
                options={{ additionalValues: 'id', enableDoubleClick: true }}
                onAdditionalValueSave={(one: string, two: string) => onEditableSaveSpy(two)}
            >
                <div>This Input</div>
            </EditableInput>,
        );
    });
    it('renders without error', () => {
        cy.get(EDITABLE_CONTAINER).should('exist');
    });

    it('on double click changes to input', () => {
        cy.get(EDITABLE_LINK_NAME).should('exist');
        cy.get(EDITABLE_LINK_NAME).dblclick();

        cy.get(EDITABLE_NODE).should('exist');
    });

    it('Event gets triggered when writing Hey in input form that nothing is sent and when clicking away that it sent an event', () => {
        cy.get(EDITABLE_LINK_NAME).dblclick();

        cy.get(EDITABLE_NODE).type('Hey');

        cy.get('@onEditableSaveSpy').should('have.not.been.called');
        cy.get(EDITABLE_CONTAINER).click();
        cy.get('@onEditableSaveSpy').should('have.been.calledWith', 'This InputHey');
    });

    it('Event Triggers when hitting enter', () => {
        cy.get(EDITABLE_LINK_NAME).dblclick();

        cy.get(EDITABLE_NODE).type('Hey');
        cy.get(EDITABLE_NODE).type('{enter}');
        cy.get('@onEditableSaveSpy').should('have.been.called');
    });
});
