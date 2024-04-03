/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditableMode, EditableText } from '@components/EditableText/EditableText';

const EDITABLE_CONTAINER = '[data-test-id=editable-node-container]';
const EDITABLE_LINK_NAME = '[data-test-id=node-link-name]';
const EDITABLE_NODE = '[data-test-id=editable-input]';

describe('EditableText', () => {
    beforeEach('Setup component', () => {
        const onAdditionalValueSave = cy.spy().as('onAdditionalValueSave');
        const onEditableSave = cy.spy().as('onEditableSave');
        const onModeChange = cy.spy().as('onModeChange');
        cy.mount(
            <EditableText
                options={{
                    additionalValues: 'id',
                    enableDoubleClick: true,
                    isSlimInputField: true,
                }}
                onAdditionalValueSave={(one: string, two: string) => onAdditionalValueSave(two)}
                onModeChange={(editableState?: EditableMode) => onModeChange(editableState)}
                onEditableSave={(value: string) => onEditableSave(value)}
            >
                <div>This Input</div>
            </EditableText>,
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

    it('onMode Change Event triggers when changing state', () => {
        cy.get(EDITABLE_LINK_NAME).dblclick();

        cy.get(EDITABLE_NODE).type('Hey');

        cy.get('@onAdditionalValueSave').should('have.not.been.called');
        cy.get(EDITABLE_CONTAINER).click();
        cy.get('@onAdditionalValueSave').should('have.been.calledWith', 'Hey');
    });

    it('Event gets triggered when writing Hey in input form that nothing is sent and when clicking away that it sent an event', () => {
        cy.get(EDITABLE_LINK_NAME).dblclick();

        cy.get('@onModeChange').should('have.been.calledWith', 'INPUT');
        cy.get(EDITABLE_NODE).type('Hey');
        cy.get(EDITABLE_CONTAINER).click();

        cy.get('@onModeChange').should('have.been.calledWith', 'LABEL');
    });

    it('Event gets triggered when writing Hey in input form that nothing is sent and when clicking away that it sent an event', () => {
        cy.get(EDITABLE_LINK_NAME).dblclick();

        cy.get(EDITABLE_NODE).type('Hey');
        cy.get(EDITABLE_CONTAINER).click();

        cy.get('@onEditableSave').should('have.been.calledWith', 'Hey');
    });

    it('Event Triggers when hitting enter', () => {
        cy.get(EDITABLE_LINK_NAME).dblclick();

        cy.get(EDITABLE_NODE).type('Hey');
        cy.get(EDITABLE_NODE).type('{enter}');
        cy.get('@onAdditionalValueSave').should('have.been.called');
    });
});
